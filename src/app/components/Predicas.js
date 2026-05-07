'use client'

import { useState, useEffect, useRef } from "react";
import { useAppContext } from "@/app/context/AppContext";
import Loading from "./Loading";

const Predicas = ({ isCarousel = false }) => {
  const { predicas, fetchPredicas } = useAppContext();
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    const loadPredicas = async () => {
      await fetchPredicas();
      setLoading(false);
    };
    loadPredicas();
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.offsetWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (loading) return <Loading />;
  if (!predicas.length) return <p className="text-center mt-10 text-gray-600">No hay prédicas disponibles.</p>;

  return (
    <div className="py-10 px-6">
      <div className="max-w-4xl mx-auto">
        {isCarousel ? (
          <>
            <div className="mb-6">
              <h3 className="text-3xl font-bold">Prédicas</h3>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => scroll('left')}
                className="flex-shrink-0 cursor-pointer text-white hover:text-gray-300 active:text-gray-500 hover:scale-125 active:scale-90 transition-all duration-200"
                aria-label="Anterior"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>

              <div
                ref={scrollRef}
                className="flex-1 flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {predicas.map((predica) => (
                  <div
                    key={predica._id}
                    className="min-w-[300px] md:min-w-[350px] snap-start flex-shrink-0 rounded-2xl shadow-xl overflow-hidden p-8 flex flex-col items-center text-center bg-black/10 backdrop-blur-md border border-white/20"
                  >
                    <h3 className="text-xl font-semibold mb-4 line-clamp-2">{predica.title}</h3>

                    <a
                      href={predica.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer text-black bg-gray-200 mt-3 px-5 py-3 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Ver en YouTube
                    </a>
                  </div>
                ))}
              </div>

              <button
                onClick={() => scroll('right')}
                className="flex-shrink-0 cursor-pointer text-white hover:text-gray-300 active:text-gray-500 hover:scale-125 active:scale-90 transition-all duration-200"
                aria-label="Siguiente"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>

            <div className="flex justify-start mt-8">
              <a
                href="/predicas"
                className="cursor-pointer px-6 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
              >
                Ver más
              </a>
            </div>
          </>
        ) : (
          <>
            <h3 className="text-3xl font-bold mb-8">Prédicas</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
              {predicas.map((predica) => (
                <div
                  key={predica._id}
                  className="rounded-2xl shadow-xl overflow-hidden p-10 flex flex-col items-center text-center bg-black/10 backdrop-blur-md border border-white/20"
                >
                  <h3 className="text-xl font-semibold mb-4">{predica.title}</h3>

                    <a
                      href={predica.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer text-black bg-gray-200 mt-3 px-5 py-3 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Ver en YouTube
                    </a>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Predicas;
