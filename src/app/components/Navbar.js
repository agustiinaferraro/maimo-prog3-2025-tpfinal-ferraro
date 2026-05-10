'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/buscar?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-20 bg-black">
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

          <form onSubmit={handleSearch} className="hidden lg:flex items-center max-w-xs mx-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar..."
              className="w-full px-3 py-1.5 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-white/40 text-sm"
            />
          </form>

          <button
            className="lg:hidden text-white ml-auto text-3xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          <nav
            className={`w-full lg:w-auto ${
              menuOpen ? "block absolute top-[72px] left-0 z-10" : "hidden"
            } lg:flex lg:items-center lg:gap-6 lg:ml-auto lg:mt-0 bg-black rounded-b-xl p-4 lg:p-0 shadow-lg`}
          >
            <ul className="flex flex-col lg:flex-row gap-2 lg:gap-10 text-gray-300 px-2 lg:px-0 items-stretch lg:items-center">
              
              <li className="w-full lg:w-auto hover:text-white transition-colors duration-200 flex items-center py-2 border-b border-gray-700 lg:border-none">
                <Link href="/nosotros" className="block w-full text-center lg:inline-block lg:w-auto">
                  Nosotros
                </Link>
              </li>

              <li className="w-full lg:w-auto hover:text-white transition-colors duration-200 flex items-center py-2">
                <Link href="/actividades" className="block w-full text-center lg:inline-block lg:w-auto">
                  Actividades
                </Link>
              </li>

              <li className="w-full lg:w-auto hover:text-white transition-colors duration-200 flex items-center py-2">
                <Link href="/predicas" className="block w-full text-center lg:inline-block lg:w-auto">
                  Prédicas
                </Link>
              </li>

              <li className="hidden lg:flex w-full lg:w-auto hover:text-white transition-colors duration-200 items-center py-2">
                <Link href="/contactanos" className="block w-full text-center lg:inline-block lg:w-auto">
                  Contactanos
                </Link>
              </li>

              <li className="hidden lg:flex w-full lg:w-auto hover:text-white transition-colors duration-200 items-center py-2">
                <Link href="/calendario" className="block w-full text-center lg:inline-block lg:w-auto">
                  Calendario
                </Link>
              </li>

              <li className="lg:hidden w-full">
                <form onSubmit={handleSearch} className="flex items-center border-t border-gray-700 pt-3 mt-3">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar..."
                    className="w-full px-3 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-white/40 text-sm"
                  />
                </form>
              </li>

              <li className="lg:hidden w-full hover:text-white transition-colors duration-200 flex items-center py-2">
                <Link href="/contactanos" className="block w-full text-center lg:inline-block lg:w-auto">
                  Contactanos
                </Link>
              </li>

              <li className="lg:hidden w-full hover:text-white transition-colors duration-200 flex items-center py-2">
                <Link href="/calendario" className="block w-full text-center lg:inline-block lg:w-auto">
                  Calendario
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
