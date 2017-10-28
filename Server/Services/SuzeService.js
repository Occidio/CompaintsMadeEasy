var sql = require('mssql');
var Account = require('../Objects/Account');

var dbConfig = {
    server: 'ec2-52-211-119-222.eu-west-1.compute.amazonaws.com',
    database: 'MPP_TEAM_CME',
    user: 'MPP2',
    password: 'm]Hvz`:(p?N2Ct47'
};

var method = SuzeService.prototype;

function SuzeService() {

};

method.GetAccountByEmail = function (emailAddress, callback) {

    var query = "EXEC getAccountByEmail '" + emailAddress + "'"

    executeQuery(query, function (dbResponse) {

        if (!dbResponse.success) {
            callback({
                "success": false,
                "response": "Error returned from DB."
            });
        }

        var responseSet = dbResponse.response.recordset;

        if (responseSet.length == 0) {
            callback({
                "success": false,
                "response": "No Account found."
            });
        } else if (responseSet.length != 1) {
            callback({
                "success": false,
                "response": "Too many Accounts returned."
            });
        } else {

            var returnedAccount = responseSet[0];

            callback({
                "success": true,
                "response": new Account(returnedAccount.ACCOUNT_ID,
                    returnedAccount.TITLE,
                    returnedAccount.FIRST_NAME,
                    returnedAccount.SURNAME,
                    returnedAccount.EMAIL,
                    returnedAccount.MOBILE_NUMBER,
                    returnedAccount.HOME_NUMBER,
                    returnedAccount.HOUSE_NAME_NUMBER,
                    returnedAccount.STREET,
                    returnedAccount.CITY,
                    returnedAccount.COUNTY,
                    returnedAccount.POSTCODE)
            });
        }
    });
};

method.AddAccount = function (account, callback) {

    var query = "EXEC addAccount";
    query += " @email='" + account.email + "'";
    query += " @title ='" + account.title + "'";
    query += " @firstName='" + account.firstname + "'";
    query += " @surname='" + account.surname + "'";
    query += " @mobilePhone='" + account.mobilephone + "'";
    query += " @homePhone='" + account.homephone + "'";
    query += " @houseNameNumber='" + account.houseNameNumber + "'";
    query += " @street='" + account.street + "'";
    query += " @city='" + account.city + "'";
    query += " @county ='" + account.county + "'";
    query += " @postcode ='" + account.postcode + "'";

    executeQuery(query, function (dbResponse) {

        if (!dbResponse.success) {
            callback({
                "success": false,
                "response": "Error returned from DB."
            });
        }

        callback({
            "success": true
        });
    });
};

function executeQuery(query, callback) {
    sql.connect(dbConfig, function (err) {
        if (err) {
            console.log("SS : Error connecting to DB");
            console.log(err);

            callback({
                "success": false
            });
        }

        var request = new sql.Request();
        request.query(query, function (err, recordset) {
            if (err) {
                console.log("SS : Error executing query on DB");
                console.log(err);
                callback({
                    "success": false
                });
            }
            callback({
                "success": true,
                "response": recordset
            });
            sql.close();
        });
    });
};

module.exports = SuzeService;
