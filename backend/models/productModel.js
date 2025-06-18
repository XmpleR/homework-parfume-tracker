const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '../data/products.json');

function getAllProducts() {
  return JSON.parse(fs.readFileSync(dataPath));
}

function addProduct(product) {
  const products = getAllProducts();

  //Duplicate check (case-insensitive)
  const exists = products.find(p =>
    p.name.trim().toLowerCase() === product.name.trim().toLowerCase() &&
    p.producer.trim().toLowerCase() === product.producer.trim().toLowerCase() &&
    p.size.trim().toLowerCase() === product.size.trim().toLowerCase()
  );

  if (exists) {
    throw new Error('Duplicate product'); // will be caught in controller
  }

  const newProduct = { id: Date.now().toString(), ...product };
  products.push(newProduct);

  try {
    fs.writeFileSync(dataPath, JSON.stringify(products, null, 2));
  } catch (err) {
    console.error('Failed to write product data:', err);
    throw new Error('Could not save product data.');
  }

  return newProduct;
}

module.exports = { getAllProducts, addProduct };

function deleteProduct(id) {
  const products = getAllProducts();
  const updated = products.filter(p => p.id !== id);
  fs.writeFileSync(dataPath, JSON.stringify(updated, null, 2));
}

module.exports.deleteProduct = deleteProduct;
