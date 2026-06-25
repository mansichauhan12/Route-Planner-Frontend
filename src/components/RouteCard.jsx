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
            <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                {route.route.map((stop, index) => {
                    const isFirst = index === 0
                    const isLast = index === route.route.length - 1
                    
                    let dotClasses = "w-[14px] h-[14px] rounded-full flex-shrink-0 mt-0.5 z-10 "
                    if (isFirst) {
                        dotClasses += "bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.4)] border-2 border-white dark:border-gray-800"
                    } else if (isLast) {
                        dotClasses += "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)] border-2 border-white dark:border-gray-800"
                    } else {
                        dotClasses += "bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-500"
                    }

                    return (
                        <div key={index} className="flex items-start gap-3 py-2 relative group">
                            {/* Connector line */}
                            {!isLast && (
                                <div className="absolute left-[7px] top-[24px] bottom-[-8px] w-[2px] bg-gray-200 dark:bg-gray-700 group-hover:bg-blue-200 dark:group-hover:bg-blue-900 transition-colors" />
                            )}
                            <div className={dotClasses} />
                            <span className={`text-[14px] leading-[1.3] font-medium transition-colors ${!isFirst && !isLast ? 'text-gray-600 dark:text-gray-300' : 'text-gray-900 dark:text-white'}`}>
                                {stop}
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default RouteCard
