'use client'

import { useAppContext } from "../context/AppContext"
import { useState, useEffect } from "react";
import Loading from "./Loading";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
    const {actividades, fetchActividades} = useAppContext();
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(()=>{
        const loadActividades = async()=>{
            await fetchActividades();
            setLoading(false);
        };
            loadActividades();
    },[]);


if (!actividades.length) return <p>No hay actividades disponibles</p>
if(loading) return <Loading />
const actividad = actividades[currentIndex];

const handleNext = () => {
    setCurrentIndex((prev)=> (prev + 1) % actividades.length); //prev es el valor anterior, 
    // despues divido la cantidad del array por la posicion, 
    // si da 0 empieza otra vez
};

const handlePrev = () => {
  setCurrentIndex((prev) => (prev === 0 ? actividades.length - 1 : prev - 1)); //si estamos en === 0 es la primera, 
  // si retrocedo voy a la ultima (actvifidades.length -1)
  //si no es la primera retrocedo una xd
};

  return (
    <div className="relative">
        <div>
            <div className="pl-30 pt-60 pb-20 absolute inset-0 w-full bg-gradient-to-t from-black/100 to-black/0">
                <h1 className="text-3xl text-left font-bold">{actividad.ActividadNombre}</h1>
                <p className="w-130 pt-3">{actividad.Descripcion}</p> 
            </div>

                <div key={actividad._id}> 
                    <Image
                        src={actividad.Portada}
                        width={800}
                        height={500}
                        alt={actividad.ActividadNombre}
                        unoptimized
                        className="h-100 w-full object-cover"
                    />
                </div>
        </div>
    </div>
  )
}

export default Hero