const modes = [
  { id: "driving", name: "Driving", emoji: "🚗" },
  { id: "walking", name: "Walking", emoji: "🚶" },
  { id: "cycling", name: "Cycling", emoji: "🚴" },
  { id: "transit", name: "Transit", emoji: "🚌" },
]

function TravelMode({ selected, setSelected }) {
  return (
    <div className="grid grid-cols-4 gap-2 mb-6">
      {modes.map(mode => {
        const isSelected = selected === mode.id;
        return (
          <button
            key={mode.id}
            onClick={() => setSelected(mode.id)}
            className={`
              flex flex-col items-center justify-center gap-1.5 py-3 rounded-xl border transition-all duration-200
              ${isSelected 
                ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-500 shadow-sm scale-[1.02]" 
                : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-300 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 hover:-translate-y-0.5"
              }
            `}
          >
            <span className="text-2xl leading-none drop-shadow-sm">{mode.emoji}</span>
            <span className={`text-[11px] font-medium transition-colors ${isSelected ? "text-blue-700 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"}`}>
              {mode.name}
            </span>
          </button>
        )
      })}
    </div>
  )
}

export default TravelMode
