export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#fff8f7] flex flex-col items-center py-6 px-2 sm:px-0">
      {/* Header */}
      <div className="w-full max-w-md h-20 bg-green-400 rounded-t-lg border-2 border-blue-400 mb-6" />

      {/* Content */}
      <div className="w-full max-w-md flex flex-col items-center gap-8">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2">ชื่อผักหรือผลไม้</h1>

        {/* Soil Moisture Box */}
        <div className="w-full bg-white rounded-xl border border-black p-4 flex flex-col items-center mb-4">
          <div className="w-full bg-green-400 rounded-lg py-3 text-center text-xl font-medium mb-4">ความชื้นในดิน</div>
          <div className="text-5xl font-bold mb-2">65 <span className="text-3xl">%</span></div>
        </div>

        {/* Forecast Box */}
        <div className="w-full bg-white rounded-xl border border-black p-4 flex flex-col items-center">
          <div className="w-full bg-green-400 rounded-lg py-3 text-center text-xl font-medium mb-4">วันที่คาดการณ์</div>
          <div className="flex justify-between w-full px-2">
            {/* Example forecast data */}
            <div className="flex flex-col items-center">
              <span className="text-lg">29</span>
              <span className="text-3xl text-orange-400">●</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-lg">30</span>
              <span className="relative">
                <span className="text-3xl text-orange-400">●</span>
                <span className="absolute left-1 top-1 w-3 h-2 bg-gray-200 rounded-full opacity-80" />
                <span className="absolute left-2 top-2 w-2 h-1 bg-gray-200 rounded-full opacity-80" />
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-lg">1</span>
              <span className="relative">
                <span className="text-3xl text-gray-300">●</span>
                <span className="absolute left-1 top-5 w-1 h-3 bg-blue-400 rounded-full" />
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-lg">2</span>
              <span className="text-3xl text-orange-400">●</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-lg">3</span>
              <span className="text-3xl text-orange-400">●</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
