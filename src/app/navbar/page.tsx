'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';

export default function NavbarPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div>
      <Navbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className="p-4">
        <h1 className="text-2xl font-bold">Navbar Settings</h1>
        <p className="mt-2">This page is for navbar configuration and settings.</p>
      </div>
    </div>
  );
} 