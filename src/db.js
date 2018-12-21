const sql = `SELECT T1.*
FROM data T1
WHERE NOT EXISTS(
   SELECT 'NEXT'
   FROM data T2
   WHERE T2.nationality = T1.nationality
   AND T2.nationality > T1.nationality
)`;

const mysql = require("mysql");
require("dotenv").config();

const con = mysql.createConnection({
  host: process.env.DB_host,
  user: process.env.DB_user,
  password: process.env.DB_pass,
  database: "visainfo"
});

con.connect(err => {
  if (err) throw err;
  console.log("Connected!");

  con.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
  });
});
