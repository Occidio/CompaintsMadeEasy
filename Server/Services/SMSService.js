var clockwork = require('clockwork')({
    key: 'ba8e127c243f7a6c86b16ef8f9f9d61ec58783b2'
});
var SuzeService = require('./SuzeService');

function SMSService() {

};

SMSService.prototype.SendSMS = function (message, accountId) {
    var ss = new SuzeService();

    ss.GetAccountByAccountId(accountId, function (response) {
        if (response.success) {
            clockwork.sendSms({
                To: response.response.mobilePhone,
                Content: message
            }, function (error, resp) {
                if (error) {
                    console.log('Could not send SMS: ' + error);
                } else {
                    console.log('SMS sent to', resp.responses[0].to);
                    console.log('MessageID was', resp.responses[0].id);
                }
            });
        } else {
            return {
                "success": false,
                "message": "Issue with the service request: " + response.message
            };
        }
    })
};

SMSService.prototype.SendDirectSMS = function (message, number) {
    console.log(message);
        console.log(number);

    clockwork.sendSms({
        To: number,
        Content: message
    }, function (error, resp) {
        if (error) {
            console.log('Could not send SMS: ' + error);
        } else {
            console.log('SMS sent to', resp.responses[0].to);
            console.log('MessageID was', resp.responses[0].id);
        }
    });
};

module.exports = SMSService;
