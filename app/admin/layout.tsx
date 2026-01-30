'use client';

import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  ShieldCheck, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Bell,
  Search,
  Terminal
} from 'lucide-react';
import RegistrationForm from '../polytechnicRegister/page';

const LOGO_URL = "/ChatGPT Image Jan 17, 2026, 04_21_47 PM.png";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard' },
    { name: 'Registrations', icon: Users, href: '/admin/registrations' },
    { name: 'Course prices', icon: ShieldCheck, href: '/admin/prices' },
    { name: 'System Config', icon: Settings, href: '/admin/settings' },
    { name: 'Registration Form', icon: Users , href: '/admin/registration-form' },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans flex">
      {/* --- SIDEBAR --- */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-slate-900/50 backdrop-blur-xl border-r border-white/5 
        transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col">
          {/* Sidebar Header */}
          <div className="p-6 flex items-center gap-3 border-b border-white/5">
            <div className="w-10 h-10 bg-black rounded-lg border border-cyan-500/30 flex items-center justify-center overflow-hidden">
              <img src={LOGO_URL} alt="CIA Logo" className="w-8 h-8 object-contain" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white tracking-widest uppercase">Cyber</h2>
              <p className="text-[10px] text-cyan-500 font-bold uppercase tracking-tighter">Admin Panel</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-cyan-500/10 transition-all group"
              >
                <item.icon size={20} className="group-hover:text-cyan-400 transition-colors" />
                <span className="text-sm font-medium">{item.name}</span>
              </a>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-white/5">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all">
              <LogOut size={20} />
              <span className="text-sm font-medium">Terminate Session</span>
            </button>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* HEADER */}
        <header className="h-16 border-b border-white/5 bg-slate-950/50 backdrop-blur-md sticky top-0 z-40 px-4 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 text-slate-400 hover:text-white"
            >
              {isSidebarOpen ? <X /> : <Menu />}
            </button>
            
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-black/40 border border-slate-800 rounded-lg">
              <Terminal size={14} className="text-cyan-500" />
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">System_Status: Optimal</span>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-6">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input 
                type="text" 
                placeholder="Search protocol..." 
                className="bg-slate-900 border border-slate-800 rounded-full py-1.5 pl-10 pr-4 text-xs focus:border-cyan-500 outline-none w-48 transition-all"
              />
            </div>
            
            <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-cyan-500 rounded-full border-2 border-slate-950"></span>
            </button>

            <div className="flex items-center gap-3 pl-4 border-l border-white/10">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-white">Admin_User</p>
                <p className="text-[10px] text-emerald-500 font-mono">Level_4_Access</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-linear-to-br from-cyan-600 to-blue-600 border border-white/20"></div>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 relative overflow-y-auto">
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
          <div className="p-4 md:p-8 relative z-10">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}