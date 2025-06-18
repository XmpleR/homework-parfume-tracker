import { useParams, useNavigate } from 'react-router-dom';

function ExistingProduct() {
  const { productId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold text-red-600 mb-4">This product already exists</h2>
      <p className="mb-4">You tried to add a product that’s already in the system.</p>
      <div className="space-x-4">
        <button
          onClick={() => navigate(`/product/${productId}`)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Go to Product Page
        </button>
        <button
          onClick={() => navigate('/add-product')}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Back to Add Product
        </button>
      </div>
    </div>
  );
}

export default ExistingProduct;