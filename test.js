var Scratch = require('scratch-api');
var fs = require('fs');
var bridgeUsers = require('./users.json');
var statusId = 115628457;
var serverId = '☁ server1timestamp'
var username = 'bridgevar';
var password = 'password';
var stream = fs.createWriteStream("./log.txt");
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
                        var val = value;
                        secondcloud.set('☁ ' + secondName, value);
                    }
                });
                secondcloud.on('set', function(name, value) {
                    if (name === '☁ ' + secondName) {
                        var val = value;
                        firstcloud.set('☁ ' + secondName, value);
                    }
                });
            });
        });
        stream.once('open', function(fd) {
            var today = new Date();
            var UTCstring = today.toUTCString();
            stream.write("At " + UTCstring + " " + firstProjectId + " sent " + secondProjectId + " the value " + val + "\n");
            stream.end();
        });
    }
}
Scratch.UserSession.create(username, password, function(err, user) {
    user.cloudSession(statusId, function(err, statusSession) {
        var pulse = function(session) {session.set(serverId, Date.now()); setTimeout(pulse, 50000, session)};
        pulse(statusSession);
    });
});
