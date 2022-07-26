#!/bin/bash -e

export DOCKER_BUILDKIT=1

docker buildx create --name bull-board-builder
docker buildx use bull-board-builder
docker buildx build --no-cache --pull --platform linux/amd64,linux/arm64 -t xjrcode/bull-board:$1 -t xjrcode/bull-board:latest --push .
docker buildx rm bull-board-builder
