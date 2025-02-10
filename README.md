# bull-board-docker

Minimum version of https://github.com/felixmosh/bull-board runing on docker.

Example running docker-compose:

```
version: "3.8"

services:
  redis:
    image: redis:latest

  bullboard:
    image: xjrcode/bull-board:latest
    environment:
      REDIS_HOST: redis # default redis
      REDIS_PORT: 6379 # default 6379
      REDIS_DB_NAME: 0 # default 0
      DASHBOARD_ROOT_PATH: /boo/bar/bullboard # default /
      DELIMITER: . # default . Allows to group and nest queues by name
```
