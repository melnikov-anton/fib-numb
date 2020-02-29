const mysql = require('mysql');

const dbConData = {
  host: process.env.FIB_DB_HOST,
  port: process.env.FIB_DB_PORT,
  user: process.env.FIB_DB_USER,
  password: process.env.FIB_DB_PASSWORD,
  database: process.env.FIB_DB_NAME,
};

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
