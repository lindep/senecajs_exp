
/*
curl -v 'http://localhost:3000/api/calculate/sum?left=2&right=3'
*/

var SenecaWeb = require('seneca-web')
var Express = require('express')
var Router = Express.Router
var context = new Router()

context.get('/api', function(req, res) {
    res.send('im the api home page!')
});

var senecaWebConfig = {
      context: context,
      adapter: require('seneca-web-adapter-express'),
      options: { parseBody: false } // so we can use body-parser
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
        this.use('api')
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