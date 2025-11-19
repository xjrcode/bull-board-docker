const { createBullBoard } = require('@bull-board/api');
const { FastifyAdapter } = require('@bull-board/fastify');
const { BullAdapter } = require('@bull-board/api/bullAdapter')
const Queue = require('bull');
const fastify = require('fastify');
const { createClient } = require('@redis/client');

const run = async () => {
  const {
    DASHBOARD_ROOT_PATH = '/',
    REDIS_HOST = 'redis',
    REDIS_PORT = 6379,
    REDIS_USERNAME = '',
    REDIS_PASSWORD = '',
    REDIS_TLS = false,
    REDIS_DB_NAME = '0',
    DELIMITER = '.',
    PORT = 3000,
  } = process.env;

  const redis = await createClient({
    url: `redis${REDIS_TLS ? 's' : ''}://${REDIS_USERNAME}${REDIS_PASSWORD ? ':'+REDIS_PASSWORD : ''}${REDIS_USERNAME || REDIS_PASSWORD ? '@': ''}${REDIS_HOST}:${REDIS_PORT}`,
    database: REDIS_DB_NAME,
  }).connect();

  console.log(`Connecting to Redis at redis${REDIS_TLS ? 's' : ''}://${REDIS_USERNAME}${REDIS_PASSWORD ? ':encrypted_password' : ''}${REDIS_USERNAME || REDIS_PASSWORD ? '@': ''}${REDIS_HOST}:${REDIS_PORT}`);

  // get queues
  const keys = await redis.keys(`bull:*`);
  
  const queueNamesSet = new Set(keys.map(key => key.replace(/^.+?:(.+?):.+?$/, '$1')));

  console.table(Array.from(queueNamesSet));

  const queues = Array.from(queueNamesSet).map((item) => new BullAdapter(new Queue(item, 
    { redis: { port: Number(REDIS_PORT), host: REDIS_HOST, username: REDIS_USERNAME || null, password: REDIS_PASSWORD || null, tls: REDIS_TLS ? {} : undefined, db: Number(REDIS_DB_NAME)} }), {delimiter: DELIMITER}));

  // create app
  const app = fastify({ logger: true });

  const serverAdapter = new FastifyAdapter();

  createBullBoard({
    queues,
    serverAdapter,
  });

  serverAdapter.setBasePath(DASHBOARD_ROOT_PATH);
  app.register(serverAdapter.registerPlugin(), { prefix: DASHBOARD_ROOT_PATH });
  await app.listen({ host: '0.0.0.0', port: PORT });
  console.log(`Running on http://0.0.0.0:${PORT}${DASHBOARD_ROOT_PATH}`);
};

run().catch((e) => {
  console.error(e);``
  process.exit(1);
});