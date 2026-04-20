import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { BiTrash } from "react-icons/bi";
import { clientApi } from "../services/clientApi";

export default function Client() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    try {
      const result = await clientApi.fetchAll();
      setData(result);
      setFilteredData(result);
      setCurrentPage(1);
    } catch (err) {
      console.error("❌ Gagal ambil data client:", err);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!query) {
        setFilteredData(data);
      } else {
        const filtered = data.filter((client) =>
          client.email.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredData(filtered);
      }
      setCurrentPage(1);
    }, 500);

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

  const handleDelete = async (id) => {
    const confirm = window.confirm("Yakin ingin menghapus client ini?");
    if (!confirm) return;

    try {
      await clientApi.deleteById(id);
      loadClients();
    } catch (err) {
      console.error("❌ Gagal hapus client:", err.message);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <PageHeader title="Client" />
        <div className="form-control w-60">
          <label className="input input-bordered flex items-center gap-2 rounded-full">
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
              className="grow"
              placeholder="Cari email client"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
        </div>
      </div>

      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        {/* <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>ID</th>
              <th>Email</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-100 text-sm text-gray-800">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={3} className="p-4 text-center text-gray-500">
                  Tidak ada data yang cocok.
                </td>
              </tr>
            ) : (
              paginatedData.map((client, index) => (
                <tr
                  key={client.id}
                  className="hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <td className="px-4 py-4 text-center">
                    {startIndex + index + 1}
                  </td>
                  <td className="px-4 py-4 text-center">{client.email}</td>
                  <td className="px-4 py-4 text-center">
                    <div className="flex justify-center">
                      <BiTrash
                        className="text-red-500 hover:text-red-700 cursor-pointer text-xl"
                        onClick={() => handleDelete(client.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table> */}
      </div>

      <table className="min-w-full divide-y divide-gray-200 rounded-2xl shadow-lg">
        <thead>
          <tr className="bg-blue-600 text-white text-sm font-semibold text-center">
            <th className="px-4 py-3">ID</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Aksi</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100 text-sm text-gray-800">
          {paginatedData.length === 0 ? (
            <tr>
              <td colSpan={3} className="p-4 text-center text-gray-500">
                Tidak ada data yang cocok.
              </td>
            </tr>
          ) : (
            paginatedData.map((client, index) => (
              <tr
                key={client.id}
                className="hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <td className="px-4 py-4 text-center">
                  {startIndex + index + 1}
                </td>
                <td className="px-4 py-4 text-center">{client.email}</td>
                <td className="px-4 py-4 text-center">
                  <div className="flex justify-center">
                    <BiTrash
                      className="text-red-500 hover:text-red-700 cursor-pointer text-xl"
                      onClick={() => handleDelete(client.id)}
                    />
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-6">
        <div className="text-sm text-gray-500">
          Showing {startIndex + 1} - {Math.min(endIndex, filteredData.length)}{" "}
          of {filteredData.length}
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
            disabled={currentPage === totalPages}
            className="join-item btn btn-sm btn-outline"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
