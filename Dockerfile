FROM node:20-alpine

# ENV VARIABLES

WORKDIR /client
COPY pnpm-lock.yaml .
COPY package*.json .

RUN npm install -g pnpm
RUN pnpm i 

COPY . .
RUN pnpm run build

COPY /dist/ /dist/
COPY package*.json .
COPY vite.config.js . 

EXPOSE 8080

CMD [ "pnpm", "run", "preview" ]