const express = require("express");
const router = express.Router();
const visaInfoService = require("./visaInfo.service");
const queryDB = require("../helpers/db");

// Routes
router.get("/", getNationalities);
router.get("/:nationality", getByNationality);
router.get("/:nationality/:country", getByNatAndCountry);

// Get a list of nationalities available in DB.
function getNationalities(req, res, next) {
  visaInfoService
    .getNationalities()
    .then(info => {
      // Check if info exists and db didn't return []
      if (info && info.length !== 0) {
        res.send({
          status: 200,
          nationality_list: info
        });
      } else {
        // Handle error
        next({
          name: "Not Found",
          message: `List of nationalities was not found`
        });
      }
    })
    .catch(err => next(err));
}

// Get all visa info associated to a nationality
function getByNationality(req, res, next) {
  visaInfoService
    .getByNationality(req.params.nationality)
    .then(info => {
      // Check if info exists and db didn't return []
      if (info && info.length !== 0) {
        res.send({
          status: 200,
          data: {
            nationality: req.params.nationality,
            countries: info
          }
        });
      } else {
        // Handle error
        next({
          name: "Not Found",
          message: `Visa info for ${req.params.nationality} not found.`
        });
      }
    })
    .catch(err => next(err));
}

// Get all visa info associated to a nationality and one country
function getByNatAndCountry(req, res, next) {
  visaInfoService
    .getByNatAndCountry(req.params.nationality, req.params.country)
    .then(info => {
      // Check if info exists and db didn't return []
      if (info && info.length !== 0) {
        res.send({
          status: 200,
          data: info[0]
        });
      } else {
        // Handle error
        next({
          name: "Not Found",
          message: `Visa info for ${req.params.nationality} with ${
            req.params.country
          } not found.`
        });
      }
    })
    .catch(err => next(err));
}

module.exports = router;
