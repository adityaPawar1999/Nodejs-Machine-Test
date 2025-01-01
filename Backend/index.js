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


//   app.post('/users', (req, res) => {
//     const {Email, PhoneNumber,Name} = req.body; 

//   if (!Name || !Email || !PhoneNumber) {
//       console.log('Validation failed');
//       return res.status(400).json({ error: 'All fields are required: name, email, phone.' });
//   } else {
//       console.log('Validation passed');
//   }

//   const query = 'INSERT INTO empdata ( Email, PhoneNumber,Name) VALUES (?,?,?)';
//   createConnection.query(query, [Email, PhoneNumber,Name], (err, result) => {
//       if (err) {
//           console.error('Database query error:', err.message); // Log DB errors
//           return res.status(500).json({ error: err.message });
//       }

//       console.log('Data inserted successfully:', result); // Log successful insertion
//       res.status(201).json({
//           message: 'User added successfully.',
//           userId: result.insertId
//       });
//   });
// });


// app.get('/getusers', (req, res) => {
//     const query = 'SELECT * FROM empdata'; // Fetch all users from the database
//     createConnection.query(query, (err, results) => {
//         if (err) {
//             console.error('Database query error:', err.message);
//             return res.status(500).json({ error: err.message });
//         }
//         res.status(200).json(results); // Send the list of users as JSON
//     });
// });

app.use((req, res) => {
  console.error(`Endpoint not found: ${req.method} ${req.url}`);
  res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(port,()=>{
    console.log('port working on', port)
})

