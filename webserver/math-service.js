require( 'seneca' )()
  .use( 'math' )
  .listen({ port:10201, type: 'tcp', pin: 'role:math' })