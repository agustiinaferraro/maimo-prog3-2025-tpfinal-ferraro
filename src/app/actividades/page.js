import Actividades from '../components/Actividades'
import BackButton from '../components/BackButton'

const page = () => {
  return (
    <div className="min-h-screen py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <BackButton />
        <Actividades />
      </div>
    </div>
  )
}

export default page