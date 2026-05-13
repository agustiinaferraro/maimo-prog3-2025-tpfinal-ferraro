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
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="mx-auto max-w-[90vw] sm:max-w-[70vw] md:max-w-[50vw] m-5">
          <img
            src={imgSrc}
            alt="Calendario"
            onClick={() => setOpen(true)}
            onLoad={() => setLoaded(true)}
            onError={() => !loaded && setImgSrc("/img/calendario.jpeg")}
            className="w-full h-auto object-cover transition-transform duration-200 transform hover:scale-105 active:scale-95 rounded-lg cursor-pointer"
          />
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
