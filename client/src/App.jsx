import { Routes, Route, Link } from 'react-router-dom';
import AdminPanel from './pages/AdminPanel';
import AddProduct from './pages/AddProduct';
import ProductDetail from './pages/ProductDetail';
import ProductOverview from './pages/ProductOverview';
import ExistingProduct from './pages/ExistingProduct';

function App() {
  return (
    <div className="p-4 max-w-4xl mx-auto font-sans">
      
      <Routes>
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/" element={<ProductOverview />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/product-exists/:productId" element={<ExistingProduct />} />
      </Routes>
    </div>
  );
}

export default App;