require('seneca')()
  .use('redis-queue-transport', {
    'redis-queue': {
      timeout: 22222,
      type: 'redis-queue',
      host: '192.168.99.100',
      port: 6379
    }
  })
  .ready(function () {
  this.act({foo: 'one', bar: 'aloha'}, function (err, response) {
    if (err) {
      return console.log(err)
    }
    console.log(response)
  })
}).client({type: 'redis-queue', pin: 'foo:one'})
  