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
  const [hoverIdx, setHoverIdx] = useState(null);
  const scrollRef = useRef(null);
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
      setReelData(data);
      setLoading(false);
    };
    fetchAll();
  }, []);

  useEffect(() => {
    if (!isCarousel || loading || !scrollRef.current) return;
    const scroll = () => {
      if (!scrollRef.current) return;
      const el = scrollRef.current;
      const maxScroll = el.scrollWidth / 2;
      el.scrollLeft += 0.4;
      if (el.scrollLeft >= maxScroll) el.scrollLeft = 0;
      rafRef.current = requestAnimationFrame(scroll);
    };
    rafRef.current = requestAnimationFrame(scroll);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [isCarousel, loading]);

  const startAutoScroll = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const scroll = () => {
      if (!scrollRef.current) return;
      const el = scrollRef.current;
      const maxScroll = el.scrollWidth / 2;
      el.scrollLeft += 0.4;
      if (el.scrollLeft >= maxScroll) el.scrollLeft = 0;
      rafRef.current = requestAnimationFrame(scroll);
    };
    rafRef.current = requestAnimationFrame(scroll);
  };

  const stopAutoScroll = () => {
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
  };

  const handleMouseEnter = (i) => {
    setHoverIdx(i);
    stopAutoScroll();
    const vid = videoRefs.current[i];
    if (vid) vid.play().catch(() => {});
  };

  const handleMouseLeave = (i) => {
    setHoverIdx(null);
    const vid = videoRefs.current[i];
    if (vid) { vid.pause(); vid.currentTime = 0; }
    if (isCarousel) startAutoScroll();
  };

  if (loading) return <Loading />;
  if (!reelData.length) return null;

  const displayData = isCarousel ? [...reelData, ...reelData] : reelData;

  const renderMedia = (reel, i) => {
    const realIdx = i % reelData.length;
    const showVideo = hoverIdx === realIdx && reel.video;
    const showThumb = !showVideo && reel.thumbnail;

    return (
      <div className="relative w-full h-full">
        {reel.thumbnail && (
          <img
            src={reel.thumbnail}
            alt=""
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
        {!reel.video && !reel.thumbnail && (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth={1.5} className="w-16 h-16">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="3" fill="#555" />
              <rect x="9" y="9" width="6" height="6" rx="1" />
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
            <div ref={scrollRef} className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {displayData.map((reel, i) => (
                  <div key={i} className="flex-shrink-0 py-2">
                    <a
                      href={INSTAGRAM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${cardClasses} w-[190px] sm:w-[230px] md:w-[280px]`}
                      onMouseEnter={() => handleMouseEnter(i % reelData.length)}
                      onMouseLeave={() => handleMouseLeave(i % reelData.length)}
                    >
                      <div className={imgClasses}>
                        {renderMedia(reel, i)}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                        <div className="absolute bottom-2 right-2 opacity-30">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-4 h-4">
                            <polygon points="8,5 19,12 8,19" />
                          </svg>
                        </div>
                      </div>
                      <div className="p-3 flex flex-col justify-center flex-1 rounded-b-xl overflow-hidden">
                        <p className="text-xs sm:text-sm font-normal leading-tight text-left line-clamp-2">
                          {reel.title || "Instagram"}
                        </p>
                      </div>
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
                  className={cardClasses}
                  onMouseEnter={() => handleMouseEnter(i)}
                  onMouseLeave={() => handleMouseLeave(i)}
                >
                  <div className={imgClasses}>
                    {renderMedia(reel, i)}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <div className="absolute bottom-2 right-2 opacity-30">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-4 h-4">
                        <polygon points="8,5 19,12 8,19" />
                      </svg>
                    </div>
                  </div>
                  <div className="p-3 flex flex-col justify-center flex-1 rounded-b-xl overflow-hidden">
                    <p className="text-sm sm:text-base font-normal leading-tight text-left line-clamp-2">
                      {reel.title || "Instagram"}
                    </p>
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
