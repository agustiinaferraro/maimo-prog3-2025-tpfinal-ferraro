'use client'

import { useState, useEffect, useRef } from "react";
import { useAppContext } from "@/app/context/AppContext";
import Image from "next/image";
import Loading from "./Loading";
import Link from "next/link";

const Actividades = ({ isCarousel = false }) => {
  const { actividades, fetchActividades } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevBg, setPrevBg] = useState(null);
  const [fadeIn, setFadeIn] = useState(false);
  const currentIdxRef = useRef(currentIndex);
  currentIdxRef.current = currentIndex;

  useEffect(() => {
    const loadData = async () => {
      if (!actividades.length) {
        await fetchActividades();
      }
      setLoading(false);
    };
    loadData();
  }, [actividades, fetchActividades]);

  useEffect(() => {
    if (!isCarousel || !actividades.length) return;

    const interval = setInterval(() => {
      const oldIdx = currentIdxRef.current;
      setPrevBg(actividades[oldIdx]?.Portada);
      setCurrentIndex((oldIdx + 1) % actividades.length);
      setFadeIn(true);
    }, 4000);

    return () => clearInterval(interval);
  }, [isCarousel, actividades.length]);

  if (loading) return <Loading />;
  if (!actividades.length) return <p className="text-center mt-10 text-gray-600">No hay actividades disponibles.</p>;

  if (isCarousel) {
    const total = actividades.length;
    const angleStep = 360 / total;
    const cardWidth = 400;
    const cardHeight = 260;
    const radius = Math.max(total * cardWidth / (Math.PI * 2) * 1.2, 260);

    return (
      <div className="relative w-full py-10 overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          {prevBg && (
            <div className="absolute inset-0 animate-bg-carousel-out">
              <Image
                src={prevBg}
                fill
                className="object-cover blur-sm scale-110"
                unoptimized
              />
            </div>
          )}
          <div className={`absolute inset-0 ${fadeIn ? "animate-bg-carousel-in" : ""}`}>
            <Image
              src={actividades[currentIndex].Portada}
              fill
              className="object-cover blur-sm scale-110"
              unoptimized
            />
          </div>
          <div className="absolute inset-0 bg-black/70" />
        </div>
        <div className="relative z-10 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-8 bg-white rounded-full" />
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6 text-white">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="3" y1="10" x2="21" y2="10" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="16" y1="2" x2="16" y2="6" />
              </svg>
              <h3 className="text-4xl sm:text-5xl font-bold text-white">Actividades</h3>
            </div>
            <div
              className="relative mx-auto w-full"
              style={{ perspective: '1800px', height: '400px' }}
            >
              <div
                className="absolute inset-0"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: `rotateY(${-currentIndex * angleStep}deg)`,
                  transition: 'transform 1.2s ease-in-out'
                }}
              >
                {actividades.map((actividad, i) => {
                  const angle = i * angleStep;
                  return (
                    <div
                      key={actividad._id}
                      className="absolute backface-hidden"
                      style={{
                        width: `${cardWidth}px`,
                        height: `${cardHeight}px`,
                        left: '50%',
                        top: '50%',
                        marginLeft: `${-cardWidth / 2}px`,
                        marginTop: `${-cardHeight / 2}px`,
                        transform: `rotateY(${angle}deg) translateZ(${radius}px)`
                      }}
                    >
                      <Link href={`/categoriasActividades/${actividad._id}`}>
                        <div className="group relative w-full h-full rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-110 active:scale-90">
                          <div className="absolute inset-0 transition-transform duration-300 group-hover:scale-125">
                            <Image
                              src={actividad.Portada}
                              alt={actividad.ActividadNombre}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center bg-black/45 hover:bg-black/30 transition-colors duration-300">
                            <h3 className="text-xl sm:text-2xl font-semibold text-white text-center px-4 lowercase [&::first-letter]:uppercase">
                              {actividad.ActividadNombre}
                            </h3>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6">
      {isCarousel && (
        <div className="max-w-7xl mx-auto mb-6">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-8 bg-white rounded-full" />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6 text-white">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="3" y1="10" x2="21" y2="10" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="16" y1="2" x2="16" y2="6" />
            </svg>
            <h3 className="text-4xl sm:text-5xl font-bold text-white">Actividades</h3>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {actividades.map((actividad) => (
        <Link key={actividad._id} href={`/categoriasActividades/${actividad._id}`}>
          <div
            className="group relative cursor-pointer rounded-2xl shadow-md hover:shadow-xl transition-transform duration-300 hover:scale-105 active:scale-95 overflow-hidden flex flex-col items-center text-center"
          >
            <div className="w-full h-120 overflow-hidden">
              <Image
                src={actividad.Portada}
                alt={actividad.ActividadNombre}
                width={500}
                height={800}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-125"
                unoptimized
              />
            </div>

            <div className="absolute inset-0 flex items-center justify-center bg-black/45">
              <h3 className="text-2xl font-semibold text-white text-center px-4 lowercase [&::first-letter]:uppercase">
                {actividad.ActividadNombre}
              </h3>
            </div>
          </div>
          </Link>

        ))}
      </div>    
    </div>
  );
};

export default Actividades;
