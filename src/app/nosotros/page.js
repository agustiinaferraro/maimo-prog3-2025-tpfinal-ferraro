import About from "../components/About.js"
import BackButton from "../components/BackButton"

const page = () => {
  return (
    <div className="min-h-screen py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <BackButton />
          <div className="w-1.5 h-8 bg-white rounded-full" />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-10 h-10">
            <circle cx="8" cy="7" r="3.5" fill="white" />
            <path d="M2 21c0-4 3-7 6-7s6 3 6 7" fill="white" />
            <circle cx="17" cy="7" r="3.5" fill="white" />
            <path d="M14 21c0-3 2-5 5-5s5 2 5 5" fill="white" />
          </svg>
          <h3 className="text-4xl sm:text-5xl font-bold text-white">Nosotros</h3>
        </div>
      </div>
      <About />
    </div>
  )
}

export default page