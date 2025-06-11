'use client';

import { useState, useEffect } from 'react';
import { FaLeaf, FaTemperatureHigh, FaWater, FaSun, FaChartLine } from 'react-icons/fa';
import { dashboardService, MoistureData } from './dasbord/dashboard.service';

export default function Home() {
  const [latestData, setLatestData] = useState<MoistureData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLatestData = async () => {
    try {
      const data = await dashboardService.getLatestData();
      setLatestData(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch data immediately when component mounts
    fetchLatestData();

    // Set up interval to fetch data every 5 seconds
    const interval = setInterval(fetchLatestData, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []); // Empty dependency array means this effect runs once on mount

  const stats = [
    { 
      title: 'ความชื้น', 
      value: latestData.length > 0 ? `${latestData[0].moistureValue}%` : 'Loading...', 
      icon: <FaTemperatureHigh className="text-orange-500" /> 
    },
    { title: 'Humidity', value: '65%', icon: <FaWater className="text-blue-500" /> },
    { title: 'Light Level', value: '850 lux', icon: <FaSun className="text-yellow-500" /> },
    { title: 'Soil Moisture', value: '75%', icon: <FaLeaf className="text-green-500" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-4 px-2 sm:px-4 md:px-8">
      <div className="max-w-screen-xl mx-auto w-full">
        {/* Header */}
        <header className="mb-6 md:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-emerald-800">Smart Farm Dashboard</h1>
          <p className="text-emerald-600 mt-1 sm:mt-2 text-sm sm:text-base">Monitor your farm&apos;s vital statistics</p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 md:mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-4 sm:p-6 flex items-center justify-between hover:shadow-lg transition-shadow duration-300"
            >
              <div>
                <p className="text-gray-600 text-xs sm:text-sm">{stat.title}</p>
                <p className="text-xl sm:text-2xl font-semibold text-emerald-700 mt-1">{stat.value}</p>
              </div>
              <div className="text-2xl sm:text-3xl">{stat.icon}</div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
          {/* Chart Section */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-4 sm:p-6 mb-4 lg:mb-0">
            <div className="flex items-center justify-between mb-2 sm:mb-4">
              <h2 className="text-lg sm:text-xl font-semibold text-emerald-800">Growth Analytics</h2>
              <FaChartLine className="text-emerald-600 text-lg sm:text-xl" />
            </div>
            <div className="h-40 sm:h-64 bg-emerald-50 rounded-lg flex items-center justify-center">
              {loading ? (
                <p className="text-emerald-600 text-sm sm:text-base">Loading...</p>
              ) : error ? (
                <p className="text-red-600 text-sm sm:text-base">{error}</p>
              ) : latestData.length > 0 ? (
                <div className="text-center">
                  <p className="text-emerald-800 text-lg sm:text-xl font-semibold">
                    Latest Moisture: {latestData[0].moistureValue}%
                  </p>
                  <p className="text-emerald-600 text-sm mt-2">
                    Raw Value: {latestData[0].rawValue}
                  </p>
                  <p className="text-emerald-600 text-sm">
                    Sensor ID: {latestData[0].sensorId}
                  </p>
                  <p className="text-emerald-600 text-sm">
                    Recorded: {new Date(latestData[0].recordedAt).toLocaleString()}
                  </p>
                  <p className="text-emerald-600 text-xs mt-2">
                    Auto-refreshing every 5 seconds...
                  </p>
                </div>
              ) : (
                <p className="text-emerald-600 text-sm sm:text-base">No data available</p>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 flex flex-col gap-2">
            <h2 className="text-lg sm:text-xl font-semibold text-emerald-800 mb-2 sm:mb-4">Quick Actions</h2>
            <button className="w-full bg-emerald-600 text-white py-2 sm:py-2.5 px-4 rounded-lg hover:bg-emerald-700 transition-colors duration-300 text-sm sm:text-base">
              Water Plants
            </button>
            <button className="w-full bg-amber-600 text-white py-2 sm:py-2.5 px-4 rounded-lg hover:bg-amber-700 transition-colors duration-300 text-sm sm:text-base">
              Adjust Lighting
            </button>
            <button className="w-full bg-blue-600 text-white py-2 sm:py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 text-sm sm:text-base">
              View Reports
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-6 md:mt-8 bg-white rounded-xl shadow-md p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-emerald-800 mb-2 sm:mb-4">Recent Activity</h2>
          <div className="space-y-2 sm:space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center space-x-3 sm:space-x-4 p-2 sm:p-3 bg-emerald-50 rounded-lg">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <div>
                  <p className="text-emerald-800 font-medium text-sm sm:text-base">System Check Completed</p>
                  <p className="text-xs sm:text-sm text-emerald-600">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
