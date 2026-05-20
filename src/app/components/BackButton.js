'use client'

import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="cursor-pointer flex items-center justify-center text-white hover:text-gray-300 transition-colors mb-4 w-10 h-10"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>
    </button>
  );
};

export default BackButton;
