const pool = require("../helpers/db");

function getStatistics() {
  const sqlQuery = `
  SELECT nationality,   
    max(case when type = 'visaNotRequired' then count end) as visaNotRequired,  
    max(case when type = 'visaRequired' then count end) as visaRequired  
      FROM (  
          
        SELECT nationality, COUNT(*) as count, 'visaNotRequired' as type  
        FROM restrictions   
        WHERE \`visaType\`  = 'Visa not required'   
        OR \`visaType\` = 'Freedom of movement'   
        OR \`visaType\` = 'Visa Waiver Program'    
        GROUP BY nationality    
        
        union all  
        
        SELECT nationality, COUNT(*) as count, 'visaRequired' as type  
        FROM restrictions   
        WHERE \`visaType\`  = 'Visa required'   
        OR \`visaType\`  = 'eVisa'   
        OR \`visaType\`  = 'e-Visa'   
        GROUP BY nationality    
        
      ) as t GROUP by nationality  
    ORDER BY visaNotRequired DESC;
  `;

  const getInfoPromise = new Promise((resolve, reject) => {
    pool.query(sqlQuery, (error, info) => {
      if (error) reject(error);
      // let infoWithoutColumn = [];
      // // Remove column name from list
      // for (let i = 0; i < info.length; i++) {
      //   infoWithoutColumn.push(info[i].nationality);
      // }
      resolve(info);
    });
  });

  return getInfoPromise;
}

function getNationalities() {
  const sqlQuery = `
  SELECT nationality FROM restrictions GROUP BY nationality`;

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

function getByNatAndCountry(nationality = "", country = "") {
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
  getStatistics,
  getNationalities,
  getByNationality,
  getByNatAndCountry
};
