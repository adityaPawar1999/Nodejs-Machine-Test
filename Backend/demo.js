
BACKEND
// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

// Initialize Express app
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Create a MySQL connection pool

// Test database connection
db.getConnection((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to MySQL database.');
  }
});

// Routes

// CRUD for Categories

// Create a new category
app.post('/categories', (req, res) => {
  const { CategoryName } = req.body;
  const query = 'INSERT INTO Category (CategoryName) VALUES (?)';
  db.query(query, [CategoryName], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Category added successfully.', categoryId: result.insertId });
  });
});

// Get all categories
app.get('/categories', (req, res) => {
  const query = 'SELECT * FROM Category';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
});

// Update a category
app.put('/categories/:id', (req, res) => {
  const { id } = req.params;
  const { CategoryName } = req.body;
  const query = 'UPDATE Category SET CategoryName = ? WHERE CategoryId = ?';
  db.query(query, [CategoryName, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: 'Category updated successfully.' });
  });
});

// Delete a category
app.delete('/categories/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM Category WHERE CategoryId = ?';
  db.query(query, [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: 'Category deleted successfully.' });
  });
});

// CRUD for Products

// Create a new product
app.post('/products', (req, res) => {
  const { ProductName, CategoryId } = req.body;
  const query = 'INSERT INTO Product (ProductName, CategoryId) VALUES (?, ?)';
  db.query(query, [ProductName, CategoryId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Product added successfully.', productId: result.insertId });
  });
});

// Get paginated products
app.get('/products', (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
  const offset = (page - 1) * pageSize;
  const query = `
    SELECT 
      Product.ProductId, Product.ProductName, Product.CategoryId, Category.CategoryName
    FROM Product 
    JOIN Category ON Product.CategoryId = Category.CategoryId 
    LIMIT ? OFFSET ?
  `;
  db.query(query, [parseInt(pageSize), parseInt(offset)], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
});

// Update a product
app.put('/products/:id', (req, res) => {
  const { id } = req.params;
  const { ProductName, CategoryId } = req.body;
  const query = 'UPDATE Product SET ProductName = ?, CategoryId = ? WHERE ProductId = ?';
  db.query(query, [ProductName, CategoryId, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: 'Product updated successfully.' });
  });
});

// Delete a product
app.delete('/products/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM Product WHERE ProductId = ?';
  db.query(query, [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: 'Product deleted successfully.' });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
