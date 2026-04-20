import frameworkData from "./framework.json";
import { useState } from "react";

export default function FrameworkListFilter() {
  const [dataForm, setDataForm] = useState({
    searchTerm: "",
    selectedKategori: "",
    selectedTanggal: "",
    //selectedHarga: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const allKategori = [...new Set(frameworkData.map((item) => item.kategori))];

  const _searchTerm = dataForm.searchTerm.toLowerCase();
  const filteredData = frameworkData.filter((item) => {
    const matchesSearch =
      item.namaPemesan.toLowerCase().includes(_searchTerm) ||
      item.kategori.toLowerCase().includes(_searchTerm);

    const matchesKategori = dataForm.selectedKategori
      ? item.kategori === dataForm.selectedKategori
      : true;

    const matchesTanggal = dataForm.selectedTanggal
      ? item.tanggalPesan === dataForm.selectedTanggal
      : true;

    // const matchesHarga = (() => {
    //   const harga = parseInt(item.details.harga, 10);
    //   if (!dataForm.selectedHarga) return true;
    //   if (dataForm.selectedHarga === "low") return harga < 5000;
    //   if (dataForm.selectedHarga === "mid")
    //     return harga >= 5000 && harga <= 10000;
    //   if (dataForm.selectedHarga === "high") return harga > 10000;
    //   return true;
    // })();

    return matchesSearch && matchesKategori && matchesTanggal ; //&& matchesHarga
  });

  const handleEdit = (index) => {
    alert(`Edit data ke-${index + 1}`);
  };

  const handleDelete = (index) => {
    const confirmDelete = window.confirm(
      `Apakah yakin ingin menghapus data ke-${index + 1}?`
    );
    if (confirmDelete) {
      alert("Data berhasil dihapus (simulasi)");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Daftar Pesanan Undangan</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + Tambah Data
        </button>
      </div>

      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          name="searchTerm"
          placeholder="Cari nama atau kategori..."
          className="p-2 border border-gray-300 rounded w-full"
          onChange={handleChange}
          value={dataForm.searchTerm}
        />

        <select
          name="selectedKategori"
          className="p-2 border border-gray-300 rounded w-full"
          onChange={handleChange}
          value={dataForm.selectedKategori}
        >
          <option value="">Semua Kategori</option>
          {allKategori.map((kategori, index) => (
            <option key={index} value={kategori}>
              {kategori}
            </option>
          ))}
        </select>

        <input
          type="date"
          name="selectedTanggal"
          className="p-2 border border-gray-300 rounded w-full"
          onChange={handleChange}
          value={dataForm.selectedTanggal}
        />

        {/* <select
          name="selectedHarga"
          className="p-2 border border-gray-300 rounded w-full"
          onChange={handleChange}
          value={dataForm.selectedHarga}
        >
          <option value="">Semua Harga</option>
          <option value="low">Kurang dari Rp5.000</option>
          <option value="mid">Rp5.000 - Rp10.000</option>
          <option value="high">Lebih dari Rp10.000</option>
        </select> */}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-center text-sm font-semibold text-gray-700">
              <th className="px-4 py-2 border">No</th>
              <th className="px-4 py-2 border">Nama Pemesan</th>
              <th className="px-4 py-2 border">Jumlah</th>
              <th className="px-4 py-2 border">Kategori</th>
              <th className="px-4 py-2 border">Tanggal Pesan</th>
              <th className="px-4 py-2 border">Estimasi</th>
              <th className="px-4 py-2 border">Tipe Kertas</th>
              <th className="px-4 py-2 border">Ukuran</th>
              <th className="px-4 py-2 border">Total Harga</th>
              <th className="px-4 py-2 border">Gambar</th>
              <th className="px-4 py-2 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr
                  key={index}
                  className={`text-sm text-gray-700 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100`}
                >
                  {" "}
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{item.namaPemesan}</td>
                  <td className="px-4 py-2 border">{item.jumlahPesanan}</td>
                  <td className="px-4 py-2 border">{item.kategori}</td>
                  <td className="px-4 py-2 border">{item.tanggalPesan}</td>
                  <td className="px-4 py-2 border">{item.estimasi}</td>
                  <td className="px-4 py-2 border">
                    {item.details.tipeKertas}
                  </td>
                  <td className="px-4 py-2 border">
                    {item.details.ukuranKertas}
                  </td>
                  <td className="px-4 py-2 border">Rp{item.details.harga}</td>
                  <td className="px-4 py-2 border">
                    <img
                      src={item.details.gambar + ".jpg"}
                      alt="undangan"
                      className="w-16 h-auto mx-auto rounded-md"
                    />
                  </td>
                  <td className="px-4 py-2 border space-x-2">
                    <button
                      onClick={() => handleEdit(index)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="text-center py-4 text-gray-500" colSpan={11}>
                  Tidak ada data ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
