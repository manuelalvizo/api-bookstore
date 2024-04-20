FROM node:20-alpine

WORKDIR /app

COPY package.json .

# Instala dependencias, incluido bcrypt
RUN apk add --no-cache make gcc g++ python3 && \
    npm install && \
    npm rebuild bcrypt --build-from-source && \
    apk del make gcc g++ python3

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]