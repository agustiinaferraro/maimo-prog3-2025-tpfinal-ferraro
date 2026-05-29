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
  const [leaving, setLeaving] = useState(null);
  const [dir, setDir] = useState(null);
  const busy = useRef(false);

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

  const goTo = (direction) => {
    if (busy.current) return;
    busy.current = true;
    setDir(direction);
    setLeaving(currentIndex);

    const nextIdx = direction === "right"
      ? (currentIndex + 1) % actividades.length
      : currentIndex === 0 ? actividades.length - 1 : currentIndex - 1;

    setTimeout(() => {
      setCurrentIndex(nextIdx);
      setLeaving(null);
      setDir(null);
      busy.current = false;
    }, 400);
  };

  const leaveAnim = dir === "right" ? "animate-slide-out-left" : "animate-slide-out-right";
  const enterAnim = dir === "right" ? "animate-slide-in-right" : "animate-slide-in-left";

  const renderCard = (act, extraClass = "") => (
    <div className={`flex flex-col lg:flex-row items-center w-full ${extraClass}`}>
      <div className="w-full lg:w-1/2 lg:pr-12 py-12 flex-shrink-0">
        <h3 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
          {act.ActividadNombre}
        </h3>
        <p className="text-gray-200 text-xl leading-relaxed mb-8">
          {act.Descripcion}
        </p>
        <Link href="/calendario">
          <button className="cursor-pointer px-6 py-3 bg-amber-500 text-black font-semibold rounded-lg hover:scale-105 active:scale-95 transition-transform duration-200">
            Ver Calendario
          </button>
        </Link>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col items-center py-12 flex-shrink-0">
        <Image
          src={act.Portada}
          width={600}
          height={400}
          alt={act.ActividadNombre}
          unoptimized
          className="w-full h-72 lg:h-96 object-cover rounded-xl shadow-2xl"
        />
        <div className="flex items-center gap-4 mt-4 text-white">
          <button
            onClick={() => goTo("left")}
            disabled={busy.current}
            className="cursor-pointer text-3xl hover:scale-125 active:scale-90 transition-transform duration-200 px-2 disabled:opacity-30"
          >
            ←
          </button>
          <span className="text-white/60 text-base font-medium">
            {currentIndex + 1} / {actividades.length}
          </span>
          <button
            onClick={() => goTo("right")}
            disabled={busy.current}
            className="cursor-pointer text-3xl hover:scale-125 active:scale-90 transition-transform duration-200 px-2 disabled:opacity-30"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative w-full py-10 overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <Image
          key={currentIndex}
          src={actividad.Portada}
          fill
          className="object-cover blur-sm scale-110"
          unoptimized
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="relative z-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden">
            {leaving !== null && (
              <div className={`absolute inset-0 ${leaveAnim}`}>
                {renderCard(actividades[leaving])}
              </div>
            )}
            <div className={leaving !== null ? enterAnim : ""}>
              {renderCard(actividad)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Actindividual;
