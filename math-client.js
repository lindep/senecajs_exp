require('seneca')()
  .client({ type: 'tcp', pin: 'role:math' }) //{host:"172.17.0.6"}
  .act('role:math,cmd:sum,left:1,right:2',console.log)