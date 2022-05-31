import pg from "pg";

async function connect() {
    if (global.connection) {
        return global.connection.connect();
    }

    const pool = new pg.Pool({
        connectionString:
            "postgres://ygoujsbe:sEjzAVLzvXHvPRbanv5QAxAZ3PWSR9EM@fanny.db.elephantsql.com/ygoujsbe",
    });
    global.connection = pool;

    return pool.connect();
}

export { connect };
