// function MapPreview(){


//     return (

//     <div className="
//     h-full bg-gray-200 rounded-2xl
//     flex items-center justify-center
//     ">


//     <div className="text-center">


//     <h2 className="text-3xl">

//     🗺️

//     </h2>


//     <p className="text-gray-600">

//     Map Preview

//     </p>


//     </div>


//     </div>


//     )


//     }


//     export default MapPreview


function MapPreview({ route, source, destination }) {
    const hasRoute = route && route.route && route.route.length >= 2

    const getPoints = () => {
        if (!hasRoute) return []
        const stops = route.route
        return stops.map((_, i) => {
            const t = i / (stops.length - 1)
            const x = 80 + t * 760
            const y = 160 + Math.sin(t * Math.PI) * 220 + (i % 2 === 0 ? -30 : 30)
            return [Math.round(x), Math.round(y)]
        })
    }

    const points = getPoints()

    const buildPath = () => {
        if (points.length < 2) return ""
        let d = `M ${points[0][0]} ${points[0][1]}`
        for (let i = 1; i < points.length; i++) {
            const mx = (points[i - 1][0] + points[i][0]) / 2
            d += ` Q ${mx} ${points[i - 1][1]} ${points[i][0]} ${points[i][1]}`
        }
        return d
    }

    // Rich city blocks at varied sizes/opacities for depth
    const blocks = [
        // Row 1
        [40, 40, 140, 80, 0.9], [210, 40, 90, 80, 0.7], [330, 40, 160, 80, 0.85], [520, 40, 100, 80, 0.6], [650, 40, 130, 80, 0.75], [810, 40, 80, 80, 0.5],
        // Row 2
        [40, 160, 80, 100, 0.6], [150, 160, 120, 100, 0.8], [300, 160, 70, 100, 0.5], [400, 160, 140, 100, 0.9], [570, 160, 110, 100, 0.7], [710, 160, 150, 100, 0.65],
        // Row 3
        [40, 310, 160, 90, 0.75], [230, 310, 100, 90, 0.9], [360, 310, 130, 90, 0.6], [520, 310, 90, 90, 0.8], [640, 310, 120, 90, 0.5], [790, 310, 90, 90, 0.7],
        // Row 4
        [40, 450, 110, 90, 0.65], [180, 450, 140, 90, 0.8], [350, 450, 80, 90, 0.9], [460, 450, 150, 90, 0.55], [640, 450, 100, 90, 0.75], [770, 450, 130, 90, 0.6],
        // Row 5
        [40, 590, 130, 80, 0.7], [200, 590, 100, 80, 0.5], [330, 590, 160, 80, 0.85], [520, 590, 90, 80, 0.6], [640, 590, 140, 80, 0.75], [810, 590, 80, 80, 0.9],
        // Small accent blocks
        [100, 110, 50, 30, 0.4], [280, 110, 60, 30, 0.5], [460, 110, 40, 30, 0.35], [600, 110, 70, 30, 0.45],
        [90, 400, 60, 30, 0.4], [240, 400, 50, 30, 0.5], [420, 400, 65, 30, 0.35], [700, 400, 55, 30, 0.45],
    ]

    // Road network - main arteries + secondary streets
    const mainRoads = [
        { x1: 0, y1: 140, x2: 920, y2: 140, w: 3 },
        { x1: 0, y1: 280, x2: 920, y2: 280, w: 2.5 },
        { x1: 0, y1: 420, x2: 920, y2: 420, w: 3 },
        { x1: 0, y1: 560, x2: 920, y2: 560, w: 2 },
        { x1: 130, y1: 0, x2: 130, y2: 700, w: 2.5 },
        { x1: 300, y1: 0, x2: 300, y2: 700, w: 3 },
        { x1: 490, y1: 0, x2: 490, y2: 700, w: 2.5 },
        { x1: 640, y1: 0, x2: 640, y2: 700, w: 2 },
        { x1: 800, y1: 0, x2: 800, y2: 700, w: 2.5 },
        { x1: 0, y1: 0, x2: 460, y2: 700, w: 1.5 },
        { x1: 460, y1: 0, x2: 920, y2: 700, w: 1.5 },
        { x1: 0, y1: 350, x2: 920, y2: 0, w: 1 },
    ]

    const secondaryRoads = [
        { x1: 0, y1: 70, x2: 920, y2: 70 }, { x1: 0, y1: 210, x2: 920, y2: 210 }, { x1: 0, y1: 350, x2: 920, y2: 350 },
        { x1: 0, y1: 490, x2: 920, y2: 490 }, { x1: 0, y1: 630, x2: 920, y2: 630 },
        { x1: 210, y1: 0, x2: 210, y2: 700 }, { x1: 400, y1: 0, x2: 400, y2: 700 },
        { x1: 570, y1: 0, x2: 570, y2: 700 }, { x1: 720, y1: 0, x2: 720, y2: 700 },
    ]

    const parks = [
        [340, 170, 110, 80], [660, 300, 90, 100], [150, 460, 100, 70], [520, 480, 80, 60]
    ]

    const water = "M 0 620 Q 150 580 300 600 Q 450 620 600 590 Q 750 560 920 580 L 920 700 L 0 700 Z"

    return (
        <div className="w-full h-full relative overflow-hidden bg-blue-50 dark:bg-gray-900 transition-colors duration-300">
            <svg viewBox="0 0 920 700" xmlns="http://www.w3.org/2000/svg" className="w-full h-full block" preserveAspectRatio="xMidYMid slice">

                {/* Sky/base */}
                <rect width="920" height="700" className="fill-blue-50 dark:fill-gray-900 transition-colors duration-300" />

                {/* Water */}
                <path d={water} className="fill-blue-200 dark:fill-blue-900/40 transition-colors duration-300" opacity="0.6" />
                <path d="M 0 630 Q 200 610 400 625 Q 600 640 920 615 L 920 640 L 0 640 Z" className="fill-blue-300 dark:fill-blue-900/60 transition-colors duration-300" opacity="0.4" />

                {/* Parks */}
                {parks.map(([x, y, w, h], i) => (
                    <rect key={i} x={x} y={y} width={w} height={h} rx="6" className="fill-green-200 dark:fill-green-900/30 transition-colors duration-300" opacity="0.7" />
                ))}
                {parks.map(([x, y, w, h], i) => (
                    <g key={`pt-${i}`}>
                        <circle cx={x + w * 0.25} cy={y + h * 0.4} r="3" className="fill-green-400 dark:fill-green-800" opacity="0.6" />
                        <circle cx={x + w * 0.55} cy={y + h * 0.3} r="4" className="fill-green-400 dark:fill-green-800" opacity="0.5" />
                        <circle cx={x + w * 0.75} cy={y + h * 0.6} r="2.5" className="fill-green-400 dark:fill-green-800" opacity="0.6" />
                    </g>
                ))}

                {/* Secondary roads */}
                <g className="stroke-blue-200 dark:stroke-gray-800 transition-colors duration-300" strokeWidth="1" opacity="0.6">
                    {secondaryRoads.map((r, i) => (
                        <line key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2} />
                    ))}
                </g>

                {/* Main roads */}
                <g className="stroke-blue-300 dark:stroke-gray-700 transition-colors duration-300" opacity="0.9">
                    {mainRoads.map((r, i) => (
                        <line key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2} strokeWidth={r.w} />
                    ))}
                </g>

                {/* Road center lines */}
                <g className="stroke-blue-400 dark:stroke-gray-600 transition-colors duration-300" strokeWidth="0.5" strokeDasharray="12,8" opacity="0.4">
                    <line x1="0" y1="140" x2="920" y2="140" />
                    <line x1="0" y1="280" x2="920" y2="280" />
                    <line x1="0" y1="420" x2="920" y2="420" />
                    <line x1="300" y1="0" x2="300" y2="700" />
                    <line x1="640" y1="0" x2="640" y2="700" />
                </g>

                {/* City blocks — dynamically generate based on dark mode class (we use CSS classes for fill) */}
                <style>
                    {`
                    .building { fill: rgba(24,95,165, var(--opacity)); }
                    .dark .building { fill: rgba(30,41,59, var(--opacity)); }
                    .building-top { fill: rgba(255,255,255, var(--opacity-top)); }
                    .dark .building-top { fill: rgba(255,255,255, 0.05); }
                    `}
                </style>
                {blocks.map(([x, y, w, h, o], i) => {
                    const shade = 0.12 + o * 0.1
                    return (
                        <g key={i}>
                            <rect x={x} y={y} width={w} height={h} rx="3" className="building transition-colors duration-300" style={{'--opacity': shade}} />
                            <rect x={x} y={y} width={w} height={3} rx="1" className="building-top transition-colors duration-300" style={{'--opacity-top': o * 0.15}} />
                        </g>
                    )
                })}

                {/* Roundabouts at intersections */}
                {[[300, 280], [490, 140], [130, 420]].map(([cx, cy], i) => (
                    <g key={i}>
                        <circle cx={cx} cy={cy} r="18" className="fill-blue-200 stroke-blue-300 dark:fill-gray-800 dark:stroke-gray-700 transition-colors duration-300" strokeWidth="1.5" />
                        <circle cx={cx} cy={cy} r="10" className="fill-blue-50 dark:fill-gray-900 transition-colors duration-300" />
                    </g>
                ))}

                {/* Route path */}
                {hasRoute && (
                    <>
                        <path d={buildPath()} fill="none" className="stroke-blue-600 dark:stroke-blue-500" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" opacity="0.08" />
                        <path d={buildPath()} fill="none" className="stroke-blue-600 dark:stroke-blue-500" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" opacity="0.12" />
                        <path d={buildPath()} fill="none" className="stroke-white dark:stroke-gray-800 transition-colors duration-300" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
                        <path d={buildPath()} fill="none" className="stroke-blue-600 dark:stroke-blue-500" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="10,5" />

                        {/* Intermediate stops */}
                        {points.slice(1, -1).map((pt, i) => (
                            <g key={i}>
                                <circle cx={pt[0]} cy={pt[1]} r="8" className="fill-white stroke-blue-600 dark:fill-gray-800 dark:stroke-blue-500 transition-colors duration-300" strokeWidth="2" />
                                <circle cx={pt[0]} cy={pt[1]} r="3" className="fill-blue-600 dark:fill-blue-500" />
                            </g>
                        ))}

                        {/* Origin pin */}
                        <g>
                            <circle cx={points[0][0]} cy={points[0][1]} r="16" className="fill-blue-600 dark:fill-blue-500" opacity="0.15" />
                            <circle cx={points[0][0]} cy={points[0][1]} r="11" className="fill-blue-600 stroke-white dark:fill-blue-500 dark:stroke-gray-800 transition-colors duration-300" strokeWidth="2.5" />
                            <circle cx={points[0][0]} cy={points[0][1]} r="4" className="fill-white dark:fill-gray-900 transition-colors duration-300" />
                        </g>

                        {/* Destination pin */}
                        <g>
                            <circle cx={points[points.length - 1][0]} cy={points[points.length - 1][1]} r="16" className="fill-red-500" opacity="0.15" />
                            <circle cx={points[points.length - 1][0]} cy={points[points.length - 1][1]} r="11" className="fill-red-500 stroke-white dark:stroke-gray-800 transition-colors duration-300" strokeWidth="2.5" />
                            <circle cx={points[points.length - 1][0]} cy={points[points.length - 1][1]} r="4" className="fill-white dark:fill-gray-900 transition-colors duration-300" />
                        </g>

                        {/* Source label */}
                        {source && (
                            <g>
                                <rect x={points[0][0] - 50} y={points[0][1] - 38} width="100" height="22" rx="5" className="fill-blue-600 dark:fill-blue-500" />
                                <text x={points[0][0]} y={points[0][1] - 23} textAnchor="middle" fontSize="10" className="fill-white" fontFamily="sans-serif" fontWeight="600">
                                    {source.length > 14 ? source.slice(0, 14) + "…" : source}
                                </text>
                            </g>
                        )}

                        {/* Destination label */}
                        {destination && (
                            <g>
                                <rect x={points[points.length - 1][0] - 50} y={points[points.length - 1][1] - 38} width="100" height="22" rx="5" className="fill-red-500" />
                                <text x={points[points.length - 1][0]} y={points[points.length - 1][1] - 23} textAnchor="middle" fontSize="10" className="fill-white" fontFamily="sans-serif" fontWeight="600">
                                    {destination.length > 14 ? destination.slice(0, 14) + "…" : destination}
                                </text>
                            </g>
                        )}
                    </>
                )}

                {/* Placeholder state */}
                {!hasRoute && (
                    <g>
                        <rect x="310" y="300" width="300" height="80" rx="12" className="fill-white/85 dark:fill-gray-800/85 backdrop-blur-md transition-colors duration-300" />
                        <text x="460" y="332" textAnchor="middle" fontSize="22" fontFamily="sans-serif">🗺️</text>
                        <text x="460" y="354" textAnchor="middle" fontSize="13" className="fill-gray-600 dark:fill-gray-300 transition-colors duration-300" fontFamily="sans-serif" fontWeight="600">Enter locations to preview route</text>
                        <text x="460" y="370" textAnchor="middle" fontSize="11" className="fill-gray-400 dark:fill-gray-500 transition-colors duration-300" fontFamily="sans-serif">Your route will appear here</text>
                    </g>
                )}

                {/* Compass */}
                <g transform="translate(860, 60)">
                    <circle cx="0" cy="0" r="20" className="fill-white/90 stroke-gray-200 dark:fill-gray-800/90 dark:stroke-gray-700 transition-colors duration-300" strokeWidth="0.5" />
                    <text x="0" y="-7" textAnchor="middle" fontSize="9" className="fill-blue-600 dark:fill-blue-400 font-bold font-sans">N</text>
                    <text x="0" y="12" textAnchor="middle" fontSize="8" className="fill-gray-400 dark:fill-gray-500 font-sans">S</text>
                    <text x="11" y="3" textAnchor="middle" fontSize="8" className="fill-gray-400 dark:fill-gray-500 font-sans">E</text>
                    <text x="-11" y="3" textAnchor="middle" fontSize="8" className="fill-gray-400 dark:fill-gray-500 font-sans">W</text>
                    <line x1="0" y1="-14" x2="0" y2="-4" className="stroke-blue-600 dark:stroke-blue-400" strokeWidth="1.5" />
                </g>

                {/* Scale bar */}
                <g transform="translate(30, 660)">
                    <rect x="0" y="0" width="80" height="16" rx="4" className="fill-white/85 dark:fill-gray-800/85 transition-colors duration-300" />
                    <line x1="8" y1="8" x2="72" y2="8" className="stroke-gray-500 dark:stroke-gray-400" strokeWidth="1.5" />
                    <line x1="8" y1="5" x2="8" y2="11" className="stroke-gray-500 dark:stroke-gray-400" strokeWidth="1.5" />
                    <line x1="72" y1="5" x2="72" y2="11" className="stroke-gray-500 dark:stroke-gray-400" strokeWidth="1.5" />
                    <text x="40" y="7" textAnchor="middle" fontSize="7" className="fill-gray-500 dark:fill-gray-400 font-sans">1 km</text>
                </g>
            </svg>

            {/* Zoom controls */}
            <div className="absolute bottom-5 right-5 flex flex-col gap-1 z-10">
                {["+", "−", "⤢"].map((icon, i) => (
                    <div key={i} className="w-[34px] h-[34px] border border-gray-200 dark:border-gray-700 rounded-lg bg-white/95 dark:bg-gray-800/95 flex items-center justify-center cursor-pointer text-base text-gray-600 dark:text-gray-300 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        {icon}
                    </div>
                ))}
            </div>

            {/* Map attribution */}
            <div className="absolute bottom-2 left-2 text-[10px] text-gray-900/40 dark:text-gray-100/40 bg-white/70 dark:bg-gray-900/70 px-1.5 py-0.5 rounded transition-colors duration-300 z-10">
                Route Planner Map Preview
            </div>
        </div>
    )
}

export default MapPreview

