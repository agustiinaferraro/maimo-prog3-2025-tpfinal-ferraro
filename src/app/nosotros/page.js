import About from "../components/About.js"
import BackButton from "../components/BackButton"

const page = () => {
  return (
    <div>
      <div className="px-4 sm:px-6 pt-[72px]">
        <div className="max-w-7xl mx-auto">
          <BackButton />
        </div>
      </div>
      <About />
    </div>
  )
}

export default page