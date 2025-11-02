'use client'

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useAppContext } from "@/app/context/AppContext"

const Navbar = () => {
  const { searchTerm, setSearchTerm, } = useAppContext()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      {/*nav fijo arriba*/}
      <div className="fixed top-0 left-0 w-full z-20 bg-black">
        <div className="flex items-center justify-between flex-wrap text-white px-10 h-[72px] relative">
          
          {/*logo*/}
          <Link href="/">
            <Image 
              src="/img/logo-fondo-negro.jpg" 
              alt="logo" 
              width={50} 
              height={588} 
              className="h-[50px] object-cover" 
            />
          </Link>

          {/*menu hamburguesa celu */}
          <button 
            className="md:hidden text-white ml-auto" 
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          {/* menu de navegacion */}
          <nav 
            className={`w-full md:w-auto ${menuOpen ? 'block absolute top-[72px] left-0 z-10' : 'hidden'} md:flex md:items-center md:gap-6 md:ml-auto md:mt-0 
                        bg-black rounded-b-xl p-4 md:p-0 shadow-lg`}

          >
            {/*input de buscar*/}
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="🔍 Buscar..."
              className="w-full mr-15 md:w-64 p-2 rounded-md border border-gray-700 bg-gray-900 text-white placeholder-gray-400 mb-3 md:mb-0"
            />

            <ul className="flex flex-col md:flex-row gap-2 md:gap-6 text-gray-300 px-2 md:px-0">
             
              {/*nosotros */}
              <li className="hover:text-white transition-colors duration-200 flex items-center py-2 border-b border-gray-700 md:border-none min-w-[100px]">
                <Link href="/nosotros" className="w-full">
                  Nosotros
                </Link>
              </li>
            {/*acts*/}
              <li className="hover:text-white transition-colors duration-200 flex items-center py-2 md:py-0 min-w-[100px]">
                <Link href="/actividades" className="w-full">
                  Actividades
                </Link>
              </li>

              {/*predicas*/}
              <li className="hover:text-white transition-colors duration-200 flex items-center py-2 md:py-0 min-w-[100px]">
                <Link href="/predicas" className="w-full">
                  Prédicas
                </Link>
              </li>

               {/*contacto*/}
              <li className="hover:text-white transition-colors duration-200 flex items-center py-2 md:py-0 min-w-[100px]">
                <Link href="/contactanos" className="w-full">
                  Contactanos
                </Link>
              </li>

              <li className="hover:text-white transition-colors duration-200 flex items-center py-2 md:py-0 min-w-[100px]">
                <Link href="/calendario" className="w-full">
                  Calendario
                </Link>
              </li>

            </ul>
          </nav>
        </div>
      </div>

      <div className="pt-[72px]"></div>
    </>
  )
}

export default Navbar