import Predicas from "../components/Predicas"
import BackButton from "../components/BackButton"

const page = () => {
  return (
    <div className="min-h-screen py-10 px-6">
    <div className="max-w-4xl mx-auto">
      <BackButton />
      <Predicas isCarousel={false} />
    </div>
    </div>
  )
}

export default page