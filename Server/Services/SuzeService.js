var sql = require('mssql');
var Account = require('../Objects/Account');
var Company = require('../Objects/Company');

var dbConfig = {
    server: 'ec2-52-211-119-222.eu-west-1.compute.amazonaws.com',
    database: 'MPP_TEAM_CME',
    user: 'MPP2',
    password: 'm]Hvz`:(p?N2Ct47'
};

var method = SuzeService.prototype;

function SuzeService() {

};

//ACCOUNT

method.GetAccountByEmailAndPassword = function(emailAddress, password, callback) {

    var query = "EXEC getAccountByEmail";
    query += " @email='" + emailAddress + "'";
    query += ", @password='" + password + "'";

    executeQuery(query, function(dbResponse) {

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
                "response": new Account(
                    returnedAccount.ACCOUNT_ID,
                    returnedAccount.PASSWORD,
                    returnedAccount.TITLE,
                    returnedAccount.FIRST_NAME,
                    returnedAccount.SURNAME,
                    returnedAccount.EMAIL,
                    returnedAccount.MOBILE_NUMBER)
            });
        }
    });
};

method.GetAccountByAccountId = function(accountId, callback) {

    var query = "EXEC getAccountByAccountId";
    query += " @accountId='" + accountId + "'";

    executeQuery(query, function(dbResponse) {

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
                "response": new Account(
                    returnedAccount.ACCOUNT_ID,
                    returnedAccount.PASSWORD,
                    returnedAccount.TITLE,
                    returnedAccount.FIRST_NAME,
                    returnedAccount.SURNAME,
                    returnedAccount.EMAIL,
                    returnedAccount.MOBILE_NUMBER)
            });
        }
    });
};

method.AddAccount = function(account, callback) {

    var query = "EXEC addAccount";
    query += " @email='" + account.email + "'";
    query += ", @title ='" + account.title + "'";
    query += ", @firstName='" + account.firstName + "'";
    query += ", @surname='" + account.surname + "'";
    query += ", @mobilePhone='" + account.mobilePhone + "'";
    query += ", @password='" + account.password + "'";

    executeQuery(query, function(dbResponse) {
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

//COMPANY

method.GetCompanyByName = function(companyName, callback) {
    var query = "EXEC getCompanySearch";
    query += " @companyName  ='" + companyName + "'";

    executeQuery(query, function(dbResponse) {
        if (!dbResponse.success) {
            callback({
                "success": false,
                "response": "Error returned from DB."
            });
        }

        var responseSet = dbResponse.response.recordset[0];

        callback({
            "success": true,
            "response": new Company(responseSet.COMPANYID, responseSet.COMPANY_NAME)
        });
    });
};

//COMPLAINT

method.AddComplaint = function(complaint, callback) {
    var query = "EXEC addComplaint";
    query += " @accountId ='" + complaint.accountId + "'";
    query += ", @companyId='" + complaint.companyId + "'";
    query += ", @complaintReason ='" + complaint.reason + "'";
    query += ", @complaintDetails ='" + complaint.details + "'";

    executeQuery(query, function(dbResponse) {
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
    sql.connect(dbConfig, function(err) {
        if (err) {
            console.log("SS : Error connecting to DB");
            console.log(err);

            sql.close();
            callback({
                "success": false
            });
        } else {
            var request = new sql.Request();
            request.query(query, function(err, recordset) {
                if (err) {
                    console.log("SS : Error executing query on DB");
                    console.log(err);

                    sql.close();
                    callback({
                        "success": false
                    });
                } else {
                    sql.close();
                    callback({
                        "success": true,
                        "response": recordset
                    });
                }
            });
        }
    });
};

module.exports = SuzeService;