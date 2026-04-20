import { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import Table from "../../components/Table";

export default function Undangan() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/undangan.json") // Pastikan path ini benar
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error loading the data:", error));
  }, []);

  return (
    <div className="p-4 md:p-8">
      <PageHeader title="Undangan" /> 
      <Table data={data} type="undangan" /> {/* Mengirimkan tipe undangan */}
    </div>
  );
}
