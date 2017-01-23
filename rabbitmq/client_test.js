var client = require('seneca')()
  .use('seneca-amqp-transport')
  .client({
    type: 'amqp',
    pin: 'cmd:log,version:1.1,level:log',
    url: 'amqp://api:api@10.1.1.2:5672/ceneca?locale=es_AR'
  });

  client.act('cmd:log,version:1.1,level:log', {
    message: 'Hello World from client test'
  }, (err, res) => {
    if (err) {
      // Handle error in some way
      throw err;
    }
    // Print out the response
    console.log(res);
  });

  client.close((err) => {
  if (err) console.log(err)
  else console.log('close complete!')
})
