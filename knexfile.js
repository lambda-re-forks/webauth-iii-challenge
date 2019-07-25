require("dotenv").config();

const dbConnection = process.env.DATABASE_URL || {
  database: "anything",
  user: "user",
  password: "pass"
};

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/webauth_iii.sqlite3"
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done); // enforce FK
      }
    }
  },
  production: {
    client: "pg",
    connection: dbConnection,
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  }
};
