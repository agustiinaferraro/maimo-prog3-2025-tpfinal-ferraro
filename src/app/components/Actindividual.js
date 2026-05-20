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

  const actividad = actividades[currentIndex];

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
        <div className="relative rounded-2xl overflow-hidden shadow-2xl min-h-[450px] lg:min-h-[550px]">
          <Image
            key={currentIndex}
            src={actividad.Portada}
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

          <div className="relative z-10 h-full min-h-[450px] lg:min-h-[550px] flex flex-col justify-end lg:justify-center p-8 lg:p-12">
            <div className="lg:w-3/5">
              <h3 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
                {actividad.ActividadNombre}
              </h3>
              <p className="text-gray-200 text-xl leading-relaxed mb-8">
                {actividad.Descripcion}
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
                    className="cursor-pointer text-3xl hover:scale-125 active:scale-90 transition-transform duration-200 px-2"
                  >
                    ←
                  </button>
                  <span className="text-white/60 text-base font-medium">
                    {currentIndex + 1} / {actividades.length}
                  </span>
                  <button
                    onClick={handleNext}
                    className="cursor-pointer text-3xl hover:scale-125 active:scale-90 transition-transform duration-200 px-2"
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