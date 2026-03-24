# ---- Build Stage ----
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

# Install ALL deps including devDependencies (needed for tsc)
RUN npm ci

COPY . .

RUN npm run build

# ---- Production Stage ----
FROM node:20-alpine AS production

WORKDIR /app

COPY package*.json ./

# Only production deps
RUN npm ci --omit=dev

# Copy compiled output from builder
COPY --from=builder /app/dist ./dist

EXPOSE 8000

CMD ["node", "dist/index.js"]