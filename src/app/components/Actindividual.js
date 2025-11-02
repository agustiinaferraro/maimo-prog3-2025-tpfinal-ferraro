'use client';

import Loading from './Loading'
import Image from 'next/image'
import Link from 'next/link'
import { useAppContext } from '../context/AppContext'
import { useEffect, useState } from 'react'
import Actividades from './Actividades'

const Actindividual = () => {
    const {actividades, fetchActividades} = useAppContext();
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0); //posickion actual

    useEffect(()=>{
        const loadActividades = async()=>{
            await fetchActividades();
            setLoading(false);
        };
        loadActividades();
    },[]);

if(loading) return <Loading />
if(!actividades.length) return <p>La actividad no esta disponible</p>
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
    <div className='mb-20'>
        <div className='flex justify-center'>
            <div className='w-120 pr-20'>
                <div className='h-80'>
                    <h3 className='text-3xl text-left font-bold'>{actividad.ActividadNombre}</h3>
                    <h4 className='pt-2 pb-8 font-extralight'>Actividades</h4>
                    <p>{actividad.Descripcion}</p>
                </div>
                <Link href="/calendario" className="w-full">
                    <button className='cursor-pointer bg-green-400 p-2 pl-4 pr-4 text-black rounded-lg transition-transform duration-300 hover:scale-105 active:scale-95'>
                     Ver Calendario   
                    </button>
                 </Link>
            </div>  

            <div>
                <Image
                    src={actividad.Portada}
                    width={400}
                    height={400}
                    alt={actividad.ActividadNombre}
                    unoptimized
                    className='h-90 w-80 object-cover rounded-lg'
                />
                <div className='pt-10 flex justify-center'>
                    <button className=' font-bold text-2xl cursor-pointer pr-10 transition-transform duration-300 hover:scale-105 active:scale-95' onClick={handlePrev}>
                    ←
                    </button>
                    
                    <p className=' text-gray-300 font-extralight'>{currentIndex+1} / {actividades.length}</p>
                    
                    <button className='font-bold text-2xl cursor-pointer pl-10 transition-transform duration-300 hover:scale-105 active:scale-95' onClick={handleNext}>
                    →
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Actindividual