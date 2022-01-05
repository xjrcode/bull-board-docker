FROM node:16-alpine3.14
ENV NODE_ENV production
WORKDIR /app
COPY ./ /app
RUN npm ci
EXPOSE 3000

CMD ["node", "index.js"]
