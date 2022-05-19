#!/bin/bash -e

docker push xjrcode/bull-board:$1

# create latest tag
docker image tag xjrcode/bull-board:$1 xjrcode/bull-board:latest
docker push xjrcode/bull-board:latest