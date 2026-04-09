/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Toaster } from '@/components/ui/sonner';
import Sidebar from './components/Sidebar';
import CategoryManagement from './components/CategoryManagement';
import SeriesManagement from './components/SeriesManagement';
import ArtistsManagement from './components/ArtistsManagement';
import { SubMenu } from './types';

export default function App() {
  const [currentSubMenu, setCurrentSubMenu] = useState<SubMenu>('SERIES');

  const renderContent = () => {
    switch (currentSubMenu) {
      case 'CATEGORY':
        return <CategoryManagement />;
      case 'SERIES':
        return <SeriesManagement />;
      case 'ARTISTS':
        return <ArtistsManagement />;
      default:
        return <SeriesManagement />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex text-[#1A1A1A] font-sans">
      <Toaster position="top-right" />
      
      <Sidebar 
        currentSubMenu={currentSubMenu} 
        onSubMenuChange={setCurrentSubMenu} 
      />

      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
