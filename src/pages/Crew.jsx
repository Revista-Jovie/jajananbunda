import { useEffect, useRef, useState } from "react";
import PageHeader from "../components/PageHeader";
import { crewApi } from "../services/crewApi";
import { BiTrash } from "react-icons/bi";
import { BsPencilSquare } from "react-icons/bs";

export default function Crew() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingCrew, setEditingCrew] = useState(null);

  const formModalRef = useRef();
  const editModalRef = useRef();

  const itemsPerPage = 8;

  useEffect(() => {
    const loadCrew = async () => {
      try {
        const crew = await crewApi.fetchCrew();
        setData(crew);
        setFilteredData(crew);
      } catch (err) {
        console.error("❌ Gagal mengambil data crew:", err.message);
      }
    };
    loadCrew();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!query) {
        setFilteredData(data);
      } else {
        const filtered = data.filter((crew) =>
          crew.nama_crew?.toLowerCase().includes(query.toLowerCase())
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
    if (!confirm("Yakin ingin menghapus data ini?")) return;
    try {
      await crewApi.deleteCrew(id);
      const updated = await crewApi.fetchCrew();
      setData(updated);
      setFilteredData(updated);
    } catch (err) {
      alert("Gagal menghapus data");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <PageHeader title="Crew" />
        <div className="flex items-center gap-4">
          <div className="form-control w-60">
            <label className="input input-bordered flex items-center gap-2 rounded-full">
              <input
                type="text"
                className="grow"
                placeholder="Cari nama crew"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
          </div>
          <button
            className="bg-biru text-white px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-600"
            onClick={() => formModalRef.current?.showModal()}
          >
            Tambah Crew
          </button>
        </div>
      </div>

      {/* LIST CARD */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginatedData.map((crew) => (
          <div key={crew.id} className="bg-white-400 card bg-base-100 shadow-sm hover:shadow-md">
            <figure className="px-6 pt-6">
              <img
                src={crew.foto_crew}
                alt={crew.nama_crew}
                className="rounded-full w-24 h-24 object-cover"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{crew.nama_crew}</h2>
              <p className="text-sm text-gray-500">{crew.no_hp}</p>
              <p className="text-xs text-gray-400 mt-1">
                Bergabung: {crew.tanggal_bergabung}
              </p>
              <div className="card-actions mt-2">
                <div
                  className={`badge text-xs font-medium ${
                    crew.status?.toLowerCase() === "aktif"
                      ? "badge badge-soft badge-success"
                      : crew.status?.toLowerCase() === "cuti"
                      ? "badge badge-soft badge-warning"
                      : "badge badge-soft badge-error"
                  }`}
                >
                  {crew.status}
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <BsPencilSquare
                  className="text-blue-500 hover:text-blue-700 cursor-pointer text-xl"
                  onClick={() => {
                    setEditingCrew(crew);
                    editModalRef.current?.showModal();
                  }}
                />
                <BiTrash
                  className="text-red-500 hover:text-red-700 cursor-pointer text-xl"
                  onClick={() => handleDelete(crew.id)}
                />
              </div>
            </div>
          </div>
        ))}
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
            disabled={currentPage === totalPages}
            className="join-item btn btn-sm btn-outline"
          >
            &gt;
          </button>
        </div>
      </div>

      {/* MODAL TAMBAH */}
      <dialog ref={formModalRef} className="modal">
        <div className="modal-box w-full max-w-md">
          <h3 className="font-bold text-lg mb-4">Form Tambah Crew</h3>
          <form
            className="space-y-4"
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.target;
              try {
                const file = form.foto.files[0];
                if (!file) return alert("Mohon unggah foto");

                const fotoUrl = await crewApi.uploadCrewFoto(file);
                const newCrew = {
                  nama_crew: form.nama.value,
                  foto_crew: fotoUrl,
                  tanggal_bergabung: form.tanggalBergabung.value,
                  no_hp: form.noHp.value,
                  status: form.status.value,
                };

                await crewApi.createCrew(newCrew);
                const updated = await crewApi.fetchCrew();
                setData(updated);
                setFilteredData(updated);
                formModalRef.current?.close();
                form.reset();
              } catch (err) {
                alert("Gagal menambah crew");
              }
            }}
          >
            <input name="nama" type="text" placeholder="Nama" className="input input-bordered w-full" required />
            <input name="foto" type="file" accept="image/*" className="file-input file-input-bordered w-full" required />
            <input name="tanggalBergabung" type="date" className="input input-bordered w-full" required />
            <input name="noHp" type="tel" placeholder="Nomor HP" className="input input-bordered w-full" required />
            <select name="status" className="select select-bordered w-full" required>
              <option value="">Pilih status</option>
              <option value="Aktif">Aktif</option>
              <option value="Cuti">Cuti</option>
              <option value="Tidak Aktif">Tidak Aktif</option>
            </select>
            <div className="modal-action">
              <button type="submit" className="btn bg-biru text-white">Simpan</button>
              <button type="button" className="btn" onClick={() => formModalRef.current?.close()}>
                Batal
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      {/* MODAL EDIT */}
      <dialog ref={editModalRef} className="modal">
        <div className="modal-box w-full max-w-md">
          <h3 className="font-bold text-lg mb-4">Edit Crew</h3>
          {editingCrew && (
            <form
              className="space-y-4"
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.target;
                try {
                  const updatedData = {
                    nama_crew: form.nama.value,
                    tanggal_bergabung: form.tanggalBergabung.value,
                    no_hp: form.noHp.value,
                    status: form.status.value,
                  };

                  if (form.foto.files.length > 0) {
                    const file = form.foto.files[0];
                    const fotoUrl = await crewApi.uploadCrewFoto(file);
                    updatedData.foto_crew = fotoUrl;
                  }

                  await crewApi.updateCrew(editingCrew.id, updatedData);

                  const updated = await crewApi.fetchCrew();
                  setData(updated);
                  setFilteredData(updated);
                  setEditingCrew(null);
                  editModalRef.current?.close();
                } catch (err) {
                  alert("Gagal update crew: " + err.message);
                }
              }}
            >
              <input name="nama" defaultValue={editingCrew.nama_crew} type="text" className="input input-bordered w-full" required />
              
              {/* Preview Foto */}
              {editingCrew.foto_crew && (
                <div className="text-center">
                  <p className="text-sm mb-1">Foto saat ini:</p>
                  <img
                    src={editingCrew.foto_crew}
                    alt="Foto saat ini"
                    className="w-24 h-24 mx-auto rounded-full object-cover"
                  />
                </div>
              )}

              <input name="foto" type="file" accept="image/*" className="file-input file-input-bordered w-full" />
              <input name="tanggalBergabung" defaultValue={editingCrew.tanggal_bergabung} type="date" className="input input-bordered w-full" required />
              <input name="noHp" defaultValue={editingCrew.no_hp} type="tel" className="input input-bordered w-full" required />
              <select name="status" defaultValue={editingCrew.status} className="select select-bordered w-full" required>
                <option value="Aktif">Aktif</option>
                <option value="Cuti">Cuti</option>
                <option value="Tidak Aktif">Tidak Aktif</option>
              </select>
              <div className="modal-action">
                <button type="submit" className="btn bg-biru text-white">Simpan Perubahan</button>
                <button type="button" className="btn" onClick={() => {
                  setEditingCrew(null);
                  editModalRef.current?.close();
                }}>
                  Batal
                </button>
              </div>
            </form>
          )}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
