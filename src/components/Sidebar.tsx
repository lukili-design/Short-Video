/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Film, 
  List, 
  Users, 
  ChevronDown, 
  ChevronRight,
  LayoutDashboard,
  Settings
} from 'lucide-react';
import { SubMenu } from '../types';

interface SidebarProps {
  currentSubMenu: SubMenu;
  onSubMenuChange: (menu: SubMenu) => void;
}

export default function Sidebar({ currentSubMenu, onSubMenuChange }: SidebarProps) {
  const [isShortDramaOpen, setIsShortDramaOpen] = React.useState(true);
  const [isSeriesMgmtOpen, setIsSeriesMgmtOpen] = React.useState(true);

  return (
    <aside className="w-64 bg-white border-r border-[#E5E7EB] flex flex-col sticky top-0 h-screen">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
          <Film className="text-white w-5 h-5" />
        </div>
        <h1 className="font-bold text-lg tracking-tight">短劇 CMS</h1>
      </div>
      
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        <div className="py-2">
          <div 
            className="flex items-center justify-between px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors"
            onClick={() => setIsShortDramaOpen(!isShortDramaOpen)}
          >
            <div className="flex items-center gap-3">
              <Film size={18} />
              <span className="text-sm font-medium">短劇管理</span>
            </div>
            {isShortDramaOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </div>
          
          {isShortDramaOpen && (
            <div className="pl-9 space-y-1 mt-1">
              <SubNavItem 
                label="短劇分類管理" 
                active={currentSubMenu === 'CATEGORY'} 
                onClick={() => onSubMenuChange('CATEGORY')} 
              />
              <SubNavItem 
                label="短劇管理" 
                active={currentSubMenu === 'SERIES'} 
                onClick={() => onSubMenuChange('SERIES')} 
              />
              <SubNavItem 
                label="Artists 管理" 
                active={currentSubMenu === 'ARTISTS'} 
                onClick={() => onSubMenuChange('ARTISTS')} 
              />
            </div>
          )}
        </div>
      </nav>
      
      <div className="p-4 border-t border-[#E5E7EB]">
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold">AD</div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium truncate">Admin User</p>
            <p className="text-xs text-gray-500 truncate">admin@example.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <div className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${active ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}

function SubNavItem({ label, active = false, onClick }: { label: string, active?: boolean, onClick: () => void }) {
  return (
    <div 
      className={`px-3 py-1.5 rounded-lg cursor-pointer text-sm transition-colors ${active ? 'text-black font-semibold bg-gray-100' : 'text-gray-500 hover:text-black hover:bg-gray-50'}`}
      onClick={onClick}
    >
      {label}
    </div>
  );
}
