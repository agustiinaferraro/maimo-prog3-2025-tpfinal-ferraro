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

  if (loading) return <Loading />;
  if (!predicas.length) return <p className="text-center mt-10 text-gray-600">No hay prédicas disponibles.</p>;

  return (
    <div className="min-h-screen py-10 px-6">
      <h3 className="text-3xl max-w-4xl mx-auto text-left mb-8 font-bold">Prédicas</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {predicas.map((predica) => (
          <div
            key={predica._id}
            className="relative cursor-pointer rounded-2xl shadow-xl overflow-hidden p-10 flex flex-col items-center text-center bg-black/10 backdrop-blur-md border border-white/20 transition-transform duration-300 hover:scale-105 active:scale-95"
          >
            <h3 className="text-xl font-semibold mb-4">{predica.title}</h3>

            <a
              href={predica.link}
              className="text-black bg-gray-200 mt-3 pt-3 pb-3 p-5 rounded-lg transition-transform duration-200 hover:scale-105 active:scale-95">
              Ver en YouTube
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Predicas;