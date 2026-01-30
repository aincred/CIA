// 'use client';

// import React, { useState } from 'react';
// import { 
//   ShieldAlert, 
//   Lock, 
//   User, 
//   ChevronRight, 
//   Terminal,
//   Eye,
//   EyeOff,
//   AlertCircle
// } from 'lucide-react';

// const LOGO_URL = "/ChatGPT Image Jan 17, 2026, 04_21_47 PM.png";

// export default function AdminLogin() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');

//     // SIMULATION: Replace this with your actual API call
//     setTimeout(() => {
//       if (email === "admin@ciacademy.in" && password === "admin123") {
//         window.location.href = "/admin/dashboard"; // Redirect on success
//       } else {
//         setError("AUTHENTICATION_FAILED: Invalid credentials or unauthorized uplink.");
//         setIsLoading(false);
//       }
//     }, 2000);
//   };

//   return (
//     <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 font-sans relative overflow-hidden">
//       {/* Background Cyber-Grid Effect */}
//       <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>
      
//       <div className="w-full max-w-md relative z-10">
//         {/* Top Warning Banner */}
//         <div className="flex items-center gap-2 mb-8 bg-red-500/10 border border-red-500/20 p-3 rounded-lg animate-pulse">
//           <ShieldAlert className="text-red-500 w-5 h-5" />
//           <span className="text-[10px] md:text-xs font-mono text-red-400 uppercase tracking-widest font-bold">
//             Restricted Access: Authorized Personnel Only
//           </span>
//         </div>

//         <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
//           {/* Header */}
//           <div className="p-8 pb-4 text-center">
//             <div className="w-20 h-20 bg-black rounded-2xl mx-auto mb-4 flex items-center justify-center border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
//               <img src={LOGO_URL} alt="CIA Logo" className="w-16 h-16 object-contain" />
//             </div>
//             <h1 className="text-2xl font-bold text-white tracking-tight">Admin Terminal</h1>
//             <p className="text-slate-500 text-sm mt-1 uppercase tracking-widest font-mono">System v2.0.4</p>
//           </div>

//           <form onSubmit={handleLogin} className="p-8 pt-4 space-y-6">
//             {/* Error Message */}
//             {error && (
//               <div className="bg-red-500/20 border border-red-500/40 p-3 rounded flex items-center gap-2 text-red-400 text-xs font-mono">
//                 <AlertCircle size={14} /> {error}
//               </div>
//             )}

//             {/* Email Field */}
//             <div className="space-y-2">
//               <label className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest ml-1">Admin Uplink (Email)</label>
//               <div className="relative group">
//                 <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" size={18} />
//                 <input 
//                   type="email" 
//                   required
//                   placeholder="admin@ciacademy.in"
//                   className="w-full bg-black/40 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-600 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all font-mono text-sm"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </div>
//             </div>

//             {/* Password Field */}
//             <div className="space-y-2">
//               <div className="flex justify-between">
//                 <label className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest ml-1">Access Key</label>
//                 <button type="button" className="text-[10px] text-slate-500 hover:text-cyan-400 font-bold uppercase tracking-widest">Forgot?</button>
//               </div>
//               <div className="relative group">
//                 <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" size={18} />
//                 <input 
//                   type={showPassword ? "text" : "password"} 
//                   required
//                   placeholder="••••••••"
//                   className="w-full bg-black/40 border border-slate-800 rounded-xl py-3 pl-10 pr-12 text-white placeholder-slate-600 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all font-mono text-sm"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//                 <button 
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
//                 >
//                   {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                 </button>
//               </div>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full bg-linear-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-cyan-900/40 flex items-center justify-center gap-2 group transition-all active:scale-95 disabled:opacity-50"
//             >
//               {isLoading ? (
//                 <div className="flex items-center gap-2 font-mono text-sm">
//                   <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
//                   VALIDATING_HANDSHAKE...
//                 </div>
//               ) : (
//                 <span className="flex items-center gap-2 uppercase tracking-widest text-sm">
//                   Initialize Uplink <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
//                 </span>
//               )}
//             </button>
//           </form>

