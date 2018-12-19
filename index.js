const sqlite3 = require("sqlite3");

let db = new sqlite3.Database("./db/visa_db.db", err => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the visa database.");
});

db.serialize(() => {
  db.each(
    `SELECT nationality
    FROM data`,
    (err, row) => {
      if (err) {
        console.error(err.message);
      }
      console.log(row);
    }
  );
});

// close the database connection
db.close(err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Close the database connection.");
});
