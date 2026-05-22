'use client'

import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAppContext } from "@/app/context/AppContext";
import Link from "next/link";
import BackButton from "../components/BackButton";

const SearchResults = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const { actividades, predicas, fetchActividades, fetchPredicas } = useAppContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!actividades.length) await fetchActividades();
      if (!predicas.length) await fetchPredicas();
      setLoading(false);
    };
    load();
  }, []);

  let results = [];
  if (query) {
    const q = query.toLowerCase();

    const pages = [
      { title: "Inicio", href: "/", keywords: ["iglesia casa del alfarero", "inicio", "home", "bienvenidos"], headings: ["Iglesia Casa del Alfarero", "Prédicas", "Actividades", "Sobre Nosotros"] },
      { title: "Nosotros", href: "/nosotros", keywords: ["nosotros", "quienes somos", "historia", "iglesia"], headings: ["Sobre Nosotros", "Nuestra Historia", "Misión", "Visión"] },
      { title: "Actividades", href: "/#actividades", keywords: ["actividades", "eventos", "reuniones"], headings: ["Actividades", "Próximos Eventos"] },
      { title: "Prédicas", href: "/#predicas", keywords: ["predicas", "predicaciones", "sermones", "mensajes"], headings: ["Prédicas"] },
      { title: "Reels", href: "/reels", keywords: ["reels", "videos", "cortos", "graciosos", "instagram", "reels divertidos"], headings: ["Reels"] },
      { title: "Contactanos", href: "/contactanos", keywords: ["contacto", "contactanos", "mensaje", "ubicacion", "direccion"], headings: ["Contactanos", "Ubicación", "Envíanos un mensaje"] },
      { title: "Calendario", href: "/calendario", keywords: ["calendario", "eventos", "fechas", "agenda"], headings: ["Calendario"] },
    ];

    pages.forEach((p) => {
      const matchHeadings = p.headings.some((h) => h.toLowerCase().includes(q));
      const matchKeywords = p.keywords.some((k) => k.includes(q));
      if (matchHeadings || matchKeywords)
        results.push({ title: p.title, href: p.href, type: "Página" });
    });

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

  const onlyPage = results.length === 1 && results[0].type === "Página";

  useEffect(() => {
    if (onlyPage) router.replace(results[0].href);
  }, [onlyPage]);

  if (onlyPage) {
    return (
      <div className="min-h-screen py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto"><BackButton /></div>
        <div className="max-w-2xl mx-auto">
          <p className="text-gray-400 mb-4">Redirigiendo a {results[0].title}...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <BackButton />
      </div>
      <div className="max-w-2xl mx-auto">
        {query && !loading && (
          <p className="text-gray-400 mb-4">
            {results.length > 0
              ? `Se encontraron ${results.length} resultado(s) para "${query}"`
              : `Sin resultados para "${query}"`}
          </p>
        )}
        {loading && query && (
          <p className="text-gray-400 mb-4">Buscando...</p>
        )}
        {results.length > 0 && (
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
        )}
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
