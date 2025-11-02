'use client'

import { useState, useEffect } from "react";
import { useAppContext } from "@/app/context/AppContext";
import Image from "next/image";
import Loading from "./Loading"; 

const Predicas = () => {
  const { predicas, fetchPredicas } = useAppContext();
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
  const loadPredicas = async () => {
    await fetchPredicas();
    setLoading(false);
  };
  loadPredicas();
  }, []);

  
  useEffect(()=>{
    const loadPredicas = async() => {
      await fetchPredicas();
      setLoading(false);
    };
    loadPredicas();
  },[]); 
  
  if (loading) return <Loading />;
  if (!predicas.length) return <p className="text-center mt-10 text-gray-600">No hay prédicas disponibles.</p>;

  return (
    <div>
    <h3 className="text-3xl text-left pl-30 m-5 font-bold">Prédicas</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto py-10 px-6">
      {predicas.map((predica) => (
        <div
          key={predica._id}
          className="relative cursor-pointer rounded-2xl shadow-md overflow-hidden p-6 flex flex-col items-center text-center bg-gray-800 transition-transform duration-300 hover:scale-105 active:scale-95"
        >
          <h3 className="text-xl font-semibold mb-4">{predica.title}</h3>
          <a
            href={predica.link}
            className="text-white-600"
          >
            Ver en YouTube
          </a>
        </div>
      ))}
    </div>
  </div>
  );
};
export default Predicas;
