

// import { useState, useEffect } from "react"
// import LocationInput from "../components/LocationInput"
// import TravelMode from "../components/TravelMode"
// import RouteCard from "../components/RouteCard"
// import MapPreview from "../components/MapPreview"
// import { calculateRoute } from "../services/routeApi"

// const RoutePlanner = () => {
//     const [source, setSource] = useState("")
//     const [destination, setDestination] = useState("")
//     const [mode, setMode] = useState("driving")
//     const [route, setRoute] = useState(null)
//     const [loading, setLoading] = useState(false)
//     const [isDarkMode, setIsDarkMode] = useState(false)

//     // Handle theme toggle
//     useEffect(() => {
//         if (isDarkMode) {
//             document.documentElement.classList.add('dark')
//         } else {
//             document.documentElement.classList.remove('dark')
//         }
//     }, [isDarkMode])

//     const handleRoute = async () => {
//         if (!source.trim() || !destination.trim()) return
//         setLoading(true)
//         try {
//             const response = await calculateRoute({ source, destination, mode })
//             setRoute(response.data)
//         } catch (error) {
//             console.log(error)
//         } finally {
//             setLoading(false)
//         }
//     }

//     const modeLabel = { driving: "Driving", walking: "Walking", cycling: "Cycling", transit: "Transit" }

//     return (
//         <div className="flex h-screen w-screen overflow-hidden bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
//             {/* ── Sidebar ── */}
//             <div className="w-[30%] min-w-[360px] h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col overflow-y-auto transition-colors duration-300 shadow-[4px_0_24px_rgba(0,0,0,0.02)] dark:shadow-[4px_0_24px_rgba(0,0,0,0.1)] z-10">
//                 {/* Brand header */}
//                 <div className="p-6 pb-5 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
//                     <div>
//                         <div className="flex items-center gap-3 mb-1">
//                             <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-lg shadow-blue-600/30 shadow-lg">
//                                 🗺️
//                             </div>
//                             <span className="font-heading text-[1.15rem] font-bold text-gray-900 dark:text-white tracking-tight">
//                                 Route Planner
//                             </span>
//                         </div>
//                         <p className="text-xs font-medium text-gray-500 dark:text-gray-400 ml-12">
//                             AI-powered smart navigation
//                         </p>
//                     </div>

//                     {/* Theme Toggle Button */}
//                     <button
//                         onClick={() => setIsDarkMode(!isDarkMode)}
//                         className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
//                         title="Toggle Dark Mode"
//                     >
//                         {isDarkMode ? '☀️' : '🌙'}
//                     </button>
//                 </div>

//                 {/* Main form */}
//                 <div className="p-6 flex-1 flex flex-col">
//                     <p className="text-[11px] font-bold text-gray-400 dark:text-gray-200 uppercase tracking-[0.08em] mb-3">
//                         Locations
//                     </p>

//                     <LocationInput
//                         source={source}
//                         destination={destination}
//                         setSource={setSource}
//                         setDestination={setDestination}
//                     />

//                     <p className="text-[11px] font-bold text-gray-400 dark:text-gray-200 uppercase tracking-[0.08em] mb-3 mt-6">
//                         Travel mode
//                     </p>

//                     <TravelMode selected={mode} setSelected={setMode} />

//                     {/* Calculate button */}
//                     <button
//                         onClick={handleRoute}
//                         disabled={loading || !source.trim() || !destination.trim()}
//                         className={`mt-4 w-full py-3.5 px-4 rounded-xl font-semibold text-[15px] flex items-center justify-center gap-2 transition-all duration-200 shadow-lg
//                             ${loading
//                                 ? 'bg-blue-400 dark:bg-blue-500/50 text-white cursor-not-allowed shadow-none'
//                                 : 'bg-blue-600 hover:bg-blue-700 hover:shadow-blue-600/25 hover:-translate-y-[1px] text-white active:translate-y-[0px] dark:bg-blue-500 dark:hover:bg-blue-600'
//                             }
//                             ${(!source.trim() || !destination.trim()) && !loading ? 'opacity-50 cursor-not-allowed hover:translate-y-0 hover:shadow-none' : ''}
//                         `}
//                     >
//                         {loading ? (
//                             <>
//                                 <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin inline-block" />
//                                 Calculating...
//                             </>
//                         ) : (
//                             <>📍 Calculate route</>
//                         )}
//                     </button>

