import KnexConfig from "knex";
import "dotenv/config"

export const knex = KnexConfig({
    client: "pg",
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    },
    debug: true
})