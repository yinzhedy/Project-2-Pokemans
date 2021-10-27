const util = require('util');
const mysql = require('mysql');
/**
 * Connection to the database.
 *  */
const connection = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root', // use your mysql username.
    password: 'MySqlPassword01516170!!?', // user your mysql password.
    database: 'pokemans'
});

connection.getConnection((err, connection) => {
    if(err) 
        console.error("Something went wrong connecting to the database ...");
    
    if(connection)
        connection.release();
    return;
});

connection.query = util.promisify(connection.query);

module.exports = connection;
