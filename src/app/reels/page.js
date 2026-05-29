import Reels from "../components/Reels";
import BackButton from "../components/BackButton";

export const metadata = {
  title: "Videos | Iglesia Casa del Alfarero Munro",
  description: "Videos cortos y reels de Instagram",
};

const ReelsPage = () => {
  return (
    <div className="min-h-screen py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-start gap-3 mb-6">
          <BackButton />
          <div className="w-1.5 h-8 bg-white rounded-full" />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-10 h-10">
            <rect x="2" y="3" width="20" height="18" rx="3" fill="white" />
            <circle cx="6" cy="7" r="1" fill="black" />
            <circle cx="6" cy="11" r="1" fill="black" />
            <circle cx="6" cy="15" r="1" fill="black" />
            <circle cx="18" cy="7" r="1" fill="black" />
            <circle cx="18" cy="11" r="1" fill="black" />
            <circle cx="18" cy="15" r="1" fill="black" />
          </svg>
          <h3 className="text-4xl sm:text-5xl font-bold text-white">Videos</h3>
        </div>
      </div>
      <Reels />
    </div>
  );
};

export default ReelsPage;
