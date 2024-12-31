const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();
const app = express();

const port = process.env.PORT || 3000; 

app.post('/data' ,(req,res)=>{
    res.send("yes its working")
})
app.listen(port,()=>{
    console.log('port working on', port)
})