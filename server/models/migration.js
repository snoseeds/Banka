const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: 'postgres://yfcpxsfk:76dAtofVjZk9lWBDaTt-ou_C2Ks6xLYA@manny.db.elephantsql.com:5432/yfcpxsfk',
});


pool.on('connect', () => {
  // eslint-disable-next-line no-console
  console.log('connected to the db');
});

const createTables = () => {
  const sql = `
  DROP TABLE IF EXISTS Users;
  
  CREATE TABLE Users(
      id SERIAL PRIMARY KEY,
      email VARCHAR(128) UNIQUE NOT NULL,
      firstname VARCHAR(128) NOT NULL,
      lastname VARCHAR(128) NOT NULL,
      password VARCHAR(128) NOT NULL,
      type VARCHAR(128) NOT NULL,
      isAdmin BOOLEAN,
      registered DATE NOT NULL
  );
  `;
  pool.query(sql)
    .then((res) => {
      // eslint-disable-next-line no-console
      console.log('table created', res);
      pool.end();
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log('error', err);
      pool.end();
    });
};
// export default { pool };

// export default createTables;

module.exports = {
  createTables,
};

// eslint-disable-next-line import/no-extraneous-dependencies
require('make-runnable');
