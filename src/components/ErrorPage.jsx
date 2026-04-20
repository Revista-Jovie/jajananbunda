import React from 'react';

const errorDetails = {
  400: {
    image: "/img/400.png",
  },
  401: {
    image: "/img/401.png",
  },
  403: {
    image: "/img/403.png",
  },
};

export default function ErrorPage({ kode }) {
  const error = errorDetails[kode] || errorDetails[400];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center">
      <img
        src={error.image}
        alt={`Error ${kode}`}
        className="mt-6"
      />
    </div>
  );
}
