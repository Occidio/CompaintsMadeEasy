var sql = require('mssql');

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

        var responseSet = dbResponse.response.recordset;

        if (responseSet.length == 0) {
            callback({
                "success": false
            });
        } else if (responseSet.length != 1) {
            callback({
                "success": false
            });
        } else {
            callback({
                "success": true,
                "account": dbResponse.response.recordset[0]
            });
        }
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
