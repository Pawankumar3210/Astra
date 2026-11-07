export function EarthHorizon() {
  return (
    <div className="earth-horizon" aria-hidden="true">
      <img
        src="/astra-earth.jpeg"
        alt=""
        width={2601}
        height={1734}
        className="earth-horizon__photo"
        decoding="async"
        fetchPriority="high"
      />
      <div className="earth-horizon__fade" />
    </div>
  )
}
