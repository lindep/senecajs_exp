require( 'seneca' )({ strict: { find: false } })
  .use( 'math' )
  .use('mesh', { 
  	//auto:true,
  	bases: ["172.17.0.6:39999"],
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
