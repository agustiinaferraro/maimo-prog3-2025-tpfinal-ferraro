'use client'

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAppContext } from "@/app/context/AppContext";
import Link from "next/link";
import BackButton from "../components/BackButton";

const SearchResults = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const { actividades, predicas, fetchActividades, fetchPredicas } = useAppContext();
  const [results, setResults] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      if (!actividades.length) await fetchActividades();
      if (!predicas.length) await fetchPredicas();
      setLoaded(true);
    };
    loadData();
  }, []);

  useEffect(() => {
    if (!query) { setResults([]); return; }
    const q = query.toLowerCase();
    const found = [];

    if (q === "predica" || q === "predicas") {
      predicas.forEach((p) => {
        found.push({ title: p.title, href: p.link, type: "Prédica" });
      });
    }
    if (q === "actividad" || q === "actividades") {
      actividades.forEach((a) => {
        found.push({ title: a.ActividadNombre, href: `/categoriasActividades/${a._id}`, type: "Actividad" });
      });
    }

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

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <BackButton />
      </div>
      <div className="max-w-2xl mx-auto">
        {query && loaded && (
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
