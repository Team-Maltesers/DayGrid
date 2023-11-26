const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  database: "daygrid",
  user: "root",
  password: "1234qwer",
});

module.exports = pool;
