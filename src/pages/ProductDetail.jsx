import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/stok.json")
      .then((res) => {
        if (!res.ok) throw new Error("Gagal mengambil data produk");
        return res.json();
      })
      .then((data) => {
        const found = data.find((item) => item.id === parseInt(id));
        setProduct(found || null);
      })
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) return <div className="p-4 text-red-600">{error}</div>;
  if (!product) return <div className="p-4">Loading atau produk tidak ditemukan...</div>;

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg max-w-md mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-2">{product.namaProduk}</h2>
      <p className="text-gray-600 mb-1">
        <strong>Kategori:</strong> {product.kategori}
      </p>
      <p className="text-gray-600 mb-1">
        <strong>Stok Tersedia:</strong> {parseInt(product.stok).toLocaleString()}
      </p>
    </div>
  );
}
