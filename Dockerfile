FROM node:20-alpine AS builder

RUN corepack enable && corepack prepare yarn@1.22.22 --activate

WORKDIR /app

COPY package.json yarn.lock ./
COPY . .

RUN yarn install
RUN yarn build

FROM nginx:stable-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
