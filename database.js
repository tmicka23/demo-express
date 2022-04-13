const { Client } = require('pg');

const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'demo_express_development',
});

client.connect()

module.exports = client