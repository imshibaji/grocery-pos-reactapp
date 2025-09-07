FROM alpine:latest

RUN apk add --no-cache nodejs npm yarn curl git

USER root

# Install Node.js and Yarn
RUN mkdir -p /app

ENV NODE_ENV=development

ENV PORT=3000

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

RUN npm run build

COPY ./image ./dist/image

CMD ["npm", "start"]