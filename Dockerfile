ARG NODE_VERSION=20

# ── Stage 1: build ───────────────────────────────────────────────────
FROM node:${NODE_VERSION}-alpine AS build
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --force --ignore-scripts

COPY . .
RUN npm run build

# ── Stage 2: production deps ─────────────────────────────────────────
FROM node:${NODE_VERSION}-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --omit=dev --force --ignore-scripts

# ── Stage 3: production image ────────────────────────────────────────
FROM node:${NODE_VERSION}-alpine AS production
WORKDIR /app

ENV NODE_ENV=production

COPY --from=build /app/package.json ./
COPY --from=build /app/dist ./dist
COPY --from=deps /app/node_modules ./node_modules

EXPOSE 5050

CMD ["node", "dist/index.cjs"]
