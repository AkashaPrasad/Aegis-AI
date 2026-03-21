"use client";

import { useRef, useState, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

export function IntroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  // Track if user explicitly clicked pause so we don't auto-play against their wish
  const userManuallyPausedRef = useRef(false);

  // Intersection observer to automatically play/pause based on visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          // Video came into view, play it (unless user had manually paused it)
          if (videoRef.current && !userManuallyPausedRef.current) {
            const playPromise = videoRef.current.play();
            if (playPromise !== undefined) {
              playPromise
                .then(() => setIsPlaying(true))
                .catch(() => setIsPlaying(false));
            }
          }
        } else {
          // Video is out of view (user scrolled away), pause it automatically
          if (videoRef.current && !videoRef.current.paused) {
            videoRef.current.pause();
            setIsPlaying(false);
          }
        }
      },
      { threshold: 0.3 } // Triggers when 30% of the video is visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Sync state initially if it was somehow playing
  useEffect(() => {
    if (videoRef.current && !videoRef.current.paused && !isPlaying) {
      setIsPlaying(true);
    }
  }, [isPlaying]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        userManuallyPausedRef.current = true; // Mark as manually paused
      } else {
        videoRef.current.play();
        userManuallyPausedRef.current = false; // Unmark
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      if (total > 0) {
        setProgress((current / total) * 100);
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseFloat(e.target.value);
    if (videoRef.current) {
      const newTime = (newProgress / 100) * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
      setProgress(newProgress);
    }
  };

  return (
    <div ref={containerRef} className="relative group rounded-2xl overflow-hidden border border-border/50 bg-surface/50 shadow-2xl isolate">
      {/* Decorative Glow behind the video */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-emerald-400/30 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl -z-10" />

      {/* Fallback image is handled by the poster attribute */}
      <video
        ref={videoRef}
        className="w-full h-auto aspect-video object-cover rounded-2xl relative z-10 block"
        loop
        muted
        playsInline
        poster="/videos/aegis-intro-poster.jpg"
        onTimeUpdate={handleTimeUpdate}
      >
        <source src="/videos/aegis-intro.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>

      {/* Custom Controls Overlay */}
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 rounded-2xl pointer-events-none">
        
        {/* Progress Slider */}
        <div className="w-full mb-4 px-1 pointer-events-auto">
          <input
            type="range"
            min="0"
            max="100"
            step="0.1"
            value={progress}
            onChange={handleSeek}
            className="w-full h-1.5 appearance-none cursor-pointer rounded-full outline-none hover:h-2 transition-all"
            style={{
              background: `linear-gradient(to right, #34d399 ${progress}%, rgba(255, 255, 255, 0.3) ${progress}%)`,
              accentColor: '#34d399' // Tailwind emerald-400
            }}
            aria-label="Video progress"
          />
        </div>

        <div className="flex items-center justify-between pointer-events-auto">
          <button
            onClick={togglePlay}
            className="p-3 rounded-full bg-black/40 text-white hover:bg-emerald-500/80 hover:text-white backdrop-blur-md transition-all border border-white/10 hover:scale-105 active:scale-95 flex items-center justify-center shadow-lg"
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? <Pause size={20} className="fill-current" /> : <Play size={20} className="fill-current ml-0.5" />}
          </button>
          
          <button
            onClick={toggleMute}
            className="p-3 rounded-full bg-black/40 text-white hover:bg-emerald-500/80 hover:text-white backdrop-blur-md transition-all border border-white/10 hover:scale-105 active:scale-95 flex items-center justify-center shadow-lg"
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
}
