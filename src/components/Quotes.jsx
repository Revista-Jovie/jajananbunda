import React, { useEffect, useState } from "react";
import axios from "axios";

const Quotes = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://api.adviceslip.com/advice")
      .then((res) => {
        setQuote(res.data.slip.advice);
        setAuthor("—");
      })
      .catch((err) => {
        setError("Gagal mengambil quote");
      });
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4 max-w-md mx-auto mt-10 border rounded shadow">
      <h1 className="text-xl font-bold mb-2">Inspirational Quote</h1>
      {quote ? (
        <>
          <p className="italic">"{quote}"</p>
          <p className="mt-2 text-right">- {author}</p>
        </>
      ) : (
        <p className="text-gray-500">Loading...</p>
      )}
    </div>
  );
};

export default Quotes;
