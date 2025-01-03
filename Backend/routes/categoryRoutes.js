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
    const query = 'SELECT * FROM categories';
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

    const checkQuery = 'SELECT CategoryName FROM categories WHERE ID = ?';
    createConnection.query(checkQuery, [id], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Category not found' });
        }
        if (rows[0].CategoryName === CategoryName) {
            return res.status(200).json({ message: 'No changes were made as the name is the same' });
        }

        const updateQuery = 'UPDATE categories SET CategoryName = ? WHERE ID = ?';
        createConnection.query(updateQuery, [CategoryName, id], (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json({ message: 'Category updated successfully' });
        });
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;


    const query = 'DELETE FROM categories WHERE id = ?';
    createConnection.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error:', err.message); 
            return res.status(500).json({ error: err.message });
        }
        console.log('Affected Rows:', result.affectedRows); 
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category deleted successfully' });
    });
});


module.exports = router;

