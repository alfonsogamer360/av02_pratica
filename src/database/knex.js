import KnexConfig  from "knex";
import "dotenv/config"

export const knex = KnexConfig({
    client: "pg",
    connection: {},
    debug: true
})