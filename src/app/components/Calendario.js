'use client'

import { useState, useEffect } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Calendario = () => {
  const [imgSrc, setImgSrc] = useState("/img/calendario.jpeg");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const ts = Date.now();
    setImgSrc(`${API_URL}/calendario-image?t=${ts}`);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="mx-auto max-w-[90vw] sm:max-w-[70vw] md:max-w-[50vw] m-5">
        <a href={imgSrc} target="_blank" rel="noopener noreferrer">
          <img
            src={imgSrc}
            alt="Calendario"
            onLoad={() => setLoaded(true)}
            onError={() => !loaded && setImgSrc("/img/calendario.jpeg")}
            className="w-full h-auto object-cover transition-transform duration-200 transform hover:scale-105 active:scale-95 rounded-lg"
          />
        </a>
      </div>
    </div>
  );
}

export default Calendario;
