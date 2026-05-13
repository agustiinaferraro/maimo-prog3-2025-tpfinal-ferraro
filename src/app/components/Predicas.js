'use client'

import { useState, useEffect, useRef } from "react";
import { useAppContext } from "@/app/context/AppContext";
import Loading from "./Loading";

const getYoutubeId = (url) => {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
};

const Thumbnail = ({ link, title }) => {
  const videoId = getYoutubeId(link);
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative w-full h-40 sm:h-48 bg-gray-800">
      {videoId && !failed && (
        <img
          src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
          alt={title}
          className="w-full h-full object-cover"
          onError={() => setFailed(true)}
        />
      )}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center opacity-90">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-4 h-4 ml-0.5">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </div>
  );
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
                className="flex-shrink-0 cursor-pointer text-white hover:text-gray-300 hover:scale-125 active:scale-90 transition-all duration-200"
                aria-label="Anterior"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>

              <div
                ref={scrollRef}
                className="flex-1 flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {predicas.map((predica) => (
                  <a
                    key={predica._id}
                    href={predica.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-[190px] sm:w-[230px] md:w-[280px] snap-start flex-shrink-0 rounded-xl shadow-md overflow-hidden flex flex-col bg-black/10 backdrop-blur-md border border-white/20 hover:scale-[1.03] active:scale-[0.97] transition-transform duration-200 cursor-pointer"
                  >
                    <Thumbnail link={predica.link} title={predica.title} />
                    <div className="p-3 flex flex-col items-center justify-center text-center flex-1">
                      <h3 className="text-xs sm:text-sm font-semibold line-clamp-2 leading-tight">{predica.title}</h3>
                    </div>
                  </a>
                ))}
              </div>

              <button
                onClick={() => scroll('right')}
                className="flex-shrink-0 cursor-pointer text-white hover:text-gray-300 hover:scale-125 active:scale-90 transition-all duration-200"
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {predicas.map((predica) => (
                <a
                  key={predica._id}
                  href={predica.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl shadow-md overflow-hidden flex flex-col bg-black/10 backdrop-blur-md border border-white/20 hover:scale-[1.03] active:scale-[0.97] transition-transform duration-200 cursor-pointer"
                >
                  <Thumbnail link={predica.link} title={predica.title} />
                  <div className="p-3 flex flex-col items-center justify-center text-center flex-1">
                    <h3 className="text-sm sm:text-base font-semibold leading-tight">{predica.title}</h3>
                  </div>
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Predicas;
