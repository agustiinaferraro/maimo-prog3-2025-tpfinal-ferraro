'use client'

import { useAppContext } from "../context/AppContext"
import { useState, useEffect } from "react";
import Loading from "./Loading";
import Image from "next/image";

const Hero = () => {
    const {actividades, fetchActividades} = useAppContext();
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Cargar actividades
    useEffect(()=>{
        const loadActividades = async()=>{
            await fetchActividades();
            setLoading(false);
        };
        loadActividades();
    },[]);

    // Auto-rotación
    useEffect(() =>{
        if(!actividades.length) return;
        const interval = setInterval(()=> {
            setCurrentIndex(prev =>(prev + 1) % actividades.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [actividades]);

    // Funciones botones
    const handleNext = () => {
        setCurrentIndex(prev => (prev + 1) % actividades.length);
    };

    const handlePrev = () => {
        setCurrentIndex(prev => (prev === 0 ? actividades.length - 1 : prev - 1));
    };

    if (loading) return <Loading />
    if (!actividades.length) return <p>No hay actividades disponibles</p>

    return (
        <div className="relative w-full h-[500px] overflow-hidden">
            {/* Imágenes apiladas para efecto fade */}
            {actividades.map((act, index) => (
                <Image
                    key={act._id}
                    src={act.Portada}
                    alt={act.ActividadNombre}
                    width={800}
                    height={500}
                    unoptimized
                    className={`
                        absolute object-[center_23%] w-full h-full object-cover
                        transition-opacity duration-1000
                        ${index === currentIndex ? 'opacity-100' : 'opacity-0'}
                    `}
                />
            ))}

            <div className="pl-30 pt-35 pb-20 absolute inset-0 w-full bg-gradient-to-t from-black/100 to-black/0 flex flex-col justify-end">
                <h1 className="text-3xl text-left font-bold">{actividades[currentIndex].ActividadNombre}</h1>
                <p className="w-130 pt-3">{actividades[currentIndex].Descripcion}</p> 
            </div>

            <button
                onClick={handlePrev}
                className="transition-transform duration-300 hover:scale-105 active:scale-95 cursor-pointer absolute left-4 top-1/2 -translate-y-1/2 text-white text-5xl w-10 h-10 flex items-center justify-center"
            >
                ‹
            </button>
            <button
                onClick={handleNext}
                className="transition-transform duration-300 hover:scale-105 active:scale-95 cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-white text-5xl w-10 h-10 flex items-center justify-center"
            >
                ›
            </button>
        </div>
    )
}

export default Hero;
