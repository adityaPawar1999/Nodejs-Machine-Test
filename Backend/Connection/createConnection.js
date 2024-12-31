const mysql = require('mysql2');
const createConnection = mysql.createPool({
    host: 'localhost',
    user: 'root', // Replace with your MySQL username
    password: '', // Replace with your MySQL password
    database: 'product_management',
  });
module.exports={createConnection}
