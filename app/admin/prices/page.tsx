'use client';
import React, { useState } from 'react';
import { 
  Search, Filter, Download, Plus, MoreHorizontal, 
  Check, X, ChevronDown, ChevronLeft, ChevronRight,
  Shield, Zap, Globe, Lock, ArrowUpRight, ArrowDownRight,
  FileSpreadsheet, SlidersHorizontal, Trash2
} from 'lucide-react';

// --- MOCK DATA ---
const INITIAL_DATA = [
  { 
    id: "CIA-100", 
    title: "Cybersecurity Fundamentals", 
    category: "Network Defense",
    level: "Beginner", 
    price: 11999, 
    status: "Active", 
    revenue: 14500000, 
    trend: 12,
    enrolled: 1240,
    lastUpdated: "2 hrs ago"
  },
  { 
    id: "CIA-200", 
    title: "VAPT / Ethical Hacking", 
    category: "Offensive Security",
    level: "Advanced", 
    price: 14999, 
    status: "Active", 
    revenue: 12200000, 
    trend: 8,
    enrolled: 850,
    lastUpdated: "1 day ago"
  },
  { 
    id: "CIA-300", 
    title: "IS Audit & Compliance", 
    category: "GRC",
    level: "Intermediate", 
    price: 13499, 
    status: "Active", 
    revenue: 5600000, 
    trend: -2,
    enrolled: 420,
    lastUpdated: "3 days ago"
  },
  { 
    id: "CIA-400", 
    title: "Workshops & Awareness", 
    category: "General",
    level: "All Levels", 
    price: 2999, 
    status: "Offline", 
    revenue: 6200000, 
    trend: 5,
    enrolled: 2100,
    lastUpdated: "1 week ago"
  },
  { 
    id: "CIA-500", 
    title: "Cloud Security Specialist", 
    category: "Cloud",
    level: "Advanced", 
    price: 18999, 
    status: "Draft", 
    revenue: 0, 
    trend: 0,
    enrolled: 0,
    lastUpdated: "Just now"
  },
];

/**
 * UTILITY: Formatter for Currency
 */
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumSignificantDigits: 3
  }).format(amount);
};

const formatRevenue = (amount: number) => {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)}Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
  return formatCurrency(amount);
};

