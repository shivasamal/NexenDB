const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "Welcome1",
    host: "localhost",
    port: 5432,
    database: "slnst_database"
});

// const pool = new Pool({
//      user: "arkhyate_admin",
//      password: "xORrTg{4S^[5",
//      host: "50.116.88.219",
//      port: 5432,
//     database: "arkhyate_slnst"
// });

module.exports = pool;