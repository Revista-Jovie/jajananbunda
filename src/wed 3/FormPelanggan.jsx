import InputField from "./components/InputField";
import TipeError from "./components/TipeError";
import { useState, useEffect } from "react";

export default function FormPelanggan() {
  const [name, setName] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [pilihan, setPilihan] = useState("");
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    validate();
  }, [name, jumlah, pilihan]);

  if (name === "") {
    setErrors("Wajib Diisi!!");
  } else if (/[^a-zA-Z\s]/.test(name)) {
    setErrors("Nama tidak boleh angka atau karakter!");
  }

  if (jumlah === "") {
    setErrors("Wajib Diisi!!");
  } else if (!/^-?\d+$/.test(jumlah)) {
    setErrors("Harus Berupa Bilangan Bulat!");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 p-5">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-96 border border-blue-300 transform hover:scale-105 transition duration-300 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-100 to-transparent opacity-50 rounded-3xl"></div>

        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600 relative z-10">
          Pemesanan Undangan Pernikahan
        </h2>

        <div className="relative z-10">
          <div className="mb-4">
            <InputField
              label="nama"
              type="text"
              placeholder="Masukkan Nama Anda..."
              onChange={(e) => setName(e.target.value)}
            />
            {errors && <TipeError label={errors} />}
          </div>

          <div className="mb-4">
            <InputField
              label="Jumlah Pesanan"
              type="number"
              placeholder="Masukkan Jumlah Pesanan Anda..."
              onChange={(e) => setJumlah(e.target.value)}
            />
            {errors && <TipeError label={errors} />}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Tipe Undangan
            </label>
            <select
              className="w-full p-3 border rounded-lg bg-blue-50 border-blue-300 text-gray-700 focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setPilihan(e.target.value)}
            >
              <option value="wedding">Classic</option>
              <option value="engagement">Elegan</option>
              <option value="engagement">Elegan</option>
            </select>
          </div>

          <button
            className={`w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg text-lg font-semibold transition duration-300 shadow-lg ${
              !isValid ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={validate}
            disabled={!isValid}
          >
            Pesan
          </button>
        </div>
      </div>
    </div>
  );
}
