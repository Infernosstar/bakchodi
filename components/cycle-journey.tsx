"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Bike } from "@/components/bike"
import { birthday, checkpoints } from "@/lib/birthday-config"

// ── Layer parallax speeds (vw travelled across the whole ride) ──
const T_CLOUD = 160
const T_FARMTN = 260
const T_NEARMTN = 360
const T_HILL = 520
const T_TREE = 1100
const T_GROUND = 1100 // road dashes + checkpoints share this
const BIKE_X = 26 // vw, where the bike sits on screen

function BikeMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <circle cx="5.5" cy="16.5" r="3.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="18.5" cy="16.5" r="3.5" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M5.5 16.5 9 8h5l2.5 8.5M9 8h6M14 8l-3 8.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  )
}

const N = checkpoints.length
const maxKm = checkpoints.reduce((m, c) => Math.max(m, c.km), 0)
// fractional position of each stop along the ride (leaves room for start/finish)
const stopU = (i: number) => (i + 1) / (N + 1)

// ── Inline SVG scenery (tiles horizontally) ──
const url = (svg: string) => `url("data:image/svg+xml,${encodeURIComponent(svg)}")`

const cloudBg = url(
  `<svg xmlns='http://www.w3.org/2000/svg' width='520' height='140'><g fill='#ffffff'><ellipse cx='90' cy='80' rx='54' ry='30'/><ellipse cx='140' cy='60' rx='46' ry='34'/><ellipse cx='190' cy='82' rx='52' ry='28'/></g></svg>`,
)
const farMtnBg = url(
  `<svg xmlns='http://www.w3.org/2000/svg' width='520' height='260'><polygon points='-20,260 120,90 260,260' fill='#a7bad9'/><polygon points='200,260 340,60 500,260' fill='#9fb2d4'/><polygon points='300,90 340,60 380,90 360,110 320,110' fill='#eaf1fb'/></svg>`,
)
const nearMtnBg = url(
  `<svg xmlns='http://www.w3.org/2000/svg' width='560' height='300'><polygon points='-40,300 140,70 320,300' fill='#6f88b3'/><polygon points='220,300 400,40 580,300' fill='#7c93bb'/><polygon points='360,80 400,40 440,80 415,110 385,110' fill='#f2f6fc'/><polygon points='100,120 140,70 180,120 158,150 122,150' fill='#f2f6fc'/></svg>`,
)
const hillBg = url(
  `<svg xmlns='http://www.w3.org/2000/svg' width='620' height='220'><path d='M0,220 Q155,70 310,190 Q460,80 620,200 L620,220 L0,220 Z' fill='#63b566'/><path d='M0,220 Q155,120 310,215 Q470,120 620,215 L620,220 Z' fill='#57a95a'/></svg>`,
)
const treeBg = url(
  `<svg xmlns='http://www.w3.org/2000/svg' width='300' height='240'><g><rect x='58' y='170' width='10' height='40' fill='#6b4b32'/><polygon points='63,60 30,150 96,150' fill='#3f7d4e'/><polygon points='63,95 34,175 92,175' fill='#356b42'/></g><g><rect x='210' y='185' width='9' height='40' fill='#6b4b32'/><polygon points='214,95 188,165 240,165' fill='#468a56'/><polygon points='214,125 191,185 237,185' fill='#3a7247'/></g></svg>`,
)

function Layer({
  bg,
  travel,
  progress,
  bottom,
  height,
  width,
  size,
  opacity = 1,
}: {
  bg: string
  travel: number
  progress: number
  bottom: string
  height: string
  width?: string
  size: string
  opacity?: number
}) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-0"
      style={{
        bottom,
        height,
        width: width ?? `${travel + 220}vw`,
        opacity,
        backgroundImage: bg,
        backgroundRepeat: "repeat-x",
        backgroundSize: size,
        transform: `translate3d(${-progress * travel}vw,0,0)`,
        willChange: "transform",
      }}
    />
  )
}
// hello everyone

