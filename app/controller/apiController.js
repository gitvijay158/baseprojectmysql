var dbConn = require('../config/mysqldb.js');




exports.getServerLogDetails = async function (req, res){

    dbConn.query('SELECT * FROM user', function (error, results, fields) {
        if (error) throw error;
        res.status(200).send(results);
    });
    
}

exports.getRoleDetails = async function (req, res)    {
    dbConn.query('SELECT * FROM role limit 1', function (error, results, fields) {
        if (error) throw error;
        res.status(200).send(results);
    });
}


exports.getProfile = async function (req, res)    {
    dbConn.query('SELECT * FROM profile', function (error, results, fields) {
        if (error) throw error;
        res.status(200).send(results);
    });
}

exports.getSchool = async function (req, res)    {
    dbConn.query('SELECT * FROM school limit 1', function (error, results, fields) {
        if (error) throw error;
        res.status(200).send(results);
    });
}


