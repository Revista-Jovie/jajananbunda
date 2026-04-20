import { useState } from "react";
import InputField from "./components/InputField";

export default function HitungDP() {
  const [hargaAwal, setHargaAwal] = useState("");
  const [jumlahDP, setJumlahDP] = useState("");
  const sisaPembayaran = hargaAwal && jumlahDP ? hargaAwal - jumlahDP : 0;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 p-5">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-96 border border-blue-300 transform hover:scale-105 transition duration-300 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-100 to-transparent opacity-50 rounded-3xl"></div>

        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600 relative z-10">Hitung DP</h2>

        <div className="relative z-10">
          <div className="mb-3">
            <InputField 
              label="Harga Awal" 
              type="number" 
              placeholder="Masukkan harga awal gaun..." 
              onChange={(e) => setHargaAwal(parseFloat(e.target.value) || "")} 
            />
          </div>
          <div className="mb-4">
            <InputField 
              label="Nominal DP" 
              type="number" 
              placeholder="Masukkan nominal DP..." 
              onChange={(e) => setJumlahDP(parseFloat(e.target.value) || "")} 
            />
          </div>

          {!hargaAwal || !jumlahDP || hargaAwal < jumlahDP ? (
            <div className="mt-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-lg">
              <p className="font-semibold">DP tidak boleh lebih besar dari harga awal</p>
            </div>
          ) : (
            <div className="mt-4 p-3 bg-blue-100 border-l-4 border-blue-500 text-blue-700 rounded-lg">
              <p className="font-semibold">Sisa Pembayaran : Rp {sisaPembayaran.toLocaleString()}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}