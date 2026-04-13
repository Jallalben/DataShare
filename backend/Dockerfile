# ===== Development =====
FROM node:24-alpine AS development
WORKDIR /app
RUN apk add --no-cache curl
COPY package*.json ./
RUN npm install --prefer-offline
COPY . .
EXPOSE 3001
CMD ["npm", "run", "start:dev"]

# ===== Build =====
FROM node:24-alpine AS build
WORKDIR /app
RUN apk add --no-cache curl
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# ===== Production =====
FROM node:24-alpine AS production
WORKDIR /app
RUN apk add --no-cache curl
COPY package*.json ./
RUN npm ci --only=production
COPY --from=build /app/dist ./dist
RUN mkdir -p /app/uploads
EXPOSE 3001
CMD ["node", "dist/main.js"]
