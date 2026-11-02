export function EarthHorizon() {
  return (
    <div className="earth-horizon" aria-hidden="true">
      <div className="earth-horizon__halo" />
      <div className="earth-horizon__globe">
        <svg viewBox="0 0 800 800" className="h-full w-full" aria-hidden="true">
          <defs>
            <radialGradient id="astra-ocean" cx="42%" cy="38%" r="68%">
              <stop offset="0%" stopColor="var(--earth-land)" />
              <stop offset="42%" stopColor="var(--earth-core)" />
              <stop offset="78%" stopColor="#04101c" />
              <stop offset="100%" stopColor="#02060d" />
            </radialGradient>
            <linearGradient id="astra-night" x1="0%" y1="0%" x2="100%" y2="20%">
              <stop offset="0%" stopColor="rgba(2,6,14,0.08)" />
              <stop offset="55%" stopColor="rgba(2,6,14,0.35)" />
              <stop offset="100%" stopColor="rgba(2,6,14,0.72)" />
            </linearGradient>
            <radialGradient id="astra-spec" cx="32%" cy="28%" r="22%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>
          </defs>
          <circle cx="400" cy="400" r="392" fill="url(#astra-ocean)" />
          <path
            d="M90 310 C160 250 210 280 270 250 C340 210 390 260 470 240 C540 224 600 180 690 210 L720 250 C640 230 590 280 510 300 C430 320 370 280 300 320 C230 356 150 340 90 310Z"
            fill="var(--earth-land)"
            opacity="0.55"
          />
          <path
            d="M40 470 C120 500 190 450 270 470 C360 494 430 450 520 480 C600 506 680 470 760 500 L760 560 C670 520 590 560 500 540 C410 518 330 560 240 530 C160 508 80 530 40 510Z"
            fill="var(--earth-land)"
            opacity="0.42"
          />
          <path
            d="M180 620 C250 590 320 630 400 600 C490 566 560 610 650 590"
            fill="none"
            stroke="var(--earth-core)"
            strokeWidth="18"
            opacity="0.35"
          />
          <circle cx="400" cy="400" r="392" fill="url(#astra-night)" />
          <circle cx="400" cy="400" r="392" fill="url(#astra-spec)" />
        </svg>
        <span className="earth-horizon__rim" />
      </div>
      <div className="earth-horizon__atmosphere" />
      <div className="earth-horizon__fade" />
    </div>
  )
}
