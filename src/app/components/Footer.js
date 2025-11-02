import Image from "next/image";
const Footer = () => {
  const redes = [
    { nombre: "Instagram", url: "https://www.instagram.com/iglesia_munro_icc/", img: "/img/instagram.png" },
    { nombre: "Facebook", url: "https://www.facebook.com/profile.php?id=61550700069640 ", img: "/img/facebook.png" },
    { nombre: "Youtube", url: "https://www.youtube.com/@iglesiacasadelalfareromunr1530", img: "/img/youtube.png" }
  ];

  return (
    <footer className="bg-gradient-to from-black to-transparent py-16">
      <div className="text-center text-white">
        <h2 className="text-3xl font-bold mb-6">La Casa del Alfarero</h2>

        {/*redes sociales */}
        <div className="flex justify-center flex-wrap gap-8 mb-8">
          {redes.map((red) => ( //recorre el objeto y hace todo clickeable 
            <a
              key={red.nombre}
              href={red.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center w-24 transform transition-transform duration-200 hover:scale-110 active:scale-95"
            >
              <Image
                width={200}
                height={200}
                src={red.img}
                alt={red.nombre}
                className="w-12 h-12 mb-2 object-contain"
              />
              <span className="text-white text-sm font-medium">{red.nombre}</span> {/*nombre de cada app*/}
            </a>
          ))}
        </div>

        <p className="text-lg mt-4">© Copyright 2025</p>
      </div>
    </footer>
  );
};

export default Footer;