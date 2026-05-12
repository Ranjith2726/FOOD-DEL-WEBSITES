# ---------- FRONTEND BUILD ----------
FROM node:20 AS frontend

WORKDIR /frontend

COPY frontend/package*.json ./
RUN npm install

COPY frontend ./

RUN npm run build


# ---------- BACKEND ----------
FROM node:20

WORKDIR /app

COPY backend/package*.json ./
RUN npm install

COPY backend ./

# copy frontend build into backend public folder
COPY --from=frontend /frontend/dist ./public

ENV PORT=10000

EXPOSE 10000

CMD ["node", "server.js"]