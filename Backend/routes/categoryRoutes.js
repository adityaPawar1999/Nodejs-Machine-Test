const express = require('express');
const { createConnection } = require('../Connection/createConnection');
const router = express.Router();

router.post('/', (req, res) => {
    const { CategoryName } = req.body;
    const query = 'INSERT INTO categories (CategoryName) VALUES (?)';
    createConnection.query(query, [CategoryName], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Category added', categoryId: result.insertId });
    });
});
router.get('/', (req, res) => {
    const query = 'SELECT * FROM Category';
    createConnection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
});
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

