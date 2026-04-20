import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

export default function OrderDetail() {
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch("/order.json")
      .then((res) => {
        if (!res.ok) throw new Error("Gagal mengambil data")
        return res.json()
      })
      .then((data) => {
        const found = data.find((item) => item.id === parseInt(id))
        setOrder(found || null)
      })
      .catch((err) => setError(err.message))
  }, [id])

  if (error) return <div className="p-4 text-red-600">{error}</div>
  if (!order) return <div className="p-4">Loading atau order tidak ditemukan...</div>

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg max-w-md mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-2">{order.pemesan.nama}</h2>
      <p className="text-gray-600 mb-1">
        <strong>Calon Pengantin Wanita : </strong> {order.pengantin.wanita}
      </p>
      <p className="text-gray-600 mb-1">
        <strong>Calon Pengantin Pria : </strong> {order.pengantin.pria}
      </p>
      <p className="text-gray-600 mb-1">
        <strong>No. HP :</strong> {order.pemesan.noHp}
      </p>
      <p className="text-gray-600 mb-1">
        <strong>Pilihan Paket : </strong> {order.paket}
      </p>
      <p className="text-gray-600 mb-1">
        <strong>Hari Acara : </strong> {order.hariAcara}
      </p>
    </div>
  )
}
