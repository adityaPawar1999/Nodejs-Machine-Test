const express = require('express');
const router = express.Router();
const db = require('../Connection/createConnection');

// Get paginated products
router.get('/', (req, res) => {
  const { page = 1, size = 10 } = req.query;
  const offset = (page - 1) * size;

  db.query(
    `SELECT p.id AS productId, p.name AS productName, c.name AS categoryName, c.id AS categoryId
     FROM products p
     JOIN categories c ON p.category_id = c.id
     LIMIT ? OFFSET ?`,
    [parseInt(size), parseInt(offset)],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    }
  );
});

// Create a new product
router.post('/', (req, res) => {
  const { name, categoryId } = req.body;
  db.query(
    'INSERT INTO products (name, category_id) VALUES (?, ?)',
    [name, categoryId],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: result.insertId, name, categoryId });
    }
  );
});

// Update a product
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, categoryId } = req.body;
  db.query(
    'UPDATE products SET name = ?, category_id = ? WHERE id = ?',
    [name, categoryId, id],
    (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Product updated successfully' });
    }
  );
});

// Delete a product
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM products WHERE id = ?', [id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Product deleted successfully' });
  });
});

module.exports = router;
