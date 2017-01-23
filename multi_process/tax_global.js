
require( 'seneca' )()
  .add({cmd: 'salestax'}, function (msg, done) {
	  var rate  = 0.23
	  var total = msg.net * (1 + rate)
	  done(null, { total: total })
	})
  .listen()
