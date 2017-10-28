
var SuzeService = require('./Services/SuzeService');
var Account = require('./Objects/Account');
var express = require('express');
var session = require('client-sessions');

var app = express();

app.use(express.static('website'));

app.use(session({
  cookieName: 'session',
  secret: 'complaintsmadeeasy',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));

app.post('/MakeComplaint', function (req, res) {
 //TODO  
});

app.post('/login', function(req, res) {
  User.findOne({ email: req.body.email }, function(err, user) {
    if (!user) {
        req.session.reset();
        //return login failure.
    } else {
      if (req.body.password === user.password) {
        req.session.user = user;
        //return logged in success and session token.
          res.locals.user = user;
      } else {
          req.session.reset();
        //return login failure .
      }
    }
  });
});


app.post('/register', function(req, res) {
 //TODO  
});

app.get('/test', function(req, res) {
	var ss = new SuzeService();
        
    ss.GetAccountByEmail("test@testington.com", function(response){
        console.log("Main.js: got response from SS:");      
        console.log(response);
    });
});

app.post('/logout', function(req, res) {
 req.session.reset(); 
});

var server = app.listen(4000, function () {
	var host = "localhost"
	var port = server.address().port;
});

