// Update with your config settings.
const localPgConnection = {
  host: 'localhost',
  database: 'my_db',
  user: 'username',
  password: 'password'
}

const dbConnection = process.env.DATABASE_URL || localPgConnection
module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/dailyjournal.db3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },


  production: {
    client: 'postgresql',
    connection: dbConnection
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    directory: './data/migrations',
    tableName: 'dbmigrations'
  },
  seeds: {
    directory: './data/seeds'
  }
}

