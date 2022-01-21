FROM node:16.13.2-alpine as builder
WORKDIR /app/frontend

COPY . ./
RUN npm i
RUN npm run build

FROM nginx:latest

RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

COPY --from=builder /app/frontend/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]