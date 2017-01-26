/*
curl 'http://172.17.0.4:3000/api/geo/operation'
*/

var Seneca = require('seneca')

Seneca({log: 'test', strict: { find: false }})
  .add('role:geo,cmd:operation,v:3', function (msg, done) {
    console.log('inside v3')
    var cmd = 'red' === msg.cmd ? '#FF0000' : 'v3'
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
    pin: 'role:geo,cmd:operation,v:3'
  })
