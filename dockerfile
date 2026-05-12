# Build frontend
FROM node:20 AS frontend

WORKDIR /frontend

COPY frontend/package*.json ./
RUN npm install

COPY frontend ./
RUN npm run build


# Backend
FROM node:20

WORKDIR /app

COPY backend/package*.json ./
RUN npm install

COPY backend ./

# Copy frontend build
COPY --from=frontend /frontend/dist ./dist

ENV PORT=10000

EXPOSE 10000

CMD ["node", "server.js"]