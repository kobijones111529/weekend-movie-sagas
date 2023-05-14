const pg = require('pg')

let pool

if (process.env.DATABASE_URL) {
  // When our app is deployed to the internet
  // we'll use the DATABASE_URL environment variable
  // to set the connection info: web address, username/password, db name
  // eg:
  //  DATABASE_URL=postgresql://jDoe354:secretPw123@some.db.com/prime_app
  pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  })
} else {
  // When we're running this app on our own computer
  // we'll connect to the postgres database that is
  // also running on our computer (localhost)
  pool = new pg.Pool({
    host: 'localhost',
    port: 5432,
    database: 'saga_movies_weekend'
  })
}

module.exports = pool
