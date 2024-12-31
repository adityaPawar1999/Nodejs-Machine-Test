const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();
const { createConnection } = require('./Connection/createConnection');


const app = express();
const port = process.env.PORT || 3000; 
app.use(bodyParser.json());
app.use(cors());



createConnection.getConnection((err) => {
    if (err) {
      console.error('Database connection failed:', err);
    } else {
      console.log('Connected to MySQL database. :>');
    }
  });


app.post('/data' ,(req,res)=>{
    res.send("yes its working")
})
app.listen(port,()=>{
    console.log('port working on', port)
})

