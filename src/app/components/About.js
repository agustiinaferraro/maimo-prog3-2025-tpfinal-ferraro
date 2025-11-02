'use client'

import Image from "next/image"
import { useAppContext } from "@/app/context/AppContext"

const About = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-5 md:px-10 py-5">

      {/* fondo difuminado */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-transparent from-black/40 via-black/80 to-black/90">
        <Image
          src="/background-about.png"
          alt="Background About"
          fill
          className="object-cover brightness-50 blur-sm"
        />
      </div>

      {/* contenedor principal */}
      <div className="relative flex flex-col md:flex-row items-center gap-10 w-full max-w-[1000px] mx-auto text-white">
        
        {/* banner con imagen */}
        <div className="flex-1 w-full max-w-[420px]">
          <div className="relative overflow-hidden rounded-lg border-x border-b border-gray-500 transition-all duration-300 hover:border-gray-300 hover:scale-[1.02]">

            <Image 
              src="/img/iglesia.jpeg"
              alt="Iglesia"
              width={420}
              height={420}
              className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105 active:scale-95 rounded-t-lg"
            />

            {/* overlay abajo */}
            <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/100 to-black/0 border-gray-500 rounded-b-lg text-white p-4 pt-30 flex flex-col md:flex-row md:items-center md:justify-between gap-2 transition-all duration-300">
              <p className="text-center md:text-left text-sm md:text-base">
                Almafuerte 4141, Esquina Mitre
              </p>

              <a 
                href="https://share.google/bZM8f8HgvADwaE4Ql" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-amber-50 transition-transform duration-300 hover:scale-105 active:scale-95"
              >
                <span>📍</span> Ver en mapa
              </a>
            </div>
          </div>
        </div>

        {/* info */}
        <div className="flex-1">
          <h2 className="text-3xl text-left font-bold mb-4">La Casa del Alfarero</h2>
          <p>
            La <span className="font-bold">Iglesia Confraternidad Cristiana (ICC)</span> es un espacio dedicado a la fe, el crecimiento espiritual y la comunidad. Nuestro objetivo es acompañar a cada persona en su camino de aprendizaje y desarrollo personal, ofreciendo <span className="font-bold">enseñanza bíblica profunda</span>, eventos de formación y recursos accesibles para todos.
          </p>

          <p className="mt-4">
            A través de nuestra <span className="font-bold">plataforma digital</span>, buscamos integrar información sobre nuestros servicios, calendario de actividades, <span className="font-bold">recursos de audio y video</span> y un <span className="font-bold">registro sencillo</span> para quienes deseen participar o recibir nuestras noticias. Nuestro compromiso es mantener un espacio cercano, inclusivo y moderno que permita a la comunidad conectarse, aprender y crecer en su fe de manera constante.
          </p>
        </div>

      </div>
    </div>
  )
}

export default About
