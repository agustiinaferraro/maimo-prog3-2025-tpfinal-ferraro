'use client'

import { useAppContext } from "../context/AppContext"
import { useState, useEffect } from "react";
import Loading from "./Loading";
import Image from "next/image";

const Hero = () => {
    const { actividades, fetchActividades } = useAppContext();
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const loadActividades = async () => {
            await fetchActividades();
            setLoading(false);
        };
        loadActividades();
    }, []);

    useEffect(() => {
        if (!actividades.length) return;
        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % actividades.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [actividades]);

    const handleNext = () => {
        if (!actividades.length) return;
        setCurrentIndex(prev => (prev + 1) % actividades.length);
    };

    const handlePrev = () => {
        if (!actividades.length) return;
        setCurrentIndex(prev => (prev === 0 ? actividades.length - 1 : prev - 1));
    };

    if (loading) return <Loading />;
    if (!actividades.length) return <p>No hay actividades disponibles</p>;

    const currentActividad = actividades[currentIndex];

    return (
        <div className="relative w-full h-[350px] sm:h-[450px] lg:h-[450px] overflow-hidden">
            {actividades.map((act, index) => (
                <Image
                    key={act._id}
                    src={act.Portada}
                    alt={act.ActividadNombre}
                    width={1600}
                    height={900}
                    unoptimized
                    className={`absolute inset-0 w-full h-full object-cover object-[center_13%] transition-opacity duration-1000
                        ${index === currentIndex ? "opacity-100" : "opacity-0"}
                    `}
                />
            ))}

            <div className="absolute inset-0 bg-linear-to-t from-black/90 to-black/0"></div>

            <div className="absolute inset-y-0 left-0 flex flex-col justify-end px-6 sm:px-10 lg:px-32 pb-10 sm:pb-14 lg:pb-20">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold max-w-xl">
                    {currentActividad.ActividadNombre}
                </h1>
                <p className="pt-3 max-w-xl text-sm sm:text-base lg:text-lg">
                    {currentActividad.Descripcion}
                </p>
            </div>

            <button
                onClick={handlePrev}
                className="cursor-pointer absolute left-2 sm:left-4 top-16 sm:top-1/2 sm:-translate-y-1/2 text-white text-3xl sm:text-5xl w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center transition-transform duration-300 hover:scale-105 active:scale-95"
            >
                ‹
            </button>

            <button
                onClick={handleNext}
                className="cursor-pointer absolute right-2 sm:right-4 top-16 sm:top-1/2 sm:-translate-y-1/2 text-white text-3xl sm:text-5xl w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center transition-transform duration-300 hover:scale-105 active:scale-95"
            >
                ›
            </button>
        </div>
    );
};

export default Hero;
