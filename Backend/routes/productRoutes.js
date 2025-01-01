const express = require('express');

const { createConnection } = require('../Connection/createConnection'); // Import the database connection
const router = express.Router();

// POST - Add a new product
router.post('/', (req, res) => {
    const { ProductName, CategoryId } = req.body;

    if (!ProductName || !CategoryId) {
        return res.status(400).json({ error: 'ProductName and CategoryId are required' });
    }

    const query = 'INSERT INTO Product (ProductName, CategoryId) VALUES (?, ?)';
    db.query(query, [ProductName, CategoryId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Product added', productId: result.insertId });
    });
});

// GET - Fetch all products
router.get('/', (req, res) => {
    const query = `
        SELECT Product.ProductId, Product.ProductName, Category.CategoryName, Product.CategoryId
        FROM Product
        INNER JOIN Category ON Product.CategoryId = Category.CategoryId
    `;
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
});

// PUT - Update a product
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { ProductName, CategoryId } = req.body;

    const query = 'UPDATE Product SET ProductName = ?, CategoryId = ? WHERE ProductId = ?';
    db.query(query, [ProductName, CategoryId, id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Product updated' });
    });
});

// DELETE - Delete a product
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM Product WHERE ProductId = ?';
    db.query(query, [id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Product deleted' });
    });
});

// GET - Paginated list of products
router.get('/paginated', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const offset = (page - 1) * pageSize;

    const query = `
        SELECT Product.ProductId, Product.ProductName, Product.CategoryId, Category.CategoryName
        FROM Product
        INNER JOIN Category ON Product.CategoryId = Category.CategoryId
        LIMIT ? OFFSET ?
    `;
    db.query(query, [pageSize, offset], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
});

module.exports = router;
