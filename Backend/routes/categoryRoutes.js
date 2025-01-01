const express = require('express');
const { createConnection } = require('../Connection/createConnection');
const router = express.Router();

// POST - Add a new category
router.post('/', (req, res) => {
    const { CategoryName } = req.body;
    if (!CategoryName) {
        return res.status(400).json({ error: 'CategoryName is required' });
    }

    const query = 'INSERT INTO Category (CategoryName) VALUES (?)';
    createConnection.query(query, [CategoryName], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Category added', categoryId: result.insertId });
    });
});

// GET - Fetch all categories
router.get('/', (req, res) => {
    const query = 'SELECT * FROM Category';
    createConnection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
});

// PUT - Update a category
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { CategoryName } = req.body;

    const query = 'UPDATE Category SET CategoryName = ? WHERE ID = ?';
    createConnection.query(query, [CategoryName, id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Category updated' });
    });
});

// DELETE - Delete a category
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM Category WHERE ID = ?';
    createConnection.query(query, [id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Category deleted' });
    });
});

module.exports = router;
