'use strict'

let seneca = require('seneca')()
seneca.use('redis-queue-transport', {
    'redis-queue': {
      timeout: 22222,
      type: 'redis-queue',
      host: '192.168.99.100',
      port: 6379
    }
  }).ready(function () {
  this.add({foo: 'one'}, function (args, done) {
    done(null, {bar: args.bar})
  })
})

seneca.listen({type: 'redis-queue', pin: 'foo:one'})