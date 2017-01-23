require('seneca')()
  .use('seneca-amqp-transport')
  .add('cmd:log,level:*', function(req, done) {
    console[req.level](req.message);
    return done(null, { ok: true, when: Date.now() });
  })
  .listen({
    type: 'amqp',
    pin: 'cmd:log,level:*',
    url: 'amqp://api:api@10.1.1.2:5672/ceneca?locale=es_AR',
  });
