const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "Welcome1",
    host: "localhost",
    port: 5432,
    database: "nexen"
});

pool.connect()
    .then(() => console.log("✅ Database connected successfully"))
    .catch((err) => console.error("❌ Database connection error:", err));

module.exports = pool;