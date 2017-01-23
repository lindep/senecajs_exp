
require( 'seneca' )()
  .add({cmd: 'salestax', country:'a'}, function (msg, done) {
	  var rate  = 0.03
	  var total = msg.net * (1 + rate)
	  done(null, { total: total })
	})
  .listen({port:10111})
