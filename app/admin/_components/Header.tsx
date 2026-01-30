'use client';

import React from 'react';
import { Menu, Bell, Search, Terminal, Cpu } from 'lucide-react';

export const Header = ({ onMenuClick }: { onMenuClick: () => void }) => {
  return (
    <header className="h-16 bg-slate-950/50 backdrop-blur-md border-b border-white/5 sticky top-0 z-40 px-4 md:px-8 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="lg:hidden p-2 text-slate-400 hover:text-white">
          <Menu size={24} />
        </button>
        
        {/* System Monitor Style Status */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-black/40 border border-slate-800 rounded-md">
            <Cpu size={12} className="text-cyan-500" />
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-tighter">CPU: 14%</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-black/40 border border-slate-800 rounded-md">
            <Terminal size={12} className="text-emerald-500" />
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-tighter">Status: Online</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
          <input 
            type="text" 
            placeholder="Search records..." 
            className="bg-slate-900/50 border border-slate-800 rounded-full py-1.5 pl-9 pr-4 text-xs focus:border-cyan-500 outline-none w-48 transition-all"
          />
        </div>
        
        <button className="relative p-2 text-slate-400 hover:text-cyan-400">
          <Bell size={20} />
          <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse"></span>
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-white/10">
          <div className="text-right hidden sm:block leading-tight">
            <p className="text-xs font-bold text-white tracking-wide">ADMIN_01</p>
            <p className="text-[9px] text-cyan-500 font-mono uppercase">Master Access</p>
          </div>
          <div className="w-8 h-8 rounded-lg bg-linear-to-br from-cyan-600 to-blue-700 border border-white/20 shadow-lg shadow-cyan-900/20 flex items-center justify-center font-bold text-xs">
            AD
          </div>
        </div>
      </div>
    </header>
  );
};