
/*
curl -v 'http://localhost:3000/api/calculate/sum?left=2&right=3'
*/

var SenecaWeb = require('seneca-web')
var Express = require('express')
var Router = Express.Router
var context = new Router()
var configOptions = {
  cluster:false,
  ratelimit:true
}

//console.log(process.argv)
if (process.argv.length > 2) {
  // argv0 = node, argv1 = thisApp.js
  if (process.argv[2] === '--cluster') {
    if (process.argv[3] === 'true') {
      configOptions.cluster = true
    }
  }
  if (process.argv[2] === '--ratelimit') {
    if (process.argv[3] === 'true') {
      configOptions.ratelimit = true
    }
  }
}

context.get('/api', function(req, res) {
    res.send('Test API!')
});

var senecaWebConfig = {
      context: context,
      adapter: require('seneca-web-adapter-express'),
      options: { parseBody: false } // so we can use body-parser
}

var app = Express()

if (configOptions.ratelimit) {
  var RateLimit = require('express-rate-limit')
  var limiter = new RateLimit({
    windowMs: 5*1000, //15*60*1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    delayMs: 0 // disable delaying - full speed until the max limit is reached
  });
  app.use( limiter )
}


var app = Express()
      .use( require('body-parser').json() )
      .use( context )
      .listen(3000)

//{ strict: { find: false } }
var seneca = require('seneca')({ strict: { find: false } })
      .use(SenecaWeb, senecaWebConfig )
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
          silent: false
        }
      })
      .ready( function () {
        this.use('api',{cluster:configOptions.cluster})
      })
      // .use('api')
      // .client( { type:'tcp', pin:'role:math' } )

process.on('exit', function () {
  console.log('Goodbye!');
  //client.end();
});
process.on('SIGINT', function() {
    console.log("Caught interrupt signal");
    process.exit();

});
