const TableRow = ({ item, index, type }) => {
  // Fungsi untuk menentukan style badge jenis kelamin
  const getGenderBadge = (gender) => {
    const base = "px-3 py-1 rounded-full text-xs font-semibold";
    switch (gender.toLowerCase()) {
      case "laki-laki":
        return `${base} bg-blue-100 text-blue-700`;
      case "perempuan":
        return `${base} bg-pink-100 text-pink-700`;
      default:
        return `${base} bg-gray-100 text-gray-700`;
    }
  };

  return (
    <tr className={`text-sm text-gray-700 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100`}>
      <td className="px-4 py-2 border text-center">{index + 1}</td>

      {type === "undangan" && (
        
        <>
          <td className="px-4 py-2 border text-center">{item.namaPemesan}</td>
          <td className="px-4 py-2 border text-center">{item.jumlahPesanan}</td>
          <td className="px-4 py-2 border text-center">{item.kategori.jenis}</td>
          <td className="px-4 py-2 border text-center">{item.time.tanggalPesan}</td>
          <td className="px-4 py-2 border text-center">{item.time.estimasi}</td>
          <td className="px-4 py-2 border text-center">{item.kategori.tipeKertas}</td>
          <td className="px-4 py-2 border text-center">{item.kategori.ukuranKertas}</td>
          <td className="px-4 py-2 border text-center">{item.details.harga ?? "-"}</td>
          <td className="px-4 py-2 border text-center">
            <img src={item.details.gambar + ".jpg"} alt="undangan" className="w-16 h-auto mx-auto rounded shadow-sm" />
          </td>
        </>
      )}

      {type === "customer" && (
        <>
          <td className="px-4 py-2 border text-center">{item.nama}</td>
          <td className="px-4 py-2 border text-center">
            <span className={getGenderBadge(item.jenisKelamin)}>
              {item.jenisKelamin}
            </span>
          </td>
          <td className="px-4 py-2 border text-center">{item.kontak.email}</td>
          <td className="px-4 py-2 border text-center">{item.kontak.noHp}</td>
        </>
      )}

      {type === "stok" && (
        <>
          <td className="px-4 py-2 border text-center">{item.namaProduk}</td>
          <td className="px-4 py-2 border text-center">{item.kategori}</td>
          <td className="px-4 py-2 border text-center">{item.stok}</td>
        </>
      )}

      {/* tambahkan tipe lain jika ada */}
    </tr>
  );
};

export default TableRow;
