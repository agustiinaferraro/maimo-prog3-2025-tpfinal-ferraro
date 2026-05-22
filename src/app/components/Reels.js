'use client'

import { useState, useEffect, useRef } from "react";
import Loading from "./Loading";

const REELS = [
  { link: "https://www.instagram.com/p/DXpshmEDj5C/" },
  { link: "https://www.instagram.com/p/C6Y41lOrHWh/" },
  { link: "https://www.instagram.com/p/DS5pJOQEd9h/" },
  { link: "https://www.instagram.com/p/DPSZDgODi3X/" },
  { link: "https://www.instagram.com/p/DOnw87GDtZ6/" },
  { link: "https://www.instagram.com/p/DEGJEJ9yyUv/" },
  { link: "https://www.instagram.com/p/C77mH5JJ7PA/" },
  { link: "https://www.instagram.com/p/C6optX3LsYa/" },
];

const INSTAGRAM_URL = "https://www.instagram.com/lacasad.elfareromunro/";

const Reels = ({ isCarousel = false }) => {
  const [reelData, setReelData] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);
  const autoRef = useRef(null);
  const videoRefs = useRef([]);

  useEffect(() => {
    const fetchAll = async () => {
      const results = await Promise.allSettled(
        REELS.map((r) =>
          fetch(`/api/reel-thumbnail?url=${encodeURIComponent(r.link)}`).then((res) =>
            res.ok ? res.json() : null
          )
        )
      );
      const data = results.map((r, i) => ({
        ...REELS[i],
        video: r.status === "fulfilled" && r.value?.video ? r.value.video : null,
        thumbnail: r.status === "fulfilled" && r.value?.thumbnail ? r.value.thumbnail : null,
      }));
      setReelData(data);
      setLoading(false);
    };
    fetchAll();
  }, []);

  useEffect(() => {
    if (loading) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const vid = entry.target;
        if (entry.isIntersecting) {
          vid.play().catch(() => {});
        } else {
          vid.pause();
        }
      });
    }, { threshold: 0.3 });
    videoRefs.current.forEach((vid) => { if (vid) obs.observe(vid); });
    return () => obs.disconnect();
  }, [loading, reelData]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.offsetWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    if (!isCarousel || loading) return;
    autoRef.current = setInterval(() => {
      if (scrollRef.current) {
        const cardW = scrollRef.current.querySelector("div")?.offsetWidth || 280;
        scrollRef.current.scrollBy({ left: cardW + 16, behavior: "smooth" });
        if (scrollRef.current.scrollLeft + scrollRef.current.offsetWidth >= scrollRef.current.scrollWidth - cardW) {
          setTimeout(() => { scrollRef.current.scrollLeft = 0; }, 600);
        }
      }
    }, 4000);
    return () => clearInterval(autoRef.current);
  }, [isCarousel, loading]);

  if (loading) return <Loading />;
  if (!reelData.length) return null;

  const videoClass =
    "w-full h-full object-cover transition-all duration-300 group-hover:scale-125";

  const renderVideo = (reel, idx) => {
    if (reel.video) {
      return (
        <video
          ref={(el) => { videoRefs.current[idx] = el; }}
          src={reel.video}
          muted
          loop
          playsInline
          className={videoClass}
        />
      );
    }
    if (reel.thumbnail) {
      return (
        <img
          src={reel.thumbnail}
          alt="Reel"
          className={videoClass}
        />
      );
    }
    return null;
  };

  return (
    <div className="py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-8 bg-white rounded-full" />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6 text-white">
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <circle cx="12" cy="12" r="3" />
            <rect x="9" y="9" width="6" height="6" rx="1" />
          </svg>
          <h3 className="text-4xl sm:text-5xl font-bold text-white">Reels</h3>
        </div>
      </div>
      <div className="max-w-7xl mx-auto">
        {isCarousel ? (
          <>
            <div className="flex items-center gap-4">
              <button
                onClick={() => scroll('left')}
                className="flex-shrink-0 cursor-pointer text-white hover:text-gray-300 hover:scale-125 active:scale-90 transition-all duration-200"
                aria-label="Anterior"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>

              <div
                ref={scrollRef}
                className="flex-1 flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {reelData.map((reel, i) => (
                  <div key={i} className="snap-start flex-shrink-0 py-2">
                    <a
                      href={INSTAGRAM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group w-[190px] sm:w-[230px] md:w-[280px] rounded-xl shadow-md flex flex-col bg-black/10 backdrop-blur-md border border-white/20 hover:scale-[1.03] active:scale-[0.97] transition-transform duration-200 cursor-pointer"
                    >
                      <div className="relative w-full h-72 sm:h-80 bg-gradient-to-br from-gray-700 to-gray-900 overflow-hidden rounded-t-xl">
                        <div className="w-full h-full overflow-hidden">
                          {renderVideo(reel, i)}
                        </div>
                        {!reel.video && !reel.thumbnail && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth={1.5} className="w-16 h-16">
                              <rect x="2" y="2" width="20" height="20" rx="5" />
                              <circle cx="12" cy="12" r="3" fill="#555" />
                              <rect x="9" y="9" width="6" height="6" rx="1" />
                            </svg>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center opacity-90 hover:opacity-100 transition-opacity z-10 bg-gradient-to-tr from-purple-600 to-pink-500">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} className="w-5 h-5">
                              <rect x="2" y="2" width="20" height="20" rx="5" />
                              <polygon points="10,8 16,12 10,16" fill="white" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 flex flex-col justify-center flex-1 rounded-b-xl overflow-hidden">
                        <h3 className="text-xs sm:text-sm font-normal line-clamp-2 leading-tight text-left lowercase [&::first-letter]:uppercase">Reel</h3>
                      </div>
                    </a>
                  </div>
                ))}
              </div>

              <button
                onClick={() => scroll('right')}
                className="flex-shrink-0 cursor-pointer text-white hover:text-gray-300 hover:scale-125 active:scale-90 transition-all duration-200"
                aria-label="Siguiente"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>

            <div className="flex justify-end mt-8">
              <a
                href="/reels"
                className="cursor-pointer px-6 py-2 bg-white text-black rounded-lg hover:scale-110 hover:brightness-125 active:scale-90 active:brightness-75 transition-all duration-200"
              >
                Ver más
              </a>
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {reelData.map((reel, i) => (
                <a
                  key={i}
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-xl shadow-md flex flex-col bg-black/10 backdrop-blur-md border border-white/20 hover:scale-[1.03] active:scale-[0.97] transition-transform duration-200 cursor-pointer"
                >
                  <div className="relative w-full h-72 sm:h-80 bg-gradient-to-br from-gray-700 to-gray-900 overflow-hidden rounded-t-xl">
                    <div className="w-full h-full overflow-hidden">
                      {renderVideo(reel, i)}
                    </div>
                    {!reel.video && !reel.thumbnail && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth={1.5} className="w-16 h-16">
                          <rect x="2" y="2" width="20" height="20" rx="5" />
                          <circle cx="12" cy="12" r="3" fill="#555" />
                          <rect x="9" y="9" width="6" height="6" rx="1" />
                        </svg>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center opacity-90 hover:opacity-100 transition-opacity z-10 bg-gradient-to-tr from-purple-600 to-pink-500">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} className="w-5 h-5">
                          <rect x="2" y="2" width="20" height="20" rx="5" />
                          <polygon points="10,8 16,12 10,16" fill="white" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 flex flex-col justify-center flex-1 rounded-b-xl overflow-hidden">
                    <h3 className="text-sm sm:text-base font-normal leading-tight text-left lowercase [&::first-letter]:uppercase">Reel</h3>
                  </div>
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Reels;
