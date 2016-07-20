  var forever = require('forever-monitor');

  var child = new (forever.Monitor)('bridge.js', {
    silent: true,
    'max': 1000000000,  
    args: []
  });

  child.on('exit', function () {
    console.log('bridge.js has exited after 1000000000 restarts.');
  });

  child.start();
