from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os
import logging
import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image
import io
import tempfile
import urllib.request
from pathlib import Path

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Device selection
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Model will be loaded at startup; keep a global reference
model = None
model_load_error: str | None = None

# Image transforms (match training)
transform = transforms.Compose([
    transforms.Grayscale(num_output_channels=3),
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize([0.5] * 3, [0.5] * 3),
])

# Thresholds and defaults
BEST_THRESHOLD = float(os.getenv("BEST_THRESHOLD", "0.7"))
MODEL_PATH = os.getenv("MODEL_PATH", "best_dysgraphia_model.pth")


def load_model(path: str):
    global model
    global model_load_error
    try:
        logger.info(f"Loading model from: {path}")
        model_load_error = None
        p = Path(path)
        # If model file doesn't exist locally and MODEL_URL provided, download it
        model_url = os.getenv("MODEL_URL")
        if not p.exists() and model_url:
            logger.info(f"Local model not found. Downloading from MODEL_URL: {model_url}")
            # download to a temp file in the ml-service folder
            target_dir = Path(__file__).resolve().parent
            target_path = target_dir / p.name
            try:
                with urllib.request.urlopen(model_url) as resp, open(target_path, 'wb') as out_file:
                    out_file.write(resp.read())
                path = str(target_path)
                logger.info(f"Downloaded model to: {path}")
            except Exception as e:
                logger.exception("Failed to download model from MODEL_URL")
                model_load_error = str(e)
                model = None
                return
        m = models.resnet18(pretrained=False)
        m.fc = nn.Linear(m.fc.in_features, 1)
        state = torch.load(path, map_location=device)
        m.load_state_dict(state)
        m.to(device)
        m.eval()
        model = m
        logger.info("Model loaded successfully")
    except FileNotFoundError:
        logger.exception(f"Model file not found at {path}")
        model = None
        model_load_error = f"Model file not found at {path}"
    except Exception:
        logger.exception("Failed to load model")
        model = None
        model_load_error = 'Failed to load model; see logs.'


@app.on_event("startup")
def startup_event():
    load_model(MODEL_PATH)


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if model is None:
        raise HTTPException(status_code=503, detail="Model not loaded")

    try:
        image_bytes = await file.read()
        img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid image file")

    img_tensor = transform(img).unsqueeze(0).to(device)

    with torch.no_grad():
        output = model(img_tensor)
        # ensure scalar
        prob_normal = float(torch.sigmoid(output).squeeze().item())

    prob_dysgraphia = 1.0 - prob_normal
    prediction = "normal" if prob_normal > BEST_THRESHOLD else "dysgraphia"

    if prob_dysgraphia >= 0.6:
        risk_level = "High"
    elif prob_dysgraphia >= 0.35:
        risk_level = "Moderate"
    else:
        risk_level = "Low"

    return {
        "dysgraphia_chance_percent": round(prob_dysgraphia * 100, 1),
        "prediction": prediction,
        "risk_level": risk_level,
    }


@app.get("/")
def health_check():
    return {"status": "ok"}


@app.get('/model_status')
def model_status():
    """Return whether the model is loaded and any load error."""
    return {
        'model_loaded': model is not None,
        'model_path': MODEL_PATH,
        'load_error': model_load_error,
    }