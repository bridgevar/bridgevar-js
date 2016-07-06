var Scratch = require('scratch-api');
var bridgeUsers = require('./users.json');
const statusId = 115628457;
const serverNo = 1; //0 based indexing plz
const serverId = '☁ server' + serverNo + 'timestamp'
const username = 'bridgevar';
var password = 'password';
var calculateVars = function(){
    var orders = bridgeUsers.length;
    var start = Math.ceil(orders/servers) * serverNo;
    var end = Math.ceil(orders/servers) * (serverNo + 1);
}
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
