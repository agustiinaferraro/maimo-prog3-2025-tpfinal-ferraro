'use client'

import { useState, useEffect } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Calendario = () => {
  const [imgSrc, setImgSrc] = useState("/img/calendario.jpeg");

  useEffect(() => {
    fetch(`${API_URL}/calendario-image`)
      .then((res) => {
        if (res.ok) setImgSrc(`${API_URL}/calendario-image?t=${Date.now()}`);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="mx-auto max-w-[90vw] sm:max-w-[70vw] md:max-w-[50vw] m-5">
        <a href={imgSrc} target="_blank" rel="noopener noreferrer">
          <img
            src={imgSrc}
            alt="Calendario"
            className="w-full h-auto object-cover transition-transform duration-200 transform hover:scale-105 active:scale-95 rounded-lg"
          />
        </a>
      </div>
    </div>
  );
}

export default Calendario;
