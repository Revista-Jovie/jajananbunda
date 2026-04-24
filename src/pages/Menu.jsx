import { useEffect, useRef, useState } from "react";
import PageHeader from "../components/PageHeader";
import { menuApi } from "../services/menuApi"; // Pastikan file ini dibuat nanti
import { BiTrash } from "react-icons/bi";
import { BsPencilSquare } from "react-icons/bs";

export default function MenuMakanan() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingMenu, setEditingMenu] = useState(null);

  const formModalRef = useRef();
  const editModalRef = useRef();

  const itemsPerPage = 8;

  useEffect(() => {
    const loadMenu = async () => {
      try {
        const menuList = await menuApi.fetchMenu();
        setData(menuList);
        setFilteredData(menuList);
      } catch (err) {
        console.error("❌ Gagal mengambil data menu:", err.message);
      }
    };
    loadMenu();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!query) {
        setFilteredData(data);
      } else {
        const filtered = data.filter((menu) =>
          menu.nama_menu?.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredData(filtered);
      }
      setCurrentPage(1);
    }, 300);
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
    if (!window.confirm("Yakin ingin menghapus menu ini?")) return;
    try {
      await menuApi.deleteMenu(id);
      const updated = await menuApi.fetchMenu();
      setData(updated);
      setFilteredData(updated);
    } catch (err) {
      alert("Gagal menghapus data menu");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <PageHeader title="Daftar Menu" />
        <div className="flex items-center gap-4">
          <div className="form-control w-60">
            <label className="input input-bordered flex items-center gap-2 rounded-full px-3">
              <input
                type="text"
                className="grow outline-none"
                placeholder="Cari nama menu"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
          </div>
          <button
            className="bg-orange text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
            onClick={() => formModalRef.current?.showModal()}
          >
            Tambah Menu
          </button>
        </div>
      </div>

      {/* LIST CARD MENU */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginatedData.map((menu) => (
          <div key={menu.id} className="bg-white card bg-base-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden rounded-2xl border border-gray-100">
            <figure className="w-full h-40 bg-gray-100">
              <img
                src={menu.foto_menu}
                alt={menu.nama_menu}
                className="w-full h-full object-cover"
              />
            </figure>
            <div className="p-5 flex flex-col items-center text-center">
              <h2 className="font-bold text-lg text-gray-800">{menu.nama_menu}</h2>
              <p className="text-sm font-semibold text-blue-600 mt-1">
                Rp {Number(menu.harga || 0).toLocaleString("id-ID")}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Kategori: {menu.kategori}
              </p>
              
              <div className="mt-3">
                <div
                  className={`badge text-xs font-medium px-3 py-3 rounded-full ${
                    menu.status?.toLowerCase() === "tersedia"
                      ? "bg-green-100 text-green-700 border-none"
                      : "bg-red-100 text-red-700 border-none"
                  }`}
                >
                  {menu.status}
                </div>
              </div>

              <div className="mt-4 flex gap-3 border-t pt-4 w-full justify-center">
                <BsPencilSquare
                  className="text-blue-500 hover:text-blue-700 cursor-pointer text-xl transition-colors"
                  onClick={() => {
                    setEditingMenu(menu);
                    editModalRef.current?.showModal();
                  }}
                />
                <BiTrash
                  className="text-red-500 hover:text-red-700 cursor-pointer text-xl transition-colors"
                  onClick={() => handleDelete(menu.id)}
                />
              </div>
            </div>
          </div>
        ))}
        {paginatedData.length === 0 && (
            <div className="col-span-full text-center py-10 text-gray-500">
                Tidak ada menu yang ditemukan.
            </div>
        )}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-between items-center mt-6">
        <div className="text-sm text-gray-500">
          Showing {startIndex + 1}-{Math.min(endIndex, filteredData.length)} of {filteredData.length}
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

      {/* MODAL TAMBAH MENU */}
      <dialog ref={formModalRef} className="modal">
        <div className="modal-box w-full max-w-md rounded-2xl">
          <h3 className="font-bold text-lg mb-4 text-gray-800">Tambah Menu</h3>
          <form
            className="space-y-4"
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.target;
              try {
                const file = form.foto.files[0];
                if (!file) return alert("Mohon unggah foto makanan/minuman");

                const fotoUrl = await menuApi.uploadMenuFoto(file);
                const newMenu = {
                  nama_menu: form.nama.value,
                  foto_menu: fotoUrl,
                  harga: form.harga.value,
                  kategori: form.kategori.value,
                  status: form.status.value,
                };

                await menuApi.createMenu(newMenu);
                const updated = await menuApi.fetchMenu();
                setData(updated);
                setFilteredData(updated);
                formModalRef.current?.close();
                form.reset();
              } catch (err) {
                alert("Gagal menambah menu: " + err.message);
              }
            }}
          >
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Nama Menu</label>
              <input name="nama" type="text" placeholder="Contoh: Kimbab" className="input input-bordered w-full" required />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Foto Menu</label>
              <input name="foto" type="file" accept="image/*" className="file-input file-input-bordered w-full" required />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Harga (Rp)</label>
              <input name="harga" type="number" placeholder="Contoh: 10000" className="input input-bordered w-full" required />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Status Ketersediaan</label>
              <select name="status" className="select select-bordered w-full" required>
                <option value="">Pilih status...</option>
                <option value="Tersedia">Tersedia</option>
                <option value="Habis">Habis</option>
              </select>
            </div>
            <div className="modal-action mt-6">
              <button type="submit" className="btn bg-orange text-white hover:bg-orange-700 border-none">Simpan</button>
              <button type="button" className="btn" onClick={() => formModalRef.current?.close()}>
                Batal
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>Close</button>
        </form>
      </dialog>

      {/* MODAL EDIT MENU */}
      <dialog ref={editModalRef} className="modal">
        <div className="modal-box w-full max-w-md rounded-2xl">
          <h3 className="font-bold text-lg mb-4 text-gray-800">Edit Menu</h3>
          {editingMenu && (
            <form
              className="space-y-4"
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.target;
                try {
                  const updatedData = {
                    nama_menu: form.nama.value,
                    harga: form.harga.value,
                    status: form.status.value,
                  };

                  if (form.foto.files.length > 0) {
                    const file = form.foto.files[0];
                    const fotoUrl = await menuApi.uploadMenuFoto(file);
                    updatedData.foto_menu = fotoUrl;
                  }

                  await menuApi.updateMenu(editingMenu.id, updatedData);

                  const updated = await menuApi.fetchMenu();
                  setData(updated);
                  setFilteredData(updated);
                  setEditingMenu(null);
                  editModalRef.current?.close();
                } catch (err) {
                  alert("Gagal update menu: " + err.message);
                }
              }}
            >
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Nama Menu</label>
                <input name="nama" defaultValue={editingMenu.nama_menu} type="text" className="input input-bordered w-full" required />
              </div>
              
              {/* Preview Foto */}
              {editingMenu.foto_menu && (
                <div className="text-center bg-gray-50 p-2 rounded-lg border border-gray-200">
                  <p className="text-xs text-gray-500 mb-2">Foto saat ini:</p>
                  <img
                    src={editingMenu.foto_menu}
                    alt="Foto saat ini"
                    className="w-32 h-24 mx-auto rounded-lg object-cover shadow-sm"
                  />
                </div>
              )}

              <div>
                <label className="text-xs text-gray-500 mb-1 block">Ganti Foto (Opsional)</label>
                <input name="foto" type="file" accept="image/*" className="file-input file-input-bordered w-full" />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Harga (Rp)</label>
                <input name="harga" defaultValue={editingMenu.harga} type="number" className="input input-bordered w-full" required />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Status Ketersediaan</label>
                <select name="status" defaultValue={editingMenu.status} className="select select-bordered w-full" required>
                  <option value="Tersedia">Tersedia</option>
                  <option value="Habis">Habis</option>
                </select>
              </div>
              <div className="modal-action mt-6">
                <button type="submit" className="btn bg-orange text-white hover:bg-orange-700 border-none">Simpan Perubahan</button>
                <button type="button" className="btn" onClick={() => {
                  setEditingMenu(null);
                  editModalRef.current?.close();
                }}>
                  Batal
                </button>
              </div>
            </form>
          )}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>Close</button>
        </form>
      </dialog>
    </div>
  );
}