function CheckpointStop({
  cp,
  u,
  progress,
  arrived,
}: {
  cp: (typeof checkpoints)[number]
  u: number
  progress: number
  arrived: boolean
}) {
  const d = u - progress
  const screenX = BIKE_X + d * T_GROUND // vw
  const ad = Math.abs(d)
  const near = Math.max(0, 1 - ad / 0.075) // 1 at the stop, 0 by 0.075 away
  const cardScale = 0.55 + near * 0.45
  const tilt = ((cp.place.length % 2 === 0 ? -1 : 1) * 3).toFixed(0)

  return (
    <div
      aria-hidden={near < 0.05}
      className="absolute"
      style={{
        left: `${screenX}vw`,
        bottom: "11vh",
        transform: "translateX(-50%)",
      }}
    >
      {/* floating polaroid */}
      <div
        className="absolute bottom-[15vh] left-1/2 w-[min(74vw,300px)] -translate-x-1/2"
        style={{
          opacity: Math.min(1, near * 1.4),
          transform: `translateX(-50%) scale(${cardScale}) rotate(${tilt}deg)`,
          transformOrigin: "bottom center",
          transition: "opacity 0.15s linear",
        }}
      >
        <div className="rounded-2xl bg-card p-3 pb-4 shadow-[0_18px_40px_-12px_rgba(40,50,70,0.55)] ring-1 ring-border">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-muted">
            {cp.src ? (
              <Image
                src={cp.src || "/placeholder.svg"}
                alt={`${cp.place} — ${cp.caption}`}
                fill
                sizes="300px"
                className="object-contain"
                crossOrigin="anonymous"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 bg-gradient-to-br from-accent/40 to-secondary/30 text-center">
                <svg viewBox="0 0 24 24" className="h-7 w-7 text-muted-foreground" fill="none" aria-hidden>
                  <path
                    d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <circle cx="12" cy="13" r="3.2" stroke="currentColor" strokeWidth="1.6" />
                </svg>
                <span className="px-3 font-sans text-xs font-semibold text-muted-foreground">
                  Add {cp.place} photo
                </span>
              </div>
            )}
            {arrived && (
              <span className="absolute left-2 top-2 rounded-full bg-primary px-2 py-0.5 font-display text-[10px] font-bold text-primary-foreground shadow">
                Arrived!
              </span>
            )}
          </div>
          <p className="mt-2 text-pretty px-1 text-center font-display text-sm font-bold leading-tight text-card-foreground">
            {cp.place}
          </p>
          <p className="text-pretty px-1 text-center font-sans text-[11px] leading-snug text-muted-foreground">
            {cp.caption}
          </p>
        </div>
      </div>

      {/* signpost */}
      <div className="flex flex-col items-center">
        <div className="rounded-lg bg-primary px-3 py-1 text-center shadow-md">
          <span className="block font-display text-sm font-extrabold leading-none text-primary-foreground">
            {cp.place}
          </span>
          <span className="block font-sans text-[9px] font-semibold uppercase tracking-wide text-primary-foreground/85">
            {cp.region} · {cp.km} km
          </span>
        </div>
        <div className="h-[9vh] w-2 rounded-full bg-[#6b4b32]" />
      </div>
    </div>
  )
}

