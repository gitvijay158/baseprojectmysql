var dbConn = require('../config/mysqldb.js');




exports.getServerLogDetails = async function (req, res){

    dbConn.query('SELECT * FROM user', function (error, results, fields) {
        if (error) throw error;
        res.status(200).send(results);
    });
    
}

export.getRoleDetails = async function (req, res)    {
    dbConn.query('SELECT * FROM role', function (error, results, fields) {
        if (error) throw error;
        res.status(200).send(results);
    });
}

