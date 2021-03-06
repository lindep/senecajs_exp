module.exports = function math( options ) {

  this.add( 'role:math,cmd:sum', function sum( msg, respond ) {
    respond( null, { answer: msg.left + msg.right } )
  })

  this.add( 'role:math,cmd:product', function product( msg, respond ) {
    respond( null, { answer: msg.left * msg.right } )
  })

  // bind this to init function
  this.add('init:math', init.bind(this))

  // this.add( 'role:math', function product( msg, respond ) {
  //   respond( null, { valid: false, answer: 0 } )
  // })

  this.wrap( 'role:math', function( msg, respond ) {
    console.log('role:math',msg);
    msg.left  = Number(msg.left).valueOf()
    msg.right = Number(msg.right).valueOf()
    this.prior( msg, respond )
  })

}

function init( args, done ) {
  var seneca = this
  seneca.log.info("preparing math plugin...")
  setTimeout( function() {
    suffix = '-math'
    seneca.log.info("Math plugin ready!")
    done()
  }, 111 )
}
