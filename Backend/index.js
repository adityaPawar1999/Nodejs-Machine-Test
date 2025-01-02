const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();
const { createConnection } = require('./Connection/createConnection');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');


const app = express();
const port = process.env.PORT || 3000; 
app.use(bodyParser.json());
app.use(cors());


createConnection.getConnection((err) => {
    if (err) {
      console.error('Database connection failed:', err);
    } else {
      console.log('Connected to MySQL database :>');
    }
  });

  app.use('/categories', categoryRoutes);
  app.use('/products', productRoutes);



app.use((req, res) => {
  console.error(`Endpoint not found: ${req.method} ${req.url}`);
  res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(port,()=>{
    console.log('port working on', port)
})