//                     <div className="mt-4">
//                         <RouteCard route={route} />
//                     </div>
//                 </div>

//                 {/* Footer */}
//                 <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center gap-2.5 bg-gray-50/50 dark:bg-gray-800/50">
//                     <div className={`w-2 h-2 rounded-full ${route ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-gray-400 dark:bg-gray-500'}`} />
//                     <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
//                         {route
//                             ? `${modeLabel[mode]} · ${route.distance} · ${route.estimated_time}`
//                             : "Enter locations to plan your route"}
//                     </span>
//                 </div>
//             </div>

//             {/* ── Map panel ── */}
//             <div className="w-[70%] flex flex-col overflow-hidden relative">
//                 {/* Map top bar (Floating Glassmorphism) */}
//                 <div className="absolute top-4 inset-x-4 z-20 pointer-events-none">
//                     <div className="pointer-events-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 rounded-2xl px-5 py-3 flex items-center justify-between shadow-sm">
//                         <div className="flex items-center gap-2.5">
//                             <span className="text-lg">🗺️</span>
//                             <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
//                                 {route
//                                     ? `${source} → ${destination}`
//                                     : "Waiting for route..."}
//                             </span>
//                         </div>
//                         <div className="flex gap-2">
//                             {["🛰️ Satellite", "📍 My location"].map(label => (
//                                 <button key={label} className="border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-1.5 bg-white dark:bg-gray-700 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors shadow-sm">
//                                     {label}
//                                 </button>
//                             ))}
//                         </div>
//                     </div>
//                 </div>

//                 {/* Map body */}
//                 <div className="flex-1 overflow-hidden">
//                     <MapPreview route={route} source={source} destination={destination} />
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default RoutePlanner


import { useState } from "react"
import axios from "axios"

// ── API client (mirrors routeApi.jsx) ──
const api = axios.create({ baseURL: "http://127.0.0.1:8000/api" })

const calculateRoute = (data) => api.post("/route/", data)

