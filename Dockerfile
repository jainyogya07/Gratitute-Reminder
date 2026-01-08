# Stage 1 - build the frontend
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY .npmrc* ./
RUN npm ci --legacy-peer-deps || npm install
COPY . .
RUN npm run build

# Stage 2 - production image
FROM node:18-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server ./server
RUN npm ci --production --legacy-peer-deps || true
EXPOSE 3001
CMD ["node", "server/index.js"]
