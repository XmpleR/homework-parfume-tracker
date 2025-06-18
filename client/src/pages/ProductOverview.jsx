import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ProductOverview() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/products').then((res) => setProducts(res.data));
  }, []);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 max-w-3xl mx-auto text-black">
      <div className="flex justify-between items-center mb-4">
        <Link to="/admin" className="w-6 h-6 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="black" strokeWidth="2" viewBox="0 0 24 24" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h10M4 18h6" />
          </svg>
        </Link>
        <div className="flex-1 mx-4">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border-b border-gray-400 py-1 px-2 bg-transparent placeholder-gray-500"
          />
        </div>
        <Link to="/add-product" className="border border-black rounded-full w-8 h-8 flex items-center justify-center text-xl">
          +
        </Link>
      </div>

      <div className="border-b border-gray-300 mb-2"></div>

      <ul className="space-y-3">
        {filtered.map((p) => (
          <li key={p.id}>
            <Link to={`/product/${p.id}`} className="block">
              <div className="text-lg font-semibold">{p.name}</div>
              <div className="text-sm text-gray-500">{p.producer}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductOverview;