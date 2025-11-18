import Image from "next/image"
import { useAppContext } from "@/app/context/AppContext"

const About = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-5 md:px-10 py-5">

      {/* Fondo */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-transparent from-black/40 via-black/80 to-black/90">
        <Image
          src="/background-about.png"
          alt="Background About"
          fill
          className="object-cover brightness-50 blur-sm"
        />
      </div>

      <div className="relative flex flex-col md:flex-row md:flex-wrap items-center md:items-start gap-10 w-full max-w-[900px] mx-auto text-white">

        {/* Foto */}
        <div className="flex-1 w-full max-w-[420px] min-w-[280px]">
          <div className="relative overflow-hidden rounded-lg border-x border-b border-gray-500 transition-all duration-300 hover:border-gray-300 hover:scale-[1.02]">

            <Image 
              src="/img/iglesia.jpeg"
              alt="Iglesia"
              width={420}
              height={400}
              className="w-full h-auto md:h-[280px] object-cover transition-transform duration-300 hover:scale-105 active:scale-95 rounded-t-lg"
            />

            <div className="absolute bottom-0 w-full bg-linear-to-t from-black to-black/0 border-gray-500 rounded-b-lg text-white p-4 pt-30 flex flex-col md:flex-row md:items-center md:justify-between gap-2 transition-all duration-300">
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

        {/* Texto */}
        <div className="flex-1 w-full max-w-[420px] min-w-[280px] md:w-auto md:max-w-none md:max-h-[420px] md:overflow-auto">
          <h2 className="text-3xl text-left font-bold mb-4">La Casa del Alfarero</h2>

          <p>
            La <span className="font-bold">Iglesia Confraternidad Cristiana (ICC)</span> es un espacio de fe, crecimiento espiritual y comunidad. Buscamos acompañar a cada persona con <span className="font-bold">enseñanza bíblica</span> y actividades que fortalezcan su vida diaria.
          </p>

          <p className="mt-4">
            Mediante nuestra <span className="font-bold">plataforma digital</span> ofrecemos información de servicios, calendario, <span className="font-bold">recursos multimedia</span> y un <span className="font-bold">registro accesible</span>, creando un espacio cercano y moderno para conectar y crecer en la fe.
          </p>
        </div>

      </div>
    </div>
  )
}

export default About