// ── SVG Map ──
function MapCanvas({ route, source, destination, arrived }) {
    const hasRoute = route && route.route && route.route.length >= 2

    const points = hasRoute
        ? route.route.map((_, i) => {
            const t = i / (route.route.length - 1)
            return [
                Math.round(80 + t * 760),
                Math.round(160 + Math.sin(t * Math.PI) * 200 + (i % 2 === 0 ? -20 : 20)),
            ]
        })
        : []

    const buildPath = () => {
        if (points.length < 2) return ""
        let d = `M ${points[0][0]} ${points[0][1]}`
        for (let i = 1; i < points.length; i++) {
            const mx = (points[i - 1][0] + points[i][0]) / 2
            d += ` Q ${mx} ${points[i - 1][1]} ${points[i][0]} ${points[i][1]}`
        }
        return d
    }

    const blocks = [
        [40, 40, 140, 80], [210, 40, 90, 80], [330, 40, 160, 80], [520, 40, 100, 80], [650, 40, 130, 80], [810, 40, 80, 80],
        [40, 160, 80, 100], [150, 160, 120, 100], [300, 160, 70, 100], [400, 160, 140, 100], [570, 160, 110, 100], [710, 160, 150, 100],
        [40, 310, 160, 90], [230, 310, 100, 90], [360, 310, 130, 90], [520, 310, 90, 90], [640, 310, 120, 90], [790, 310, 90, 90],
        [40, 450, 110, 90], [180, 450, 140, 90], [350, 450, 80, 90], [460, 450, 150, 90], [640, 450, 100, 90], [770, 450, 130, 90],
        [40, 590, 130, 80], [200, 590, 100, 80], [330, 590, 160, 80], [520, 590, 90, 80], [640, 590, 140, 80], [810, 590, 80, 80],
    ]

    const parks = [[340, 170, 110, 80], [660, 300, 90, 100], [150, 460, 100, 70], [520, 480, 80, 60]]
    const water = "M 0 620 Q 150 580 300 600 Q 450 620 600 590 Q 750 560 920 580 L 920 700 L 0 700 Z"

    return (
        <div style={{ width: "100%", height: "100%", position: "relative", background: "#E8F0F7" }}>
            <svg viewBox="0 0 920 700" xmlns="http://www.w3.org/2000/svg"
                style={{ width: "100%", height: "100%", display: "block" }} preserveAspectRatio="xMidYMid slice">
                <rect width="920" height="700" fill="#E8F0F7" />
                <path d={water} fill="#B8D4EA" opacity="0.8" />
                <path d="M 0 630 Q 200 610 400 625 Q 600 640 920 615 L 920 640 L 0 640 Z" fill="#A0C4E0" opacity="0.5" />

                {parks.map(([x, y, w, h], i) => (
                    <rect key={i} x={x} y={y} width={w} height={h} rx="4" fill="#B8DCA8" opacity="0.9" />
                ))}

                <g stroke="#CDD8E3" strokeWidth="6" opacity="0.9">
                    {[[0, 140, 920, 140], [0, 280, 920, 280], [0, 420, 920, 420], [130, 0, 130, 700], [300, 0, 300, 700], [490, 0, 490, 700], [640, 0, 640, 700], [800, 0, 800, 700]].map(([x1, y1, x2, y2], i) => (
                        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
                    ))}
                </g>
                <g stroke="#F5F5F5" strokeWidth="3">
                    {[[0, 140, 920, 140], [0, 280, 920, 280], [0, 420, 920, 420], [300, 0, 300, 700], [640, 0, 640, 700]].map(([x1, y1, x2, y2], i) => (
                        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeDasharray="14,10" />
                    ))}
                </g>
                <g stroke="#D5DEDA" strokeWidth="2" opacity="0.6">
                    {[[0, 70, 920, 70], [0, 210, 920, 210], [0, 350, 920, 350], [0, 490, 920, 490], [0, 630, 920, 630], [210, 0, 210, 700], [400, 0, 400, 700], [570, 0, 570, 700], [720, 0, 720, 700]].map(([x1, y1, x2, y2], i) => (
                        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
                    ))}
                </g>

                {blocks.map(([x, y, w, h], i) => (
                    <g key={i}>
                        <rect x={x} y={y} width={w} height={h} rx="2" fill="#C8D4DE" opacity="0.85" />
                        <rect x={x} y={y} width={w} height={2} rx="1" fill="#B0BECB" />
                    </g>
                ))}

                {[[300, 280], [490, 140], [130, 420]].map(([cx, cy], i) => (
                    <g key={i}>
                        <circle cx={cx} cy={cy} r="18" fill="#E8F0F7" stroke="#CDD8E3" strokeWidth="2" />
                        <circle cx={cx} cy={cy} r="9" fill="#E8F0F7" />
                    </g>
                ))}

                {/* Route path */}
                {hasRoute && (
                    <>
                        <path d={buildPath()} fill="none" stroke="#4285F4" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" opacity="0.15" />
                        <path d={buildPath()} fill="none" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                        <path d={buildPath()} fill="none" stroke="#4285F4" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />

                        {points.slice(1, -1).map((pt, i) => (
                            <g key={i}>
                                <circle cx={pt[0]} cy={pt[1]} r="7" fill="white" stroke="#4285F4" strokeWidth="2" />
                                <circle cx={pt[0]} cy={pt[1]} r="2.5" fill="#4285F4" />
                            </g>
                        ))}

                        {/* Origin */}
                        <g>
                            <circle cx={points[0][0]} cy={points[0][1]} r="18" fill="#4285F4" opacity="0.15" />
                            <circle cx={points[0][0]} cy={points[0][1]} r="11" fill="#4285F4" stroke="white" strokeWidth="3" />
                            <circle cx={points[0][0]} cy={points[0][1]} r="4" fill="white" />
                            {source && (
                                <g>
                                    <rect x={points[0][0] - 52} y={points[0][1] - 42} width="104" height="22" rx="11" fill="#4285F4" />
                                    <text x={points[0][0]} y={points[0][1] - 27} textAnchor="middle" fontSize="10" fill="white" fontFamily="Google Sans, sans-serif" fontWeight="500">
                                        {source.length > 16 ? source.slice(0, 16) + "…" : source}
                                    </text>
                                </g>
                            )}
                        </g>

                        {/* Destination */}
                        <g>
                            <circle cx={points[points.length - 1][0]} cy={points[points.length - 1][1]} r="18" fill="#EA4335" opacity="0.15" />
                            <path
                                d={`M ${points[points.length - 1][0]} ${points[points.length - 1][1] - 22} 
                   a 12 12 0 0 1 0 24 L ${points[points.length - 1][0]} ${points[points.length - 1][1] - 22}`}
                                fill="#EA4335"
                            />
                            <circle cx={points[points.length - 1][0]} cy={points[points.length - 1][1] - 10} r="4.5" fill="white" />
                            {destination && (
                                <g>
                                    <rect x={points[points.length - 1][0] - 52} y={points[points.length - 1][1] - 46} width="104" height="22" rx="11" fill="#EA4335" />
                                    <text x={points[points.length - 1][0]} y={points[points.length - 1][1] - 31} textAnchor="middle" fontSize="10" fill="white" fontFamily="Google Sans, sans-serif" fontWeight="500">
                                        {destination.length > 16 ? destination.slice(0, 16) + "…" : destination}
                                    </text>
                                </g>
                            )}
                        </g>
                    </>
                )}

                {!hasRoute && (
                    <g>
                        <circle cx="460" cy="350" r="50" fill="rgba(255,255,255,0.7)" />
                        <text x="460" y="342" textAnchor="middle" fontSize="28" fontFamily="sans-serif">📍</text>
                        <rect x="310" y="365" width="300" height="44" rx="8" fill="rgba(255,255,255,0.85)" />
                        <text x="460" y="384" textAnchor="middle" fontSize="13" fill="#555" fontFamily="Google Sans, sans-serif" fontWeight="500">Enter a destination to get started</text>
                        <text x="460" y="400" textAnchor="middle" fontSize="11" fill="#888" fontFamily="sans-serif">Your route will appear on the map</text>
                    </g>
                )}

                {/* Compass */}
                <g transform="translate(870, 60)">
                    <circle cx="0" cy="0" r="22" fill="rgba(255,255,255,0.95)" stroke="#E0E0E0" strokeWidth="0.5" />
                    <text x="0" y="-7" textAnchor="middle" fontSize="9" fill="#4285F4" fontWeight="600" fontFamily="sans-serif">N</text>
                    <text x="0" y="13" textAnchor="middle" fontSize="8" fill="#999" fontFamily="sans-serif">S</text>
                    <text x="12" y="3" textAnchor="middle" fontSize="8" fill="#999" fontFamily="sans-serif">E</text>
                    <text x="-12" y="3" textAnchor="middle" fontSize="8" fill="#999" fontFamily="sans-serif">W</text>
                    <polygon points="0,-16 3,-5 0,-8 -3,-5" fill="#EA4335" />
                    <polygon points="0,16 3,5 0,8 -3,5" fill="#9AA0A6" />
                </g>

                {/* Scale */}
                <g transform="translate(20, 668)">
                    <rect x="0" y="-10" width="90" height="18" rx="3" fill="rgba(255,255,255,0.8)" />
                    <line x1="8" y1="4" x2="82" y2="4" stroke="#555" strokeWidth="1.5" />
                    <line x1="8" y1="0" x2="8" y2="8" stroke="#555" strokeWidth="1.5" />
                    <line x1="82" y1="0" x2="82" y2="8" stroke="#555" strokeWidth="1.5" />
                    <text x="45" y="1" textAnchor="middle" fontSize="8" fill="#555" fontFamily="sans-serif">1 km</text>
                </g>
            </svg>
        </div>
    )
}

