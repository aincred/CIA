'use client';

import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  MoreVertical, 
  Eye, 
  CheckCircle, 
  Clock, 
  FileText,
  Download,
  Terminal,
  ShieldCheck
} from 'lucide-react';

// Sample Data based on your FormDataType
const MOCK_STUDENTS = [
  { id: '1', name: 'Neo Anderson', course: 'VAPT / Ethical Hacking', email: 'neo@matrix.io', contact: '+91 98765 43210', status: 'Verified', date: '2026-01-25' },
  { id: '2', name: 'Trinity Bell', course: 'Cybersecurity Fundamentals', email: 'trinity@zion.net', contact: '+91 87654 32109', status: 'Pending', date: '2026-01-26' },
  { id: '3', name: 'Morpheus D.', course: 'IS Audit & Compliance', email: 'dreamer@neb.org', contact: '+91 76543 21098', status: 'Verified', date: '2026-01-27' },
];

const StatCard = ({ title, value, icon: Icon, color }: any) => (
  <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-xl backdrop-blur-md">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-white font-mono">{value}</h3>
      </div>
      <div className={`p-2 rounded-lg bg-${color}-500/10 border border-${color}-500/20`}>
        <Icon className={`text-${color}-500 w-5 h-5`} />
      </div>
    </div>
  </div>
);

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 p-4 md:p-8 font-sans selection:bg-cyan-900/50">
      {/* BACKGROUND DECOR */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(8,51,68,0.15),transparent)] pointer-events-none" />
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* HEADER */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <ShieldCheck className="text-cyan-500" />
              Command Center <span className="text-slate-500 font-mono text-sm font-normal">/admin/v1</span>
            </h1>
            <p className="text-slate-500 text-sm mt-1">Student enrollment and security clearance management.</p>
          </div>
          <div className="flex gap-3">
            <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors border border-slate-700">
              <Download size={16} /> Export CSV
            </button>
            <button className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-cyan-900/20">
              <Terminal size={16} /> System Logs
            </button>
          </div>
        </header>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard title="Total Cadets" value="1,284" icon={Users} color="cyan" />
          <StatCard title="Active Protocols" value="42" icon={Terminal} color="blue" />
          <StatCard title="Pending Clearance" value="18" icon={Clock} color="amber" />
          <StatCard title="Verified Secure" value="1,266" icon={CheckCircle} color="emerald" />
        </div>

        {/* DATA TABLE */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden backdrop-blur-sm">
          <div className="p-4 border-b border-slate-800 flex flex-col md:flex-row gap-4 justify-between bg-black/20">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="text" 
                placeholder="Search by name, email, or hash..." 
                className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <button className="p-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors">
                <Filter size={18} />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950/50 text-slate-500 uppercase text-[10px] font-bold tracking-widest border-b border-slate-800">
                  <th className="px-6 py-4">Student Identity</th>
                  <th className="px-6 py-4">Assigned Module</th>
                  <th className="px-6 py-4">Registration Date</th>
                  <th className="px-6 py-4">Clearance Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {MOCK_STUDENTS.map((student) => (
                  <tr key={student.id} className="hover:bg-cyan-500/2 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 text-cyan-500 font-bold text-xs">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">{student.name}</p>
                          <p className="text-xs text-slate-500 font-mono">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-300">{student.course}</span>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-slate-400">
                      {student.date}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        student.status === 'Verified' 
                          ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' 
                          : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                      }`}>
                        {student.status === 'Verified' ? <CheckCircle size={10} /> : <Clock size={10} />}
                        {student.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button title="View Details" className="p-1.5 hover:bg-slate-800 rounded-md text-slate-400 hover:text-cyan-400 transition-colors">
                          <Eye size={16} />
                        </button>
                        <button title="Receipt" className="p-1.5 hover:bg-slate-800 rounded-md text-slate-400 hover:text-white transition-colors">
                          <FileText size={16} />
                        </button>
                        <button title="Options" className="p-1.5 hover:bg-slate-800 rounded-md text-slate-400 hover:text-white transition-colors">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 bg-black/20 border-t border-slate-800 flex justify-between items-center text-xs text-slate-500">
             <p>Showing {MOCK_STUDENTS.length} active records</p>
             <div className="flex gap-2">
                <button className="px-3 py-1 bg-slate-800 rounded border border-slate-700 hover:text-white disabled:opacity-50" disabled>Previous</button>
                <button className="px-3 py-1 bg-slate-800 rounded border border-slate-700 hover:text-white">Next</button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}