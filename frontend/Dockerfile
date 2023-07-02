FROM node:16.14.2 AS builder
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx
COPY --from=builder /app/build /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]