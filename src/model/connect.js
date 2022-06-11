const sql = require('mssql');
require('dotenv').config();

async function  connect() {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(process.env.DATABASE_URL).then(pool =>{
            return pool
        })
    } catch (err) {
        // ... error checks
        console.log("Connect error")
    }
}

module.exports = {connect};
