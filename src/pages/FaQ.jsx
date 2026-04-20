import React, { useState, useEffect, useRef } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import PageHeader from "../components/PageHeader";
import { faqApi } from "../services/faqApi";
import { BiTrash } from "react-icons/bi";

export default function FaQ() {
  const [faqs, setFaqs] = useState([]);
  const [query, setQuery] = useState("");
  const [filteredFaqs, setFilteredFaqs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);

  const addModalRef = useRef();
  const editModalRef = useRef();

  const itemsPerPage = 10;

  const loadFaqs = async () => {
    try {
      setLoading(true);
      const data = await faqApi.fetchFaq();
      setFaqs(data);
      setFilteredFaqs(data);
    } catch (err) {
      alert("Gagal memuat FaQ: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFaqs();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const filtered = query
        ? faqs.filter((item) =>
            item.pertanyaan.toLowerCase().includes(query.toLowerCase())
          )
        : faqs;
      setFilteredFaqs(filtered);
      setCurrentPage(1);
    }, 300);
    return () => clearTimeout(timeout);
  }, [query, faqs]);

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus FaQ ini?")) return;
    try {
      await faqApi.deleteFaq(id);
      loadFaqs();
    } catch (err) {
      alert("Gagal menghapus FaQ");
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredFaqs.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredFaqs.length / itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <PageHeader title="FAQ" />
        <div className="flex gap-4 items-center">
          <input
            type="text"
            className="input input-bordered rounded-full w-60"
            placeholder="Cari pertanyaan"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="btn bg-biru text-white hover:bg-blue-700"
            onClick={() => addModalRef.current?.showModal()}
          >
            Tambah FaQ
          </button>
        </div>
      </div>

      {/* TABEL */}
      <div className="overflow-x-auto shadow rounded-xl">
        <table className="table w-full">
          <thead className="bg-blue-600 text-white text-sm text-center">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3 text-left">Pertanyaan</th>
              <th className="px-4 py-3 text-left">Jawaban</th>
              <th className="px-4 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white text-gray-800 text-sm">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-400">
                  Tidak ada data FaQ.
                </td>
              </tr>
            ) : (
              paginatedData.map((item, i) => (
                <tr key={item.id} className="hover:bg-gray-100">
                  <td className="text-center">{startIndex + i + 1}</td>
                  <td className="text-left">{item.pertanyaan}</td>
                  <td className="text-left">{item.jawaban}</td>
                  <td className="text-center">
                    <div className="flex justify-center gap-3">
                      <BsPencilSquare
                        className="text-blue-500 cursor-pointer hover:text-blue-700 text-xl"
                        onClick={() => {
                          setEditingFaq(item);
                          editModalRef.current?.showModal();
                        }}
                      />
                      <BiTrash
                        className="text-red-500 cursor-pointer hover:text-red-700 text-xl"
                        onClick={() => handleDelete(item.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-between items-center mt-6">
        <div className="text-sm text-gray-500">
          Showing {startIndex + 1}-{Math.min(endIndex, filteredFaqs.length)} dari {filteredFaqs.length}
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
      <dialog ref={addModalRef} className="modal">
        <div className="modal-box w-full max-w-md">
          <h3 className="font-bold text-lg mb-4">Tambah FaQ</h3>
          <form
            className="space-y-4"
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.target;
              try {
                await faqApi.createFaq({
                  pertanyaan: form.pertanyaan.value,
                  jawaban: form.jawaban.value,
                });
                form.reset();
                addModalRef.current?.close();
                loadFaqs();
              } catch (err) {
                alert("Gagal menambah FaQ");
              }
            }}
          >
            <input name="pertanyaan" placeholder="Pertanyaan" className="input input-bordered w-full" required />
            <textarea name="jawaban" placeholder="Jawaban" className="textarea textarea-bordered w-full" rows={3} required />
            <div className="modal-action">
              <button type="submit" className="btn bg-biru text-white">Simpan</button>
              <button type="button" className="btn" onClick={() => addModalRef.current?.close()}>
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
          <h3 className="font-bold text-lg mb-4">Edit FaQ</h3>
          {editingFaq && (
            <form
              className="space-y-4"
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.target;
                try {
                  await faqApi.updateFaq(editingFaq.id, {
                    pertanyaan: form.pertanyaan.value,
                    jawaban: form.jawaban.value,
                  });
                  setEditingFaq(null);
                  editModalRef.current?.close();
                  loadFaqs();
                } catch (err) {
                  alert("Gagal update FaQ");
                }
              }}
            >
              <input name="pertanyaan" defaultValue={editingFaq.pertanyaan} className="input input-bordered w-full" required />
              <textarea name="jawaban" defaultValue={editingFaq.jawaban} className="textarea textarea-bordered w-full" rows={3} required />
              <div className="modal-action">
                <button type="submit" className="btn bg-blue-600 text-white">Simpan</button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => {
                    setEditingFaq(null);
                    editModalRef.current?.close();
                  }}
                >
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
