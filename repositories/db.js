import pg from "pg";
import fs from "fs";

const token = fs.readFileSync("access.db.txt", "utf8");

async function connect() {
    if (global.connection) {
        return global.connection.connect();
    }

    const pool = new pg.Pool({
        connectionString: token,
    });
    global.connection = pool;

    return pool.connect();
}

export { connect };
