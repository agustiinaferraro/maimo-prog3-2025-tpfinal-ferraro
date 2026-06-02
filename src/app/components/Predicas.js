'use client'

import { useState, useEffect, useRef } from "react";
import { useAppContext } from "@/app/context/AppContext";
import Loading from "./Loading";

const getYoutubeId = (url) => {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
};

const Thumbnail = ({ link, title, fallback }) => {
  const videoId = getYoutubeId(link);
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative w-full h-72 sm:h-80 bg-gradient-to-br from-gray-700 to-gray-900 overflow-hidden rounded-t-xl">
      {videoId && !failed ? (
        <div className="w-full h-full overflow-hidden">
          <img
            src={`https://img.youtube.com/vi/${videoId}/0.jpg`}
            alt={title}
            className="w-full h-full object-cover transition-all duration-300 group-hover:scale-125"
            onError={() => setFailed(true)}
          />
        </div>
      ) : (
        <div className="w-full h-full overflow-hidden">
          <img
            src={fallback}
            alt={title}
            className="w-full h-full object-cover transition-all duration-300 group-hover:scale-125"
          />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center opacity-90 hover:opacity-100 hover:scale-125 active:scale-90 transition-all duration-200 z-10">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-5 h-5 ml-1">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

const Predicas = ({ isCarousel = false }) => {
  const { predicas, fetchPredicas, actividades, fetchActividades } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [noTransition, setNoTransition] = useState(false);
  const trackRef = useRef(null);
  const initialized = useRef(false);

  useEffect(() => {
    const loadPredicas = async () => {
      await fetchPredicas();
      if (!actividades.length) await fetchActividades();
      setLoading(false);
    };
    loadPredicas();
  }, []);

  useEffect(() => {
    if (loading || !predicas.length || initialized.current) return;
    initialized.current = true;
    setCurrentIdx(predicas.length);
  }, [loading, predicas.length]);

  useEffect(() => {
    if (!predicas.length) return;
    const total = predicas.length;
    if (currentIdx < total) {
      const timer = setTimeout(() => {
        setNoTransition(true);
        setCurrentIdx(currentIdx + total);
        requestAnimationFrame(() => setNoTransition(false));
      }, 400);
      return () => clearTimeout(timer);
    }
    if (currentIdx >= total * 2) {
      const timer = setTimeout(() => {
        setNoTransition(true);
        setCurrentIdx(currentIdx - total);
        requestAnimationFrame(() => setNoTransition(false));
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [currentIdx, predicas.length]);

  if (loading) return <Loading />;
  if (!predicas.length) return <p className="text-center mt-10 text-gray-600">No hay prédicas disponibles.</p>;

  const cardWidth = 280;
  const gap = 16;
  const step = cardWidth + gap;
  const total = predicas.length;
  const displayData = [...predicas, ...predicas, ...predicas];

  const goTo = (dir) => {
    if (noTransition) return;
    setCurrentIdx((prev) => (dir === "left" ? prev - 1 : prev + 1));
  };

  return (
    <div className="py-10 px-4 sm:px-6">
      {isCarousel && (
        <div className="max-w-7xl mx-auto mb-6">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-8 bg-white rounded-full" />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6 text-white">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="23" />
              <line x1="8" y1="23" x2="16" y2="23" />
            </svg>
            <h3 className="text-4xl sm:text-5xl font-bold text-white">Prédicas</h3>
          </div>
        </div>
      )}
      <div className="max-w-7xl mx-auto">
        {isCarousel ? (
          <>
            <div className="flex items-center gap-4">
              <button
                onClick={() => goTo("left")}
                className="flex-shrink-0 cursor-pointer text-white hover:text-gray-300 hover:scale-125 active:scale-90 transition-all duration-200"
                aria-label="Anterior"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>

              <div className="flex-1 overflow-hidden">
                <div
                  ref={trackRef}
                  className={`flex gap-4 ${noTransition ? '' : 'transition-transform duration-[400ms] ease-in-out'}`}
                  style={{ transform: `translateX(-${currentIdx * step}px)` }}
                >
                  {displayData.map((predica, i) => (
                    <div key={`${predica._id}-${i}`} className="flex-shrink-0 py-2" style={{ width: cardWidth }}>
                      <a
                        href={predica.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group w-full rounded-xl shadow-md flex flex-col bg-black/10 backdrop-blur-md border border-white/20 hover:scale-[1.03] active:scale-[0.97] transition-transform duration-200 cursor-pointer"
                      >
                        <Thumbnail
                          link={predica.link}
                          title={predica.title}
                          fallback="/img/logo-fondo-negro.jpg"
                        />
                        <div className="p-3 flex flex-col justify-center flex-1 rounded-b-xl overflow-hidden">
                          <h3 className="text-xs sm:text-sm font-normal line-clamp-2 leading-tight text-left lowercase [&::first-letter]:uppercase">{predica.title}</h3>
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => goTo("right")}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {predicas.map((predica, i) => (
                <a
                  key={predica._id}
                  href={predica.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-xl shadow-md flex flex-col bg-black/10 backdrop-blur-md border border-white/20 hover:scale-[1.03] active:scale-[0.97] transition-transform duration-200 cursor-pointer"
                >
                  <Thumbnail
                    link={predica.link}
                    title={predica.title}
                    fallback="/img/logo-fondo-negro.jpg"
                  />
                  <div className="p-3 flex flex-col justify-center flex-1 rounded-b-xl overflow-hidden">
                    <h3 className="text-sm sm:text-base font-normal leading-tight text-left lowercase [&::first-letter]:uppercase">{predica.title}</h3>
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
