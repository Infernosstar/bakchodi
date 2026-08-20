"use client"

/**
 * A cute cyclist. Wheels + pedals spin while `moving` is true.
 * Purely decorative SVG scaled to its container.
 */
export function Bike({ moving }: { moving: boolean }) {
  const wheel = moving ? "wheel-spin" : ""
  const pedal = moving ? "pedal-spin" : ""

  return (
    <svg
      viewBox="0 0 240 190"
      className="h-full w-full drop-shadow-[0_8px_6px_rgba(40,50,70,0.25)]"
      role="img"
      aria-label="A girl riding a bicycle"
    >
      {/* ground shadow */}
      <ellipse cx="120" cy="176" rx="86" ry="8" fill="rgba(40,50,70,0.18)" />

      {/* ---- rear wheel ---- */}
      <g transform="translate(64,138)">
        <circle r="36" fill="none" stroke="#2f3742" strokeWidth="6" />
        <circle r="31" fill="none" stroke="#7d8896" strokeWidth="2" />
        <g className={wheel}>
          {[0, 45, 90, 135].map((a) => (
            <line
              key={a}
              x1={-31 * Math.cos((a * Math.PI) / 180)}
              y1={-31 * Math.sin((a * Math.PI) / 180)}
              x2={31 * Math.cos((a * Math.PI) / 180)}
              y2={31 * Math.sin((a * Math.PI) / 180)}
              stroke="#aeb7c2"
              strokeWidth="2"
            />
          ))}
        </g>
        <circle r="4" fill="#2f3742" />
      </g>

      {/* ---- front wheel ---- */}
      <g transform="translate(184,138)">
        <circle r="36" fill="none" stroke="#2f3742" strokeWidth="6" />
        <circle r="31" fill="none" stroke="#7d8896" strokeWidth="2" />
        <g className={wheel}>
          {[0, 45, 90, 135].map((a) => (
            <line
              key={a}
              x1={-31 * Math.cos((a * Math.PI) / 180)}
              y1={-31 * Math.sin((a * Math.PI) / 180)}
              x2={31 * Math.cos((a * Math.PI) / 180)}
              y2={31 * Math.sin((a * Math.PI) / 180)}
              stroke="#aeb7c2"
              strokeWidth="2"
            />
          ))}
        </g>
        <circle r="4" fill="#2f3742" />
      </g>

      {/* ---- frame (maple red) ---- */}
      <g stroke="#d1462f" strokeWidth="7" strokeLinecap="round" fill="none">
        <line x1="64" y1="138" x2="124" y2="138" /> {/* chainstay */}
        <line x1="124" y1="138" x2="98" y2="86" /> {/* seat tube */}
        <line x1="98" y1="86" x2="168" y2="82" /> {/* top tube */}
        <line x1="124" y1="138" x2="168" y2="82" /> {/* down tube */}
        <line x1="168" y1="82" x2="184" y2="138" /> {/* fork */}
      </g>

      {/* seat + handlebar */}
      <line x1="88" y1="84" x2="106" y2="84" stroke="#3a2a1e" strokeWidth="6" strokeLinecap="round" />
      <path d="M168 82 q14 -6 22 2" stroke="#3a2a1e" strokeWidth="6" fill="none" strokeLinecap="round" />

      {/* pedals / crank */}
      <g transform="translate(124,138)">
        <g className={pedal}>
          <line x1="-13" y1="0" x2="13" y2="0" stroke="#3a2a1e" strokeWidth="5" />
          <rect x="-20" y="-4" width="12" height="7" rx="2" fill="#2f3742" />
          <rect x="8" y="-3" width="12" height="7" rx="2" fill="#2f3742" />
        </g>
      </g>

      {/* ---- rider ---- */}
      {/* legs */}
      <line x1="102" y1="90" x2="124" y2="126" stroke="#2f6f8f" strokeWidth="8" strokeLinecap="round" />
      <line x1="124" y1="126" x2="132" y2="150" stroke="#2f6f8f" strokeWidth="8" strokeLinecap="round" />
      {/* torso */}
      <line x1="100" y1="88" x2="150" y2="70" stroke="#e8a13b" strokeWidth="14" strokeLinecap="round" />
      {/* arm to handlebar */}
      <line x1="150" y1="72" x2="178" y2="84" stroke="#e8a13b" strokeWidth="7" strokeLinecap="round" />
      {/* ponytail */}
      <path d="M150 52 q-16 4 -14 22" stroke="#5a3a24" strokeWidth="9" fill="none" strokeLinecap="round" />
      {/* head */}
      <circle cx="158" cy="50" r="14" fill="#f7d3b0" />
      {/* helmet */}
      <path d="M143 48 a15 15 0 0 1 30 -2 l0 3 l-30 0 z" fill="#d1462f" />
      {/* smile + cheek */}
      <circle cx="164" cy="52" r="4.5" fill="#f4a9a0" opacity="0.7" />
      <path d="M160 56 q4 4 8 0" stroke="#7a4a30" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="165" cy="47" r="1.6" fill="#3a2a1e" />

      {/* basket + balloon for cuteness */}
      <path d="M188 92 h14 v12 h-14 z" fill="#c98a4b" />
      <line x1="196" y1="92" x2="200" y2="58" stroke="#9aa4b2" strokeWidth="1.5" />
      <circle cx="200" cy="52" r="8" fill="#f2b8c6" />
    </svg>
  )
}