export default function PricingDatabase() {
  const [data, setData] = useState(INITIAL_DATA);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<number | string>('');

  // --- ACTIONS ---
  
  const handleEditClick = (id: string, currentPrice: number) => {
    setEditingId(id);
    setEditPrice(currentPrice);
  };

  const handleSave = () => {
    if (editingId) {
      setData(prev => prev.map(item => 
        item.id === editingId ? { ...item, price: Number(editPrice), lastUpdated: 'Just now' } : item
      ));
      setEditingId(null);
    }
  };

  const toggleSelectAll = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.map(d => d.id));
    }
  };

  const toggleSelectRow = (id: string) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(prev => prev.filter(rowId => rowId !== id));
    } else {
      setSelectedRows(prev => [...prev, id]);
    }
  };

  const handleDelete = () => {
    if (confirm(`Delete ${selectedRows.length} selected courses?`)) {
      setData(prev => prev.filter(item => !selectedRows.includes(item.id)));
      setSelectedRows([]);
    }
  };

  // --- FILTERING ---
  const filteredData = data.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#050505] text-slate-300 font-sans p-8 relative overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />

      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 relative z-10">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
             Pricing Database <span className="px-2 py-0.5 rounded-full bg-cyan-950/50 border border-cyan-500/20 text-cyan-400 text-xs font-mono">v2.4</span>
          </h1>
          <p className="text-slate-500 mt-1">Manage course tariffs, monitor revenue streams, and update active catalogs.</p>
        </div>
        
        <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-white/10 rounded-lg hover:border-white/20 hover:text-white transition-colors text-sm font-medium">
                <Download size={16} /> Export CSV
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-black font-bold rounded-lg transition-all shadow-[0_0_15px_rgba(8,145,178,0.4)] text-sm">
                <Plus size={18} /> Add New Course
            </button>
        </div>
      </div>

      {/* --- CONTROL BAR --- */}
      <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-t-2xl p-4 flex flex-wrap gap-4 justify-between items-center relative z-10">
        <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative group w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" size={16} />
                <input 
                    type="text" 
                    placeholder="Search by Title, ID or Tag..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 outline-none text-white transition-all placeholder:text-slate-600"
                />
            </div>
            <button className="p-2.5 bg-black/50 border border-white/10 rounded-xl hover:border-cyan-500/30 hover:text-cyan-400 transition-colors">
                <Filter size={18} />
            </button>
            <button className="p-2.5 bg-black/50 border border-white/10 rounded-xl hover:border-cyan-500/30 hover:text-cyan-400 transition-colors">
                <SlidersHorizontal size={18} />
            </button>
        </div>

        {selectedRows.length > 0 && (
            <div className="flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2">
                <span className="text-sm text-slate-400"><span className="text-white font-bold">{selectedRows.length}</span> selected</span>
                <button 
                    onClick={handleDelete}
                    className="flex items-center gap-2 px-3 py-1.5 bg-red-950/30 border border-red-900/50 text-red-400 rounded-lg hover:bg-red-900/50 transition-colors text-xs font-bold uppercase"
                >
                    <Trash2 size={14} /> Delete
                </button>
            </div>
        )}
      </div>

      {/* --- DATA TABLE --- */}
      <div className="bg-slate-900/40 backdrop-blur-xl border-x border-b border-white/5 rounded-b-2xl overflow-hidden relative z-10 shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/40 border-b border-white/5 text-xs uppercase text-slate-500 font-bold tracking-wider">
                <th className="px-6 py-4 w-12">
                    <input 
                        type="checkbox" 
                        checked={selectedRows.length === data.length}
                        onChange={toggleSelectAll}
                        className="w-4 h-4 rounded border-slate-700 bg-slate-900/50 checked:bg-cyan-600 checked:border-cyan-600 focus:ring-offset-black" 
                    />
                </th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Course Info</th>
                <th className="px-6 py-4">Level</th>
                <th className="px-6 py-4">Enrollment</th>
                <th className="px-6 py-4">Price (INR)</th>
                <th className="px-6 py-4">Revenue</th>
                <th className="px-6 py-4">Last Updated</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {filteredData.map((item) => (
                <tr key={item.id} className={`group transition-colors ${selectedRows.includes(item.id) ? 'bg-cyan-900/10' : 'hover:bg-white/[0.02]'}`}>
                  
                  {/* Checkbox */}
                  <td className="px-6 py-4">
                    <input 
                        type="checkbox" 
                        checked={selectedRows.includes(item.id)}
                        onChange={() => toggleSelectRow(item.id)}
                        className="w-4 h-4 rounded border-slate-700 bg-slate-900/50 checked:bg-cyan-600 checked:border-cyan-600" 
                    />
                  </td>

                  {/* Status Badge */}
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${
                        item.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                        item.status === 'Offline' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                        'bg-slate-500/10 text-slate-400 border-slate-500/20'
                    }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${item.status === 'Active' ? 'bg-emerald-400 animate-pulse' : 'bg-current'}`} />
                        {item.status.toUpperCase()}
                    </span>
                  </td>

                  {/* Course Title & ID */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-slate-800 to-black border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-cyan-400 group-hover:border-cyan-500/30 transition-all">
                            {item.price > 10000 ? <Shield size={18} /> : <Zap size={18} />}
                        </div>
                        <div>
                            <div className="font-bold text-white group-hover:text-cyan-300 transition-colors">{item.title}</div>
                            <div className="text-xs text-slate-500 font-mono">{item.id} • {item.category}</div>
                        </div>
                    </div>
                  </td>

                  {/* Level Badge */}
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${
                         item.level === 'Beginner' ? 'bg-blue-900/10 text-blue-400 border-blue-800/30' :
                         item.level === 'Advanced' ? 'bg-purple-900/10 text-purple-400 border-purple-800/30' :
                         'bg-slate-800 text-slate-400 border-slate-700'
                    }`}>
                        {item.level}
                    </span>
                  </td>

                  {/* Enrollment Stats */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                        <span className="text-white font-medium">{item.enrolled.toLocaleString()}</span>
                        <span className="text-xs text-slate-600">students</span>
                    </div>
                  </td>

                  {/* EDITABLE PRICE COLUMN */}
                  <td className="px-6 py-4">
                    {editingId === item.id ? (
                        <div className="flex items-center gap-2 animate-in fade-in zoom-in-95 duration-200">
                            <div className="relative">
                                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-500 text-xs">₹</span>
                                <input 
                                    type="number" 
                                    value={editPrice}
                                    onChange={(e) => setEditPrice(e.target.value)}
                                    className="w-24 bg-slate-950 border border-cyan-500 rounded px-2 pl-5 py-1 text-white font-bold text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.2)]"
                                    autoFocus
                                />
                            </div>
                            <button onClick={handleSave} className="p-1 bg-emerald-600 rounded text-white hover:bg-emerald-500 transition-colors"><Check size={14}/></button>
                            <button onClick={() => setEditingId(null)} className="p-1 bg-slate-700 rounded text-white hover:bg-slate-600 transition-colors"><X size={14}/></button>
                        </div>
                    ) : (
                        <div 
                            onClick={() => handleEditClick(item.id, item.price)}
                            className="group/price cursor-pointer flex items-center gap-2 px-2 py-1 -ml-2 rounded hover:bg-white/5 transition-colors border border-transparent hover:border-dashed hover:border-slate-600"
                            title="Click to Edit"
                        >
                            <span className="text-white font-mono font-bold">{formatCurrency(item.price)}</span>
                            <span className="opacity-0 group-hover/price:opacity-100 text-slate-500 text-xs"><MoreHorizontal size={12}/></span>
                        </div>
                    )}
                  </td>

                  {/* Revenue */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                        <span className="text-slate-300 font-medium">{formatRevenue(item.revenue)}</span>
                        {item.trend !== 0 && (
                            <span className={`text-[10px] flex items-center ${item.trend > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                                {item.trend > 0 ? <ArrowUpRight size={12}/> : <ArrowDownRight size={12}/>}
                                {Math.abs(item.trend)}%
                            </span>
                        )}
                    </div>
                  </td>

                  {/* Last Updated */}
                  <td className="px-6 py-4 text-xs text-slate-500">
                    {item.lastUpdated}
                  </td>

                  {/* Actions Dropdown */}
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-500 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg">
                        <MoreHorizontal size={18} />
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* --- FOOTER --- */}
        <div className="border-t border-white/5 p-4 flex justify-between items-center bg-black/40 text-xs text-slate-500">
            <div>
                Showing <span className="text-white">1</span> to <span className="text-white">{filteredData.length}</span> of <span className="text-white">{data.length}</span> entries
            </div>
            <div className="flex items-center gap-2">
                <button className="p-2 rounded bg-slate-900 border border-white/10 hover:border-white/30 disabled:opacity-50 transition-colors">
                    <ChevronLeft size={14} />
                </button>
                <button className="px-3 py-2 rounded bg-cyan-600 text-black font-bold shadow-[0_0_10px_rgba(8,145,178,0.3)]">1</button>
                <button className="px-3 py-2 rounded bg-slate-900 border border-white/10 hover:bg-white/5 hover:text-white transition-colors">2</button>
                <button className="px-3 py-2 rounded bg-slate-900 border border-white/10 hover:bg-white/5 hover:text-white transition-colors">3</button>
                <span className="px-2">...</span>
                <button className="p-2 rounded bg-slate-900 border border-white/10 hover:border-white/30 transition-colors">
                    <ChevronRight size={14} />
                </button>
            </div>
        </div>
      </div>

    </div>
  );
}