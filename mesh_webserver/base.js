require('seneca')()
  .use('mesh',
  	//{base:true, tag:'base'},
  	{isbase: true,
	    host: "127.0.0.1",
	    //port: PORT,
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
    	}
		}
	)
