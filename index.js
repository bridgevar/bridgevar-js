var Scratch = require('scratch-api')

Scratch.UserSession.create('username', 'password', function(err, user) {
    user.cloudSession(firstprojectId, function(err, firstcloud) {
        user.cloudSession(secondprojectId, function(err, secondcloud) {
            firstcloud.on('set', function(name, value) {
                if (name === '☁ bridgeVar') {
                    secondcloud.set('☁ bridgeVar', value);
                };
            });
            secondcloud.on('set', function(name, value) {
                if (name === '☁ bridgeVar') {
                    firstcloud.set('☁ bridgeVar', value);
                };
            });
        });
    });
});