import { useEffect, useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { BiTrash } from "react-icons/bi";
import PageHeader from "../components/PageHeader";
import { orderApi } from "../services/orderApi";

export default function Order() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const result = await orderApi.fetchAll();
      setData(result);
      setFilteredData(result);
      setCurrentPage(1);
    } catch (err) {
      console.error("❌ Gagal ambil data order:", err.message);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Yakin ingin menghapus order ini?");
    if (!confirm) return;

    try {
      await orderApi.deleteById(id);
      const updated = data.filter((item) => item.id !== id);
      setData(updated);
      setFilteredData(updated);
    } catch (err) {
      alert("Gagal menghapus data: " + err.message);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!query) {
        setFilteredData(data);
      } else {
        const filtered = data.filter((order) =>
          order.nama_pemesan?.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredData(filtered);
      }
      setCurrentPage(1);
    }, 400);

    return () => clearTimeout(timeout);
  }, [query, data]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <PageHeader title="Order" />
        <div className="form-control w-60">
          <label className="input input-bordered flex items-center gap-2 rounded-full px-3 py-2 border border-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
              />
            </svg>
            <input
              type="text"
              className="grow outline-none bg-transparent"
              placeholder="Cari nama pemesan"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
        </div>
      </div>

      <table className="min-w-full divide-y divide-gray-200 rounded-2xl shadow-lg overflow-hidden">
        <thead>
          <tr className="bg-orange-400 text-white text-sm font-semibold text-center">
            <th className="px-4 py-3">No</th>
            <th className="px-4 py-3">Nama</th>
            <th className="px-4 py-3">No HP</th>
            <th className="px-4 py-3">Menu</th>
            <th className="px-4 py-3">Jumlah Pesanan</th>
            <th className="px-4 py-3">Catatan</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Aksi</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100 text-sm text-gray-800">
          {paginatedData.length === 0 ? (
            <tr>
              {/* colspan diubah jadi 8 karena jumlah kolomnya ada 8 */}
              <td colSpan={8} className="p-4 text-center text-gray-500">
                Tidak ada data order.
              </td>
            </tr>
          ) : (
            paginatedData.map((order, index) => (
              <tr key={order.id} className="hover:bg-gray-100 cursor-pointer">
                <td className="px-4 py-4 text-center">{startIndex + index + 1}</td>
                <td className="px-4 py-4 text-center">{order.nama_pemesan}</td>
                <td className="px-4 py-4 text-center">{order.no_hp || "-"}</td>
                <td className="px-4 py-4 text-center">{order.paket}</td>
                
                {/* Asumsi: Jumlah Pesanan mau diisi nominal uang atau jumlah barang. 
                    Kalau jumlah porsi, bisa ganti jadi order.jumlah */}
                <td className="px-4 py-4 text-center">
                  {order.harga_paket
                    ? `Rp ${Number(order.harga_paket).toLocaleString("id-ID")}`
                    : "-"}
                </td>
                
                <td className="px-4 py-4 text-center">{order.catatan || "-"}</td>
                
                <td className="px-4 py-4 text-center">
                   <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.status === "Canceled"
                          ? "bg-red-100 text-red-700"
                          : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      {order.status || "Selesai"}
                    </span>
                </td>
                <td className="px-4 py-4 text-center">
                  <div className="flex justify-center gap-2">
                    {/* Tombol edit (opsional kalau butuh) */}
                    {/* <BsPencilSquare className="text-blue-500 hover:text-blue-700 cursor-pointer text-xl" /> */}
                    <BiTrash
                      className="text-red-500 hover:text-red-700 cursor-pointer text-xl"
                      onClick={() => handleDelete(order.id)}
                    />
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <div className="text-sm text-gray-500">
          Showing {startIndex + 1}-{Math.min(endIndex, filteredData.length)} of{" "}
          {filteredData.length}
        </div>
        <div className="join">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="join-item btn btn-sm btn-outline"
          >
            &lt;
          </button>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages || totalPages === 0}
            className="join-item btn btn-sm btn-outline"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}