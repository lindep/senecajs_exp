const cluster = require('cluster');

var numCPUs = 4; //require('os').cpus().length;

let workerContinuesRestart = true;
let restartCount = 0;
let restartNumIncrementTime = 2; //for every restartNumIncrementTime double the time to wait for restart
let maxRestartTimeout = 60000; // 60 s
let workerInitRestartTimeout = 2000;
let workerRestartTimeout = workerInitRestartTimeout;

// require('seneca')()
//   .use('mesh',{base:true, tag:'base'})

cluster.setupMaster({
  exec: "app.js",
  args: ['--cluster', 'true', '--ratelimit', 'false'],
  //silent: true
});

for (let i = 0; i < numCPUs; i++) {
  let worker = cluster.fork();

  worker.on('message', function(msg) {
    console.log('Master ' + process.pid + ' received message from worker ' + this.process.pid + '.', msg);
  });
}

cluster.on("fork", function(worker) {
  console.log("Worker : [ %d ][ Status : Forking ] cyan", worker.process.pid);
});

cluster.on("online", function(worker) {
  console.log("Worker : [ %d ][ Status : Online ] green", worker.process.pid);
  workerOnline = true;
});

cluster.on("listening", function(worker, address) {
  console.log("Worker : [ %d ][ Status : Listening ][ Address : %s ][ Port : %d ] yellow", worker.process.pid, address.address, address.port);
});

cluster.on("disconnect", function(worker) {
  console.log("Worker : [ %d ][ Status : Disconnected ] white", worker.process.pid);
});
/*
* Restart Dead Workers
*/
cluster.on("exit", function(worker, code, signal) {
   console.log("Worker : [ %d ][ Status : Exit ][ Signal : %s ][ Code : %s ] red", worker.process.pid, signal, code);
   console.log('Master : Restarting worker in',workerRestartTimeout/1000,'s')
   // Don't start a new worker immediately
   setTimeout(function() {
      restartCount++;
      if (restartCount % restartNumIncrementTime === 0) {
      // for every restartNumIncrementTime double the time to wait for restart
       workerRestartTimeout = workerRestartTimeout * 2;
      }
      if (workerRestartTimeout > maxRestartTimeout) {
        if (! workerContinuesRestart) {
          // only continue if allowed
          console.log('Client failed to connect successfully, giving up!!!')
          return;
        }
       //reset timeout back to default
       workerRestartTimeout = workerInitRestartTimeout;
      }
      //  console.log('Master : Restarting worker in',workerRestartTimeout/1000,'s')
      //  cluster.fork();
      console.log('cluster.exit, Master : Restarting worker in',workerRestartTimeout/1000,'s');
      let worker = cluster.fork();
      //let workerMsg = (worker) => (msg) => {console.log('Master ' + process.pid + ' received message from worker ' + this.process.pid + '.', msg)};
      //worker.on('message', workerMsg(worker));
      worker.on('message', function(msg) {
       console.log('Restarted worker, Master ' + process.pid + ' received message from worker ' + this.process.pid + '.', msg);
      });
     },workerRestartTimeout);

});
