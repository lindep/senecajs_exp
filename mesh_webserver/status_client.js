// color-client.js
var Seneca = require('seneca')

var seneca = Seneca({log: 'test'})

  // load the mesh plugin
  .use('mesh',{
    host: "127.0.0.1",
    bases: ["127.0.0.1:39999"],
    discover: {
      multicast: {
        address: "255.255.255.255"
      },
      //registry: REGISTRY
    },
    dumpnet: false,
    sneeze: {
      silent: true
    }
  })
  .ready(function () {
    this.act({role: 'stats', service:'seneca'}, function (err, out) {
      console.log('from stats',out)

      console.log('has role stats',this.has('role:stats'))
      // disconnect from the network
      this.close()
    })
  })
