'use client'

import { useState, useEffect, useRef } from "react";
import { useAppContext } from "@/app/context/AppContext";
import Image from "next/image";
import Loading from "./Loading";
import Link from "next/link";

const Actividades = ({ isCarousel = false }) => {
  const { actividades, fetchActividades } = useAppContext();
  const [loading, setLoading ] = useState(true);
  const scrollRef = useRef(null);
  const intervalRef = useRef(null);

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

    intervalRef.current = setInterval(() => {
      if (!scrollRef.current) return;
      const container = scrollRef.current;
      const cardWidth = container.children[0]?.offsetWidth || 0;
      const gap = 24;
      const scrollAmount = cardWidth + gap;
      const maxScroll = container.scrollWidth - container.clientWidth;

      if (container.scrollLeft >= maxScroll - 20) {
        container.scrollTo({ left: 0, behavior: 'instant' });
      } else {
        container.scrollTo({
          left: container.scrollLeft + scrollAmount,
          behavior: 'smooth'
        });
      }
    }, 3000);

    return () => clearInterval(intervalRef.current);
  }, [isCarousel, actividades.length]);

  if (loading) return <Loading />;
  if (!actividades.length) return <p className="text-center mt-10 text-gray-600">No hay actividades disponibles.</p>;

  if (isCarousel) {
    return (
      <div className="py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h3 className="text-3xl font-bold">Actividades</h3>
          </div>
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {[...actividades, ...actividades].map((actividad, index) => (
              <div key={`${actividad._id}-${index}`} className="snap-start flex-shrink-0 py-1">
                <Link
                  href={`/categoriasActividades/${actividad._id}`}
                  className="w-[260px] sm:w-[300px] md:w-[360px] rounded-xl shadow-md overflow-hidden flex flex-col bg-black/10 backdrop-blur-md border border-white/20 hover:scale-[1.03] active:scale-[0.97] transition-transform duration-200 cursor-pointer block"
                >
                  <div className="relative w-full h-40 sm:h-48">
                    <Image
                      src={actividad.Portada}
                      alt={actividad.ActividadNombre}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-3 flex flex-col justify-center flex-1">
                    <h3 className="text-sm sm:text-base font-normal leading-tight text-left lowercase [&::first-letter]:uppercase">
                      {actividad.ActividadNombre}
                    </h3>
                  </div>
                </Link>
              </div>
            ))}
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
              <h3 className="text-2xl font-semibold text-white text-center px-4">
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
