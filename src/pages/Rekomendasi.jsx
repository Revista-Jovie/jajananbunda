import React, { useState } from "react";
import PageHeader from "../components/PageHeader";

export default function Rekomendasi() {
  const [dataForm, setDataForm] = useState({
    lokasi: "",
    jumlah_tamu: "",
    harga_paket: "",
  });
  const [loading, setLoading] = useState(false);
  const [hasil, setHasil] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setHasil(null);

    try {
      const response = await fetch(
        "https://d9a43ea04485.ngrok-free.app/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
          body: JSON.stringify({
            lokasi: dataForm.lokasi,
            jumlah_tamu: parseInt(dataForm.jumlah_tamu),
            harga_paket: parseInt(dataForm.harga_paket),
          }),
        }
      );

      const result = await response.json();

      if (result.error) {
        setError(result.error);
      } else {
        console.log("✅ Response:", result);
        console.log("🎨 Grafik:", result.grafik_base64?.slice(0, 100)); // debug
        setHasil(result);
      }
    } catch (err) {
      console.error("❌ Fetch error:", err);
      setError(
        "Gagal mengambil prediksi. Pastikan server berjalan dan endpoint /predict aktif."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full px-6 py-6">
      <PageHeader title="Rekomendasi Paket" /> 
      {/* Form Input */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Isi Data untuk Mendapatkan Rekomendasi
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            name="lokasi"
            value={dataForm.lokasi}
            onChange={handleChange}
            required
            className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200"
          >
            <option value="">-- Pilih Lokasi Acara --</option>
            {/* Tambahkan opsi lokasi seperti sebelumnya */}
            <option value="Gedung Korem">Gedung Korem</option>
            <option value="Gedung Bayangkari">Gedung Bayangkari</option>
            <option value="Ballroom 2 Mayang Garden (Belakang)">
              Ballroom 2 Mayang Garden (Belakang)
            </option>
            <option value="Graha Pena Lantai 11">Graha Pena Lantai 11</option>
            <option value="Gedung Serbaguna Rumbai">
              Gedung Serbaguna Rumbai
            </option>
            <option value="Gedung BAPELKES">Gedung BAPELKES</option>
            <option value="Susiana Tabrani Hall 1 & Hall 2">
              Susiana Tabrani Hall 1 & Hall 2
            </option>
            <option value="Gedung Widya Maharani">Gedung Widya Maharani</option>
            <option value="Graha Permata">Graha Permata</option>
            <option value="Graha Pena Lantai 2 atau Lantai 6">
              Graha Pena Lantai 2 atau Lantai 6
            </option>
            <option value="Ballroom Royal Asnof">Ballroom Royal Asnof</option>
            <option value="Gedung AURI">Gedung AURI</option>
            <option value="Ballroom New Hollywood Hotel">
              Ballroom New Hollywood Hotel
            </option>
            <option value="Gedung Dharma Wanita Prov. Riau">
              Gedung Dharma Wanita Prov. Riau
            </option>
            <option value="Ballroom 1 Mayang Garden (Depan)">
              Ballroom 1 Mayang Garden (Depan)
            </option>
            <option value="Gedung PU Riau">Gedung PU Riau</option>
            <option value="Gedung PASKHAS Pulanggeni">
              Gedung PASKHAS Pulanggeni
            </option>
            <option value="Aula UPT Pertanian">Aula UPT Pertanian</option>
            <option value="Susiana Tabrani Hall 1">
              Susiana Tabrani Hall 1
            </option>
            <option value="Gedung BRIMOB">Gedung BRIMOB</option>
            <option value="Gedung Serbaguna PCR">Gedung Serbaguna PCR</option>
          </select>

          <input
            type="number"
            name="jumlah_tamu"
            value={dataForm.jumlah_tamu}
            onChange={handleChange}
            placeholder="Jumlah Tamu"
            required
            className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200"
          />

          <input
            type="number"
            name="harga_paket"
            value={dataForm.harga_paket}
            onChange={handleChange}
            placeholder="Harga Paket (Rp)"
            required
            className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200"
          />

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                Memprediksi...
              </>
            ) : (
              "Lihat Rekomendasi"
            )}
          </button>
        </form>
      </div>
      {/* Hasil Rekomendasi */}
      {hasil && (
        <div className="bg-white rounded-2xl shadow-lg p-6 mt-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            🎯 Rekomendasi Paket: {hasil.rekomendasi_paket}
          </h3>

          {/* Tampilkan grafik dari backend */}
          {hasil.grafik_base64 && (
            <img
              src={`data:image/png;base64,${hasil.grafik_base64}`}
              alt="Visualisasi Grafik"
              className="mt-4 rounded-xl border"
            />
          )}
        </div>
      )}
      {/* Error */}
      {error && <div className="text-red-500 font-medium mt-4">{error}</div>}
    </div>
  );
}
