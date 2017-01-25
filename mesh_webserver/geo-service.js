/*
curl 'http://172.17.0.4:3000/api/geo/operation'
*/

var Seneca = require('seneca')

Seneca({log: 'test'})

  .add('role:geo', function (msg, done) {

    // do some work
    var cmd = 'red' === msg.cmd ? '#FF0000' : 'notsupported'

    done(null, {
      cmd: cmd
    })
  })

  .add('role:geo,v:1', function (msg, done) {

    // do some work
    var cmd = 'red' === msg.cmd ? '#FF0000' : 'notsupported'

    done(null, {
      cmd: cmd
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
    pin: 'role:geo'
  })
