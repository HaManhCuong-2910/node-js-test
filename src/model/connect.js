var sql = require('mssql/msnodesqlv8');

const config = {
    user: 'sa',
    password: '123456',
    server: 'DESKTOP-N9QUQNH',
    database: 'FuijtShop',
    driver: 'msnodesqlv8'
};

const conn = new sql.ConnectionPool(config).connect().then((pool)=>{
    return pool;
})

module.exports = {
    con: conn,
    sql: sql
} 
