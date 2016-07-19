var Scratch = require('scratch-api');
var bridgeUsers = require('./users.json');
var statusId = 115628457;
var serverId = '☁ server1timestamp'
var username = 'bridgevar';
var password = 'password';
var val = "";
var createBridges = function(start, end, user) {
    for (var i = start; i < end; i++) {
        var firstProjectId = bridgeUsers.users[i].firstProjectId;
        var secondProjectId = bridgeUsers.users[i].secondProjectId;
        var firstName = bridgeUsers.users[i].firstName;
        var secondName = bridgeUsers.users[i].secondName;
        var oneWay = bridgeUsers.users[i].oneway;
        var myi = i;
        user.cloudSession(firstProjectId, function(err, firstcloud) {
            user.cloudSession(secondProjectId, function(err, secondcloud) {
                if (firstcloud.get('☁ bridgeVar' != 2) {
                    if (firstcloud.get('☁ bridgeVar' != 0) {
                        firstcloud.on('set', function(name, value) {
                            if (name === '☁ ' + firstName) {
                                secondcloud.set('☁ ' + secondName, value);
                                console.log("At " + (new Date()).toUTCstring() + " " + firstProjectId + " sent " + secondProjectId + " the value " + value.toString());
                            }
                        });
                    }
                    if (!oneWay & firstcloud.get('☁ bridgeVar' != 1) {
                            secondcloud.on('set', function(name,
                                value) {
                                if (name === '☁ ' + secondName) {
                                    firstcloud.set('☁ ' + firstName, value);
                                    console.log("At " + (new Date()).toUTCstring() + " " + firstProjectId + " sent " + secondProjectId + " the value " + value.toString()
                                    );
                                }
                            });
                    }
                }
                if (firstcloud.get('☁ bridgeVar' === 7) {
                    firstcloud.set('☁ bridgeVar', 3);
                }
                if (secondcloud.get('☁ bridgeVar' === 7) {
                    secondcloud.set('☁ bridgeVar', 3);
                }
            });
        });
    }
}
Scratch.UserSession.create(username, password, function(err, user) {
    user.cloudSession(statusId, function(err, statusSession) {
        var pulse = function(session) {
            session.set(serverId, Date.now());
            setTimeout(pulse, 50000, session)
        };
        pulse(statusSession);
        createBridges(0, bridgeUsers.length, user)
    });
});
