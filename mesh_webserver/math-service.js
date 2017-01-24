require( 'seneca' )({ strict: { find: false } })
  .use( 'math' )
  .use('mesh', { 
  	//auto:true,
  	bases: ["127.0.0.1:39999"],
  	discover: {
      multicast: {
        address: "255.255.255.255"
      },
          //registry: REGISTRY
    },
    dumpnet: false,
	  sneeze: {
	    silent: false
	  },
  	pin:'role:math' 
  })
  //.listen({ type: 'tcp', pin: 'role:math' })
