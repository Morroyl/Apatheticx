const sql = require('mssql/msnodesqlv8');

const config = {
    server: process.env.DB_SERVER || 'DESKTOP-V04FSB9\\SQLEXPRESS',
    database: process.env.DB_DATABASE || 'WarehouseRental',
    driver: 'ODBC Driver 17 for SQL Server',
    options: {
        trustedConnection: true,
        trustServerCertificate: true
    }
};

const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();

pool.on('error', err => {
    console.error('SQL Pool Error', err);
});

async function query(sqlQuery, params = {}) {
    await poolConnect;
    const request = pool.request();
    Object.keys(params).forEach(key => {
        request.input(key, params[key]);
    });
    const result = await request.query(sqlQuery);
    return result.recordset;
}

module.exports = { query, sql, poolConnect };