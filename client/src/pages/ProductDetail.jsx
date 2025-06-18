import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [offers, setOffers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [company, setCompany] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/products').then(res => {
      const found = res.data.find(p => p.id === productId);
      if (found) setProduct(found);
    });

    axios.get('http://localhost:3000/offers').then(res => {
      const filtered = res.data.filter(o => o.productId === productId);
      setOffers(filtered);
    });
  }, [productId]);

  const handleAddOffer = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/offers', {
        productId,
        company,
        price: parseFloat(price),
        date,
      });
      const res = await axios.get('http://localhost:3000/offers');
      const filtered = res.data.filter(o => o.productId === productId);
      setOffers(filtered);
      setCompany('');
      setPrice('');
      setDate('');
      setShowForm(false);
    } catch (err) {
      alert('Error: ' + JSON.stringify(err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto text-black bg-white min-h-screen">
      {product && (
        <>
          <h1 className="text-2xl font-semibold mb-1">{product.name}</h1>
          <p className="text-sm text-gray-500 mb-4">{product.producer} – {product.size}</p>

          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-bold">Offers</h2>
            <button onClick={() => setShowForm(!showForm)} className="text-black text-xl leading-none rounded-full border border-black w-8 h-8 flex items-center justify-center hover:bg-gray-200">
              {showForm ? '×' : '+'}
            </button>
          </div>

          <ul className="space-y-2 mb-6">
            {offers.map(o => (
              <li key={o.id} className="text-sm">
                <div className="font-medium">{o.company}</div>
                <div className="text-gray-500">{o.price} Kč – {o.date}</div>
              </li>
            ))}
          </ul>
        </>
      )}

      {showForm && (
        <form onSubmit={handleAddOffer} className="space-y-3 mb-6">
          <input className="w-full border border-gray-300 p-2 rounded" value={company} onChange={e => setCompany(e.target.value)} placeholder="Company" required />
          <input className="w-full border border-gray-300 p-2 rounded" type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" required />
          <input className="w-full border border-gray-300 p-2 rounded" type="date" value={date} onChange={e => setDate(e.target.value)} required />
          <button type="submit" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">Save Offer</button>
        </form>
      )}

      <button onClick={() => navigate('/')} className="text-sm text-black underline hover:text-gray-600">
        ← Back
      </button>
    </div>
  );
}

export default ProductDetail;