let mysql = require('mysql');

let dbConData = {
  host     : 'localhost',
  user     : 'fibonacci',
  password : '011235',
  database : 'fibonacci_db'
}


function initTable() {
  let connection = mysql.createConnection(dbConData);
  connection.connect();

  const initQuery = 'CREATE TABLE IF NOT EXISTS `log_table` (`id` INT AUTO_INCREMENT PRIMARY KEY, `ip` VARCHAR(255) NOT NULL, `memb` BIGINT NOT NULL, `numb` BIGINT NOT NULL, `ts` TIMESTAMP DEFAULT CURRENT_TIMESTAMP);';

  connection.query(initQuery,
    function (error, results, fields) {
      if (error) throw error;
      console.log('Table exists!');
    });
  connection.end();
}

function insertIntoTable(ip, memb, numb) {
  let connection = mysql.createConnection(dbConData);
  connection.connect();

  const insertQuery = 'INSERT INTO `log_table` (`ip`, `memb`, `numb`) VALUES(?, ?, ?);';

  connection.query(insertQuery,
    [ip, Number(memb), Number(numb)],
    function (error, results, fields) {
      if (error) throw error;
      console.log('Data inserted', results);
    });
  connection.end();
}

function selectFromTable(ip, callback) {
  let connection = mysql.createConnection(dbConData);
  connection.connect();

  const selectQuery = 'SELECT * FROM `log_table` WHERE `ip` = ?;';

  connection.query(selectQuery, [ip],
    function getRecords(error, results, fields) {
      if (error) {
        throw error;
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
