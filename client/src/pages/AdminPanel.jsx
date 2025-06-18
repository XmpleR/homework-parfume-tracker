import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminPanel() {
  const [products, setProducts] = useState([]);
  const [offers, setOffers] = useState([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState({ field: '', order: 'asc' });
  const [showDropdown, setShowDropdown] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [company, setCompany] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const prodRes = await axios.get('http://localhost:3000/products');
    const offerRes = await axios.get('http://localhost:3000/offers');
    setProducts(prodRes.data);
    setOffers(offerRes.data);
  };

  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:3000/products/${id}`);
    fetchData();
  };

  const deleteOffer = async (id) => {
    await axios.delete(`http://localhost:3000/offers/${id}`);
    fetchData();
  };

  const getOffersForProduct = (productId) =>
    offers.filter((o) => o.productId === productId);

  const applySort = (array, field, order) => {
    return [...array].sort((a, b) => {
      const aVal = a[field] || '';
      const bVal = b[field] || '';
      if (field === 'price' || field === 'size') {
        return order === 'asc'
          ? parseFloat(aVal) - parseFloat(bVal)
          : parseFloat(bVal) - parseFloat(aVal);
      }
      if (field === 'date') {
        return order === 'asc'
          ? new Date(aVal) - new Date(bVal)
          : new Date(bVal) - new Date(aVal);
      }
      return order === 'asc'
        ? aVal.toString().localeCompare(bVal.toString())
        : bVal.toString().localeCompare(aVal.toString());
    });
  };

  const toggleSort = (field) => {
    setSort((prev) => ({
      field,
      order: prev.field === field && prev.order === 'asc' ? 'desc' : 'asc',
    }));
    setShowDropdown(false);
  };

  const handleAddOffer = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/offers', {
        productId: selectedProductId,
        company,
        price: parseFloat(price),
        date,
      });
      fetchData();
      setCompany('');
      setPrice('');
      setDate('');
      setShowForm(false);
    } catch (err) {
      alert('Error: ' + JSON.stringify(err.response?.data?.error || err.message));
    }
  };

  const filteredProducts = products
    .filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.producer.toLowerCase().includes(search.toLowerCase())
    )
    .map(p => ({
      ...p,
      offers: getOffersForProduct(p.id),
    }));

  const sortedProducts = sort.field
    ? applySort(filteredProducts, sort.field, sort.order)
    : filteredProducts;

  return (
    <div className="p-4 max-w-5xl mx-auto text-black relative">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search product or producer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded w-full max-w-sm"
        />
        <div className="relative ml-4">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="border border-black px-4 py-2 rounded"
          >
            Filter ⬍
          </button>
          {showDropdown && (
            <ul className="absolute z-10 right-0 mt-2 bg-white border border-gray-300 rounded shadow w-48 text-sm">
              {["name", "producer", "size"].map((field) => (
                <li
                  key={field}
                  onClick={() => toggleSort(field)}
                  className="cursor-pointer px-4 py-2 hover:bg-gray-100 flex justify-between"
                >
                  <span>{field.charAt(0).toUpperCase() + field.slice(1)}</span>
                  {sort.field === field ? (
                    <span>{sort.order === 'asc' ? '▲' : '▼'}</span>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          onClick={() => navigate('/add-product')}
          className="ml-4 bg-black text-white px-4 py-2 rounded"
        >
          + Create Product
        </button>
      </div>

      <ul className="space-y-4">
        {sortedProducts.map((p) => (
          <li key={p.id} className="border-b border-gray-300 pb-4">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-lg font-medium">{p.name}</div>
                <div className="text-sm text-gray-500">{p.producer} – {p.size}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => deleteProduct(p.id)} className="text-red-600 text-sm"><img src="/bin.png" alt="Delete" className="w-4 h-4 inline" /></button>
                <button onClick={() => {
                  setSelectedProductId(p.id);
                  setShowForm(p.id === selectedProductId ? !showForm : true);
                }} className="text-sm">+ Offer</button>
              </div>
            </div>
            <ul className="ml-4 mt-2 space-y-1 text-sm">
              {p.offers.map((o) => (
                <li key={o.id} className="flex justify-between items-center">
                  <span>{o.company}, {o.price} Kč, {o.date}</span>
                  <button onClick={() => deleteOffer(o.id)} className="w-4 h-4"><img src="/bin.png" alt="Delete" className="w-4 h-4 inline" /></button>
                </li>
              ))}
            </ul>
            {showForm && selectedProductId === p.id && (
              <form onSubmit={handleAddOffer} className="mt-4 space-y-2">
                <input className="w-full border border-gray-300 p-2 rounded" value={company} onChange={e => setCompany(e.target.value)} placeholder="Company" required />
                <input className="w-full border border-gray-300 p-2 rounded" type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" required />
                <input className="w-full border border-gray-300 p-2 rounded" type="date" value={date} onChange={e => setDate(e.target.value)} required />
                <button type="submit" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">Save Offer</button>
              </form>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPanel;
