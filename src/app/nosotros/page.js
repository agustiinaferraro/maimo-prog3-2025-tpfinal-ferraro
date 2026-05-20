import About from "../components/About.js"
import BackButton from "../components/BackButton"

const page = () => {
  return (
    <div className="min-h-screen py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto pt-[72px]">
        <BackButton />
      </div>
      <About />
    </div>
  )
}

export default page