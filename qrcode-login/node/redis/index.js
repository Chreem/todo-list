const redis = require('redis');
const bluebird = require('bluebird');
const {REDIS_SERVER_HOST} = require('../config');
const [HOST, PORT] = REDIS_SERVER_HOST.split(':');
const client = redis.createClient(PORT, HOST);

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

module.exports = client;