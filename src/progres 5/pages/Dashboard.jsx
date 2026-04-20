import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FaBan, FaDollarSign } from "react-icons/fa";
import { BsPeople, BsFillBoxFill } from "react-icons/bs";
import PageHeader from "../components/PageHeader";

export default function Dashboard() {
  return (
    <div className="p-5 space-y-6">
      <PageHeader />

      {/* 4 Statistic Cards */}
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={<BsPeople />}
          value="40,689"
          label="Total User"
          bgColor="bg-users"
        />
        <StatCard
          icon={<BsFillBoxFill />}
          value="10,293"
          label="Total Order"
          bgColor="bg-orders"
        />
        <StatCard
          icon={<FaDollarSign />}
          value="$89,000"
          label="Total Sales"
          bgColor="bg-sales"
        />
        <StatCard
          icon={<FaBan />}
          value="2040"
          label="Total Cancel"
          bgColor="bg-cancel"
        />
      </div>

      {/* Sales Details */}
      <div className="bg-white rounded-xl p-5 shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold font-nunitosans text-hitam">
            Sales Details
          </h2>
          <select className="font-nunitosans border text-sm px-2 py-1 rounded-md">
            <option>October</option>
            <option>November</option>
          </select>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart
            data={[
              { name: "10k", value: 30 },
              { name: "15k", value: 45 },
              { name: "20k", value: 100 },
              { name: "25k", value: 60 },
              { name: "30k", value: 80 },
              { name: "35k", value: 40 },
              { name: "40k", value: 90 },
              { name: "45k", value: 70 },
              { name: "50k", value: 65 },
              { name: "55k", value: 60 },
            ]}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#4379EE"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Latest Orders */}
      <div className="bg-white rounded-xl p-5 shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold font-nunitosans text-hitam">
            Latest Orders
          </h2>
          <select className="font-nunitosans border text-sm px-2 py-1 rounded-md">
            <option>October</option>
            <option>November</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead>
              <tr className="font-nunitosans text-abu border-b">
                <th className="py-2 ">Name</th>
                <th className="py-2">Category</th>
                <th className="py-2">Amount</th>
                <th className="py-2">Price</th>
                <th className="py-2">Contact</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50 font-nunitosans">
                <td className="py-3 flex items-center gap-2">Revista Jovie</td>
                <td>Invitation</td>
                <td>1000</td>
                <td>Rp 1.000.000</td>
                <td>089623409810</td>
                <td>
                  <span className="bg-status text-white px-3 py-1 text-xs rounded-full flex items-center gap-1 w-max">
                    Delivered
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

//Reusable Stat Card
function StatCard({ icon, value, label, bgColor }) {
  return (
    <div className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4">
      <div className={`rounded-full p-4 text-3xl text-white ${bgColor}`}>
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-2xl font-bold font-nunitosans">{value}</span>
        <span className="text-gray-400 font-nunitosans">{label}</span>
      </div>
    </div>
  );
}
