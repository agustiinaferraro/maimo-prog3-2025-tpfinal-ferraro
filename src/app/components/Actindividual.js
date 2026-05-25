"use client";

import Loading from "./Loading";
import Image from "next/image";
import Link from "next/link";
import { useAppContext } from "../context/AppContext";
import { useEffect, useState, useRef } from "react";

const Actindividual = () => {
  const { actividades, fetchActividades } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [oldPortada, setOldPortada] = useState(null);
  const [fadingOut, setFadingOut] = useState(false);
  const autoRef = useRef(null);

  useEffect(() => {
    const loadActividades = async () => {
      await fetchActividades();
      setLoading(false);
    };
    loadActividades();
  }, []);

  useEffect(() => {
    if (loading || !actividades.length) return;
    autoRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % actividades.length);
    }, 5000);
    return () => clearInterval(autoRef.current);
  }, [loading, actividades.length]);

  if (loading) return <Loading />;
  if (!actividades.length) return <p>La actividad no esta disponible</p>;

  const actividad = actividades[currentIndex];

  const handleNext = () => {
    clearInterval(autoRef.current);
    setCurrentIndex((prev) => (prev + 1) % actividades.length);
  };

  const handlePrev = () => {
    clearInterval(autoRef.current);
    setCurrentIndex((prev) =>
      prev === 0 ? actividades.length - 1 : prev - 1
    );
  };

  const handleNav = (fn) => {
    const prev = actividades[currentIndex]?.Portada;
    fn();
    setOldPortada(prev);
    setFadingOut(true);
    setTimeout(() => { setOldPortada(null); setFadingOut(false); }, 600);
  };

  return (
    <div className="relative w-full py-10 overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <div className="relative w-full h-full">
          {oldPortada && (
            <img
              src={oldPortada}
              alt=""
              className="absolute inset-0 w-full h-full object-cover blur-sm scale-110 transition-opacity duration-600"
              style={{ opacity: fadingOut ? 0 : 1 }}
            />
          )}
          <img
            key={currentIndex}
            src={actividad.Portada}
            alt=""
            className="absolute inset-0 w-full h-full object-cover blur-sm scale-110 transition-opacity duration-600"
          />
        </div>
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="relative z-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="w-full lg:w-1/2 lg:pr-12 py-12">
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

            <div className="w-full lg:w-1/2 flex flex-col items-center py-12">
              <div className="relative w-full h-72 lg:h-96 rounded-xl shadow-2xl overflow-hidden">
                {oldPortada && (
                  <img
                    src={oldPortada}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-600"
                    style={{ opacity: fadingOut ? 0 : 1 }}
                  />
                )}
                <img
                  key={currentIndex}
                  src={actividad.Portada}
                  alt={actividad.ActividadNombre}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center gap-4 mt-4 text-white">
                <button
                  onClick={() => handleNav(handlePrev)}
                  className="cursor-pointer text-3xl hover:scale-125 active:scale-90 transition-transform duration-200 px-2"
                >
                  ←
                </button>
                <span className="text-white/60 text-base font-medium">
                  {currentIndex + 1} / {actividades.length}
                </span>
                <button
                  onClick={() => handleNav(handleNext)}
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
  );
};

export default Actindividual;
