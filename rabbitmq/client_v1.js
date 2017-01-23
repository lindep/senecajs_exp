var client = require('seneca')()
  .use('seneca-amqp-transport')
  .client({
    type: 'amqp',
    pin: 'cmd:log,version:1.1,level:log',
    url: 'amqp://api:api@192.168.99.100:5672/ceneca?locale=es_AR'
  });

  /*
  require('seneca')()
  .use('seneca-amqp-transport')
  .client({
    type: 'amqp',
    hostname: 'rabbitmq.host',
    port: 5672,
    vhost: 'seneca',
    locale: 'es_AR',
    username: 'guest',
    password: 'guest'
  });
  */

setInterval(function() {
  client.act('cmd:log,version:1.1,level:log', {
    message: 'Hello World from v1'
  }, (err, res) => {
    if (err) {
      // Handle error in some way
      throw err;
    }
    // Print out the response
    console.log(res);
  });
}, 2000);
