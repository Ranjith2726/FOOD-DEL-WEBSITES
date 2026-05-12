# ---------- frontend build ----------
FROM node:20 AS frontend

WORKDIR /frontend

COPY frontend/package*.json ./
RUN npm install

COPY frontend ./
RUN npm run build


# ---------- backend build ----------
FROM node:20 AS backend

WORKDIR /backend

COPY backend/package*.json ./
RUN npm install

COPY backend ./


# ---------- final ----------
FROM node:20

# install nginx
RUN apt-get update && apt-get install -y nginx

# backend
WORKDIR /app
COPY --from=backend /backend ./backend

# frontend static files
COPY --from=frontend /frontend/dist /var/www/html

# nginx config
RUN rm /etc/nginx/sites-enabled/default
RUN printf 'server {\n\
    listen 10000;\n\
    root /var/www/html;\n\
    index index.html;\n\
\n\
    location / {\n\
        try_files $uri /index.html;\n\
    }\n\
\n\
    location /api {\n\
        proxy_pass http://localhost:5000;\n\
    }\n\
}\n' > /etc/nginx/sites-enabled/default

EXPOSE 10000

CMD sh -c "node /app/backend/server.js & nginx -g 'daemon off;'"