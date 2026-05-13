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
      setCurrentIndex(prev => (prev + 1) % actividades.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isCarousel, actividades.length]);

  if (loading) return <Loading />;
  if (!actividades.length) return <p className="text-center mt-10 text-gray-600">No hay actividades disponibles.</p>;

  if (isCarousel) {
    const total = actividades.length;
    const angleStep = 360 / total;
    const cardWidth = 260;
    const radius = Math.max(total * cardWidth / (Math.PI * 2) * 1.1, 200);

    return (
      <div className="py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h3 className="text-3xl font-bold">Actividades</h3>
          </div>
          <div
            className="relative mx-auto"
            style={{ perspective: '1200px', height: '280px' }}
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
                      height: '200px',
                      left: '50%',
                      top: '50%',
                      marginLeft: `${-cardWidth / 2}px`,
                      marginTop: '-100px',
                      transform: `rotateY(${angle}deg) translateZ(${radius}px)`
                    }}
                  >
                    <Link href={`/categoriasActividades/${actividad._id}`}>
                      <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                        <Image
                          src={actividad.Portada}
                          alt={actividad.ActividadNombre}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/45">
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
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6">
      <h3 className="text-3xl max-w-7xl mx-auto text-left mb-8 font-bold">Actividades</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {actividades.map((actividad) => (
        <Link key={actividad._id} href={`/categoriasActividades/${actividad._id}`}>
          <div
            className="relative cursor-pointer rounded-2xl shadow-md hover:shadow-xl transition-transform duration-300 hover:scale-105 active:scale-95 overflow-hidden flex flex-col items-center text-center"
          >
            <Image
              src={actividad.Portada}
              alt={actividad.ActividadNombre}
              width={500}
              height={800}
              className="w-full h-120 object-cover"
              unoptimized
            />

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
