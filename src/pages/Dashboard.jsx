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
import { FaBan, FaDollarSign, FaEnvelope } from "react-icons/fa";
import { BsFillBoxFill } from "react-icons/bs";
import PageHeader from "../components/PageHeader";
import { clientApi } from "../services/clientApi";
import { orderApi } from "../services/orderApi";
import emailjs from '@emailjs/browser';

export default function Dashboard() {
  const [totalUser, setTotalUser] = useState(0);
  const [totalOrder, setTotalOrder] = useState(0);
  const [totalCompleted, setTotalCompleted] = useState(0); // State baru untuk pesanan selesai
  const [totalCanceled, setTotalCanceled] = useState(0);   // State baru untuk pesanan batal
  const [totalSales, setTotalSales] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [latestOrders, setLatestOrders] = useState([]);
  const [clients, setClients] = useState([]);
  const [isSendingEmail, setIsSendingEmail] = useState(false); // State untuk loading tombol email

  useEffect(() => {
    loadClientData();
    loadOrderData();
  }, []);

  const loadClientData = async () => {
    try {
      const users = await clientApi.fetchAll();
      setTotalUser(users.length);
      setClients(users);
    } catch (err) {
      console.error("❌ Gagal ambil data client:", err);
    }
  };

  const loadOrderData = async () => {
    try {
      const orders = await orderApi.fetchAll();
      setTotalOrder(orders.length);

      // Hitung pesanan selesai dan batal
      const completed = orders.filter(o => o.status === "Selesai" || !o.status).length;
      const canceled = orders.filter(o => o.status === "Canceled").length;
      setTotalCompleted(completed);
      setTotalCanceled(canceled);

      const total = orders.reduce((sum, item) => {
        // Hanya hitung pemasukan jika statusnya bukan canceled (opsional, sesuaikan bisnis logikamu)
        if (item.status !== "Canceled") {
          return sum + (parseInt(item.harga_paket) || 0);
        }
        return sum;
      }, 0);
      setTotalSales(total);

      const salesMap = {};
      orders.forEach((order) => {
        if (order.status !== "Canceled") {
          const tanggal = order.hari_acara;
          const harga = parseInt(order.harga_paket) || 0;
          if (!salesMap[tanggal]) {
            salesMap[tanggal] = 0;
          }
          salesMap[tanggal] += harga;
        }
      });

      const chartArray = Object.entries(salesMap).map(([tanggal, total]) => ({
        name: tanggal,
        value: total,
      }));

      setChartData(chartArray);

      const sortedOrders = [...orders].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setLatestOrders(sortedOrders.slice(0, 3));
    } catch (err) {
      console.error("❌ Gagal ambil data order:", err);
    }
  };

  const handleSendPromotionalEmail = async () => {
    if (clients.length === 0) {
      alert("⚠️ Tidak ada data client untuk dikirim email.");
      return;
    }

    setIsSendingEmail(true); // Mulai loading
    let successCount = 0;

    for (const client of clients) {
      if (!client.email) continue;

      try {
        const templateParams = {
          name: client.nama_client || "Pelanggan",
          email: client.email,
        };

        await emailjs.send(
          "service_cdelfid",
          "template_9rdnzxd",
          templateParams,
          "xU7SYfICZGd2Hrt8s"
        );

        successCount++;
        console.log(`✅ Email dikirim ke: ${client.email}`);
      } catch (error) {
        console.error(`❌ Gagal kirim ke ${client.email}:`, error);
      }
    }
  };

  return (
    <div className="w-full px-6 py-5 md:px-10 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <PageHeader title="Dashboard" />
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={<BsFillBoxFill />}
          value={totalOrder}
          label="Total Pesanan"
          bgColor="bg-orders"
        />
        <StatCard
          icon={<MdDoneAll/>}
          value={totalCompleted} // Menggunakan state yang benar
          label="Total Pesanan Selesai"
          bgColor="bg-done"
        />
        <StatCard
          icon={<FaBan />}
          value={totalCanceled} // Menggunakan state yang benar
          label="Total Pesanan Batal"
          bgColor="bg-cancel"
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
              dot={false}
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
                <th className="px-4 py-2">No HP</th>
                <th className="px-4 py-2">Menu</th>
                <th className="px-4 py-2">Jumlah Pesanan</th>
                <th className="px-4 py-2">Catatan</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {latestOrders.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{item.nama_pemesan}</td>
                  <td className="px-4 py-3">{item.no_hp || "-"}</td> {/* Diperbaiki */}
                  <td className="px-4 py-3">{item.paket}</td>
                  <td className="px-4 py-3">
                    Rp {parseInt(item.harga_paket).toLocaleString("id-ID")}
                  </td>
                  <td className="px-4 py-3">{item.catatan || "-"}</td> {/* Diperbaiki */}
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        item.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : item.status === "Canceled"
                          ? "bg-red-100 text-red-700"
                          : "bg-emerald-100 text-emerald-700"
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