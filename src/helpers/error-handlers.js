const { Request, Response, NextFunction } = require("express");

function errorHandler(err, req, res, next) {
  if (err.name === "Not Found") {
    return res.status(404).json({ error: err.name, message: err.message });
  }

  if (err.name === "ValidationError") {
    // mongoose validation error
    return res.status(400).json({ message: err.message });
  }

  if (err.name === "UnauthorizedError") {
    // jwt authentication error
    return res.status(401).json({ message: "Invalid Token" });
  }

  // default to 500 server error
  return res.status(500).json({ message: err.message });
}

module.exports = errorHandler;
