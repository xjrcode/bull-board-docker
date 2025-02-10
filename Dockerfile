FROM node:current-alpine

ARG TARGETPLATFORM
ENV NODE_ENV=production

WORKDIR /app
COPY ./ /app

RUN if [ "$TARGETPLATFORM" = "linux/arm64" ]; then \
    npm install --arch=arm64 --platform=linux --production; \
  else \
    npm install --arch=x64 --platform=linux --production; \
  fi

EXPOSE 3000
CMD ["node", "index.js"]