//           {/* Footer Branding */}
//           <div className="bg-black/40 p-4 border-t border-white/5 flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <Terminal size={14} className="text-cyan-500" />
//               <span className="text-[9px] font-mono text-slate-500 tracking-tighter">SECURE_PROTOCOL_TLS_1.3</span>
//             </div>
//             <span className="text-[9px] font-mono text-slate-600 tracking-tighter">IP: 192.168.1.XX</span>
//           </div>
//         </div>
        
//         <p className="text-center mt-6 text-slate-600 text-[10px] font-mono uppercase tracking-[0.2em]">
//           &copy; 2026 Cyber Intelligence Academy • Ranchi
//         </p>
//       </div>
//     </div>
//   );
// }

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Use Next.js router
import { 
  ShieldAlert, Lock, User, ChevronRight, Terminal, Eye, EyeOff, AlertCircle 
} from 'lucide-react';

const LOGO_URL = "/ChatGPT Image Jan 17, 2026, 04_21_47 PM.png";

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Handshake failed');
      }

      // Success: The secure cookie is already set by the server.
      // We just redirect.
      router.push('/admin/dashboard');
      
    } catch (err: any) {
      setError(`AUTHENTICATION_FAILED: ${err.message}`);
      setIsLoading(false);
    }
  };

  // ... (Keep your exact JSX return statement here, no changes needed to the UI) ...
  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 font-sans relative overflow-hidden">
      {/* Background Cyber-Grid Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>
      
      <div className="w-full max-w-md relative z-10">
        {/* Top Warning Banner */}
        <div className="flex items-center gap-2 mb-8 bg-red-500/10 border border-red-500/20 p-3 rounded-lg animate-pulse">
          <ShieldAlert className="text-red-500 w-5 h-5" />
          <span className="text-[10px] md:text-xs font-mono text-red-400 uppercase tracking-widest font-bold">
            Restricted Access: Authorized Personnel Only
          </span>
        </div>

        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="p-8 pb-4 text-center">
            <div className="w-20 h-20 bg-black rounded-2xl mx-auto mb-4 flex items-center justify-center border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
              <img src={LOGO_URL} alt="CIA Logo" className="w-16 h-16 object-contain" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Admin Terminal</h1>
            <p className="text-slate-500 text-sm mt-1 uppercase tracking-widest font-mono">System v2.0.4</p>
          </div>

          <form onSubmit={handleLogin} className="p-8 pt-4 space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-500/20 border border-red-500/40 p-3 rounded flex items-center gap-2 text-red-400 text-xs font-mono">
                <AlertCircle size={14} /> {error}
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest ml-1">Admin Uplink (Email)</label>
              <div className="relative group">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" size={18} />
                <input 
                  type="email" 
                  required
                  placeholder="admin@ciacademy.in"
                  className="w-full bg-black/40 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-600 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all font-mono text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest ml-1">Access Key</label>
                <button type="button" className="text-[10px] text-slate-500 hover:text-cyan-400 font-bold uppercase tracking-widest">Forgot?</button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" size={18} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  placeholder="••••••••"
                  className="w-full bg-black/40 border border-slate-800 rounded-xl py-3 pl-10 pr-12 text-white placeholder-slate-600 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all font-mono text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-linear-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-cyan-900/40 flex items-center justify-center gap-2 group transition-all active:scale-95 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center gap-2 font-mono text-sm">
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  VALIDATING_HANDSHAKE...
                </div>
              ) : (
                <span className="flex items-center gap-2 uppercase tracking-widest text-sm">
                  Initialize Uplink <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </button>
          </form>

          {/* Footer Branding */}
          <div className="bg-black/40 p-4 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal size={14} className="text-cyan-500" />
              <span className="text-[9px] font-mono text-slate-500 tracking-tighter">SECURE_PROTOCOL_TLS_1.3</span>
            </div>
            <span className="text-[9px] font-mono text-slate-600 tracking-tighter">IP: 192.168.1.XX</span>
          </div>
        </div>
        
        <p className="text-center mt-6 text-slate-600 text-[10px] font-mono uppercase tracking-[0.2em]">
          &copy; 2026 Cyber Intelligence Academy • Ranchi
        </p>
      </div>
    </div>
  );
}