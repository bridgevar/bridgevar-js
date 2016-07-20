  var forever = require('forever-monitor');

  var child = new (forever.Monitor)('bridge.js', {
    silent: true,
    args: []
  });

  child.on('exit', function () {
    console.log('bridge.js has exited.');//It will never go to this probebly.
  });

  child.start();
