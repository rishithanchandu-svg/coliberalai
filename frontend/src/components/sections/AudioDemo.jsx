import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import { audioURL } from "@/lib/constants";

const SCRIPT_LINES = [
  { who: "(AI)", text: "Hello, this is Bluestone Real Estate. How can I help you?" },
  { who: "Caller", text: "Hello. Hi. I was just looking for some properties near Whitefield area" },
  { who: "(AI)", text: "Are you looking to buy or rent?" },
  { who: "Caller", text: "Buy it." },
  { who: "(AI)", text: "What's your budget for buying in Whitefield?" },
];

export const AudioDemo = () => {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onTime = () => setTime(a.currentTime);
    const onMeta = () => setDuration(a.duration || 0);
    const onEnd = () => setPlaying(false);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onMeta);
    a.addEventListener("ended", onEnd);
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onMeta);
      a.removeEventListener("ended", onEnd);
    };
  }, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  };

  const fmt = (s) => {
    if (!s || isNaN(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  return (
    <section
      id="demo"
      data-testid="audio-demo-section"
      className="relative py-24 md:py-32 bg-[#EFECE6]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-12 gap-10">
        <div className="col-span-12 lg:col-span-5">
          <div className="eyebrow mb-6">/ 01 — Listen</div>
          <h2 className="font-heading font-light tracking-tight text-[#1A1A1A] text-4xl md:text-5xl leading-[1.1]">
            Hear what a <span className="italic text-[#D94832]">human-like</span> agent actually sounds like.
          </h2>
          <p className="mt-6 text-[#5C5C5C] text-lg max-w-md">
            A sample from a Real Estate deployment. No robotic tone,
            no awkward pauses — just fast, warm conversation that handles enquiry.
          </p>
        </div>

        <div className="col-span-12 lg:col-span-7">
          <div className="relative rounded-3xl border border-[rgba(26,26,26,0.1)] bg-[#F8F7F4] p-8 md:p-10 shadow-[0_30px_60px_-40px_rgba(0,0,0,0.25)]">
            {/* Player header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={toggle}
                  data-testid="audio-play-button"
                  aria-label={playing ? "Pause demo" : "Play demo"}
                  className="relative w-16 h-16 rounded-full bg-[#D94832] text-white flex items-center justify-center hover:bg-[#B33824] transition shadow-lg"
                >
                  {playing ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
                  {playing && (
                    <span className="absolute inset-0 rounded-full border border-[#D94832]/40 animate-ping" />
                  )}
                </button>
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#5C5C5C]">
                    Demo · Coaching intake call
                  </div>
                  <div className="font-heading text-2xl text-[#1A1A1A] mt-1">
                    Aarohi · discovery call booking
                  </div>
                </div>
              </div>

              {/* Waveform */}
              <div
                data-testid="audio-waveform"
                className={`hidden sm:flex items-center text-[#D94832] ${playing ? "wave-playing" : ""}`}
                aria-hidden
              >
                {Array.from({ length: 9 }).map((_, i) => (
                  <span key={i} className="wave-bar" style={{ height: `${14 + (i % 3) * 8}px` }} />
                ))}
              </div>
            </div>

            {/* Progress */}
            <div className="mt-8">
              <div className="h-[2px] bg-[rgba(26,26,26,0.15)] relative overflow-hidden rounded-full">
                <div
                  className="absolute left-0 top-0 h-full bg-[#D94832] transition-[width] duration-200"
                  style={{ width: `${duration ? (time / duration) * 100 : 0}%` }}
                />
              </div>
              <div className="flex justify-between mt-2 font-mono text-xs text-[#5C5C5C]">
                <span data-testid="audio-current-time">{fmt(time)}</span>
                <span data-testid="audio-duration">{fmt(duration)}</span>
              </div>
            </div>

            {/* Transcript */}
            <div className="mt-8 grid gap-3">
              {SCRIPT_LINES.map((l, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <span
                    className={`font-mono text-[10px] uppercase tracking-[0.2em] mt-1.5 w-20 shrink-0 ${
                      l.who === "Ava (AI)" ? "text-[#D94832]" : "text-[#5C5C5C]"
                    }`}
                  >
                    {l.who}
                  </span>
                  <p className="text-[#1A1A1A] text-[15px] md:text-base leading-relaxed">
                    {l.text}
                  </p>
                </div>
              ))}
            </div>

            <audio ref={audioRef} src={audioURL} preload="metadata" data-testid="audio-element" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AudioDemo;
