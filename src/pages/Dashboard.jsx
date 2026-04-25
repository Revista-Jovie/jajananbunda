import { MdDoneAll } from "react-icons/md";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FaDollarSign } from "react-icons/fa";
import { BsFillBoxFill } from "react-icons/bs";
import PageHeader from "../components/PageHeader";
import { clientApi } from "../services/clientApi";
import { pesananApi } from "../services/pesananApi";

export default function Dashboard() {
  const [totalOrder, setTotalOrder] = useState(0);
  const [totalCompleted, setTotalCompleted] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [latestOrders, setLatestOrders] = useState([]);

  useEffect(() => {
    loadOrderData();
  }, []);

  const loadOrderData = async () => {
    try {
      const orders = await pesananApi.fetchAll();
      setTotalOrder(orders.length);

      // 1. Hitung pesanan selesai
      const completed = orders.filter(
        (o) => o.status === "Selesai" || !o.status,
      ).length;
      setTotalCompleted(completed);

      // 2. Hitung Total Pemasukan (Ganti harga_paket jadi harga)
      const total = orders.reduce((sum, item) => {
        return sum + (parseInt(item.harga) || 0);
      }, 0);
      setTotalSales(total);

      // 3. Logika Grafik (Ganti hari_acara jadi created_at)
      const salesMap = {};
      orders.forEach((order) => {
        // Ambil tanggal saja dari timestamp created_at (YYYY-MM-DD)
        const tanggal = order.created_at ? order.created_at.split("T")[0] : "N/A";
        const harga = parseInt(order.harga) || 0;
        
        if (!salesMap[tanggal]) {
          salesMap[tanggal] = 0;
        }
        salesMap[tanggal] += harga;
      });

      const chartArray = Object.entries(salesMap)
        .map(([tanggal, total]) => ({
          name: tanggal,
          value: total,
        }))
        .sort((a, b) => new Date(a.name) - new Date(b.name)); // Urutkan biar grafik gak lompat-lompat

      setChartData(chartArray);

      const sortedOrders = [...orders].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at),
      );
      setLatestOrders(sortedOrders.slice(0, 3));
    } catch (err) {
      console.error("❌ Gagal ambil data order:", err);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <PageHeader title="Dashboard" />
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        <StatCard
          icon={<BsFillBoxFill />}
          value={totalOrder}
          label="Total Pesanan"
          bgColor="bg-orders"
        />
        <StatCard
          icon={<MdDoneAll />}
          value={totalCompleted}
          label="Total Pesanan Selesai"
          bgColor="bg-done"
        />
        <StatCard
          icon={<FaDollarSign />}
          value={`Rp ${totalSales.toLocaleString("id-ID")}`}
          label="Total Pemasukan"
          bgColor="bg-sales"
        />
      </div>

      <section className="bg-white rounded-xl p-5 shadow-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold font-nunitosans text-hitam">
            Detail Pemasukan
          </h2>
          <select className="font-nunitosans border text-sm px-2 py-1 rounded-md">
            <option>All</option>
          </select>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" className="font-nunitosans text-xs" />
            <YAxis className="font-nunitosans text-xs" />
            <Tooltip
              formatter={(value) =>
                `Rp ${Number(value).toLocaleString("id-ID")}`
              }
              contentStyle={{ fontFamily: "Nunito Sans", fontSize: "0.875rem" }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#4379EE"
              strokeWidth={2}
              dot={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </section>

      <section className="bg-white rounded-xl p-5 shadow-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold font-nunitosans text-hitam">
            Pesanan Terbaru
          </h2>
          <select className="font-nunitosans border text-sm px-2 py-1 rounded-md">
            <option>All</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm font-nunitosans text-gray-700">
            <thead className="bg-gray-100 text-gray-500 text-left text-xs uppercase">
              <tr>
                <th className="px-4 py-2">Nama</th>
                <th className="px-4 py-2">Menu</th>
                <th className="px-4 py-2">Jumlah Pesanan</th>
                <th className="px-4 py-2">Total Harga</th>
                <th className="px-4 py-2">Catatan</th>
                <th className="px-4 py-2 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {latestOrders.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{item.nama_pemesan}</td>
                  <td className="px-4 py-3">{item.menu}</td>
                  <td className="px-4 py-3 text-center">{item.jumlah_pesanan}</td>
                  <td className="px-4 py-3 font-semibold text-orange-600">
                    Rp {Number(item.harga || 0).toLocaleString("id-ID")}
                  </td>
                  <td className="px-4 py-3">{item.catatan || "-"}</td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`text-[10px] uppercase font-bold px-3 py-1 rounded-full ${
                        item.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : item.status === "On Going"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {item.status || "Selesai"}
                    </span>
                  </td>
                </tr>
              ))}
              {latestOrders.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-400">
                    Belum ada order terbaru.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function StatCard({ icon, value, label, bgColor }) {
  return (
    <div className="flex justify-between items-center bg-white rounded-lg shadow-md p-4">
      <div className="flex flex-col items-start">
        <p className="text-gray-400 text-sm font-nunitosans">{label}</p>
        <p className="text-2xl font-bold font-nunitosans">{value}</p>
      </div>
      <div className={`rounded-full p-4 text-3xl text-white ${bgColor}`}>
        {icon}
      </div>
    </div>
  );
}