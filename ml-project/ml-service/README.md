# ml-service

This service hosts a FastAPI endpoint to predict dysgraphia from handwriting images.

## Run locally

1. Create a virtual environment and install dependencies:

```bash
py -3 -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

2. Start the API (default binds to 0.0.0.0:8000):

```bash
uvicorn predict_api:app --host 0.0.0.0 --port 5000 --reload
```

3. POST images to `/predict` as `multipart/form-data` with field name `file`.

## Environment variables

- `MODEL_PATH` — path to model file (default `best_dysgraphia_model.pth`)
- `BEST_THRESHOLD` — float threshold used for classification (default `0.7`)

## Notes

- Do not commit large model artifacts to git. Use `models/` or external storage (S3, GCS, or Git LFS).
- The API returns JSON with `prediction`, `dysgraphia_chance_percent`, and `risk_level`.