// ── Search Bar (top of map, Google Maps style) ──
function SearchBar({ source, destination, setSource, setDestination, onSearch, loading }) {
    return (
        <div style={{
            position: "absolute", top: 16, left: 16, right: 80, zIndex: 20,
            background: "white", borderRadius: 28, boxShadow: "0 2px 12px rgba(0,0,0,0.18)",
            padding: "8px 16px", display: "flex", flexDirection: "column", gap: 4
        }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, flexShrink: 0 }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#4285F4", boxShadow: "0 0 0 2px #BCD4F8" }} />
                    <div style={{ width: 1.5, height: 16, background: "#DADCE0" }} />
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#EA4335", boxShadow: "0 0 0 2px #F5C6C4" }} />
                </div>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
                    <input
                        value={source}
                        onChange={e => setSource(e.target.value)}
                        placeholder="Choose starting point"
                        style={{
                            border: "none", outline: "none", fontSize: 14, color: "#202124",
                            fontFamily: "Google Sans, Roboto, sans-serif", padding: "4px 0",
                            borderBottom: "1px solid #E8EAED", background: "transparent", width: "100%"
                        }}
                    />
                    <input
                        value={destination}
                        onChange={e => setDestination(e.target.value)}
                        placeholder="Choose destination"
                        style={{
                            border: "none", outline: "none", fontSize: 14, color: "#202124",
                            fontFamily: "Google Sans, Roboto, sans-serif", padding: "4px 0",
                            background: "transparent", width: "100%"
                        }}
                    />
                </div>
                <button
                    onClick={onSearch}
                    disabled={loading || !source.trim() || !destination.trim()}
                    style={{
                        width: 40, height: 40, borderRadius: "50%", border: "none",
                        background: source.trim() && destination.trim() ? "#4285F4" : "#E8EAED",
                        color: "white", cursor: source.trim() && destination.trim() ? "pointer" : "default",
                        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                        fontSize: 18, transition: "background 0.2s"
                    }}
                >
                    {loading ? "⟳" : "→"}
                </button>
            </div>
        </div>
    )
}

