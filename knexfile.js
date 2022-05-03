// Update with your config settings.
const path = require("path");

const BASE_PATH = path.join(__dirname, "src", "server", "db");

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  test: {
    client: "pg",
    connection: "postgres://baxmay@localhost:5432/baxmay",
    migrations: {
      directory: path.join(BASE_PATH, "migrations"),
    },
    seeds: {
      directory: path.join(BASE_PATH, "seeds"),
    },
  },

  development: {
    client: "pg",
    connection:
      "postgres://persiko_user:O1JAJwV2wn8NBxVihHJjXxN9czNjRXI5@dpg-c9nqgfk6fj39a5o80u9g-a.singapore-postgres.render.com/persiko?ssl=true",
    migrations: {
      directory: path.join(BASE_PATH, "migrations"),
    },
    seeds: {
      directory: path.join(BASE_PATH, "seeds"),
    },
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
