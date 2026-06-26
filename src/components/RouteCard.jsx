function RouteCard({ route }) {
    if (!route) return null

    return (
        <div className="mt-5 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300">
            {/* Header */}
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-gray-50/50 dark:bg-gray-800/80">
                <span className="text-[13px] font-semibold text-gray-900 dark:text-white font-heading">
                    Best route
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-green-100/80 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800/50">
                    <span className="text-[10px]">✓</span> Optimized
                </span>
            </div>

            {/* Distance & ETA */}
            <div className="grid grid-cols-2">
                <div className="p-4 border-r border-gray-200 dark:border-gray-700 group hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <div className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">
                        Distance
                    </div>
                    <div className="text-xl font-bold text-gray-900 dark:text-white font-heading group-hover:scale-105 transform origin-left transition-transform">
                        {route.distance}
                    </div>
                </div>
                <div className="p-4 group hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <div className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">
                        ETA
                    </div>
                    <div className="text-xl font-bold text-gray-900 dark:text-white font-heading group-hover:scale-105 transform origin-left transition-transform">
                        {route.estimated_time}
                    </div>
                </div>
            </div>

            {/* Waypoints */}
            <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">

                {
                    route.coordinates?.slice(0, 5).map((stop, index) => {


                        const points = route.coordinates.slice(0, 5)

                        const isFirst = index === 0
                        const isLast = index === points.length - 1


                        return (

                            <div
                                key={index}
                                className="flex items-start gap-3 py-2 relative"
                            >


                                <div
                                    className={
                                        `w-[14px] h-[14px] rounded-full flex-shrink-0
${isFirst
                                            ? "bg-blue-600"
                                            : isLast
                                                ? "bg-red-500"
                                                : "bg-gray-400"}`
                                    }
                                />


                                <span className="text-sm text-gray-700 dark:text-gray-300">

                                    {
                                        isFirst
                                            ? "Starting Point"
                                            : isLast
                                                ? "Destination"
                                                : `Waypoint ${index}`
                                    }

                                </span>


                            </div>

                        )

                    })

                }

            </div>
        </div>
    )
}

export default RouteCard
