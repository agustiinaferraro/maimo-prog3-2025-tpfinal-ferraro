'use client'

import { useState, useEffect } from "react";
import { useAppContext } from "@/app/context/AppContext";
import Image from "next/image";
import Loading from "./Loading";
import Link from "next/link";

const Actividades = () => {
  const { actividades, fetchActividades } = useAppContext();
  const [loading, setLoading ] = useState(true);

  useEffect(() => {
      const loadData = async () => {
          if (!actividades.length) {
              await fetchActividades();
          }
          setLoading(false);
      };
      loadData();
  }, [actividades, fetchActividades]);


  if (loading) return <Loading />;
  if (!actividades.length) return <p className="text-center mt-10 text-gray-600">No hay actividades disponibles.</p>;

  return (
    <div className="bg-[#000000] min-h-screen py-10 px-6">
      <h3 className="text-3xl text-left pl-30 m-5 font-bold">Actividades</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {actividades.map((actividad) => (
        <Link key={actividad._id} href={`/categoriasActividades/${actividad._id}`}>
          <div
            className="relative cursor-pointer bg-black rounded-2xl shadow-md hover:shadow-xl transition-transform duration-300 hover:scale-105 active:scale-95 overflow-hidden flex flex-col items-center text-center"
          >
            <Image
              src={actividad.Portada}
              alt={actividad.ActividadNombre}
              width={500}
              height={800}
              className="w-full h-120 object-cover"
              unoptimized
            />

            <div className="absolute inset-0 flex items-center justify-center bg-black/45">
              <h3 className="text-2xl font-semibold text-white text-center px-4">
                {actividad.ActividadNombre}
              </h3>
            </div>
          </div>
          </Link>

        ))}
      </div>    
    </div>
  );
};

export default Actividades;

{/*<Link 
            key={actividad._id}
            href={`/actindividual?id=${actividad._id}`}
            className="relative cursor-pointer bg-black rounded-2xl shadow-md hover:shadow-xl transition-transform duration-300 hover:scale-105 active:scale-95 overflow-hidden flex flex-col items-center text-center"
          > */}
