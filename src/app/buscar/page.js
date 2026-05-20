'use client'

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import BackButton from "../components/BackButton";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const SearchResults = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [predicas, setPredicas] = useState([]);
  const [actividades, setActividades] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [predRes, actRes] = await Promise.all([
          fetch(`${API_URL}/predicas`),
          fetch(`${API_URL}/actividades`),
        ]);
        if (predRes.ok) {
          const data = await predRes.json();
          setPredicas(Array.isArray(data) ? data : []);
        }
        if (actRes.ok) {
          const data = await actRes.json();
          setActividades(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error("Error fetching data for search:", err);
      }
    };
    fetchData();
  }, []);

  let results = [];
  if (query) {
    const q = query.toLowerCase();
    if (q === "predica" || q === "predicas") {
      predicas.forEach((p) => {
        results.push({ title: p.title, href: p.link, type: "Prédica" });
      });
    }
    if (q === "actividad" || q === "actividades") {
      actividades.forEach((a) => {
        results.push({ title: a.ActividadNombre, href: `/categoriasActividades/${a._id}`, type: "Actividad" });
      });
    }
    actividades.forEach((a) => {
      if (a.ActividadNombre?.toLowerCase().includes(q))
        results.push({ title: a.ActividadNombre, href: `/categoriasActividades/${a._id}`, type: "Actividad" });
    });
    predicas.forEach((p) => {
      if (p.title?.toLowerCase().includes(q))
        results.push({ title: p.title, href: p.link, type: "Prédica" });
    });
  }

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <BackButton />
      </div>
      <div className="max-w-2xl mx-auto">
        {query && (
          <p className="text-gray-400 mb-4">
            {results.length > 0
              ? `Se encontraron ${results.length} resultado(s) para "${query}"`
              : `Sin resultados para "${query}"`}
          </p>
        )}
        <div className="flex flex-col gap-4">
          {results.map((r, i) => (
            <Link
              key={i}
              href={r.href}
              className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-colors"
              {...(r.type === "Prédica" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              <span className="text-xs text-gray-400 uppercase">{r.type}</span>
              <p className="text-white font-medium mt-1">{r.title}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

const BuscarPage = () => {
  return (
    <Suspense fallback={<div className="min-h-screen py-10 px-6 text-center text-gray-400">Cargando...</div>}>
      <SearchResults />
    </Suspense>
  );
};

export default BuscarPage;
