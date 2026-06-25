function LocationInput({ source, destination, setSource, setDestination }) {
    return (
        <div className="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden mb-6 bg-white dark:bg-gray-800 shadow-sm transition-colors duration-300">
            {/* From */}
            <div className="flex items-center gap-3 px-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus-within:bg-blue-50/30 dark:focus-within:bg-blue-900/10 transition-colors">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-blue-500 flex-shrink-0 shadow-[0_0_8px_rgba(37,99,235,0.4)]" />
                <input
                    value={source}
                    onChange={e => setSource(e.target.value)}
                    placeholder="From — starting point"
                    className="flex-1 border-none outline-none bg-transparent py-4 text-[15px] text-gray-900 dark:text-white placeholder:text-gray-400 font-sans"
                />
            </div>

            {/* Connector line */}
            <div className="px-[22px] bg-white dark:bg-gray-800">
                <div className="w-[1.5px] h-4 bg-gray-200 dark:bg-gray-700" />
            </div>

            {/* To */}
            <div className="flex items-center gap-3 px-4 bg-white dark:bg-gray-800 focus-within:bg-red-50/30 dark:focus-within:bg-red-900/10 transition-colors">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500 dark:bg-red-500 flex-shrink-0 shadow-[0_0_8px_rgba(239,68,68,0.4)]" />
                <input
                    value={destination}
                    onChange={e => setDestination(e.target.value)}
                    placeholder="To — destination"
                    className="flex-1 border-none outline-none bg-transparent py-4 text-[15px] text-gray-900 dark:text-white placeholder:text-gray-400 font-sans"
                />
            </div>
        </div>
    )
}

export default LocationInput
