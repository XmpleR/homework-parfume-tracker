const { getAllProducts, addProduct } = require('../models/productModel');
const { validateProduct } = require('../utils/validate');

exports.getProducts = (req, res) => {
  res.json(getAllProducts());
};

exports.createProduct = (req, res) => {
  const product = req.body;
  const error = validateProduct(product);
  if (error) return res.status(400).json({ error });

  try {
    const newProduct = addProduct(product);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};