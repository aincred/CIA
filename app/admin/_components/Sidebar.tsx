'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  ShieldCheck, 
  Settings, 
  LogOut, 
  Terminal,
  Database
} from 'lucide-react';

const LOGO_URL = "/ChatGPT Image Jan 17, 2026, 04_21_47 PM.png";

export const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard' },
    { name: 'Registrations', icon: Users, href: '/admin/registrations' },
    { name: 'Audit Logs', icon: ShieldCheck, href: '/admin/audit' },
    { name: 'Database', icon: Database, href: '/admin/database' },
    { name: 'Settings', icon: Settings, href: '/admin/settings' },
  ];

  return (
    <aside className={`
      fixed inset-y-0 left-0 z-50 w-64 bg-slate-950 border-r border-white/5 
      transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    `}>
      <div className="h-full flex flex-col">
        {/* Branding */}
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-black rounded-lg border border-cyan-500/30 flex items-center justify-center">
            <img src={LOGO_URL} alt="Logo" className="w-8 h-8 object-contain" />
          </div>
          <div className="leading-none">
            <h2 className="text-sm font-bold text-white tracking-widest">CYBER</h2>
            <p className="text-[10px] text-cyan-500 font-bold uppercase">Intelligence</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                  isActive 
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.1)]' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon size={18} className={isActive ? 'text-cyan-400' : 'group-hover:text-cyan-400'} />
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/5">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all font-mono text-xs uppercase tracking-widest">
            <LogOut size={16} /> Terminate_Session
          </button>
        </div>
      </div>
    </aside>
  );
};