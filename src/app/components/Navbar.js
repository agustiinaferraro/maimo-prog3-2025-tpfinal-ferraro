'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q");
    if (q) setSearchQuery(q);
  }, []);

  const navigateToSearch = (q) => {
    const directPages = {
      inicio: "/",
      home: "/",
      nosotros: "/nosotros",
      actividades: "/#actividades",
      predicas: "/#predicas",
      predica: "/#predicas",
      reels: "/reels",
      contactanos: "/contactanos",
      contacto: "/contactanos",
      calendario: "/calendario",
    };
    const val = q.toLowerCase();
    if (directPages[val]) { router.push(directPages[val]); return; }
    if (val.length >= 3) {
      const matched = [...new Set(Object.keys(directPages).filter((k) => k.startsWith(val)).map((k) => directPages[k]))];
      if (matched.length === 1) { router.push(matched[0]); return; }
    }
    router.push(`/buscar?q=${encodeURIComponent(q)}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigateToSearch(searchQuery.trim());
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  const debounceRef = useRef(null);

  const handleChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (!val.trim()) {
      if (window.location.pathname !== "/buscar") return;
      router.push("/");
      return;
    }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      if (params.get("q") === val.trim()) return;
      navigateToSearch(val.trim());
    }, 300);
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-20">
        <div className="flex items-center justify-between flex-wrap text-white px-6 lg:px-10 h-[72px] relative">
          
          <Link href="/">
            <Image
              src="/img/logo-fondo-negro.jpg"
              alt="logo"
              width={50}
              height={588}
              className="h-[50px] object-cover"
            />
          </Link>

          <button
            className="lg:hidden text-white ml-auto text-3xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          <nav
            className={`w-full lg:w-auto ${
              menuOpen ? "block absolute top-[72px] left-0 z-10" : "hidden"
            } lg:flex lg:items-center lg:gap-6 lg:ml-auto lg:mt-0 p-4 lg:p-0`}
          >
            <ul className="flex flex-col lg:flex-row gap-2 lg:gap-14 text-gray-300 px-2 lg:px-0 items-stretch lg:items-center">

              <li className="hidden lg:flex items-center">
                <div className="relative">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Buscar..."
                    className="w-48 lg:w-56 pl-10 pr-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-white/40 text-base"
                  />
                </div>
              </li>

              <li className={`w-full lg:w-auto hover:text-white transition-colors duration-200 flex items-center ${pathname === "/nosotros" ? "text-white" : ""}`}>
                <Link href="/nosotros" className="block w-full text-center lg:inline-block lg:w-auto relative py-2">
                  Nosotros
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-white rounded-full transition-all duration-300 ${pathname === "/nosotros" ? "w-8" : "w-0"}`} />
                </Link>
              </li>

              <li className={`w-full lg:w-auto hover:text-white transition-colors duration-200 flex items-center ${pathname === "/actividades" ? "text-white" : ""}`}>
                <Link href="/actividades" className="block w-full text-center lg:inline-block lg:w-auto relative py-2">
                  Actividades
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-white rounded-full transition-all duration-300 ${pathname === "/actividades" ? "w-8" : "w-0"}`} />
                </Link>
              </li>

              <li className={`w-full lg:w-auto hover:text-white transition-colors duration-200 flex items-center ${pathname === "/predicas" ? "text-white" : ""}`}>
                <Link href="/predicas" className="block w-full text-center lg:inline-block lg:w-auto relative py-2">
                  Prédicas
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-white rounded-full transition-all duration-300 ${pathname === "/predicas" ? "w-8" : "w-0"}`} />
                </Link>
              </li>

              <li className={`w-full lg:w-auto hover:text-white transition-colors duration-200 flex items-center ${pathname === "/reels" ? "text-white" : ""}`}>
                <Link href="/reels" className="block w-full text-center lg:inline-block lg:w-auto relative py-2">
                  Videos
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-white rounded-full transition-all duration-300 ${pathname === "/reels" ? "w-8" : "w-0"}`} />
                </Link>
              </li>

              <li className={`hidden lg:flex w-full lg:w-auto hover:text-white transition-colors duration-200 items-center ${pathname === "/contactanos" ? "text-white" : ""}`}>
                <Link href="/contactanos" className="block w-full text-center lg:inline-block lg:w-auto relative py-2">
                  Contactanos
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-white rounded-full transition-all duration-300 ${pathname === "/contactanos" ? "w-8" : "w-0"}`} />
                </Link>
              </li>

              <li className={`hidden lg:flex w-full lg:w-auto hover:text-white transition-colors duration-200 items-center ${pathname === "/calendario" ? "text-white" : ""}`}>
                <Link href="/calendario" className="block w-full text-center lg:inline-block lg:w-auto relative py-2">
                  Calendario
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-white rounded-full transition-all duration-300 ${pathname === "/calendario" ? "w-8" : "w-0"}`} />
                </Link>
              </li>

              <li className="lg:hidden w-full">
                <div className="pt-3 mt-3">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="absolute left-3 -translate-y-1/2 w-4 h-4 text-gray-400" style={{ top: 'calc(50% + 6px)' }}>
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Buscar..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-white/40 text-sm"
                  />
                </div>
              </li>

              <li className={`lg:hidden w-full hover:text-white transition-colors duration-200 flex items-center ${pathname === "/contactanos" ? "text-white" : ""}`}>
                <Link href="/contactanos" className="block w-full text-center lg:inline-block lg:w-auto relative py-2">
                  Contactanos
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-white rounded-full transition-all duration-300 ${pathname === "/contactanos" ? "w-8" : "w-0"}`} />
                </Link>
              </li>

              <li className={`lg:hidden w-full hover:text-white transition-colors duration-200 flex items-center ${pathname === "/calendario" ? "text-white" : ""}`}>
                <Link href="/calendario" className="block w-full text-center lg:inline-block lg:w-auto relative py-2">
                  Calendario
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-white rounded-full transition-all duration-300 ${pathname === "/calendario" ? "w-8" : "w-0"}`} />
                </Link>
              </li>

            </ul>
          </nav>
        </div>
      </div>

      <div className="pt-[72px]"></div>
    </>
  );
};

export default Navbar;
