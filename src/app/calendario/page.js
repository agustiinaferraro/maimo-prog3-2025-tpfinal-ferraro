import Calendario from "../components/Calendario"
import BackButton from "../components/BackButton"

const Page = () => {
  return (
    <div className="min-h-screen py-10 px-4 sm:px-6">
    <div className="max-w-7xl mx-auto">
      <BackButton />
      <Calendario />
    </div>
    </div>
  )
}

export default Page