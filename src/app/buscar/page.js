'use client'

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAppContext } from "@/app/context/AppContext";
import Link from "next/link";
import BackButton from "../components/BackButton";

const SearchResults = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [input, setInput] = useState(query);
  const { actividades, predicas, fetchActividades, fetchPredicas } = useAppContext();
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!actividades.length) fetchActividades();
    if (!predicas.length) fetchPredicas();
  }, []);

  useEffect(() => {
    if (!query) { setResults([]); return; }
    const q = query.toLowerCase();
    const found = [];
    actividades.forEach((a) => {
      if (a.ActividadNombre?.toLowerCase().includes(q))
        found.push({ title: a.ActividadNombre, href: `/categoriasActividades/${a._id}`, type: "Actividad" });
    });
    predicas.forEach((p) => {
      if (p.title?.toLowerCase().includes(q))
        found.push({ title: p.title, href: p.link, type: "Prédica" });
    });
    setResults(found);
  }, [query, actividades, predicas]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (input.trim()) {
      window.location.href = `/buscar?q=${encodeURIComponent(input.trim())}`;
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <BackButton />
      </div>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Buscar</h1>
        <form onSubmit={handleSearch} className="mb-8">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="¿Qué estás buscando?"
            className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-white/40"
          />
        </form>
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
