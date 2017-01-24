
Access via curl

curl -v 'http://localhost:3000/api/calculate/sum?left=2&right=3'



BASE
.use('mesh', {
    isbase: true,
    host: HOST,
    port: PORT,
    bases: [...,...],
    discover: {
      multicast: {
        address: BROADCAST
      },
      registry: REGISTRY
    },
    dumpnet: false,
    sneeze: {
      silent: false
    }
  })

