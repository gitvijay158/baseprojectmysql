
 const mysql = require('mysql');


const {
  MYSQL_DB_USER,
  MYSQL_DB_PASSWORD,
  MYSQL_DB_HOST,
  MYSQL_DB_PORT,
  MYSQL_DB_NAME,
} = process.env;

// //local mysql db connection
const dbConn = mysql.createConnection({
  connectionLimit: 10,
  host     : MYSQL_DB_HOST,
  user     : MYSQL_DB_USER,
  password : MYSQL_DB_PASSWORD,
  database : MYSQL_DB_NAME,
  timezone: 'utc' 

});
dbConn.connect(function(err) {
  if (err) throw err;
  console.log("My SQL Database Connected!");
});
module.exports = dbConn;



// var mysql = require('mysql');
// connection.getConnection(function (err, conn) {
//     if (err) throw err;

//     conn.release();

// });