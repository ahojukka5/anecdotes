FROM node:12-alpine as build
LABEL maintainer "Jukka Aho <ahojukka5@gmail.com>"
WORKDIR /app
COPY . .
RUN npm install
ENV GENERATE_SOURCEMAP=false
ENV PUBLIC_URL=/
RUN npm run build

FROM nginx:alpine
LABEL maintainer "Jukka Aho <ahojukka5@gmail.com>"
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
