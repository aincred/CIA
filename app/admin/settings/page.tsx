"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import the router
import { Lock, LogOut, ShieldCheck } from 'lucide-react';

const SettingsPage = () => {
  const router = useRouter(); // Initialize router
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const handleLogout = () => {
    // 1. Clear your auth data (adjust based on your auth method)
    localStorage.removeItem('token'); 
    sessionStorage.clear();
    
    // 2. Redirect to home page
    router.push('/'); 
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // Your logic for API call to /api/admin/change-password
    console.log("Updating password...");
  };

  return (
    <div className="min-h-screen bg-[#0a0b14] text-slate-200 p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-8 flex items-center gap-2">
          <ShieldCheck className="text-blue-400" /> Admin Settings
        </h1>

        <div className="grid gap-6">
          {/* Change Password Section */}
          <form onSubmit={handlePasswordUpdate} className="bg-[#11131f] border border-slate-800 rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Lock size={18} className="text-blue-400" /> Security
            </h2>
            <div className="space-y-4 max-w-md">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Current Password</label>
                <input 
                  type="password" 
                  value={passwords.current}
                  onChange={(e) => setPasswords({...passwords, current: e.target.value})}
                  className="w-full bg-[#0a0b14] border border-slate-700 rounded p-2 focus:border-blue-500 outline-none transition"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">New Password</label>
                <input 
                  type="password" 
                  value={passwords.new}
                  onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                  className="w-full bg-[#0a0b14] border border-slate-700 rounded p-2 focus:border-blue-500 outline-none transition"
                  required
                />
              </div>
              <button 
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded text-sm font-medium transition"
              >
                Update Password
              </button>
            </div>
          </form>

          {/* Account/Session Section */}
          <div className="bg-[#11131f] border border-slate-800 rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-red-400">
              <LogOut size={18} /> Danger Zone
            </h2>
            <div className="flex items-center justify-between border-t border-slate-800 pt-4">
              <div>
                <p className="font-medium">Logout of Session</p>
                <p className="text-sm text-slate-500">End your current administrative session immediately.</p>
              </div>
              <button 
                onClick={handleLogout}
                className="border border-red-500/50 hover:bg-red-500/10 text-red-500 px-4 py-2 rounded text-sm font-medium transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;