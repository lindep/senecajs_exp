require('seneca')()
  .use('mesh',
  	//{base:true, tag:'base'},
  	{isbase: true,
	    host: "172.17.0.6",
	    //port: PORT,
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
    	}
		}
	)
