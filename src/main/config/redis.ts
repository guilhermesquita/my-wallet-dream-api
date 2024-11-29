import IORedis from 'ioredis'

export class RedisService extends IORedis {
  constructor() {
    super({
      host: process.env.REDIS_HOSTNAME,
      port: 6379,
      password: process.env.REDIS_PASSWORD
    })

    super.on('error', err => {
      console.log('Error on Redis')
      console.log(err)
      process.exit(1)
    })

    super.on('connect', () => {
      // console.log('Redis connected!')
    })
  }
}
