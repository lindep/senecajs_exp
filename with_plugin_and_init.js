var fs = require('fs')

function math(options) {

  this.add('role:math,cmd:sum', function (msg, respond) {
    respond(null, { answer: msg.left + msg.right })
  })

  this.add('role:math,cmd:product', function (msg, respond) {
    respond(null, { answer: msg.left * msg.right })
  })

  this.add('init:math', init)

  function init(msg, respond) {
    console.log('from init',msg);
    fs.open(options.logfile, 'a', function (err, fd) {

      // cannot open for writing, so fail
      // this error is fatal to Seneca
      if (err) return respond(err)

      log = make_log(fd)
      respond()
    })
  }

  function make_log(fd) {
    return function (entry) {
      fs.write(fd, new Date().toISOString()+' '+entry, null, 'utf8', function (err) {
        if (err) return console.log(err)

        // ensure log entry is flushed
        fs.fsync(fd, function (err) {
          if (err) return console.log(err)
        })
      })
    }
  }


}

require('seneca')()
  .use(math, {logfile:'./math.log'})
  .act({role:'math',cmd:'sum',left:1,right:2}, console.log)
