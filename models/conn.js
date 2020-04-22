const pgp = require('pg-promise')({
  query: (e) => {
    console.log('QUERY:', e.query);
  },
});

const options = {
  host: 'drona.db.elephantsql.com',
  database: 'iyzlkxgj',
  password: 'LgI9p9cZQLBFpnoFWhtUG7VChSKnaY_1',
};

const db = pgp(options);

module.exports = db;
