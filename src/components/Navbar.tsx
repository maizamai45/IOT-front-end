'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FaHome, 
  FaChartLine, 
  FaLeaf, 
  FaCog, 
  FaBars, 
  FaTimes,
  FaTemperatureHigh,
  FaWater,
  FaSun,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';

export default function Navbar({ isCollapsed, setIsCollapsed }: { isCollapsed: boolean; setIsCollapsed: (value: boolean) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', path: '/dasbord', icon: <FaHome /> },
    { name: 'Analytics', path: '/analytics', icon: <FaChartLine /> },
    { name: 'Plants', path: '/plants', icon: <FaLeaf /> },
    { name: 'Temperature', path: '/temperature', icon: <FaTemperatureHigh /> },
    { name: 'Humidity', path: '/humidity', icon: <FaWater /> },
    { name: 'Lighting', path: '/lighting', icon: <FaSun /> },
    { name: 'Settings', path: '/settings', icon: <FaCog /> },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-emerald-600 text-white lg:hidden hover:bg-emerald-700 transition-colors duration-300"
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <nav
        className={`fixed top-0 left-0 h-full bg-white shadow-lg transform transition-all duration-300 ease-in-out z-40
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${isCollapsed ? 'w-20' : 'w-64'}`}
      >
        {/* Logo */}
        <div className={`p-6 border-b border-emerald-100 ${isCollapsed ? 'text-center' : ''}`}>
          {!isCollapsed && (
            <>
              <h1 className="text-2xl font-bold text-emerald-800">Smart Farm</h1>
              <p className="text-sm text-emerald-600">IoT Dashboard</p>
            </>
          )}
          {isCollapsed && (
            <div className="text-2xl font-bold text-emerald-800">SF</div>
          )}
        </div>

        {/* Navigation Links */}
        <div className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-300
                    ${pathname === item.path
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'text-gray-600 hover:bg-emerald-50 hover:text-emerald-800'
                    }
                    ${isCollapsed ? 'justify-center' : ''}`}
                  onClick={() => setIsOpen(false)}
                  title={isCollapsed ? item.name : ''}
                >
                  <span className="text-xl">{item.icon}</span>
                  {!isCollapsed && <span>{item.name}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 w-full p-4 border-t border-emerald-100">
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3 px-4'} py-2`}>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            {!isCollapsed && <span className="text-sm text-emerald-600">System Online</span>}
          </div>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-20 bg-emerald-600 text-white p-1 rounded-full hover:bg-emerald-700 transition-colors duration-300 hidden lg:block"
        >
          {isCollapsed ? <FaChevronRight size={16} /> : <FaChevronLeft size={16} />}
        </button>
      </nav>

      {/* Main Content Padding */}
      <div className={`transition-all duration-300 ${isCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
        {/* Your page content will be rendered here */}
      </div>
    </>
  );
} 