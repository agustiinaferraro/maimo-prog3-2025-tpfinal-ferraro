'use client'

import { useState, useEffect, useRef } from "react";
import { useAppContext } from "@/app/context/AppContext";
import Image from "next/image";
import Loading from "./Loading";

const getYoutubeId = (url) => {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
};

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
    <div className="py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
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
                    className="min-w-[220px] sm:min-w-[260px] md:min-w-[300px] snap-start flex-shrink-0 rounded-2xl shadow-xl overflow-hidden flex flex-col bg-black/10 backdrop-blur-md border border-white/20"
                  >
                    {getYoutubeId(predica.link) && (
                      <div className="relative w-full aspect-video">
                        <img
                          src={`https://img.youtube.com/vi/${getYoutubeId(predica.link)}/hqdefault.jpg`}
                          alt={predica.title}
                          className="w-full h-full object-cover"
                          onError={(e) => { e.target.style.display = 'none' }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center opacity-90">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6 ml-1">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="p-6 flex flex-col items-center text-center flex-1">
                      <h3 className="text-lg font-semibold mb-3 line-clamp-2">{predica.title}</h3>
                      <a
                        href={predica.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cursor-pointer text-black bg-gray-200 mt-auto px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors text-sm"
                      >
                        Ver en YouTube
                      </a>
                    </div>
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

            <div className="flex justify-end mt-8">
              <a
                href="/predicas"
                className="cursor-pointer px-6 py-2 bg-white text-black rounded-lg hover:scale-110 hover:brightness-125 active:scale-90 active:brightness-75 transition-all duration-200"
              >
                Ver más
              </a>
            </div>
          </>
        ) : (
          <>
            <h3 className="text-3xl font-bold mb-8">Prédicas</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {predicas.map((predica) => (
                <div
                  key={predica._id}
                  className="rounded-2xl shadow-xl overflow-hidden flex flex-col bg-black/10 backdrop-blur-md border border-white/20"
                >
                  {getYoutubeId(predica.link) && (
                    <div className="relative w-full aspect-video">
                      <img
                        src={`https://img.youtube.com/vi/${getYoutubeId(predica.link)}/hqdefault.jpg`}
                        alt={predica.title}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.style.display = 'none' }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center opacity-90">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6 ml-1">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="p-8 flex flex-col items-center text-center flex-1">
                    <h3 className="text-xl font-semibold mb-4">{predica.title}</h3>
                    <a
                      href={predica.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer text-black bg-gray-200 mt-auto px-5 py-3 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Ver en YouTube
                    </a>
                  </div>
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
