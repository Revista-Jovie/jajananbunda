import { useEffect, useState, useRef } from "react";
import { BiTrash, BiSearch, BiImageAlt, BiEditAlt } from "react-icons/bi";
import PageHeader from "../components/PageHeader";
import { pesananApi } from "../services/pesananApi";

export default function Pesanan() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImg, setSelectedImg] = useState(null);
  const [editingPesanan, setEditingPesanan] = useState(null);
  const editModalRef = useRef();
  const itemsPerPage = 10;

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const result = await pesananApi.fetchAll();
      setData(result);
      setFilteredData(result);
    } catch (err) {
      console.error("❌ Gagal ambil data pesanan:", err.message);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await pesananApi.updateStatus(id, newStatus);
      loadOrders(); 
    } catch (err) {
      alert("Gagal memperbarui status");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus pesanan ini?")) return;
    try {
      await pesananApi.deleteById(id);
      loadOrders();
    } catch (err) {
      alert("Gagal menghapus data");
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      const filtered = data.filter((item) =>
        item.nama_pemesan?.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
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
        <PageHeader title="Daftar Pesanan" />
        <div className="form-control w-60">
          <label className="input input-bordered flex items-center gap-2 rounded-full shadow-sm bg-white">
            <BiSearch className="text-gray-400 text-xl" />
            <input
              type="text"
              className="grow outline-none"
              placeholder="Cari nama pemesan"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
        </div>
      </div>

      <table className="min-w-full divide-y divide-gray-200 rounded-2xl shadow-lg overflow-hidden font-nunitosans">
        <thead>
          <tr className="bg-orange-400 text-white text-sm font-semibold text-center">
            <th className="px-4 py-3 text-xs uppercase">No</th>
            <th className="px-4 py-3 text-xs uppercase">Nama</th>
            <th className="px-4 py-3 text-xs uppercase">Menu</th>
            <th className="px-4 py-3 text-xs uppercase">Jumlah</th>
            <th className="px-4 py-3 text-xs uppercase">Total</th>
            <th className="px-4 py-3 text-xs uppercase">Catatan</th>
            <th className="px-4 py-3 text-xs uppercase">Bukti TF</th>
            <th className="px-4 py-3 text-xs uppercase">Status</th>
            <th className="px-4 py-3 text-xs uppercase">Aksi</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100 text-sm text-gray-800">
          {paginatedData.length === 0 ? (
            <tr>
              <td colSpan={9} className="p-4 text-center text-gray-500">
                Tidak ada data pesanan.
              </td>
            </tr>
          ) : (
            paginatedData.map((item, index) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-4 text-center">{startIndex + index + 1}</td>
                <td className="px-4 py-4 text-center font-bold">{item.nama_pemesan}</td>
                <td className="px-4 py-4 text-center">
                  <span className="badge badge-ghost border-gray-200">{item.menu}</span>
                </td>
                <td className="px-4 py-4 text-center">{item.jumlah_pesanan}</td>
                <td className="px-4 py-4 text-center font-bold text-orange-600">
                  Rp {Number(item.harga || 0).toLocaleString("id-ID")}
                </td>
                <td className="px-4 py-4 text-center italic text-xs text-gray-500 max-w-[120px] truncate">
                  {item.catatan || "-"}
                </td>
                <td className="px-4 py-4 text-center">
                  {item.bukti_tf ? (
                    <BiImageAlt
                      className="text-2xl text-blue-500 cursor-pointer mx-auto hover:scale-125 transition-transform"
                      onClick={() => setSelectedImg(item.bukti_tf)}
                    />
                  ) : (
                    <span className="text-gray-300">-</span>
                  )}
                </td>
                <td className="px-4 py-4 text-center">
                  <select
                    className={`select select-xs rounded-full font-bold outline-none border-none ${
                      item.status === "Selesai" ? "bg-green-100 text-green-700" :
                      item.status === "On Going" ? "bg-blue-100 text-blue-700" :
                      item.status === "Canceled" ? "bg-red-100 text-red-700" :
                      "bg-yellow-100 text-yellow-700"
                    }`}
                    value={item.status || "Pending"}
                    onChange={(e) => handleStatusChange(item.id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="On Going">On Going</option>
                    <option value="Selesai">Selesai</option>
                  </select>
                </td>
                <td className="px-4 py-4 text-center">
                  <div className="flex justify-center gap-3">
                    <BiEditAlt
                      className="text-blue-500 hover:text-blue-700 cursor-pointer text-xl"
                      onClick={() => {
                        setEditingPesanan(item);
                        editModalRef.current?.showModal();
                      }}
                    />
                    <BiTrash
                      className="text-red-500 hover:text-red-700 cursor-pointer text-xl"
                      onClick={() => handleDelete(item.id)}
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
        <div className="text-sm text-gray-500 font-nunitosans">
          Showing {startIndex + 1}-{Math.min(endIndex, filteredData.length)} of {filteredData.length}
        </div>
        <div className="join">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="join-item btn btn-sm btn-outline border-gray-300"
          >
            &lt;
          </button>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages || totalPages === 0}
            className="join-item btn btn-sm btn-outline border-gray-300"
          >
            &gt;
          </button>
        </div>
      </div>

      {/* MODAL EDIT DATA */}
      <dialog ref={editModalRef} className="modal">
        <div className="modal-box rounded-2xl font-nunitosans">
          <h3 className="font-bold text-lg mb-4 text-orange-600">Edit Detail Pesanan</h3>
          {editingPesanan && (
            <form
              className="space-y-4"
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  const formData = new FormData(e.target);
                  const updated = {
                    nama_pemesan: formData.get("nama"),
                    jumlah_pesanan: formData.get("jumlah"),
                    catatan: formData.get("catatan"),
                  };
                  await pesananApi.updatePesanan(editingPesanan.id, updated);
                  editModalRef.current?.close();
                  loadOrders();
                } catch (err) {
                  alert("Gagal update data");
                }
              }}
            >
              <div className="form-control">
                <label className="label font-semibold text-xs">Nama Pemesan</label>
                <input name="nama" defaultValue={editingPesanan.nama_pemesan} className="input input-bordered w-full" />
              </div>
              <div className="form-control">
                <label className="label font-semibold text-xs">Jumlah</label>
                <input name="jumlah" defaultValue={editingPesanan.jumlah_pesanan} className="input input-bordered w-full" />
              </div>
              <div className="form-control">
                <label className="label font-semibold text-xs">Catatan</label>
                <textarea name="catatan" defaultValue={editingPesanan.catatan} className="textarea textarea-bordered w-full"></textarea>
              </div>
              <div className="modal-action">
                <button type="submit" className="btn bg-orange-500 text-white border-none px-6">Simpan</button>
                <button type="button" className="btn btn-ghost" onClick={() => editModalRef.current?.close()}>Batal</button>
              </div>
            </form>
          )}
        </div>
      </dialog>

      {/* MODAL PREVIEW GAMBAR */}
      {selectedImg && (
        <div
          className="fixed inset-0 z-[999] bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm cursor-zoom-out"
          onClick={() => setSelectedImg(null)}
        >
          <img src={selectedImg} className="max-w-full max-h-[85vh] rounded-lg shadow-2xl animate-in zoom-in-95 duration-200" alt="Bukti TF" />
        </div>
      )}
    </div>
  );
}