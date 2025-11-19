import Image from "next/image";

const Calendario = () => {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="mx-auto max-w-[90vw] sm:max-w-[70vw] md:max-w-[50vw] m-5">
        <Image
          src="/img/calendario.jpeg"
          width={400}
          height={400}
          alt="Calendario"
          unoptimized
          className="w-full h-auto object-cover transition-transform duration-200 transform hover:scale-105 active:scale-95 rounded-lg"
        />
      </div>
    </div>
  );
}

export default Calendario;