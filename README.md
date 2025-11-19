# bull-board-docker

Minimum version of https://github.com/felixmosh/bull-board runing on docker with queue auto-discover.

Example running docker-compose:

```
services:
  redis:
    image: redis:latest

  bullboard:
    image: xjrcode/bull-board:latest
    environment:
      REDIS_HOST: redis # default redis
      REDIS_PORT: 6379 # default 6379
      REDIS_USERNAME: '' # default empty
      REDIS_PASSWORD: '' # default empty
      REDIS_TLS: false # default false
      REDIS_DB_NAME: 0 # default 0
      DASHBOARD_ROOT_PATH: /boo/bar/bullboard # default /
      DELIMITER: . # default . Allows to group and nest queues by name
      PORT: 3000 # default 3000
```
