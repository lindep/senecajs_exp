require( 'seneca' )({ strict: { find: false } })
  .use( 'math' )
  .use('mesh', { 
  	//auto:true,
  	bases: ['127.0.0.1'],
  	pin:'role:math' 
  })
  //.listen({ type: 'tcp', pin: 'role:math' })