// ── Travel Mode Chips ──
const modes = [
    { id: "driving", icon: "🚗", label: "Drive" },
    { id: "transit", icon: "🚌", label: "Transit" },
    { id: "walking", icon: "🚶", label: "Walk" },
    { id: "cycling", icon: "🚴", label: "Cycle" },
]

function ModeChips({ selected, setSelected }) {
    return (
        <div style={{ display: "flex", gap: 8, padding: "12px 16px 8px", overflowX: "auto" }}>
            {modes.map(m => (
                <button
                    key={m.id}
                    onClick={() => setSelected(m.id)}
                    style={{
                        display: "flex", alignItems: "center", gap: 6, padding: "8px 16px",
                        borderRadius: 24, border: "none", cursor: "pointer", whiteSpace: "nowrap",
                        fontSize: 13, fontWeight: 500, fontFamily: "Google Sans, Roboto, sans-serif",
                        background: selected === m.id ? "#1A73E8" : "#F1F3F4",
                        color: selected === m.id ? "white" : "#3C4043",
                        transition: "all 0.15s",
                    }}
                >
                    <span style={{ fontSize: 16 }}>{m.icon}</span>
                    {m.label}
                </button>
            ))}
        </div>
    )
}

// ── Route Result Card (slide-up panel) ──
function RoutePanel({ route, source, destination, mode, onClose, onArrive }) {
    if (!route) return null
    const modeObj = modes.find(m => m.id === mode) || modes[0]

    return (
        <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 30,
            background: "white", borderRadius: "20px 20px 0 0",
            boxShadow: "0 -4px 24px rgba(0,0,0,0.15)",
            maxHeight: "60%", overflowY: "auto",
            animation: "slideUp 0.3s ease"
        }}>
            <style>{`@keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }`}</style>

            {/* Handle */}
            <div style={{ display: "flex", justifyContent: "center", padding: "12px 0 4px" }}>
                <div style={{ width: 36, height: 4, borderRadius: 2, background: "#DADCE0" }} />
            </div>

            {/* Header */}
            <div style={{ padding: "8px 20px 12px", borderBottom: "1px solid #F1F3F4" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                            <span style={{ fontSize: 28, fontWeight: 700, color: "#202124", fontFamily: "Google Sans, sans-serif" }}>
                                {route.estimated_time}
                            </span>
                            <span style={{ fontSize: 14, color: "#70757A", fontFamily: "Roboto, sans-serif" }}>
                                {route.distance} · {modeObj.icon} {modeObj.label}
                            </span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
                            <span style={{
                                fontSize: 12, padding: "3px 10px", borderRadius: 12, fontWeight: 500,
                                background: "#E8F5E9", color: "#1E8E3E", fontFamily: "Roboto, sans-serif"
                            }}>✓ Fastest route</span>
                            {route.co2_saved && (
                                <span style={{
                                    fontSize: 12, padding: "3px 10px", borderRadius: 12, fontWeight: 500,
                                    background: "#E8F5E9", color: "#1E8E3E", fontFamily: "Roboto, sans-serif"
                                }}>🌿 {route.co2_saved} saved</span>
                            )}
                        </div>
                    </div>
                    <button onClick={onClose} style={{
                        width: 36, height: 36, borderRadius: "50%", border: "none",
                        background: "#F1F3F4", cursor: "pointer", fontSize: 18, color: "#5F6368",
                        display: "flex", alignItems: "center", justifyContent: "center"
                    }}>×</button>
                </div>

                {/* Action Buttons */}
                <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
                    <button
                        onClick={onArrive}
                        style={{
                            flex: 1, padding: "12px", borderRadius: 28, border: "none",
                            background: "#1A73E8", color: "white", fontSize: 15, fontWeight: 600,
                            cursor: "pointer", fontFamily: "Google Sans, sans-serif"
                        }}
                    >Start</button>
                    <button style={{
                        flex: 1, padding: "12px", borderRadius: 28, border: "1.5px solid #DADCE0",
                        background: "white", color: "#1A73E8", fontSize: 15, fontWeight: 600,
                        cursor: "pointer", fontFamily: "Google Sans, sans-serif"
                    }}>Preview</button>
                </div>
            </div>

            {/* Steps */}
            <div style={{ padding: "12px 20px 20px" }}>
                <p style={{ fontSize: 12, fontWeight: 500, color: "#9AA0A6", textTransform: "uppercase", letterSpacing: "0.5px", margin: "0 0 12px" }}>
                    Route details
                </p>
                {route.route.map((stop, i) => {
                    const isFirst = i === 0, isLast = i === route.route.length - 1
                    return (
                        <div key={i} style={{ display: "flex", gap: 16, position: "relative", paddingBottom: isLast ? 0 : 20 }}>
                            {!isLast && (
                                <div style={{ position: "absolute", left: 11, top: 24, bottom: 0, width: 2, background: "#E8EAED" }} />
                            )}
                            <div style={{
                                width: 24, height: 24, borderRadius: "50%", flexShrink: 0, zIndex: 1,
                                background: isFirst ? "#4285F4" : isLast ? "#EA4335" : "white",
                                border: isFirst || isLast ? "3px solid white" : "2px solid #DADCE0",
                                boxShadow: isFirst ? "0 0 0 3px #BCD4F8" : isLast ? "0 0 0 3px #F5C6C4" : "none",
                                display: "flex", alignItems: "center", justifyContent: "center"
                            }}>
                                {!isFirst && !isLast && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#BDC1C6" }} />}
                            </div>
                            <div style={{ paddingTop: 2 }}>
                                <p style={{
                                    margin: 0, fontSize: isFirst || isLast ? 14 : 13,
                                    fontWeight: isFirst || isLast ? 600 : 400,
                                    color: isFirst || isLast ? "#202124" : "#5F6368",
                                    fontFamily: "Roboto, sans-serif", lineHeight: 1.4
                                }}>{stop}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

// ── Arrived Screen ──
function ArrivedScreen({ destination, route, onDone }) {
    return (
        <div style={{
            position: "absolute", inset: 0, zIndex: 50,
            background: "white", display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", padding: 32,
            animation: "fadeIn 0.4s ease"
        }}>
            <style>{`@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
            <div style={{
                width: 100, height: 100, borderRadius: "50%",
                background: "linear-gradient(135deg, #E8F4FD, #E8F5E9)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 48, marginBottom: 24, border: "2px solid #E8F5E9"
            }}>
                🗺️
            </div>
            <div style={{
                width: 36, height: 36, borderRadius: "50%", background: "#1E8E3E",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 20, color: "white", marginBottom: 16, marginTop: -56, marginLeft: 60
            }}>✓</div>

            <h1 style={{ fontSize: 28, fontWeight: 700, color: "#202124", fontFamily: "Google Sans, sans-serif", margin: "0 0 8px", textAlign: "center" }}>
                You've arrived
            </h1>
            <p style={{ fontSize: 16, color: "#5F6368", fontFamily: "Roboto, sans-serif", margin: "0 0 32px", textAlign: "center" }}>
                at {destination}
            </p>

            {route?.co2_saved && (
                <div style={{ textAlign: "center", marginBottom: 32 }}>
                    <p style={{ fontSize: 36, fontWeight: 700, color: "#202124", fontFamily: "Google Sans, sans-serif", margin: "0 0 4px" }}>
                        {route.co2_saved}
                    </p>
                    <p style={{ fontSize: 15, color: "#5F6368", fontFamily: "Roboto, sans-serif", margin: 0 }}>
                        saved, versus a private car
                    </p>
                </div>
            )}

            <button
                onClick={onDone}
                style={{
                    width: "100%", maxWidth: 320, padding: "16px", borderRadius: 28,
                    border: "none", background: "#1A73E8", color: "white",
                    fontSize: 16, fontWeight: 600, cursor: "pointer",
                    fontFamily: "Google Sans, sans-serif"
                }}
            >Done</button>
        </div>
    )
}

// ── Main App ──
export default function RoutePlanner() {
    const [source, setSource] = useState("")
    const [destination, setDestination] = useState("")
    const [mode, setMode] = useState("driving")
    const [route, setRoute] = useState(null)
    const [loading, setLoading] = useState(false)
    const [arrived, setArrived] = useState(false)
    const [error, setError] = useState(null)

    const fetchRoute = async (src, dest, travelMode) => {
        setLoading(true)
        setRoute(null)
        setError(null)
        try {
            const response = await calculateRoute({ source: src, destination: dest, mode: travelMode })
            const data = response.data
            setRoute({
                distance: data.distance,
                estimated_time: data.estimated_time,
                route: data.route,
                mode: data.mode,
                co2_saved: data.mode?.toLowerCase() !== "driving" ? "eco trip" : null,
            })
        } catch (err) {
            setError(
                err?.response?.data?.detail ||
                err?.message ||
                "Could not reach server. Make sure http://127.0.0.1:8000 is running."
            )
        } finally {
            setLoading(false)
        }
    }

    const handleSearch = () => {
        if (!source.trim() || !destination.trim()) return
        fetchRoute(source, destination, mode)
    }

    const handleClose = () => { setRoute(null); setError(null) }
    const handleArrive = () => setArrived(true)
    const handleDone = () => { setArrived(false); setRoute(null); setSource(""); setDestination(""); setError(null) }

    return (
        <div style={{ width: "100vw", height: "100vh", position: "relative", overflow: "hidden", fontFamily: "Roboto, sans-serif" }}>
            {/* Map fills the screen */}
            <div style={{ position: "absolute", inset: 0 }}>
                <MapCanvas route={route} source={source} destination={destination} arrived={arrived} />
            </div>

            {/* Google Maps top search bar */}
            {!arrived && (
                <SearchBar
                    source={source} destination={destination}
                    setSource={setSource} setDestination={setDestination}
                    onSearch={handleSearch} loading={loading}
                />
            )}

            {/* Travel mode chips (visible after search bar, below it) */}
            {!arrived && !route && (
                <div style={{
                    position: "absolute", top: 90, left: 0, right: 0, zIndex: 15,
                    background: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                }}>
                    <ModeChips selected={mode} setSelected={setMode} />
                </div>
            )}

            {/* Mode chips when route exists */}
            {!arrived && route && (
                <div style={{
                    position: "absolute", top: 90, left: 0, right: 0, zIndex: 15,
                    background: "white"
                }}>
                    <ModeChips selected={mode} setSelected={m => { setMode(m); fetchRoute(source, destination, m) }} />
                </div>
            )}

            {/* Loading indicator */}
            {loading && (
                <div style={{
                    position: "absolute", top: "50%", left: "50%",
                    transform: "translate(-50%, -50%)", zIndex: 25,
                    background: "white", borderRadius: 16, padding: "20px 32px",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 12
                }}>
                    <div style={{
                        width: 32, height: 32, border: "3px solid #E8EAED",
                        borderTop: "3px solid #4285F4", borderRadius: "50%",
                        animation: "spin 0.8s linear infinite"
                    }} />
                    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                    <p style={{ margin: 0, fontSize: 14, color: "#5F6368", fontFamily: "Google Sans, sans-serif" }}>
                        Calculating route…
                    </p>
                </div>
            )}

            {/* Error banner */}
            {error && !loading && (
                <div style={{
                    position: "absolute", top: 140, left: 16, right: 16, zIndex: 25,
                    background: "#FFF3E0", border: "1px solid #FFB74D", borderRadius: 12,
                    padding: "14px 16px", display: "flex", alignItems: "flex-start", gap: 10,
                    boxShadow: "0 2px 12px rgba(0,0,0,0.12)"
                }}>
                    <span style={{ fontSize: 18, flexShrink: 0 }}>⚠️</span>
                    <div style={{ flex: 1 }}>
                        <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#E65100", fontFamily: "Google Sans, sans-serif" }}>Route Error</p>
                        <p style={{ margin: "2px 0 0", fontSize: 12, color: "#BF360C", fontFamily: "Roboto, sans-serif" }}>{error}</p>
                    </div>
                    <button onClick={() => setError(null)} style={{ border: "none", background: "none", cursor: "pointer", fontSize: 18, color: "#E65100", padding: 0, lineHeight: 1 }}>×</button>
                </div>
            )}

            {/* Zoom controls (right side) */}
            {!arrived && (
                <div style={{
                    position: "absolute", right: 16, bottom: route ? "62%" : 120, zIndex: 20,
                    display: "flex", flexDirection: "column", gap: 2,
                    transition: "bottom 0.3s ease"
                }}>
                    {["+", "−"].map((icon, i) => (
                        <div key={i} style={{
                            width: 40, height: 40, background: "white", borderRadius: i === 0 ? "8px 8px 0 0" : "0 0 8px 8px",
                            border: "0.5px solid #E0E0E0", display: "flex", alignItems: "center", justifyContent: "center",
                            cursor: "pointer", fontSize: 20, color: "#5F6368", fontWeight: 300,
                            boxShadow: "0 1px 4px rgba(0,0,0,0.1)"
                        }}>{icon}</div>
                    ))}
                </div>
            )}

            {/* My location button */}
            {!arrived && (
                <div style={{
                    position: "absolute", right: 16, bottom: route ? "calc(62% - 56px)" : 64, zIndex: 20,
                    width: 40, height: 40, background: "white", borderRadius: 8, border: "0.5px solid #E0E0E0",
                    display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.1)", fontSize: 18, transition: "bottom 0.3s ease"
                }}>📍</div>
            )}

            {/* Route result panel */}
            {!arrived && route && (
                <RoutePanel
                    route={route} source={source} destination={destination}
                    mode={mode} onClose={handleClose} onArrive={handleArrive}
                />
            )}

            {/* Attribution */}
            {!arrived && (
                <div style={{
                    position: "absolute", bottom: route ? "calc(60% + 4px)" : 4, left: 8, zIndex: 10,
                    fontSize: 10, color: "rgba(0,0,0,0.4)", background: "rgba(255,255,255,0.7)",
                    padding: "2px 6px", borderRadius: 3, fontFamily: "Roboto, sans-serif"
                }}>
                    Route Planner Map Preview
                </div>
            )}

            {/* Arrived screen */}
            {arrived && (
                <ArrivedScreen destination={destination} route={route} onDone={handleDone} />
            )}
        </div>
    )
}