FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

# Install ALL deps (including devDeps) so TypeScript can compile
RUN npm install

COPY . .

# Build TypeScript
RUN npm run build

# Remove devDeps after build to keep image lean
RUN npm prune --production

EXPOSE ${PORT:-5000}

CMD ["node", "dist/index.js"]
