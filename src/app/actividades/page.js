import Actividades from '../components/Actividades'
import BackButton from '../components/BackButton'

const page = () => {
  return (
    <div className="min-h-screen py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-start gap-3 mb-6">
          <BackButton />
          <div className="w-1.5 h-8 bg-white rounded-full" />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6 text-white">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="3" y1="10" x2="21" y2="10" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="16" y1="2" x2="16" y2="6" />
          </svg>
          <h3 className="text-4xl sm:text-5xl font-bold text-white">Actividades</h3>
        </div>
        <Actividades />
      </div>
    </div>
  )
}

export default page