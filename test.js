var Scratch = require('scratch-api');
var bridgeUsers = require('./users.js')
var username = 'bridgevar';
var password = 'password';
Scratch.UserSession.create(username, password, function(err, user) {
    for (var i=0; i<bridgeUsers.users.length; i++) {
        var firstProjectId = bridgeUsers.users[i].firstProjectId;
        var secondProjectId = bridgeUsers.users[i].secondProjectId;
        var firstName = bridgeUsers.users[i].firstName;
        var secondName = bridgeUsers.users[i].secondName;
        var myi = i;
        user.cloudSession(firstProjectId, function(err, firstcloud) {
            user.cloudSession(secondProjectId, function(err, secondcloud) {
                firstcloud.on('set', function(name, value) {
                    if (name === '☁ ' + firstName && !bridgeUsers[myi].blocked) {
                        secondcloud.set('☁ ' + secondName, value);
                        bridgeUsers[myi].count++
                    }
                });
                secondcloud.on('set', function(name, value) {
                    if (name === '☁ ' + secondName) {
                        firstcloud.set('☁ ' + secondName, value);
                        bridgeUsers[myi].count++
                    }
                });
            });
        });
    }
});
