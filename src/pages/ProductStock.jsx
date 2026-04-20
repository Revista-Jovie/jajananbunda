import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import PageHeader from "../components/PageHeader";

export default function ProductStock() {
  const [data, setData] = useState([]); // Data asli
  const [filteredData, setFilteredData] = useState([]); // Data hasil filter
  const [query, setQuery] = useState(""); // Query pencarian
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/stok.json")
      .then((response) => {
        if (!response.ok) throw new Error("Gagal mengambil data produk");
        return response.json();
      })
      .then((data) => {
        setData(data);
        setFilteredData(data);
      })
      .catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const searchUrl = query ? `/search?q=${query}` : "/search";

      fetch(searchUrl, { method: "GET" }) // hanya agar muncul di Network
        .then(() => {
          if (!query) {
            setFilteredData(data);
          } else {
            const filtered = data.filter((item) =>
              item.namaProduk.toLowerCase().includes(query.toLowerCase()) ||
              item.kategori.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredData(filtered);
          }
        })
        .catch(() => {
          setFilteredData([]);
          setError("Gagal melakukan pencarian");
        });
    }, 500);

    return () => clearTimeout(timeout);
  }, [query, data]);

  return (
    <div className="p-4 md:p-8">
      <PageHeader title="Product Stock" />

      {error && <div className="text-red-600 mb-4">{error}</div>}

      <input
        type="text"
        placeholder="Cari produk..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mb-4 p-3 w-full bg-white rounded-2xl shadow-lg"
      />

      <table className="min-w-full divide-y divide-gray-200 rounded-2xl shadow-lg">
        <thead>
          <tr className="bg-blue-600 text-white text-left text-sm font-semibold">
            <th className="px-4 py-3">#</th>
            <th className="px-4 py-3">Nama Produk</th>
            <th className="px-4 py-3">Kategori</th>
            <th className="px-4 py-3">Stok</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100 text-sm text-gray-800">
          {filteredData.length === 0 ? (
            <tr>
              <td colSpan={4} className="p-4 text-center text-gray-500">
                Tidak ada data yang cocok.
              </td>
            </tr>
          ) : (
            filteredData.map((product, index) => (
              <tr
                key={product.id}
                className="hover:bg-gray-50 cursor-pointer transition-colors duration-200"
              >
                <td className="px-6 py-4 font-medium text-gray-700">{index + 1}.</td>
                <td className="px-6 py-4">
                  <NavLink
                    to={`/product-stock/${product.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    {product.namaProduk}
                  </NavLink>
                </td>
                <td className="px-6 py-4">{product.kategori}</td>
                <td className="px-6 py-4">{parseInt(product.stok).toLocaleString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
