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
    <div className="w-full py-10">
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 flex items-center px-4 sm:px-6 lg:pl-10 lg:pr-12 py-12">
          <div>
            <h3 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
              {actividad.ActividadNombre}
            </h3>
            <p className="text-gray-200 text-xl leading-relaxed mb-8">
              {actividad.Descripcion}
            </p>
            <Link href="/calendario">
              <button className="cursor-pointer px-6 py-3 bg-amber-500 text-black font-semibold rounded-lg hover:scale-105 active:scale-95 transition-transform duration-200">
                Ver Calendario
              </button>
            </Link>
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <Image
            key={currentIndex}
            src={actividad.Portada}
            width={800}
            height={500}
            alt={actividad.ActividadNombre}
            unoptimized
            className="w-full h-80 lg:h-[500px] object-cover"
          />
          <div className="flex justify-center items-center gap-4 py-4 text-white">
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
  );
};

export default Actindividual;