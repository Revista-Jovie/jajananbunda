import data from "./framework.json";

export default function FrameworkList() {
  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Daftar Pesanan Undangan
      </h1>

      <div className="overflow-x-auto rounded-xl shadow-md border border-gray-200">
        <table className="min-w-full table-auto bg-white">
          <thead>
            <tr className="bg-gradient-to-r from-gray-100 to-gray-200 text-center text-sm font-semibold text-gray-700">
              <th className="px-4 py-3 border">No</th>
              <th className="px-4 py-3 border">Nama Pemesan</th>
              <th className="px-4 py-3 border">Jumlah</th>
              <th className="px-4 py-3 border">Kategori</th>
              <th className="px-4 py-3 border">Tanggal Pesan</th>
              <th className="px-4 py-3 border">Estimasi</th>
              <th className="px-4 py-3 border">Tipe Kertas</th>
              <th className="px-4 py-3 border">Ukuran</th>
              <th className="px-4 py-3 border">Total Harga</th>
              <th className="px-4 py-3 border">Gambar</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                className={`text-sm text-gray-700 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100`}
              >
                <td className="px-4 py-2 border text-center">{index + 1}</td>
                <td className="px-4 py-2 border text-center">{item.namaPemesan}</td>
                <td className="px-4 py-2 border text-center">
                  {item.jumlahPesanan}
                </td>
                <td className="px-4 py-2 border text-center">{item.kategori}</td>
                <td className="px-4 py-2 border text-center">
                  {item.tanggalPesan}
                </td>
                <td className="px-4 py-2 border text-center">
                  {item.estimasi}
                </td>
                <td className="px-4 py-2 border text-center">{item.details.tipeKertas}</td>
                <td className="px-4 py-2 border text-center">{item.details.ukuranKertas}</td>
                <td className="px-4 py-2 border text-center">
                  {item.details.harga ?? "-"}
                </td>
                <td className="px-4 py-2 border text-center">
                  <img
                    src={item.details.gambar + ".jpg"}
                    alt="undangan"
                    className="w-16 h-auto mx-auto rounded shadow-sm"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
