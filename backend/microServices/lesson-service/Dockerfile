FROM node:14.8-alpine as BASE
WORKDIR /app
COPY package*.json ./
RUN npm install --silent --progress=false
COPY . .
RUN npm run build

FROM node:14.8-alpine as BUILD
WORKDIR /app
COPY --from=BASE /app/package*.json ./
RUN npm install --silent --progress=false --production
COPY --from=BASE /app/dist/ ./dist

FROM node:14.8-alpine as PROD
COPY --from=BUILD /app /
EXPOSE 3000
ENTRYPOINT [ "node", "dist/src/index.js" ]
