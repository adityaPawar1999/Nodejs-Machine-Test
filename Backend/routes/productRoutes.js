const express = require('express');

const { createConnection } = require('../Connection/createConnection'); 
const router = express.Router();

router.post('/', (req, res) => {
    const { ProductName, CategoryId } = req.body;

    if (!ProductName || !CategoryId) {
        return res.status(400).json({ error: 'ProductName and CategoryId are required' });
    }

    const query = 'INSERT INTO Product (name, CategoryID) VALUES (?, ?)';
    createConnection.query(query, [ProductName, CategoryId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Product added', productId: result.insertId });
    });
});


router.get('/', (req, res) => {
    const query = `
        SELECT Product.id, product.name, categories.CAtegoryName, product.id
        FROM Product
        INNER JOIN categories ON product.CategoryID = categories.id
    `;
    createConnection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
});



router.put('/:id', (req, res) => {
    const { id } = req.params;
    
    const { ProductName, CategoryId } = req.body;

    const query = 'UPDATE Product SET name = ?, CategoryID = ? WHERE id = ?';
    createConnection.query(query, [ProductName, CategoryId, id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Product updated' });
    });
});


router.delete('/:id', (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM Product WHERE id = ?';
    createConnection.query(query, [id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Product deleted' });
    });
});


router.get('/paginated', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const offset = (page - 1) * pageSize;

    const query = `
        SELECT Product.id, Product.name, Product.CategoryID, categories.CategoryName
        FROM Product
        INNER JOIN categories ON Product.CategoryID = categories.ID
        LIMIT ? OFFSET ?
    `;
    createConnection.query(query, [pageSize, offset], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
});

module.exports = router;
