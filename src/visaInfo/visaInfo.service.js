const pool = require("../helpers/db");

function getNationalities() {
  const sqlQuery = `
  SELECT nationality 
  FROM nationalities`;

  const getInfoPromise = new Promise((resolve, reject) => {
    pool.query(sqlQuery, (error, info) => {
      if (error) reject(error);
      let infoWithoutColumn = [];
      // Remove column name from list
      for (let i = 0; i < info.length; i++) {
        infoWithoutColumn.push(info[i].nationality);
      }
      resolve(infoWithoutColumn);
    });
  });

  return getInfoPromise;
}

function getByNationality(nationality = "") {
  const sqlQuery = `
  SELECT country, visatype, duration, note 
  FROM restrictions 
  WHERE nationality = '${nationality}'`;

  const sqlStats = `
  SELECT visaType, COUNT(*) as count 
  FROM restrictions 
  WHERE nationality = '${nationality}'  
  GROUP BY \`visaType\`  
  ORDER BY count DESC
  `;

  const getInfoPromise = new Promise((resolve, reject) => {
    pool.query(sqlQuery, (error, info) => {
      if (error) reject(error);
      pool.query(sqlStats, (error, stats) => {
        if (error) reject(error);
        resolve({ info, stats });
      });
    });
  });

  return getInfoPromise;
}

async function getByNatAndCountry(nationality = "", country = "") {
  const sqlQuery = `
    SELECT nationality, country, visatype, duration, note 
    FROM restrictions 
    WHERE nationality = '${nationality}'
    AND country = '${country}'`;

  const getInfoPromise = new Promise((resolve, reject) => {
    pool.query(sqlQuery, (error, info) => {
      if (error) reject(error);
      resolve(info);
    });
  });

  return getInfoPromise;
}

module.exports = {
  getNationalities,
  getByNationality,
  getByNatAndCountry
};
