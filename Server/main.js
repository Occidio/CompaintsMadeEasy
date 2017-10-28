var SuzeService = require('./Services/SuzeService');
var Account = require('./Objects/Account');
var express = require('express');
var session = require('express-session');

var port = 4000;
var app = express();

app.use(session({
    secret: 'complaintsmadeeasy',
    resave: false,
    saveUninitialized: true
}))

app.use(express.static('website'));

app.post('/MakeComplaint', function(req, res) {
    if (!req.session.user) {
        res.send({
            "success": false,
            "message": "User not logged in"
        });
    } else {
        var ss = new SuzeService();
        ss.MakeComplaint(req.body, function(response) {
            if (response.success) {
                res.send({
                    "success": true,
                    "message": ""
                });
            } else {
                res.send({
                    "success": false,
                    "message": "Issue with the service request: " + response.message
                });
            }
        });
    }
});

app.post('/login', function(req, res) {
    var ss = new SuzeService();

    ss.GetAccountByEmailAndPassword(req.body.email, req.body.password, function(response) {
        if (response.success)
            user = response.account;

        if (user) {
            req.session.user = user;
        }

        res.send(user);
    });
});

app.post('/register', function(req, res) {
    var ss = new SuzeService();

    ss.Register(req.body, function(response) {
        res.send(response);
    });
});

app.get('/test', function(req, res) {
    var ss = new SuzeService();

    ss.GetAccountByEmail("test@testington.com", function(response) {
        console.log("Main.js: got response from SS:");
        console.log(response);
        res.send("done");
    });
});

app.post('/logout', function(req, res) {
    req.session.destroy();
});


var server = app.listen(port, function() {
    console.log('Listening on port ' + port + '.');
});