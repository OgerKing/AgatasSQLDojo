# Agatas SQL Cech – Node API. Target EC2 Ubuntu.
FROM node:22-alpine

WORKDIR /app

COPY package.json ./
RUN npm install --omit=dev

COPY . .

EXPOSE 3001

ENV NODE_ENV=production
ENV PORT=3001

CMD ["node", "src/index.js"]
