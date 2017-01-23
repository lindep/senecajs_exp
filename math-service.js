require( 'seneca' )()
  .use( 'math' )
  .listen({ type: 'tcp', pin: 'role:math' })