export function CycleJourney() {
  // const trackRef = useRef<HTMLDivElement>(null)
  // const [progress, setProgress] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const el = trackRef.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        const total = el.offsetHeight - window.innerHeight
        const scrolled = Math.min(Math.max(-rect.top, 0), total)
        setProgress(total > 0 ? scrolled / total : 0)
      })
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  const nudge = useCallback(() => {
    window.scrollTo({ top: window.scrollY + window.innerHeight * 0.9, behavior: "smooth" })
  }, [])

  // nearest checkpoint (for HUD + arrived pin)
  let nearestIdx = 0
  let nearestD = Infinity
  checkpoints.forEach((_, i) => {
    const dd = Math.abs(stopU(i) - progress)
    if (dd < nearestD) {
      nearestD = dd
      nearestIdx = i
    }
  })
  const arrived = nearestD < 0.02
  const current = checkpoints[nearestIdx]
  const odo = Math.round(maxKm * progress)
  const started = progress > 0.015
  const finished = progress > 0.985
  const moving = started && !finished
  const toggleMusic = useCallback(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }, [isPlaying])
  return (
  <div ref={trackRef} style={{ height: `${(N + 2) * 100}vh` }} className="relative">
    {/* Music player */}
    <audio 
      ref={audioRef} 
      loop 
      preload="auto"
      className="hidden"
    >
      <source src="/photos/bday.mpga" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>

    {/* Music toggle button */}
    <button
      onClick={toggleMusic}
      className="fixed bottom-6 right-6 z-50 rounded-full bg-primary px-4 py-3 font-display text-sm font-bold text-primary-foreground shadow-lg hover:scale-105 transition-transform"
    >
      {isPlaying ? '🔊 Pause Music' : '🔇 Play Music'}
    </button>

    {/* Sticky container */}
    <div className="sticky top-0 h-svh w-full overflow-hidden">
      {/* sky */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, var(--sky-top), var(--sky-bottom) 70%)",
        }}
      />
      
      {/* sun */}
      <div
        aria-hidden
        className="absolute right-[10%] top-[8%] h-24 w-24 rounded-full"
        style={{
          background: "radial-gradient(circle, #fff2b0 0%, #ffe07a 55%, rgba(255,224,122,0) 72%)",
        }}
      />

      <Layer bg={cloudBg} travel={T_CLOUD} progress={progress} bottom="60vh" height="18vh" size="auto 100%" opacity={0.95} />
      <Layer bg={farMtnBg} travel={T_FARMTN} progress={progress} bottom="20vh" height="34vh" size="auto 100%" opacity={0.85} />
      <Layer bg={nearMtnBg} travel={T_NEARMTN} progress={progress} bottom="18vh" height="40vh" size="auto 100%" />
      <Layer bg={hillBg} travel={T_HILL} progress={progress} bottom="15vh" height="24vh" size="auto 100%" />

      {/* grass ground */}
      <div className="absolute inset-x-0 bottom-0 h-[18vh]" style={{ backgroundColor: "var(--hill)" }} />

      <Layer bg={treeBg} travel={T_TREE} progress={progress} bottom="14vh" height="20vh" size="auto 100%" />

      {/* road */}
      <div className="absolute inset-x-0 bottom-[3vh] h-[9vh]" style={{ backgroundColor: "var(--road)" }}>
        <div className="absolute left-0 top-1/2 h-1.5 -translate-y-1/2" style={{ width: `${T_GROUND + 220}vw` }}>
          <div
            className="h-full"
            style={{
              width: "100%",
              backgroundImage:
                "repeating-linear-gradient(90deg, var(--road-line) 0 3vw, transparent 3vw 7vw)",
              transform: `translate3d(${-progress * T_GROUND}vw,0,0)`,
              willChange: "transform",
            }}
          />
        </div>
      </div>

      {/* checkpoints */}
      {checkpoints.map((cp, i) => (
        <CheckpointStop key={cp.place} cp={cp} u={stopU(i)} progress={progress} arrived={arrived && i === nearestIdx} />
      ))}

      {/* the bike */}
      <div
        className={`absolute bottom-[4vh] z-20 h-[22vh] w-[26vh] -translate-x-1/2 ${moving ? "animate-bob" : ""}`}
        style={{ left: `${BIKE_X}vw` }}
      >
        <Bike moving={moving} />
      </div>

      {/* HUD */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 p-4 sm:p-5">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 rounded-full bg-card/85 px-4 py-2 shadow-lg ring-1 ring-border backdrop-blur">
          <div className="flex items-center gap-2">
            <BikeMark className="h-5 w-5 text-primary" />
            <span className="font-display text-sm font-extrabold tabular-nums text-card-foreground sm:text-base">
              {odo.toLocaleString()} km
            </span>
          </div>
          <div className="min-w-0 text-center">
            <p className="truncate font-display text-sm font-extrabold text-card-foreground sm:text-base">
              {current.place}
            </p>
            <p className="truncate font-sans text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              {current.region}
            </p>
          </div>
          <span className="font-display text-sm font-extrabold tabular-nums text-primary">
            {Math.round(progress * 100)}%
          </span>
        </div>
        {/* progress track with pips */}
        <div className="mx-auto mt-2 flex max-w-3xl items-center px-2">
          <div className="relative h-2 w-full rounded-full bg-card/70 ring-1 ring-border">
            <div
              className="absolute left-0 top-0 h-full rounded-full bg-primary"
              style={{ width: `${progress * 100}%` }}
            />
            {checkpoints.map((cp, i) => (
              <span
                key={cp.place}
                className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-card"
                style={{
                  left: `${stopU(i) * 100}%`,
                  backgroundColor: progress >= stopU(i) - 0.005 ? "var(--secondary)" : "var(--muted-foreground)",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* START overlay */}
      <div
        className="absolute inset-0 z-40 flex items-center justify-center bg-background/45 backdrop-blur-sm transition-opacity duration-500"
        style={{ opacity: started ? 0 : 1, pointerEvents: started ? "none" : "auto" }}
      >
        <div className="mx-6 max-w-md rounded-3xl bg-card/95 p-8 text-center shadow-2xl ring-1 ring-border">
          <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-primary">Happy Birthday</p>
          <h1 className="mt-1 text-balance font-display text-4xl font-extrabold leading-tight text-card-foreground sm:text-5xl">
            {birthday.name}
            {birthday.age ? `, ${birthday.age}!` : "!"}
          </h1>
          <p className="mt-3 text-pretty font-sans text-base leading-relaxed text-muted-foreground">
            {birthday.tagline}
          </p>
          <button
            onClick={nudge}
            className="pointer-events-auto mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 font-display text-lg font-extrabold text-primary-foreground shadow-lg transition-transform hover:scale-105 active:scale-95"
          >
            <BikeMark className="h-6 w-6" /> {birthday.startButton}
          </button>
          <p className="mt-4 flex items-center justify-center gap-1 font-sans text-xs font-semibold text-muted-foreground">
            <span className="animate-bounce-soft" aria-hidden>
              ↓
            </span>
            scroll to pedal forward
          </p>
        </div>
      </div>

      {/* FINISH overlay */}
      <div
        className="absolute inset-0 z-40 flex items-center justify-center bg-background/55 backdrop-blur-sm transition-opacity duration-500"
        style={{ opacity: finished ? 1 : 0, pointerEvents: finished ? "auto" : "none" }}
      >
        {finished &&
          Array.from({ length: 18 }).map((_, i) => (
            <span
              key={i}
              aria-hidden
              className="absolute top-0 text-2xl"
              style={{
                left: `${(i * 5.5 + 4) % 100}%`,
                animation: `leafFall ${4 + (i % 5)}s linear ${(i % 7) * 0.4}s infinite`,
              }}
            >
              {i % 2 ? "🍁" : "🎈"}
            </span>
          ))}
        <div className="mx-6 max-w-lg rounded-3xl bg-card/95 p-8 text-center shadow-2xl ring-1 ring-border">
          <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-secondary">
            {maxKm.toLocaleString()} km · Coast to coast
          </p>
          <h2 className="mt-1 text-balance font-display text-4xl font-extrabold text-card-foreground sm:text-5xl">
            {birthday.finishTitle}
          </h2>
          <p className="mt-3 text-pretty font-sans text-base leading-relaxed text-muted-foreground">
            {birthday.finishMessage}
          </p>
          <p className="mt-5 whitespace-pre-line font-display text-lg font-bold text-primary">
            {birthday.signature}
          </p>
        </div>
      </div>
    </div> {/* ← Close the sticky div */}
  </div> {/* ← Close the outer div */}
)
}
