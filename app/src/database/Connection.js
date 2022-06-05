const mysql = require('mysql2');

/** @type {mysql.Connection} */
let connection = null;

const config = {
    host: "localhost",
    user: "root",
    database: "individual",
    password: "1234",
};
/**
 * @description Get connection with database
 * @return {mysql.Connection} 
 */
function getConnection() {
    if (connection == null) {
        connection = mysql.createConnection(config);
    }
    return connection;
}

module.exports = { getConnection };