var sql = require('mssql');
var Account = require('../Objects/Account');
var Company = require('../Objects/Company');

var dbConfig = {
    server: 'ec2-52-211-119-222.eu-west-1.compute.amazonaws.com',
    database: 'MPP_TEAM_CME',
    user: 'MPP2',
    password: 'm]Hvz`:(p?N2Ct47',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
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

<<<<<<< HEAD
method.GetCompanyByName = function (companyName, callback) {
=======
method.GetCompanyByName = function(companyName, callback) {
>>>>>>> 925fc43fc88e9b68a9ac78bc0d4c6251b7222a71
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


method.GetCompanyById = function (companyId, callback) {
    var query = "EXEC getCompanyById";
    query += " @companyId  ='" + companyId + "'";

    executeQuery(query, function (dbResponse) {
        if (!dbResponse.success) {
            callback({
                "success": false,
                "response": "Error returned from DB."
            });
        } else {

            var responseSet = dbResponse.response.recordset[0];

            callback({
                "success": true,
                "response": new Company(responseSet.COMPANYID, responseSet.COMPANY_NAME)
            });
        }

    });
};

//COMPLAINT

<<<<<<< HEAD
method.MakeComplaint = function (complaint, callback) {
=======
method.AddComplaint = function(complaint, callback) {
>>>>>>> 925fc43fc88e9b68a9ac78bc0d4c6251b7222a71
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
        } else {
            callback({
                "success": true
            });
        }
    });
};

//POLICE

method.GetPoliceNumberByAccountId = function (accountId, callback) {
    var query = "EXEC getPoliceByAccountId";
    query += " @accountId  ='" + accountId + "'";

    executeQuery(query, function (dbResponse) {
        if (!dbResponse.success) {
            callback({
                "success": false,
                "response": "Error returned from DB."
            });
        }

        var responseSet = dbResponse.response.recordset;

        if (responseSet.length != 1) {
            callback({
                "success": false,
                "response": "No phone number found."
            });
        } else {
            callback({
                "success": true,
                "response": responseSet[0]
            });
        }

    });
};

function executeQuery(query, callback) {
<<<<<<< HEAD
 const pool = new sql.ConnectionPool(dbConfig).connect(function (err) {
=======
    sql.connect(dbConfig, function(err) {
>>>>>>> 925fc43fc88e9b68a9ac78bc0d4c6251b7222a71
        if (err) {
            console.log("SS : Error connecting to DB");
            console.log(err);

            sql.close();
            callback({
                "success": false
            });
<<<<<<< HEAD
        }

        var request = new sql.Request(pool);
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
=======
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
>>>>>>> 925fc43fc88e9b68a9ac78bc0d4c6251b7222a71
            });
        }
    });
};

module.exports = SuzeService;