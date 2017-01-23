var client = require('seneca')()
  .use('seneca-amqp-transport')
  .client({
    type: 'amqp',
    pin: 'cmd:log,level:log',
    url: 'amqp://api:api@10.1.1.2:5672/ceneca?locale=es_AR'
  });

setInterval(function() {
  client.act('cmd:log,level:log', {
    message: 'Hello World'
  }, (err, res) => {
    if (err) {
      // Handle error in some way
      throw err;
    }
    // Print out the response
    console.log(res);
  });
}, 2000);
