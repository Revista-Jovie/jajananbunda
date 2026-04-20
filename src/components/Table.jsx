import TableRow from "./TableRow";

const Tabel = ({ data, type }) => {
  const headers = {
    customer: ["No", "Nama", "Jenis Kelamin", "Email", "No HP"],
    undangan: ["No", "Nama Pemesan", "Jumlah", "Kategori", "Tanggal Pesan", "Estimasi", "Tipe Kertas", "Ukuran", "Total Harga", "Gambar"],
    stok: ["No", "Nama Produk", "Kategori", "Stok Tersisa"]
  };

  return (
    <div className="overflow-x-auto rounded-xl shadow-md border border-gray-200">
      <table className="min-w-full table-auto bg-white">
        <thead>
          <tr className="bg-gradient-to-r from-gray-100 to-gray-200 text-center text-sm font-semibold font-nunitosans text-gray-700">
            {headers[type]?.map((header, index) => (
              <th key={index} className="px-4 py-3 border">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <TableRow key={index} item={item} index={index} type={type} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tabel;
