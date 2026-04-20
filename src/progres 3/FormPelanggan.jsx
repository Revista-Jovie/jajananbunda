import { useState, useEffect } from "react";
import InputField from "./components/InputField";

export default function FormPelanggan() {
  const [name, setName] = useState("");
  const [jumlah, setJumlah] = useState("");
  // const [dressType, setDressType] = useState("wedding");
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    validate();
  }, [name, jumlah]);

  const validate = () => {
    let newErrors = {};
    if (!name.trim()) {
      newErrors.name = "Wajib Diisi!";
    } else if (/\d/.test(name)) {
      newErrors.name = "Harus Berupa Kalimat";
    }

    if (!jumlah.trim()) {
      newErrors.jumlah = "Wajib Diisi!";
    } else if (!/^-?\d+$/.test(jumlah)) {
      newErrors.jumlah = "Harus Berupa Bilangan Bulat";
    }

    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 p-5">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-96 border border-blue-300 transform hover:scale-105 transition duration-300 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-100 to-transparent opacity-50 rounded-3xl"></div>
        
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600 relative z-10">Pemesanan Undangan Pernikahan</h2>

        <div className="relative z-10">
          <div className="mb-4">
            <InputField 
              label="Nama" 
              type="text" 
              placeholder="Masukkan Nama Anda..." 
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          
          <div className="mb-4">
            <InputField 
              label="Jumlah Pesanan" 
              type="number" 
              placeholder="Masukkan Jumlah Pesanan Anda..."
              onChange={(e) => setJumlah(e.target.value)}
            />
            {errors.jumlah && <p className="text-red-500 text-sm">{errors.jumlah}</p>}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Tipe Undangan</label>
            <select 
              className="w-full p-3 border rounded-lg bg-blue-50 border-blue-300 text-gray-700 focus:ring-2 focus:ring-blue-400"
            >
              <option value="wedding">Elegan</option>
              <option value="engagement">Classic</option>
            </select>
          </div>

          <button 
            className={`w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg text-lg font-semibold transition duration-300 shadow-lg ${!isValid ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={validate}
            disabled={!isValid}   
          >
            Daftar
          </button>
        </div>
      </div>
    </div>
  );
}