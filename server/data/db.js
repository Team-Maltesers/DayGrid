const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: "svc.sel4.cloudtype.app",
  port: 30205,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "DayGrid",
});

module.exports = pool;
