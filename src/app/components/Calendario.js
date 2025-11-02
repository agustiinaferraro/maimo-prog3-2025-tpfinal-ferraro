import Image from "next/image"
const Calendario = () => {
  return (
    <div className="m-5 ml-88 mr-88">
        <Image
            src="/img/calendario.jpeg"
            width={400}
            height={400}
            alt="Calendario"
            unoptimized
            className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105 active:scale-300 rounded-lg"
        />
    </div>
  )
}

export default Calendario