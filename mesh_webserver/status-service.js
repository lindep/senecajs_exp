
/*
curl -v 'http://localhost:3000/api/calculate/sum?left=2&right=3'
*/

require( 'seneca' )({ strict: { find: false } })
  //.use( 'status' )
  .add( 'role:stats', function( args, done ) {
    var that = this
    console.log('args',args)
    console.log('in cmd_stats')
    done(null, {test:"test from here"})
  } )
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
  	pin:'role:stats'
  })

  //.listen({ type: 'tcp', pin: 'role:math' })
