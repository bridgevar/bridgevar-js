var Scratch = require('scratch-api');
var bridgeUsers = require('./users.json');
var statusId = 115628457;
var serverId = '☁ server1timestamp'
var username = 'bridgevar';
var password = 'password';
var val = "";
var createBridges = function(start, end, user) {
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
                        var today = new Date();
                        var UTCstring = today.toUTCString();
                        console.log("At " + UTCstring + " " + firstProjectId + " sent " + secondProjectId + " the value " + value.toString() + "\n");
                    }
                });
                secondcloud.on('set', function(name, value) {
                    if (name === '☁ ' + secondName) {
                        firstcloud.set('☁ ' + firstName, value);
                        var today = new Date();
                        var UTCstring = today.toUTCString();
                        console.log("At " + UTCstring + " " + firstProjectId + " sent " + secondProjectId + " the value " + value.toString() + "\n");
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
        createBridges(0,1,user)
    });
});
