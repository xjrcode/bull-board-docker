#!/bin/bash -e

export DOCKER_BUILDKIT=1

docker build -t xjrcode/bull-board:$1 .

docker push xjrcode/bull-board:$1