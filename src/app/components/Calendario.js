'use client'

import { useState, useEffect } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Calendario = () => {
  const [imgSrc, setImgSrc] = useState("/img/calendario.jpeg");
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const ts = Date.now();
    setImgSrc(`${API_URL}/calendario-image?t=${ts}`);
  }, []);

  return (
    <>
      <div className="flex items-start justify-start">
        <div className="relative max-w-sm w-full m-5 ml-0 group">
          <img
            src={imgSrc}
            alt="Calendario"
            onClick={() => setOpen(true)}
            onLoad={() => setLoaded(true)}
            onError={() => !loaded && setImgSrc("/img/calendario.jpeg")}
            className="w-full h-auto object-cover transition-transform duration-200 transform hover:scale-105 active:scale-95 rounded-lg cursor-pointer"
          />
          <div
            onClick={() => setOpen(true)}
            className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors duration-200 rounded-lg cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
            </svg>
          </div>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            aria-label="Cerrar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <img
            src={imgSrc}
            alt="Calendario"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}

export default Calendario;
