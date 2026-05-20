"use client";

import Loading from "./Loading";
import Image from "next/image";
import Link from "next/link";
import { useAppContext } from "../context/AppContext";
import { useEffect, useState } from "react";

const Actindividual = () => {
  const { actividades, fetchActividades } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const loadActividades = async () => {
      await fetchActividades();
      setLoading(false);
    };
    loadActividades();
  }, []);

  if (loading) return <Loading />;
  if (!actividades.length) return <p>La actividad no esta disponible</p>;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % actividades.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? actividades.length - 1 : prev - 1
    );
  };

  return (
    <div className="py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1.5 h-8 bg-white rounded-full" />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6 text-white">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="3" y1="10" x2="21" y2="10" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="16" y1="2" x2="16" y2="6" />
          </svg>
          <h3 className="text-4xl sm:text-5xl font-bold text-white">Actividades</h3>
        </div>

        <div className="relative rounded-2xl overflow-hidden shadow-2xl min-h-[400px] lg:min-h-[500px]">
          <Image
            key={currentIndex}
            src={actividades[currentIndex].Portada}
            fill
            className="object-cover transition-opacity duration-500"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

          <div className="relative z-10 h-full min-h-[400px] lg:min-h-[500px] flex flex-col justify-end lg:justify-center p-8 lg:p-12">
            <div className="lg:w-1/2">
              <h4 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                {actividades[currentIndex].ActividadNombre}
              </h4>
              <p className="text-gray-200 text-lg leading-relaxed mb-6 line-clamp-3 lg:line-clamp-none">
                {actividades[currentIndex].Descripcion}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link href="/calendario">
                  <button className="cursor-pointer px-6 py-3 bg-amber-500 text-black font-semibold rounded-lg hover:scale-105 active:scale-95 transition-transform duration-200">
                    Ver Calendario
                  </button>
                </Link>

                <div className="flex items-center gap-3 text-white">
                  <button
                    onClick={handlePrev}
                    className="cursor-pointer text-2xl hover:scale-125 active:scale-90 transition-transform duration-200 px-2"
                  >
                    ←
                  </button>
                  <span className="text-white/60 text-sm font-medium">
                    {currentIndex + 1} / {actividades.length}
                  </span>
                  <button
                    onClick={handleNext}
                    className="cursor-pointer text-2xl hover:scale-125 active:scale-90 transition-transform duration-200 px-2"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Actindividual;