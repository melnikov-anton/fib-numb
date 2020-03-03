/**
 *DB Driver module
 * @module DB Driver
 * @author Anton Melnikov
 */

/**
 *
 */
const mysql = require('mysql');

/**
 * MySQL config object
 */
const dbConData = {
  host: process.env.FIB_DB_HOST,
  port: process.env.FIB_DB_PORT,
  user: process.env.FIB_DB_USER,
  password: process.env.FIB_DB_PASSWORD,
  database: process.env.FIB_DB_NAME,
};

/**
 * connectToDb - Establishes connection to MySQL server
 *
 * @returns {object}  - Connection object
 */
function connectToDb() {
  const connection = mysql.createConnection(dbConData);
  connection.connect((err) => {
    if (err) {
      console.error(`Error connecting: ${err.stack}`);
      return;
    }
    console.log(`Connected as id ${connection.threadId}`);
  });
  return connection;
}

/**
 * initTable - Create table in DB if not exists
 *
 * @returns {void}
 */
function initTable() {
  const connection = connectToDb();

  const initQuery = 'CREATE TABLE IF NOT EXISTS `log_table` (`id` INT AUTO_INCREMENT PRIMARY KEY, `ip` VARCHAR(255) NOT NULL, `memb` BIGINT NOT NULL, `numb` BIGINT NOT NULL, `ts` TIMESTAMP DEFAULT CURRENT_TIMESTAMP);';

  connection.query(initQuery,
    (error, results, fields) => {
      if (error) throw error;
      console.log('Table exists!');
    });
  connection.end();
}


/**
 * insertIntoTable - Writes record into table (log)
 *
 * @param  {string} ip   - IP address
 * @param  {number} memb - member of Fibonacci sequence
 * @param  {number} numb - Fibonacci number
 *
 */
function insertIntoTable(ip, memb, numb) {
  const connection = connectToDb();

  const insertQuery = 'INSERT INTO `log_table` (`ip`, `memb`, `numb`) VALUES(?, ?, ?);';

  connection.query(insertQuery,
    [ip, Number(memb), Number(numb)],
    (error, results, fields) => {
      if (error) throw error;
      console.log('Data inserted', results);
    });
  connection.end();
}


/**
 * selectFromTable - Retrieves logs from DB
 *
 * @param  {string} ip       - IP address
 * @param  {number} days     - amount of days
 * @param  {function} callback - callback function to get results
 * @returns {array}          - Array of records for requested IP
 */
function selectFromTable(ip, days, callback) {
  const connection = connectToDb();

  const selectQuery = 'SELECT * FROM `log_table` WHERE `ip` = ? AND `ts` > curdate() - INTERVAL ? DAY;';

  connection.query(selectQuery, [ip, days],
    (error, results, fields) => {
      if (error) {
        console.error(error);
      } else {
        console.log('Data retrived:');
      }
      return callback(results);
    });
  connection.end();
}


module.exports = {
  initTable,
  insertIntoTable,
  selectFromTable,
};
