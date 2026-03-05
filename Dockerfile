# Agatas SQL Cech – single image: API + built client (no npm run dev needed for client)
# Build client, then run Node server that serves API + static SPA.

# Stage 1: build client
FROM node:22-alpine AS client-builder
WORKDIR /client
COPY client/package.json client/package-lock.json* ./
RUN npm ci
COPY client/ .
RUN npm run build

# Stage 2: server + client dist
FROM node:22-alpine
WORKDIR /app

COPY server/package.json ./
RUN npm install --omit=dev
COPY server/ .
COPY --from=client-builder /client/dist ./client-dist

ENV NODE_ENV=production
ENV PORT=3001
EXPOSE 3001

CMD ["node", "src/index.js"]
