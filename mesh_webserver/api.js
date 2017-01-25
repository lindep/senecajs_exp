module.exports = function api(options) {
  //var seneca = this
  //this.fixedargs['fatal$'] = false

  options.cluster = options.cluster || false;

  var valid_ops = { sum:'sum', product:'product' }

  this.add('role:api,path:calculate', function (msg, respond) {
    console.log('from role:api,path:calculate in api');
    if (options.cluster/*typeof process.send === 'function'*/) {
      // Cluster
      process.send({ 'msg': 'worker '+ process.pid});
    }

    var operation = msg.args.params.operation
    var left = msg.args.query.left
    var right = msg.args.query.right
    this.act('role:math', {
      cmd:   valid_ops[operation],
      left:  left,
      right: right,
    }, respond /*function(err, out) {
      if (err) {
        console.log('err',err);
        return respond(null, {});
      }
      respond(null, out)
    }*/)
  })

  this.add('role:api,path:color', function (msg, respond) {
    console.log('from role:api,path:color in api');
    if (options.cluster/*typeof process.send === 'function'*/) {
      // Cluster
      process.send({ 'msg': 'worker '+ process.pid+' from role:api,path:color in api'});
    }
    // for testing
    var context = this.export('web/context')()
    console.log('web context',context)
    // var Routes = {routes:[{
    //     prefix: '/api',
    //     pin:    'role:api,path:*',
    //     map: {
    //       col: { GET:true, suffix:'/:operation' }
    //     }
    //   }]}
    // var routes = this.export('web/mapRoutes')(Routes, (err, reply) => {
    //   console.log(reply)
    // })
    // console.log('routes',routes)
    var color = msg.args.params.operation
    //format: 'hex', color: 'red'
    this.act('format:hex', {
      color:   color
    }, respond /*function(err, out) {
      if (err) {
        console.log('err',err);
        return respond(null, {msg:''});
      }
      respond(null, out)
    }*/)
  })

  this.add('role:api,path:geo', function (msg, respond) {
    console.log('from role:api,path:geo in api');
    if (options.cluster) {
      process.send({ 'msg': 'worker '+ process.pid+' from role:api,path:geo in api'});
    }
    var operation = msg.args.params.operation
    //var left = msg.args.query.left
    this.act('role:geo', {
      cmd:   operation
    }, respond)
  })


  this.add('init:api', function (msg, respond) {
    //console.log('from init', this)
    this.act('role:web',{routes:[
      {
        prefix: '/api',
        pin:    'role:api,path:*',
        map: {
          calculate: { GET:true, suffix:'/:operation' }
        }
      },
      {
        prefix: '/api',
        pin:    'role:api,path:*',
        map: {
          color: { GET:true, suffix:'/:operation' }
        }
      }
      ,
      {
        prefix: '/api',
        pin:    'role:api,path:*',
        //postfix: '/?param=true',
        map: {
          geo: { GET:true, suffix:'/:operation' }
        }
      }
    ]}, respond)
  })

  return {name:'api'}

}
