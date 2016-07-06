var Scratch = require('scratch-api');
var bridgeUsers = require('./users.json');
var statusId = 115628457;
var serverId = '☁ server1timestamp'
var username = 'bridgevar';
var password = 'password';
var createBridges = function(start, end) {
    for (var i=start; i<end; i++) {
        var firstProjectId = bridgeUsers.users[i].firstProjectId;
        var secondProjectId = bridgeUsers.users[i].secondProjectId;
        var firstName = bridgeUsers.users[i].firstName;
        var secondName = bridgeUsers.users[i].secondName;
        var myi = i;
        user.cloudSession(firstProjectId, function(err, firstcloud) {
            user.cloudSession(secondProjectId, function(err, secondcloud) {
                firstcloud.on('set', function(name, value) {
                    if (name === '☁ ' + firstName) {
                        secondcloud.set('☁ ' + secondName, value);
                    }
                });
                secondcloud.on('set', function(name, value) {
                    if (name === '☁ ' + secondName) {
                        firstcloud.set('☁ ' + secondName, value);
                    }
                });
            });
        });
    }
}
Scratch.UserSession.create(username, password, function(err, user) {
    user.cloudSession(statusId, function(err, statusSession) {
        var pulse = function(session) {session.set(serverId, Date.now()); setTimeout(pulse, 50000, session)};
        pulse(statusSession);
    });
});