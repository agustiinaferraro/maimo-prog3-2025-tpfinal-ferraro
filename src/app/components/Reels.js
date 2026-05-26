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


const Reels = ({ isCarousel = false }) => {
  const [reelData, setReelData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoverIdx, setHoverIdx] = useState(null);
  const [brokenImgs, setBrokenImgs] = useState(new Set());
  const scrollElRef = useRef(null);
  const rafRef = useRef(null);
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
        title: r.status === "fulfilled" && r.value?.title ? r.value.title : "",
      }));

      const fallbacks = data.map((r) => r.thumbnail).filter(Boolean);
      const filled = data.map((r) => ({
        ...r,
        thumbnail: r.thumbnail || (fallbacks.length > 0
          ? fallbacks[Math.floor(Math.random() * fallbacks.length)]
          : ""),
      }));

      setReelData(filled);
      setLoading(false);
    };
    fetchAll();
  }, []);

  useEffect(() => {
    if (!isCarousel || loading) return;
    rafRef.current = setInterval(() => {
      if (scrollElRef.current) {
        scrollElRef.current.scrollLeft += 2;
        const maxScroll = scrollElRef.current.scrollWidth / 2;
        if (scrollElRef.current.scrollLeft >= maxScroll) {
          scrollElRef.current.scrollLeft = 0;
        }
      }
    }, 30);
    return () => { if (rafRef.current) { clearInterval(rafRef.current); rafRef.current = null; } };
  }, [isCarousel, loading]);

  const handleMouseEnter = (i) => {
    setHoverIdx(i);
    if (rafRef.current) { clearInterval(rafRef.current); rafRef.current = null; }
    const vid = videoRefs.current[i];
    if (vid) vid.play().catch(() => {});
  };

  const handleMouseLeave = (i) => {
    setHoverIdx(null);
    const vid = videoRefs.current[i];
    if (vid) { vid.pause(); vid.currentTime = 0; }
    if (isCarousel && !rafRef.current) {
      rafRef.current = setInterval(() => {
        if (scrollElRef.current) {
          scrollElRef.current.scrollLeft += 2;
          const maxScroll = scrollElRef.current.scrollWidth / 2;
          if (scrollElRef.current.scrollLeft >= maxScroll) {
            scrollElRef.current.scrollLeft = 0;
          }
        }
      }, 30);
    }
  };

  if (loading) return <Loading />;
  if (!reelData.length) return null;

  const displayData = isCarousel ? [...reelData, ...reelData] : reelData;

  const renderMedia = (reel, i) => {
    const realIdx = i % reelData.length;
    const showVideo = hoverIdx === realIdx && reel.video;
    const thumbBroken = brokenImgs.has(realIdx);
    const showThumb = !showVideo && reel.thumbnail && !thumbBroken;

    return (
      <div className="relative w-full h-full">
        {reel.thumbnail && !thumbBroken && (
          <img
            src={reel.thumbnail}
            alt=""
            onError={() => setBrokenImgs((prev) => new Set(prev).add(realIdx))}
            className="w-full h-full object-cover transition-all duration-300 group-hover:scale-125"
            style={{ opacity: showVideo ? 0 : 1 }}
          />
        )}
        {reel.video && (
          <video
            ref={(el) => { videoRefs.current[realIdx] = el; }}
            src={reel.video}
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover transition-all duration-300 group-hover:scale-125"
            style={{ opacity: showVideo ? 1 : 0 }}
          />
        )}
        {!showVideo && !showThumb && !reel.video && (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#555" className="w-14 h-14">
              <rect x="2" y="3" width="20" height="18" rx="3" />
            </svg>
          </div>
        )}
      </div>
    );
  };

  const cardClasses =
    "group rounded-xl shadow-md flex flex-col bg-black/10 backdrop-blur-md border border-white/20 hover:scale-[1.03] active:scale-[0.97] transition-transform duration-200 cursor-pointer";
  const imgClasses = "relative w-full h-72 sm:h-80 bg-gradient-to-br from-gray-700 to-gray-900 overflow-hidden rounded-t-xl";

  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-6">
        <div className="flex items-center gap-3">
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
      {isCarousel ? (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div ref={scrollElRef} className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {displayData.map((reel, i) => (
                  <div key={i} className="flex-shrink-0 py-2">
                    <a
                      href={reel.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${cardClasses} w-[190px] sm:w-[230px] md:w-[280px]`}
                      onMouseEnter={() => handleMouseEnter(i % reelData.length)}
                      onMouseLeave={() => handleMouseLeave(i % reelData.length)}
                    >
                      <div className={imgClasses}>
                        {renderMedia(reel, i)}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      </div>
                      {reel.title && (
                        <div className="p-3 flex flex-col justify-center flex-1 rounded-b-xl overflow-hidden">
                          <p className="text-xs sm:text-sm font-normal leading-tight text-left line-clamp-2">
                            {reel.title}
                          </p>
                        </div>
                      )}
                    </a>
                  </div>
                ))}
              </div>

            <div className="flex justify-end mt-8">
              <a
                href="/reels"
                className="cursor-pointer px-6 py-2 bg-white text-black rounded-lg hover:scale-110 hover:brightness-125 active:scale-90 active:brightness-75 transition-all duration-200"
              >
                Ver más
              </a>
            </div>
          </div>
          </>
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {reelData.map((reel, i) => (
                <a
                  key={i}
                  href={reel.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cardClasses}
                  onMouseEnter={() => handleMouseEnter(i)}
                  onMouseLeave={() => handleMouseLeave(i)}
                >
                  <div className={imgClasses}>
                    {renderMedia(reel, i)}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>
                  {reel.title && (
                    <div className="p-3 flex flex-col justify-center flex-1 rounded-b-xl overflow-hidden">
                      <p className="text-sm sm:text-base font-normal leading-tight text-left line-clamp-2">
                        {reel.title}
                      </p>
                    </div>
                  )}
                </a>
              ))}
            </div>
          </div>
        )}
    </div>
  );
};

export default Reels;
