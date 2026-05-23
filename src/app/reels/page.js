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
        <BackButton />
      </div>
      <Reels />
    </div>
  );
};

export default ReelsPage;
