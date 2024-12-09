// server.js

const express = require('express');
const app = express();
const PORT = 3001;

// Sample products data
const products = [
  { id: 1, name: 'Product 1', price: 0.1 },
  { id: 2, name: 'Product 2', price: 0.2 },
  { id: 3, name: 'Product 3', price: 0.3 }
];

// API endpoint for handling product purchases
app.post('/api/products/:id/buy', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  // Process purchase logic here (update database, interact with smart contract, etc.)

  res.json({ message: 'Purchase successful', product });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});