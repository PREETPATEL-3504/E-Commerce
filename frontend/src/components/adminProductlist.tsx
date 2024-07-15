import axios from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const AdminProductlist = () => {
  const [products, setProducts] = React.useState([]);

  useEffect(() => {
    const url = `http://localhost:5000/api/products`;
    axios.get(url).then((res) => {
      setProducts(res.data);
    });
  }, []);

  const onDelete = (id: any) => {
    axios
      .delete(`http://localhost:5000/api/products/${id}`)
      .then(() => {
        setProducts(products.filter((p: any) => p.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl text-white text-center font-bold mb-4">
        Product List
      </h1>
      <table className="min-w-full border border-gray-300 rounded-3xl">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Quantity</th>
            <th className="border px-4 py-2">Image</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: any) => (
            <tr key={product.id} className="bg-white">
              <td className="border px-4 py-2">{product.name}</td>
              <td className="border px-4 py-2">{product.price}</td>
              <td className="border px-4 py-2">{product.quantity}</td>
              <td className="border px-4 py-2">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-16 h-16 object-cover"
                />
              </td>
              <td className="border px-4 py-2">{product.description}</td>
              <td className="border px-4 py-2">
                <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
                  <Link to={`/add-product/${product.id}`}>Edit</Link>
                </button>
                <button
                  onClick={() => onDelete(product.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProductlist;
