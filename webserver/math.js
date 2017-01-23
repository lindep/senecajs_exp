module.exports = function math( options ) { 

  this.add( 'role:math,cmd:sum', function sum( msg, respond ) {
    respond( null, { valid: true, answer: msg.left + msg.right } )
  })

  this.add( 'role:math,cmd:product', function product( msg, respond ) {
    respond( null, { valid: true, answer: msg.left * msg.right } )
  })
  this.add( 'role:math', function product( msg, respond ) {
    respond( null, { valid: false, answer: 0 } )
  })

  this.wrap( 'role:math', function( msg, respond ) {
    console.log('math.js role:math',msg)
    if (msg.cmd === 'subs') return respond(null, {answer:'invalid'})

    msg.left  = Number(msg.left).valueOf()
    msg.right = Number(msg.right).valueOf()
    this.prior( msg, respond )
  })

}