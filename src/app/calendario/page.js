import Calendario from "../components/Calendario"
import BackButton from "../components/BackButton"

const Page = () => {
  return (
    <div className="min-h-screen py-10 px-4 sm:px-6">
    <div className="max-w-7xl mx-auto">
      <div className="flex items-start gap-3 mb-6">
        <BackButton />
        <div className="w-1.5 h-8 bg-white rounded-full" />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-10 h-10">
          <rect x="3" y="4" width="18" height="18" rx="2" fill="white" />
          <line x1="3" y1="10" x2="21" y2="10" stroke="black" strokeWidth="1.5" />
          <line x1="8" y1="2" x2="8" y2="6" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <line x1="16" y1="2" x2="16" y2="6" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <h3 className="text-4xl sm:text-5xl font-bold text-white">Calendario</h3>
      </div>
      <Calendario />
    </div>
    </div>
  )
}

export default Page