const express = require("express");
const cors = require("cors");
const errorHandler = require("./helpers/error-handlers");
const VisaInfoController = require("./visaInfo/visaInfo.controller");

const app = express();

app.use(cors());

// Routes
app.use("/", VisaInfoController);

// Global error handler
app.use(errorHandler);

//Start server
const port = process.env.PORT || 4000;
const server = app.listen(port, function() {
  console.log("Server listening on port " + port);
});

module.exports = {
  server: server,
  app: app
};
