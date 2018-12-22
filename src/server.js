// require("rootpath")();

const express = require("express");
const cors = require("cors");
const errorHandler = require("./helpers/error-handlers");
const db = require("./helpers/db");
const VisaInfoController = require("./visaInfo/visaInfo.controller");

const app = express();

app.use(cors());

app.use("/", VisaInfoController);

// global error handler
app.use(errorHandler);

db.connect(error => {
  if (error) throw error;
  console.log("MySQL database connected");
});
//Start server
const port = process.env.PORT || 4000;
const server = app.listen(port, function() {
  console.log("Server listening on port " + port);
});

module.exports = {
  server: server,
  app: app
};
