require( 'seneca' )()
	.client()
	.act('cmd:salestax,net:100', function (err, result) {
	  console.log(result.total)
	})

	require( 'seneca' )()
	.client({port:10111})
	.act('cmd:salestax,country:a,net:100', function (err, result) {
	  console.log(result.total)
	})
