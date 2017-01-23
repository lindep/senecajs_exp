require('seneca')()
  .use('seneca-amqp-transport')
  .add('cmd:log,version:1.1,level:*', function(req, done) {
    console[req.level](req.message);
    return done(null, { ok: true, when: Date.now(), version: '1.1' });
  })
  .listen({
    type: 'amqp',
    pin: 'cmd:log,version:1.1,level:*',
    url: 'amqp://api:api@192.168.99.100:5672/ceneca?locale=es_AR',
  });
