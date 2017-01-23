
// started redis in different docker container
// get ip for container
require('seneca')()
  .use('redis-queue-transport', {
    'redis-queue': {
      timeout: 22222,
      type: 'redis-queue',
      host: '172.17.0.7',
      port: 6379
    }
  })
  .add('foo:two',function(args,done) { 
  	done(null,{bar:args.bar}) 
  })
  .client( {type:'redis-queue',pin:'foo:one,bar:*'} )
  .act('foo:two', function (err, result) {
	  console.log('foo.two', result)
	})
  .listen( {type:'redis-queue',pin:'foo:two'} )