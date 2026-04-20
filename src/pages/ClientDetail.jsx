import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

export default function ClientDetail() {
  const { id } = useParams()
  const [customer, setCustomer] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch("/customers.json")
      .then((res) => {
        if (!res.ok) throw new Error("Gagal mengambil data")
        return res.json()
      })
      .then((data) => {
        const found = data.find((item) => item.id === parseInt(id))
        setCustomer(found || null)
      })
      .catch((err) => setError(err.message))
  }, [id])

  if (error) return <div className="p-4 text-red-600">{error}</div>
  if (!customer) return <div className="p-4">Loading atau customer tidak ditemukan...</div>

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg max-w-md mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-2">{customer.nama}</h2>
      <p className="text-gray-600 mb-1">
        <strong>Jenis Kelamin:</strong> {customer.jenisKelamin}
      </p>
      <p className="text-gray-600 mb-1">
        <strong>Email:</strong> {customer.kontak.email}
      </p>
      <p className="text-gray-600 mb-1">
        <strong>No. HP:</strong> {customer.kontak.noHp}
      </p>
    </div>
  )
}
