

import { useState, useEffect } from "react"
import LocationInput from "../components/LocationInput"
import TravelMode from "../components/TravelMode"
import RouteCard from "../components/RouteCard"
import MapPreview from "../components/MapPreview"
import { calculateRoute } from "../services/routeApi"


const RoutePlanner = () => {
    const [source, setSource] = useState("")
    const [destination, setDestination] = useState("")
    const [mode, setMode] = useState("driving")
    const [route, setRoute] = useState(null)
    const [loading, setLoading] = useState(false)
    const [directions, setDirections] = useState(null)
    const [isDarkMode, setIsDarkMode] = useState(false)





    // Handle theme toggle
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [isDarkMode])


    const handleRoute = async () => {

        if (!source.trim() || !destination.trim())
            return

        setLoading(true)

        try {

            const response =
                await calculateRoute({
                    source,
                    destination,
                    mode
                })


            setRoute(response.data)


        } catch (error) {

            console.log(error)

        }
        finally {

            setLoading(false)

        }

    }



    const modeLabel = { driving: "Driving", walking: "Walking", cycling: "Cycling", transit: "Transit" }

    return (
        <div className="flex h-screen w-screen overflow-hidden bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            {/* ── Sidebar ── */}
            <div className="w-[30%] min-w-[360px] h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col overflow-y-auto transition-colors duration-300 shadow-[4px_0_24px_rgba(0,0,0,0.02)] dark:shadow-[4px_0_24px_rgba(0,0,0,0.1)] z-10">
                {/* Brand header */}
                <div className="p-6 pb-5 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-lg shadow-blue-600/30 shadow-lg">
                                🗺️
                            </div>
                            <span className="font-heading text-[1.15rem] font-bold text-gray-900 dark:text-white tracking-tight">
                                Route Planner
                            </span>
                        </div>
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-200 ml-12">
                            AI-powered smart navigation
                        </p>
                    </div>


                </div>

                {/* Main form */}
                <div className="p-6 flex-1 flex flex-col">
                    <p className="text-[11px] font-bold text-gray-400 dark:text-gray-200 uppercase tracking-[0.08em] mb-3">
                        Locations
                    </p>

                    <LocationInput
                        source={source}
                        destination={destination}
                        setSource={setSource}
                        setDestination={setDestination}
                    />

                    <p className="text-[11px] font-bold text-gray-400 dark:text-gray-200 uppercase tracking-[0.08em] mb-3 mt-6">
                        Travel mode
                    </p>

                    <TravelMode selected={mode} setSelected={setMode} />

                    {/* Calculate button */}
                    <button
                        onClick={handleRoute}
                        disabled={loading || !source.trim() || !destination.trim()}
                        className={`mt-4 w-full py-3.5 px-4 rounded-xl font-semibold text-[15px] flex items-center justify-center gap-2 transition-all duration-200 shadow-lg
                            ${loading
                                ? 'bg-blue-400 dark:bg-blue-500/50 text-white cursor-not-allowed shadow-none'
                                : 'bg-blue-600 hover:bg-blue-700 hover:shadow-blue-600/25 hover:-translate-y-[1px] text-white active:translate-y-[0px] dark:bg-blue-500 dark:hover:bg-blue-600'
                            }
                            ${(!source.trim() || !destination.trim()) && !loading ? 'opacity-50 cursor-not-allowed hover:translate-y-0 hover:shadow-none' : ''}
                        `}
                    >
                        {loading ? (
                            <>
                                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin inline-block" />
                                Calculating...
                            </>
                        ) : (
                            <>📍 Calculate route</>
                        )}
                    </button>

                    <div className="mt-4">
                        <RouteCard route={route} />
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center gap-2.5 bg-gray-50/50 dark:bg-gray-800/50">
                    <div className={`w-2 h-2 rounded-full ${route ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-gray-400 dark:bg-gray-500'}`} />
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        {route
                            ? `${modeLabel[mode]} · ${route.distance} · ${route.estimated_time}`
                            : "Enter locations to plan your route"}
                    </span>
                </div>
            </div>



            {/* ── Map panel ── */}
            <div className="w-[70%] flex flex-col overflow-hidden relative">


                <div className="flex-1 h-full overflow-hidden">
                    <MapPreview route={route} />
                </div>
            </div>
        </div>
    )
}

export default RoutePlanner




