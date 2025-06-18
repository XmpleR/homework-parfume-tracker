import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddProduct() {
  const [name, setName] = useState('');
  const [producer, setProducer] = useState('');
  const [size, setSize] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get('http://localhost:3000/products');
      const existing = res.data.find(p =>
        p.name.trim().toLowerCase() === name.trim().toLowerCase() &&
        p.producer.trim().toLowerCase() === producer.trim().toLowerCase() &&
        p.size.trim().toLowerCase() === (size.trim() + ' ml').toLowerCase()
      );

      if (existing) {
        navigate(`/product-exists/${existing.id}`);
        return;
      }

      const newRes = await axios.post('http://localhost:3000/products', {
        name,
        producer,
        size: size.trim() + ' ml',
      });

      navigate(`/product/${newRes.data.id}`);
    } catch (err) {
      alert('Error: ' + JSON.stringify(err.response?.data?.error || err.message));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded max-w-md mx-auto mt-8 text-black">
      <h2 className="text-xl font-semibold mb-2">Add Product</h2>
      <input className="w-full border border-gray-300 p-2 rounded" value={name} onChange={e => setName(e.target.value)} placeholder="Name" required />
      <input className="w-full border border-gray-300 p-2 rounded" value={producer} onChange={e => setProducer(e.target.value)} placeholder="Producer" required />
      <input className="w-full border border-gray-300 p-2 rounded" value={size} onChange={e => setSize(e.target.value)} placeholder="Size in ml (e.g. 100)" required />
      <div className="flex space-x-4">
        <button type="submit" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">Save</button>
        <button type="button" onClick={() => navigate('/')} className="bg-white border border-black text-black px-4 py-2 rounded hover:bg-gray-100">Cancel</button>
      </div>
    </form>
  );
}

export default AddProduct;