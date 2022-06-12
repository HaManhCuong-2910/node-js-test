const sql = require('mssql');
require('dotenv').config();

const con = sql.connect(process.env.DATABASE_URL).then(pool =>{
    return pool
})

module.exports = con;
