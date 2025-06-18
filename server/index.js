const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const offerRoutes = require('./routes/offerRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/products', productRoutes);
app.use('/offers', offerRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});