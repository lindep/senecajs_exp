"use strict"

module.exports = function( options ) {
  var seneca = this;

  function cmd_stats( args, done ) {
    var that = this
    console.log(args)
    console.log('in cmd_stats')
    done(null, {test:"test from here"})

    // that.act( 'role:seneca,stats:true', function( err, senstats ) {
    //   senstats.date = new Date()
    //   done(err, senstats)
    // } )
    //,get:seneca
  }

  seneca.sub((err,msg)=>{console.log('from seneca.sub = ',msg)})

  seneca
    .add( 'role:stats', function( args, done ) {
      var that = this
      console.log(args)
      console.log('in cmd_stats')
      done(null, {test:"test from here"})
    } )

  return {name:'status'}
}
