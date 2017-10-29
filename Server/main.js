var SuzeService = require('./Services/SuzeService');
var SMSService = require('./Services/SMSService');
var Account = require('./Objects/Account');
var Company = require('./Objects/Company');

var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var cors = require('cors');

var port = 4000;
var app = express();

app.use(session({
    secret: 'complaintsmadeeasy',
    resave: false,
    saveUninitialized: true
}))

app.use(express.static('website'));
app.use(bodyParser());
app.use(cors());

app.post('/MakeComplaint', function (req, res) {

    if (!req.session.user) {
        res.send({
            "success": false,
            "message": "User not logged in"
        });
    } else {

        SendSms(req.body);

        var ss = new SuzeService();
        ss.MakeComplaint(req.body, function (response) {
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

var SendSms = function (complaint) {
    var smsService = new SMSService();
    var ss = new SuzeService();

    if (complaint.details.marketingInfo) {
        ss.GetPoliceNumberByAccountId(complaint.accountId, function (response) {
            if (response.success) {
                MessageParser(complaint.details.reason, function (message) {
                    if (message == "") {
                        SendGenericSms(complaint);
                    } else {
                        smsService.SendDirectSMS(message, response.response.PHONE);
                    }
                });
            } else {
                SendGenericSms(complaint);
            }
        });
    } else {
        SendGenericSms(complaint);
    }
};

var SendGenericSms = function (complaint) {
    var ss = new SuzeService();
    ss.GetCompanyById(complaint.companyId, function (response) {
        if (response.success) {
            smsService.SendSMS("Your complaint against " + response.response.companyName + " has been created.", complaint.accountId);
        } else {
            smsService.SendSMS("Your complaint has been created.", complaint.accountId);
        }
    });
};

var MessageParser = function (str, callback) {
    var space = " ";

    var words = str.split(space);

    var validWords = [];

    words.forEach(function (element, index) {
        if (element === "") {
            validWords.push(words[index + 1].replace(/[^a-z]/g, ""))
        }
    });

    callback(validWords.join(space));
};

app.post('/login', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var ss = new SuzeService();
    console.log(req)
    ss.GetAccountByEmailAndPassword(req.body.email, req.body.password, function (response) {
        if (response.success) {
            req.session.user = response.response;
            res.send({
                "success": true,
                "message": req.session.user
            });
        } else {
            res.send({
                "success": false,
                "message": "Issue with the service request: " + response.response
            });
        }
    });
});

app.post('/register', function (req, res) {
    var ss = new SuzeService();

    ss.GetAccountByEmailAndPassword(req.body.email, req.body.password, function (response) {
        if (response.success) {
            res.send({
                "success": false,
                "message": "Account already exists."
            });
        } else {
            var account = new Account(
                0,
                req.body.password,
                req.body.title,
                req.body.firstName,
                req.body.surname,
                req.body.email,
                req.body.mobilePhone
            );

            var ss2 = new SuzeService();
            ss2.AddAccount(account, function (response) {
                if (response.success) {
                    res.send({
                        "success": true,
                        "message": ""
                    });
                } else {
                    res.send({
                        "success": false,
                        "message": "Issue with the service request: " + response.response
                    });
                }
            });
        }
    });
});

app.get('/test', function (req, res) {
    var ss = new SuzeService();

    ss.GetAccountByEmail("test@testington.com", function (response) {
        console.log("Main.js: got response from SS:");
        console.log(response);
        res.send("done");
    });
});

app.post('/testSMS', function (req, res) {
    var ss = new SMSService();

    ss.SendSMS(req.body.message, req.body.accountId);
    res.send("done");
});

app.post('/logout', function (req, res) {
    req.session.destroy();
    res.send({
        "success": true,
        "message": ""
    });

});

var server = app.listen(port, function () {
    console.log('Listening on port ' + port + '.');
});
