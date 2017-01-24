/*
curl 'http://172.17.0.4:3000/api/color/red'
*/

var Seneca = require('seneca')

Seneca({log: 'test'})

  // provide an action for the format:hex pattern
  .add('format:hex', function (msg, done) {

    // red is the only color supported!
    var color = 'red' === msg.color ? '#FF0000' : 'notsupported'

    done(null, {
      color: color
    })
  })

  // load the mesh plugin
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
    pin: 'format:hex'
  })

  //.listen({ type: 'tcp', pin: 'role:math' })
