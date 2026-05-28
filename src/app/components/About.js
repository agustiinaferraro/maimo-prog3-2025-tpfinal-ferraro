'use client';

import Image from "next/image"
import { useAppContext } from "../context/AppContext";
import { useEffect, useState, useRef } from "react";

const About = () => {
  const { actividades, fetchActividades } = useAppContext();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState(null);
  const [fadeIn, setFadeIn] = useState(false);
  const idxRef = useRef(0);

  useEffect(() => {
    if (!actividades.length) fetchActividades();
  }, []);

  useEffect(() => {
    if (!actividades.length) return;
    const interval = setInterval(() => {
      setPrevIdx(idxRef.current);
      setFadeIn(false);
      setTimeout(() => {
        const next = (idxRef.current + 1) % actividades.length;
        idxRef.current = next;
        setCurrentIdx(next);
        setFadeIn(true);
      }, 400);
    }, 4000);
    return () => clearInterval(interval);
  }, [actividades.length]);

  const currentImage = actividades.length > 0
    ? actividades[currentIdx]?.Portada
    : "/img/iglesia.jpeg";

  const prevImage = prevIdx !== null && actividades[prevIdx]?.Portada;

  return (
    <div className="relative flex items-center justify-center px-4 sm:px-6 py-16 md:py-20">
      <div className="absolute inset-0 -z-10 bg-gradient-to-transparent from-black/40 via-black/80 to-black/90">
        <Image
          src="/background-about.png"
          alt="Background About"
          fill
          className="object-cover brightness-50 blur-sm"
        />
      </div>

      <div className="relative flex flex-col md:flex-row items-center md:items-center gap-10 w-full max-w-7xl mx-auto text-white">
        <div className="flex-1 w-full max-w-[600px] min-w-[280px]">
          <div className="group relative overflow-hidden rounded-lg border-x border-b border-gray-500 transition-all duration-300 hover:border-gray-300 hover:scale-105">
            <div className="relative w-full overflow-hidden aspect-[3/2] md:h-[350px] rounded-t-lg">
              {prevImage && (
                <div className="absolute inset-0 animate-fade-out">
                  <Image
                    src={prevImage}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-125"
                    unoptimized
                  />
                </div>
              )}
              <div className={`absolute inset-0 ${fadeIn ? "animate-fade-in" : ""}`}>
                <Image
                  src={currentImage}
                  alt="Iglesia"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-125"
                  unoptimized
                />
              </div>
            </div>

            <div className="absolute bottom-0 w-full bg-linear-to-t from-black to-black/0 border-gray-500 rounded-b-lg text-white p-4 pt-30 flex flex-col md:flex-row md:items-center md:justify-between gap-2 transition-all duration-300">
              <p className="text-center md:text-left text-base md:text-lg">
                Almafuerte 4141, Esquina Mitre
              </p>
              <a
                href="https://share.google/bZM8f8HgvADwaE4Ql"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-white transition-transform duration-300 hover:scale-105 active:scale-95"
              >
                <span>📍</span> <span className="text-base md:text-lg">Ver en mapa</span>
              </a>
            </div>
          </div>
        </div>

        <div className="flex-1 w-full max-w-[600px] min-w-[280px] md:w-auto md:max-w-none">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">La Casa del Alfarero</h2>

          <p className="text-lg leading-relaxed">
            La <span className="font-bold">Iglesia Confraternidad Cristiana (ICC)</span> es un espacio de fe, crecimiento espiritual y comunidad. Buscamos acompañar a cada persona con <span className="font-bold">enseñanza bíblica</span> y actividades que fortalezcan su vida diaria.
          </p>

          <p className="mt-6 text-lg leading-relaxed">
            Mediante nuestra <span className="font-bold">plataforma digital</span> ofrecemos información de servicios, calendario, <span className="font-bold">recursos multimedia</span> y un <span className="font-bold">registro accesible</span>, creando un espacio cercano y moderno para conectar y crecer en la fe.
          </p>
        </div>

      </div>
    </div>
  )
}

export default About
