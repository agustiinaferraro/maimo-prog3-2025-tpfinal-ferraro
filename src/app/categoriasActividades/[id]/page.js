'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAppContext } from '@/app/context/AppContext';
import Loading from '@/app/components/Loading';
import Image from 'next/image';

const Page = () => {
  const { actividades, fetchActividades } = useAppContext();
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const actividadIndex = actividades.findIndex(act => act._id === id);
  const actividad = actividades[actividadIndex];

  useEffect(() => {
    const loadData = async () => {
      if (!actividades.length) {
        await fetchActividades();
      }
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading) return <Loading />;
  if (!actividades.length) return <p>No hay Actividades disponibles</p>;
  if (!actividad) return <p>Actividad no encontrada</p>;

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % actividad.ImagenesActividades.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + actividad.ImagenesActividades.length) % actividad.ImagenesActividades.length);
  };

  const nextActividad = () => {
    const nextIndex = (actividadIndex + 1) % actividades.length;
    router.push(`/categoriasActividades/${actividades[nextIndex]._id}`);
  };

  const prevActividad = () => { 
    const prevIndex = (actividadIndex - 1 + actividades.length) % actividades.length; 
    router.push(`/categoriasActividades/${actividades[prevIndex]._id}`); 
  };

  return (
    <div className="m-10">
      <h3 className="text-2xl font-semibold mb-4">{actividad.ActividadNombre}</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {actividad.ImagenesActividades.map((img, i) => (
          <div
            key={i}
            className="transition-transform duration-300 hover:scale-105 cursor-pointer"
            onClick={() => openLightbox(i)}
          >
            <Image 
              src={img}
              width={500}
              height={500}
              alt={`${actividad.ActividadNombre} - imagen ${i + 1}`}
              className="w-full h-[350px] object-cover rounded-lg"
              unoptimized
            />
          </div>
        ))}
      </div>

      {/* botones para navegar en miniatura */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={prevActividad}
          className="cursor-pointer bg-gray-800 text-white px-4 py-2 rounded text-2xl transform transition-transform duration-200 hover:bg-gray-700 hover:scale-105 active:scale-95"
        >
          ‹
        </button>
        <button
          onClick={nextActividad}
          className="cursor-pointer bg-black text-white px-4 py-2 rounded text-2xl transform transition-transform duration-200 hover:bg-gray-800 hover:scale-105 active:scale-95"
        >
          ›
        </button>
      </div>

      {lightboxOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <button
            onClick={closeLightbox}
            className="cursor-pointer absolute top-5 right-5 text-white text-3xl font-bold z-50 transform transition-transform duration-200 hover:scale-110 active:scale-90"
          >
            ×
          </button>

          <button
            onClick={prevImage}
            className="m-2 cursor-pointer absolute left-5 text-white text-5xl font-bold z-50 transform transition-transform duration-200 hover:scale-110 active:scale-90"
          >
            ‹
          </button>

          <div className="relative">
         <Image
          src={actividad.ImagenesActividades[currentIndex]}
          width={800}      
          height={800}     
          alt={`${actividad.ActividadNombre} - imagen ${currentIndex + 1}`}
          className="max-h-[90vh] object-contain rounded-lg mx-auto"
          style={{ maxWidth: '60vw' }} // para ancho e el celu
          unoptimized
        />
            <span className="absolute bottom-2 right-1/2 translate-x-1/2 text-white text-lg">
              {currentIndex + 1} / {actividad.ImagenesActividades.length}
            </span>
          </div>

          <button
            onClick={nextImage}
            className="m-2 cursor-pointer absolute right-5 text-white text-5xl font-bold z-50 transform transition-transform duration-200 hover:scale-110 active:scale-90"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
};

export default Page;