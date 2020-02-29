let mysql = require('mysql');

let dbConData = {
  host     : process.env.FIB_DB_HOST,
  port     : process.env.FIB_DB_PORT,
  user     : process.env.FIB_DB_USER,
  password : process.env.FIB_DB_PASSWORD,
  database : process.env.FIB_DB_NAME
}

function connectToDb() {
  let connection = mysql.createConnection(dbConData);
  connection.connect(function(err) {
    if (err) {
      console.error('Error connecting: ' + err.stack);
      return;
    }
    console.log('Connected as id ' + connection.threadId);
  });
  return connection;
}

function initTable() {
  let connection = connectToDb();

  const initQuery = 'CREATE TABLE IF NOT EXISTS `log_table` (`id` INT AUTO_INCREMENT PRIMARY KEY, `ip` VARCHAR(255) NOT NULL, `memb` BIGINT NOT NULL, `numb` BIGINT NOT NULL, `ts` TIMESTAMP DEFAULT CURRENT_TIMESTAMP);';

  connection.query(initQuery,
    function (error, results, fields) {
      if (error) throw error;
      console.log('Table exists!');
    });
  connection.end();
}


function insertIntoTable(ip, memb, numb) {
  let connection = connectToDb();

  const insertQuery = 'INSERT INTO `log_table` (`ip`, `memb`, `numb`) VALUES(?, ?, ?);';

  connection.query(insertQuery,
    [ip, Number(memb), Number(numb)],
    function (error, results, fields) {
      if (error) throw error;
      console.log('Data inserted', results);
    });
  connection.end();
}


function selectFromTable(ip, days, callback) {
  let connection = connectToDb();

  const selectQuery = 'SELECT * FROM `log_table` WHERE `ip` = ? AND `ts` > curdate()-?;';

  connection.query(selectQuery, [ip, days],
    function getRecords(error, results, fields) {
      if (error) {
        console.error(error);
      } else {
        console.log('Data data retrived:');
        return callback(results);
      }
    });
  connection.end();
}


module.exports = {
  initTable,
  insertIntoTable,
  selectFromTable
}
