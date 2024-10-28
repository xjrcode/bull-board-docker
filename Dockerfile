FROM --platform=$BUILDPLATFORM node:current-alpine AS builder
ENV NODE_ENV production
WORKDIR /app
COPY ./ /app
RUN npm install --production

FROM --platform=$BUILDPLATFORM node:current-alpine
ENV NODE_ENV production
WORKDIR /app
COPY --from=builder /app /app
RUN npm ci
EXPOSE 3000

CMD ["node", "index.js"]
