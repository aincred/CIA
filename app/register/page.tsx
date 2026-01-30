// 'use client';

// import React, { useState, useEffect } from 'react';
// // 1. IMPORT TOAST
// import { Toaster, toast } from 'react-hot-toast';
// import { 
//   User, Phone, Mail, MapPin, BookOpen, CheckCircle,
//   Users, ShieldCheck, Terminal, Activity,
//   Download, Trash2, LogOut, Search, Calendar, Layers,
//   Cpu, Lock 
// } from 'lucide-react';

// // --- TYPES ---
// interface FormDataType {
//   id: string;
//   fullName: string;
//   gender: string;
//   dob: string;
//   guardianType: string;
//   guardianName: string;
//   studentContact: string;
//   whatsappContact: string;
//   email: string;
//   permAddress: string;
//   tempAddress: string;
//   college: string;
//   passoutYear: string;
//   semester: string;
//   marks: string;
//   bloodGroup: string;
//   selectedCourse: string;
//   paymentMethod: string;
//   paymentDate: string;
//   receiptNo: string;
//   status: 'Verified' | 'Pending';
//   registrationDate: string;
// }

// // --- CONSTANTS ---
// const LOGO_URL = "/ChatGPT Image Jan 17, 2026, 04_21_47 PM.png"; 

// // --- COMPONENTS ---

// const WaveBackground = () => {
//   const waveSvg = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 88.7'%3E%3Cpath d='M800 56.9c-155.5 0-204.9-50-405.5-49.9-200 0-250 49.9-394.5 49.9v31.8h800v-.2-31.6z' fill='%23ffffff'/%3E%3C/svg%3E`;

//   return (
//     <>
//       <style dangerouslySetInnerHTML={{ __html: `
//         @keyframes move_wave {
//           0% { transform: translateX(0) translateZ(0) scaleY(1); }
//           50% { transform: translateX(-25%) translateZ(0) scaleY(0.55); }
//           100% { transform: translateX(-50%) translateZ(0) scaleY(1); }
//         }
//         .waveWrapper {
//           overflow: hidden;
//           position: fixed;
//           left: 0; right: 0; bottom: 0; top: 0; margin: auto;
//           z-index: -10;
//           background: linear-gradient(to top, #083344 20%, #020617 80%);
//         }
//         .waveWrapperInner {
//           position: absolute; width: 100%; overflow: hidden; height: 100%; bottom: -1px;
//         }
//         .bgTop { z-index: 15; opacity: 0.5; }
//         .bgMiddle { z-index: 10; opacity: 0.75; }
//         .bgBottom { z-index: 5; }
//         .wave {
//           position: absolute; left: 0; width: 200%; height: 100%;
//           background-repeat: repeat no-repeat; background-position: 0 bottom; transform-origin: center bottom;
//         }
//         .waveTop { background-size: 50% 100px; }
//         .waveAnimation .waveTop { animation: move_wave 3s; animation-delay: 1s; }
//         .waveMiddle { background-size: 50% 120px; }
//         .waveAnimation .waveMiddle { animation: move_wave 10s linear infinite; }
//         .waveBottom { background-size: 50% 100px; }
//         .waveAnimation .waveBottom { animation: move_wave 15s linear infinite; }
//       `}} />
//       <div className="waveWrapper waveAnimation">
//         <div className="waveWrapperInner bgTop">
//           <div className="wave waveTop" style={{ backgroundImage: `url("${waveSvg}")`, opacity: 0.1 }}></div>
//         </div>
//         <div className="waveWrapperInner bgMiddle">
//           <div className="wave waveMiddle" style={{ backgroundImage: `url("${waveSvg}")`, opacity: 0.15 }}></div>
//         </div>
//         <div className="waveWrapperInner bgBottom">
//           <div className="wave waveBottom" style={{ backgroundImage: `url("${waveSvg}")`, opacity: 0.05 }}></div>
//         </div>
//         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 pointer-events-none" />
//       </div>
//     </>
//   );
// };

// const AdminDashboard = ({ 
//   students, 
//   onBack, 
//   onToggleStatus, 
//   onDelete 
// }: { 
//   students: FormDataType[], 
//   onBack: () => void, 
//   onToggleStatus: (id: string) => void,
//   onDelete: (id: string) => void
// }) => {
//   const [searchTerm, setSearchTerm] = useState('');

//   const filteredStudents = students.filter(s => 
//     s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     s.receiptNo.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const total = students.length;
//   const verified = students.filter(s => s.status === 'Verified').length;
//   const pending = total - verified;

//   const handleExportCSV = () => {
//     const headers = ["ID", "Name", "Email", "Contact", "Course", "Status", "Date"];
//     const rows = students.map(s => [s.receiptNo, s.fullName, s.email, s.studentContact, s.selectedCourse, s.status, s.registrationDate]);
//     const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement("a");
//     link.setAttribute("href", encodedUri);
//     link.setAttribute("download", "academy_students.csv");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const StatCard = ({ title, value, icon: Icon, color }: any) => (
//     <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-xl backdrop-blur-md">
//       <div className="flex justify-between items-start">
//         <div>
//           <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">{title}</p>
//           <h3 className="text-2xl font-bold text-white font-mono">{value}</h3>
//         </div>
//         <div className={`p-2 rounded-lg bg-${color}-500/10 border border-${color}-500/20`}>
//           <Icon className={`text-${color}-500 w-5 h-5`} />
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-[#020617] text-slate-200 p-4 md:p-8 font-sans">
//       <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(8,51,68,0.15),transparent)] pointer-events-none" />
//       <div className="max-w-7xl mx-auto relative z-10">
//         <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
//           <div>
//             <h1 className="text-2xl font-bold text-white flex items-center gap-3">
//               <ShieldCheck className="text-cyan-500" />
//               Command Center <span className="text-slate-500 font-mono text-sm font-normal">/admin/v1</span>
//             </h1>
//             <p className="text-slate-500 text-sm mt-1">Student enrollment and security clearance management.</p>
//           </div>
//           <div className="flex gap-3">
//              <button onClick={onBack} className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 border border-slate-700">
//                <LogOut size={16} /> Logout
//             </button>
//             <button onClick={handleExportCSV} className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 shadow-lg shadow-cyan-900/20">
//               <Download size={16} /> Export CSV
//             </button>
//           </div>
//         </header>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//           <StatCard title="Total Cadets" value={total} icon={Users} color="cyan" />
//           <StatCard title="Active Protocols" value={verified} icon={Terminal} color="emerald" />
//           <StatCard title="Pending Clearance" value={pending} icon={Activity} color="amber" />
//           <StatCard title="System Load" value="Normal" icon={Cpu} color="blue" />
//         </div>

//         <div className="bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden backdrop-blur-sm">
//           <div className="p-4 border-b border-slate-800 flex flex-col md:flex-row gap-4 justify-between bg-black/20">
//             <div className="relative flex-1 max-w-md">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
//               <input 
//                 type="text" 
//                 placeholder="Search by name, email..." 
//                 className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-cyan-500"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="w-full text-left border-collapse">
//               <thead>
//                 <tr className="bg-slate-950/50 text-slate-500 uppercase text-[10px] font-bold tracking-widest border-b border-slate-800">
//                   <th className="px-6 py-4">Student Identity</th>
//                   <th className="px-6 py-4">Assigned Module</th>
//                   <th className="px-6 py-4">Date</th>
//                   <th className="px-6 py-4">Status</th>
//                   <th className="px-6 py-4 text-right">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-slate-800/50">
//                 {filteredStudents.length > 0 ? (
//                   filteredStudents.map((student) => (
//                     <tr key={student.id} className="hover:bg-cyan-500/2 transition-colors group"> {/* FIXED OPACITY CLASS */}
//                       <td className="px-6 py-4">
//                         <div className="flex items-center gap-3">
//                           <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 text-cyan-500 font-bold text-xs">
//                             {student.fullName.charAt(0)}
//                           </div>
//                           <div>
//                             <p className="text-sm font-bold text-white">{student.fullName}</p>
//                             <p className="text-xs text-slate-500 font-mono">{student.email}</p>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4">
//                         <span className="text-sm text-slate-300">{student.selectedCourse}</span>
//                       </td>
//                       <td className="px-6 py-4 font-mono text-xs text-slate-400">
//                         {student.registrationDate}
//                       </td>
//                       <td className="px-6 py-4">
//                         <button 
//                           onClick={() => onToggleStatus(student.id)}
//                           className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider cursor-pointer hover:opacity-80 ${
//                             student.status === 'Verified' 
//                               ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' 
//                               : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
//                           }`}
//                         >
//                           {student.status === 'Verified' ? <CheckCircle size={10} /> : <Activity size={10} />}
//                           {student.status}
//                         </button>
//                       </td>
//                       <td className="px-6 py-4 text-right">
//                         <div className="flex justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
//                           <button 
//                              onClick={() => onDelete(student.id)}
//                              title="Delete Record" 
//                              className="p-1.5 hover:bg-red-900/30 rounded-md text-slate-400 hover:text-red-400 transition-colors"
//                           >
//                             <Trash2 size={16} />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan={5} className="text-center py-8 text-slate-500">No records found.</td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };


// /**
//  * COMPONENT: Main Application Container
//  */
// export default function CyberApp() {
//   // --- STATE ---
//   const [view, setView] = useState<'form' | 'admin'>('form');
//   const [students, setStudents] = useState<FormDataType[]>([]);
  
//   // Form State
//   const [formData, setFormData] = useState<FormDataType>({
//     id: '', fullName: '', gender: '', dob: '', guardianType: 'Father', guardianName: '',
//     studentContact: '', whatsappContact: '', email: '', permAddress: '', tempAddress: '',
//     college: '', passoutYear: '', semester: '', marks: '', bloodGroup: '',
//     selectedCourse: '', paymentMethod: 'Cash', paymentDate: '', receiptNo: '',
//     status: 'Pending', registrationDate: ''
//   });

//   const [submitted, setSubmitted] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   // --- EFFECTS ---
//   useEffect(() => {
//     const saved = localStorage.getItem('cyber_students');
//     if (saved) setStudents(JSON.parse(saved));

//     const handleScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('cyber_students', JSON.stringify(students));
//   }, [students]);

//   // --- HANDLERS ---
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setSubmitted(true);

//     // Simulate Network Delay and Registration
//     setTimeout(() => {
//         const newStudent: FormDataType = {
//             ...formData,
//             id: Date.now().toString(),
//             receiptNo: `CIA-${Math.floor(1000 + Math.random() * 9000)}`,
//             paymentDate: new Date().toLocaleDateString('en-GB'),
//             registrationDate: new Date().toISOString().split('T')[0],
//             status: 'Pending'
//         };

//         setStudents(prev => [newStudent, ...prev]);
//         setSubmitted(false);
        
//         // 2. TRIGGER THE "POP ON TOASTER" (Toast Notification)
//         toast.success(
//           "ACCESS GRANTED: Registration data encrypted and stored successfully.", 
//           {
//              icon: '🔐',
//              style: {
//                borderRadius: '10px',
//                background: '#0f172a', // Slate 900
//                color: '#fff',
//                border: '1px solid #06b6d4' // Cyan 500
//              },
//           }
//         );
        
//         // Reset Form
//         setFormData({
//             id: '', fullName: '', gender: '', dob: '', guardianType: 'Father', guardianName: '',
//             studentContact: '', whatsappContact: '', email: '', permAddress: '', tempAddress: '',
//             college: '', passoutYear: '', semester: '', marks: '', bloodGroup: '',
//             selectedCourse: '', paymentMethod: 'Cash', paymentDate: '', receiptNo: '',
//             status: 'Pending', registrationDate: ''
//         });
        
//         // Stay on form view
//         setView('form');
//     }, 1500);
//   };

//   const toggleStudentStatus = (id: string) => {
//     setStudents(prev => prev.map(s => 
//       s.id === id ? { ...s, status: s.status === 'Verified' ? 'Pending' : 'Verified' } : s
//     ));
//   };

//   const deleteStudent = (id: string) => {
//     if(confirm("Are you sure you want to delete this record?")) {
//         setStudents(prev => prev.filter(s => s.id !== id));
//     }
//   };

//   // --- RENDER HELPERS ---
//   const inputClass = "w-full bg-slate-950/50 border border-slate-800 rounded p-3 text-white placeholder-slate-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 outline-none transition-all";
//   const labelClass = "block text-xs font-bold text-cyan-500 uppercase tracking-wider mb-2";

//   // --- VIEW ROUTING ---
//   if (view === 'admin') {
//     return (
//         <AdminDashboard 
//             students={students} 
//             onBack={() => setView('form')} 
//             onToggleStatus={toggleStudentStatus}
//             onDelete={deleteStudent}
//         />
//     );
//   }

//   // --- DEFAULT VIEW: REGISTRATION FORM ---
//   return (
//     <div className="min-h-screen bg-transparent text-slate-200 font-sans selection:bg-cyan-900/50 selection:text-white overflow-x-hidden">
//       {/* 3. PLACE THE TOASTER COMPONENT */}
//       <Toaster position="top-center" reverseOrder={false} />
      
//       <WaveBackground />

//       {/* NAVBAR */}
//       <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
//         <div className="container mx-auto px-6 flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center shadow-lg shadow-cyan-600/20 border border-white/10 overflow-hidden cursor-pointer" onClick={() => setView('admin')}>
//                <img src={LOGO_URL} alt="Academy Logo" className="w-full h-full object-contain" />
//             </div>
            
//             <div className="leading-tight">
//               <h1 className="text-xl font-bold text-white tracking-tight">CYBER</h1>
//               <span className="text-[10px] text-cyan-500 font-bold uppercase tracking-widest">Intelligence Academy</span>
//             </div>
//           </div>
//           <div className="flex items-center gap-4">
//              <button 
//                 onClick={() => setView('admin')}
//                 className="hidden md:flex text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-cyan-400 transition-colors border border-slate-800 px-3 py-1 rounded bg-black/50"
//              >
//                 <ShieldCheck size={14} className="mr-2"/> Admin Access
//              </button>
//              <div className="text-xs font-mono text-cyan-400 hidden sm:block">
//                  SECURE_CONNECTION: <span className="text-emerald-500">ENCRYPTED</span>
//              </div>
//           </div>
//         </div>
//       </nav>

//       <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-5xl mx-auto relative z-10">
          
//           <div className="text-center mb-12">
//              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-950/30 border border-cyan-500/20 text-cyan-300 text-xs font-semibold mb-6 animate-pulse">
//                 <span className="relative flex h-2 w-2">
//                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
//                   <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
//                 </span>
//                 New Batch Enrollment Open
//              </div>
//             <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
//               Student <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-blue-500 to-white">Registration Protocol</span>
//             </h1>
//             <p className="text-slate-400 max-w-2xl mx-auto">
//               Complete the secure intake form below to begin your journey into offensive and defensive cybersecurity operations.
//             </p>
//           </div>

//           <div className="relative rounded-2xl bg-slate-900/60 backdrop-blur-md border border-cyan-500/20 shadow-2xl shadow-cyan-900/10 overflow-hidden">
//             <div className="h-1 w-full bg-linear-to-r from-cyan-600 via-blue-800 to-black"></div>
            
//             <div className="bg-black/40 border-b border-white/5 px-6 py-4 flex items-center justify-between">
//               <h2 className="text-white font-bold flex items-center gap-3">
//                 <Terminal className="text-cyan-500 w-5 h-5" />
//                 <span className="tracking-wide">/root/user_registration.sh</span>
//               </h2>
//               <div className="flex gap-2">
//                   <div className="w-3 h-3 rounded-full bg-cyan-500/20 border border-cyan-500/50"></div>
//                   <div className="w-3 h-3 rounded-full bg-slate-700/50"></div>
//               </div>
//             </div>

//             <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-10">
              
//               <section className="relative">
//                 <div className="absolute left-0 top-0 h-full w-px bg-linear-to-b from-cyan-600/50 to-transparent -ml-2"></div>
//                 <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-3">
//                   <User className="text-cyan-500 w-5 h-5" /> 
//                   <span className="border-b border-cyan-500/30 pb-1">01. Identity Verification</span>
//                 </h3>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="group">
//                     <label htmlFor="fullName" className={labelClass}>1. Full Name</label>
//                     <input type="text" name="fullName" required className={inputClass} placeholder="e.g. Neo Anderson" value={formData.fullName} onChange={handleChange} />
//                   </div>
//                   <div>
//                     <label htmlFor="gender" className={labelClass}>2. Gender</label>
//                     <select name="gender" required className={inputClass} value={formData.gender} onChange={handleChange}>
//                       <option value="" className="bg-slate-900">Select Gender</option>
//                       <option value="Male" className="bg-slate-900">Male</option>
//                       <option value="Female" className="bg-slate-900">Female</option>
//                       <option value="Other" className="bg-slate-900">Other</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label htmlFor="dob" className={labelClass}>3. Date of Birth</label>
//                     <div className="relative">
//                       <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 z-20">
//                           <Calendar className="h-4 w-4 text-slate-500" />
//                       </div>
//                       <input type="date" name="dob" required className={`${inputClass} pl-10`} value={formData.dob} onChange={handleChange} />
//                     </div>
//                   </div>
//                    <div>
//                     <label htmlFor="bloodGroup" className={labelClass}>12. Blood Group</label>
//                     <select name="bloodGroup" className={inputClass} value={formData.bloodGroup} onChange={handleChange}>
//                       <option value="" className="bg-slate-900">Select Type</option>
//                       <option value="A+" className="bg-slate-900">A+</option>
//                       <option value="A-" className="bg-slate-900">A-</option>
//                       <option value="B+" className="bg-slate-900">B+</option>
//                       <option value="B-" className="bg-slate-900">B-</option>
//                       <option value="O+" className="bg-slate-900">O+</option>
//                       <option value="O-" className="bg-slate-900">O-</option>
//                       <option value="AB+" className="bg-slate-900">AB+</option>
//                     </select>
//                   </div>
//                 </div>
//               </section>

//               <section className="relative">
//                 <div className="absolute left-0 top-0 h-full w-px bg-linear-to-b from-cyan-600/50 to-transparent -ml-2"></div>
//                 <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-3">
//                   <Phone className="text-cyan-500 w-5 h-5" /> 
//                   <span className="border-b border-cyan-500/30 pb-1">02. Communication Protocols</span>
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label htmlFor="studentContact" className={labelClass}>5. Primary Uplink (Mobile)</label>
//                     <input type="tel" name="studentContact" required className={inputClass} placeholder="+91 XXXXX XXXXX" value={formData.studentContact} onChange={handleChange} />
//                   </div>
//                   <div>
//                     <label htmlFor="whatsappContact" className={labelClass}>8. Secure Msg (WhatsApp)</label>
//                     <input type="tel" name="whatsappContact" className={inputClass} placeholder="+91 XXXXX XXXXX" value={formData.whatsappContact} onChange={handleChange} />
//                   </div>
//                   <div className="md:col-span-2">
//                     <label htmlFor="email" className={labelClass}>8. Digital Mail ID (Gmail)</label>
//                     <div className="relative">
//                       <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
//                         <Mail className="h-4 w-4 text-slate-500" />
//                       </div>
//                       <input type="email" name="email" required className={`${inputClass} pl-10`} placeholder="identity@gmail.com" value={formData.email} onChange={handleChange} />
//                     </div>
//                   </div>
//                   <div className="md:col-span-2">
//                     <label htmlFor="permAddress" className={labelClass}>9. Base Location (Permanent)</label>
//                     <div className="relative">
//                         <div className="pointer-events-none absolute top-3 left-3">
//                         <MapPin className="h-4 w-4 text-slate-500" />
//                       </div>
//                       <textarea name="permAddress" rows={2} required className={`${inputClass} pl-9 resize-none`} placeholder="Sector / Block / City / State" value={formData.permAddress} onChange={handleChange} />
//                     </div>
//                   </div>
//                 </div>
//               </section>

//               <section className="relative">
//                 <div className="absolute left-0 top-0 h-full w-px bg-linear-to-b from-cyan-600/50 to-transparent -ml-2"></div>
//                   <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-3">
//                   <Users className="text-cyan-500 w-5 h-5" /> 
//                   <span className="border-b border-cyan-500/30 pb-1">03. Next of Kin / Guardian</span>
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                   <div>
//                       <label htmlFor="guardianType" className={labelClass}>4. Relation</label>
//                       <select name="guardianType" className={inputClass} value={formData.guardianType} onChange={handleChange}>
//                           <option value="Father" className="bg-slate-900">Father</option>
//                           <option value="Mother" className="bg-slate-900">Mother</option>
//                           <option value="Guardian" className="bg-slate-900">Local Guardian</option>
//                       </select>
//                   </div>
//                   <div className="md:col-span-2">
//                     <label htmlFor="guardianName" className={labelClass}>Guardian Name</label>
//                     <input type="text" name="guardianName" required className={inputClass} placeholder="Enter Name" value={formData.guardianName} onChange={handleChange} />
//                   </div>
//                 </div>
//               </section>

//               <section className="relative">
//                 <div className="absolute left-0 top-0 h-full w-px bg-linear-to-b from-cyan-600/50 to-transparent -ml-2"></div>
//                 <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-3">
//                   <BookOpen className="text-cyan-500 w-5 h-5" /> 
//                   <span className="border-b border-cyan-500/30 pb-1">04. Educational Background</span>
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="md:col-span-2">
//                     <label htmlFor="college" className={labelClass}>6. Institution / Qualification</label>
//                     <input type="text" name="college" className={inputClass} placeholder="University or College Name" value={formData.college} onChange={handleChange} />
//                   </div>
//                   <div>
//                     <label htmlFor="passoutYear" className={labelClass}>Completion Year</label>
//                     <input type="number" name="passoutYear" min="2000" max="2030" className={inputClass} placeholder="YYYY" value={formData.passoutYear} onChange={handleChange} />
//                   </div>
//                   <div>
//                     <label htmlFor="semester" className={labelClass}>7. Current Semester</label>
//                     <input type="text" name="semester" className={inputClass} placeholder="e.g. 4th Sem" value={formData.semester} onChange={handleChange} />
//                   </div>
//                 </div>
//               </section>

//               <section className="relative">
//                 <div className="absolute left-0 top-0 h-full w-px bg-linear-to-b from-cyan-600/50 to-transparent -ml-2"></div>
//                 <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-3">
//                   <Layers className="text-cyan-500 w-5 h-5" /> 
//                   <span className="border-b border-cyan-500/30 pb-1">05. Program Selection</span>
//                 </h3>
//                 <div className="grid grid-cols-1 gap-6">
//                   <div>
//                     <label htmlFor="selectedCourse" className={labelClass}>13. Select Training Module</label>
//                     <select name="selectedCourse" required className={inputClass} value={formData.selectedCourse} onChange={handleChange}>
//                       <option value="" className="bg-slate-900">Select a Course...</option>
//                       <option value="Cybersecurity Fundamentals" className="bg-slate-900">Cybersecurity Fundamentals (Beginner)</option>
//                       <option value="VAPT / Ethical Hacking" className="bg-slate-900">VAPT / Ethical Hacking (Advanced)</option>
//                       <option value="IS Audit & Compliance" className="bg-slate-900">IS Audit & Compliance (Intermediate)</option>
//                       <option value="Workshops & Awareness" className="bg-slate-900">Workshops & Awareness (All Levels)</option>
//                     </select>
//                   </div>
//                 </div>
//               </section>

//               <div className="pt-4 border-t border-white/10">
//                 <button
//                   type="submit"
//                   disabled={submitted}
//                   className="group w-full flex justify-center py-4 px-4 border border-transparent rounded-lg shadow-lg shadow-cyan-500/20 text-sm font-bold uppercase tracking-widest text-white bg-linear-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-cyan-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {submitted ? (
//                       <span className="flex items-center gap-2">
//                           <CheckCircle className="w-5 h-5 animate-spin" /> ENCRYPTING & SENDING...
//                       </span>
//                   ) : (
//                       <span className="flex items-center gap-2">
//                           INITIATE REGISTRATION <Terminal className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                       </span>
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>
          
//           <p className="text-center text-slate-500 text-xs font-mono mt-8 mb-4">
//               &copy; 2026 CYBER INTELLIGENCE ACADEMY. SECURE SYSTEMS.
//           </p>
//            <div className="text-center">
//              <button onClick={() => setView('admin')} className="text-[10px] text-slate-800 hover:text-cyan-600 font-mono">
//                 [ ADMIN_GATEWAY ]
//              </button>
//            </div>
//         </div>
//       </div>
//     </div>
//   );
// }


'use client';

import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { 
  User, Phone, Mail, MapPin, BookOpen, CheckCircle,
  Users, ShieldCheck, Terminal, Calendar, Layers
} from 'lucide-react';

// --- IMPORT SERVER ACTIONS ---
// We only need addStudent for the public form. 
// Other actions (get/delete) are removed for security.
import { addStudent } from '@/actions'; 

// --- COMPONENTS ---

const WaveBackground = () => {
  const waveSvg = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 88.7'%3E%3Cpath d='M800 56.9c-155.5 0-204.9-50-405.5-49.9-200 0-250 49.9-394.5 49.9v31.8h800v-.2-31.6z' fill='%23ffffff'/%3E%3C/svg%3E`;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes move_wave { 0% { transform: translateX(0) translateZ(0) scaleY(1); } 50% { transform: translateX(-25%) translateZ(0) scaleY(0.55); } 100% { transform: translateX(-50%) translateZ(0) scaleY(1); } }
        .waveWrapper { overflow: hidden; position: fixed; left: 0; right: 0; bottom: 0; top: 0; margin: auto; z-index: -10; background: linear-gradient(to top, #083344 20%, #020617 80%); }
        .waveWrapperInner { position: absolute; width: 100%; overflow: hidden; height: 100%; bottom: -1px; }
        .bgTop { z-index: 15; opacity: 0.5; } .bgMiddle { z-index: 10; opacity: 0.75; } .bgBottom { z-index: 5; }
        .wave { position: absolute; left: 0; width: 200%; height: 100%; background-repeat: repeat no-repeat; background-position: 0 bottom; transform-origin: center bottom; }
        .waveTop { background-size: 50% 100px; } .waveAnimation .waveTop { animation: move_wave 3s; animation-delay: 1s; }
        .waveMiddle { background-size: 50% 120px; } .waveAnimation .waveMiddle { animation: move_wave 10s linear infinite; }
        .waveBottom { background-size: 50% 100px; } .waveAnimation .waveBottom { animation: move_wave 15s linear infinite; }
      `}} />
      <div className="waveWrapper waveAnimation">
        <div className="waveWrapperInner bgTop"><div className="wave waveTop" style={{ backgroundImage: `url("${waveSvg}")`, opacity: 0.1 }}></div></div>
        <div className="waveWrapperInner bgMiddle"><div className="wave waveMiddle" style={{ backgroundImage: `url("${waveSvg}")`, opacity: 0.15 }}></div></div>
        <div className="waveWrapperInner bgBottom"><div className="wave waveBottom" style={{ backgroundImage: `url("${waveSvg}")`, opacity: 0.05 }}></div></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 pointer-events-none" />
      </div>
    </>
  );
};

// --- CONSTANTS ---
const LOGO_URL = "/ChatGPT Image Jan 17, 2026, 04_21_47 PM.png"; 

/**
 * COMPONENT: Main Application Container
 */
export default function CyberApp() {
  // --- STATE ---
  // Form State
  const [formData, setFormData] = useState<any>({
    fullName: '', gender: '', dob: '', guardianType: 'Father', guardianName: '',
    studentContact: '', whatsappContact: '', email: '', permAddress: '', tempAddress: '',
    college: '', passoutYear: '', semester: '', marks: '', bloodGroup: '',
    selectedCourse: '', paymentMethod: 'Cash', paymentDate: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // --- EFFECTS ---
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- HANDLERS ---
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);

    try {
        // CALL SERVER ACTION
        const result = await addStudent(formData);
        
        if (result.success) {
            toast.success(
              "ACCESS GRANTED: Registration data encrypted and stored in Neon DB.", 
              {
                 icon: '🔐',
                 style: {
                   borderRadius: '10px',
                   background: '#0f172a',
                   color: '#fff',
                   border: '1px solid #06b6d4'
                 },
              }
            );
            
            // Reset Form
            setFormData({
               fullName: '', gender: '', dob: '', guardianType: 'Father', guardianName: '',
               studentContact: '', whatsappContact: '', email: '', permAddress: '', tempAddress: '',
               college: '', passoutYear: '', semester: '', marks: '', bloodGroup: '',
               selectedCourse: '', paymentMethod: 'Cash', paymentDate: ''
            });
            
        } else {
            toast.error("Database connection refused.");
        }

    } catch (error) {
        toast.error("Critical System Failure");
    } finally {
        setSubmitted(false);
    }
  };

  // --- RENDER HELPERS ---
  const inputClass = "w-full bg-slate-950/50 border border-slate-800 rounded p-3 text-white placeholder-slate-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 outline-none transition-all";
  const labelClass = "block text-xs font-bold text-cyan-500 uppercase tracking-wider mb-2";

  // --- VIEW: REGISTRATION FORM ---
  return (
    <div className="min-h-screen bg-transparent text-slate-200 font-sans selection:bg-cyan-900/50 selection:text-white overflow-x-hidden">
      <Toaster position="top-center" reverseOrder={false} />
      
      <WaveBackground />

      {/* NAVBAR */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center shadow-lg shadow-cyan-600/20 border border-white/10 overflow-hidden cursor-pointer">
               <img src={LOGO_URL} alt="Academy Logo" className="w-full h-full object-contain" />
            </div>
            
            <div className="leading-tight">
              <h1 className="text-xl font-bold text-white tracking-tight">CYBER</h1>
              <span className="text-[10px] text-cyan-500 font-bold uppercase tracking-widest">Intelligence Academy</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
             {/* Admin Button Removed */}
             <div className="text-xs font-mono text-cyan-400 hidden sm:block">
                 NEON_DB: <span className="text-emerald-500">CONNECTED</span>
             </div>
          </div>
        </div>
      </nav>

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto relative z-10">
          
          <div className="text-center mb-12">
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-950/30 border border-cyan-500/20 text-cyan-300 text-xs font-semibold mb-6 animate-pulse">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                New Batch Enrollment Open
             </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Student <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-blue-500 to-white">Registration Protocol</span>
            </h1>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Complete the secure intake form below to begin your journey into offensive and defensive cybersecurity operations.
            </p>
          </div>

          <div className="relative rounded-2xl bg-slate-900/60 backdrop-blur-md border border-cyan-500/20 shadow-2xl shadow-cyan-900/10 overflow-hidden">
            <div className="h-1 w-full bg-linear-to-r from-cyan-600 via-blue-800 to-black"></div>
            
            <div className="bg-black/40 border-b border-white/5 px-6 py-4 flex items-center justify-between">
              <h2 className="text-white font-bold flex items-center gap-3">
                <Terminal className="text-cyan-500 w-5 h-5" />
                <span className="tracking-wide">/root/user_registration.sh</span>
              </h2>
              <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-cyan-500/20 border border-cyan-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-700/50"></div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-10">
              
              <section className="relative">
                <div className="absolute left-0 top-0 h-full w-px bg-linear-to-b from-cyan-600/50 to-transparent -ml-2"></div>
                <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-3">
                  <User className="text-cyan-500 w-5 h-5" /> 
                  <span className="border-b border-cyan-500/30 pb-1">01. Identity Verification</span>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label htmlFor="fullName" className={labelClass}>1. Full Name</label>
                    <input type="text" name="fullName" required className={inputClass} placeholder="e.g. Neo Anderson" value={formData.fullName} onChange={handleChange} />
                  </div>
                  <div>
                    <label htmlFor="gender" className={labelClass}>2. Gender</label>
                    <select name="gender" required className={inputClass} value={formData.gender} onChange={handleChange}>
                      <option value="" className="bg-slate-900">Select Gender</option>
                      <option value="Male" className="bg-slate-900">Male</option>
                      <option value="Female" className="bg-slate-900">Female</option>
                      <option value="Other" className="bg-slate-900">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="dob" className={labelClass}>3. Date of Birth</label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 z-20">
                          <Calendar className="h-4 w-4 text-slate-500" />
                      </div>
                      <input type="date" name="dob" required className={`${inputClass} pl-10`} value={formData.dob} onChange={handleChange} />
                    </div>
                  </div>
                   <div>
                    <label htmlFor="bloodGroup" className={labelClass}>12. Blood Group</label>
                    <select name="bloodGroup" className={inputClass} value={formData.bloodGroup} onChange={handleChange}>
                      <option value="" className="bg-slate-900">Select Type</option>
                      <option value="A+" className="bg-slate-900">A+</option>
                      <option value="A-" className="bg-slate-900">A-</option>
                      <option value="B+" className="bg-slate-900">B+</option>
                      <option value="B-" className="bg-slate-900">B-</option>
                      <option value="O+" className="bg-slate-900">O+</option>
                      <option value="O-" className="bg-slate-900">O-</option>
                      <option value="AB+" className="bg-slate-900">AB+</option>
                    </select>
                  </div>
                </div>
              </section>

              <section className="relative">
                <div className="absolute left-0 top-0 h-full w-px bg-linear-to-b from-cyan-600/50 to-transparent -ml-2"></div>
                <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-3">
                  <Phone className="text-cyan-500 w-5 h-5" /> 
                  <span className="border-b border-cyan-500/30 pb-1">02. Communication Protocols</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="studentContact" className={labelClass}>5. Primary Uplink (Mobile)</label>
                    <input type="tel" name="studentContact" required className={inputClass} placeholder="+91 XXXXX XXXXX" value={formData.studentContact} onChange={handleChange} />
                  </div>
                  <div>
                    <label htmlFor="whatsappContact" className={labelClass}>8. Secure Msg (WhatsApp)</label>
                    <input type="tel" name="whatsappContact" className={inputClass} placeholder="+91 XXXXX XXXXX" value={formData.whatsappContact} onChange={handleChange} />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="email" className={labelClass}>8. Digital Mail ID (Gmail)</label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Mail className="h-4 w-4 text-slate-500" />
                      </div>
                      <input type="email" name="email" required className={`${inputClass} pl-10`} placeholder="identity@gmail.com" value={formData.email} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="permAddress" className={labelClass}>9. Base Location (Permanent)</label>
                    <div className="relative">
                        <div className="pointer-events-none absolute top-3 left-3">
                        <MapPin className="h-4 w-4 text-slate-500" />
                      </div>
                      <textarea name="permAddress" rows={2} required className={`${inputClass} pl-9 resize-none`} placeholder="Sector / Block / City / State" value={formData.permAddress} onChange={handleChange} />
                    </div>
                  </div>
                </div>
              </section>

              <section className="relative">
                <div className="absolute left-0 top-0 h-full w-px bg-linear-to-b from-cyan-600/50 to-transparent -ml-2"></div>
                  <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-3">
                  <Users className="text-cyan-500 w-5 h-5" /> 
                  <span className="border-b border-cyan-500/30 pb-1">03. Next of Kin / Guardian</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                      <label htmlFor="guardianType" className={labelClass}>4. Relation</label>
                      <select name="guardianType" className={inputClass} value={formData.guardianType} onChange={handleChange}>
                          <option value="Father" className="bg-slate-900">Father</option>
                          <option value="Mother" className="bg-slate-900">Mother</option>
                          <option value="Guardian" className="bg-slate-900">Local Guardian</option>
                      </select>
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="guardianName" className={labelClass}>Guardian Name</label>
                    <input type="text" name="guardianName" required className={inputClass} placeholder="Enter Name" value={formData.guardianName} onChange={handleChange} />
                  </div>
                </div>
              </section>

              <section className="relative">
                <div className="absolute left-0 top-0 h-full w-px bg-linear-to-b from-cyan-600/50 to-transparent -ml-2"></div>
                <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-3">
                  <BookOpen className="text-cyan-500 w-5 h-5" /> 
                  <span className="border-b border-cyan-500/30 pb-1">04. Educational Background</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label htmlFor="college" className={labelClass}>6. Institution / Qualification</label>
                    <input type="text" name="college" className={inputClass} placeholder="University or College Name" value={formData.college} onChange={handleChange} />
                  </div>
                  <div>
                    <label htmlFor="passoutYear" className={labelClass}>Completion Year</label>
                    <input type="number" name="passoutYear" min="2000" max="2030" className={inputClass} placeholder="YYYY" value={formData.passoutYear} onChange={handleChange} />
                  </div>
                  <div>
                    <label htmlFor="semester" className={labelClass}>7. Current Semester</label>
                    <input type="text" name="semester" className={inputClass} placeholder="e.g. 4th Sem" value={formData.semester} onChange={handleChange} />
                  </div>
                </div>
              </section>

              <section className="relative">
                <div className="absolute left-0 top-0 h-full w-px bg-linear-to-b from-cyan-600/50 to-transparent -ml-2"></div>
                <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-3">
                  <Layers className="text-cyan-500 w-5 h-5" /> 
                  <span className="border-b border-cyan-500/30 pb-1">05. Program Selection</span>
                </h3>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label htmlFor="selectedCourse" className={labelClass}>13. Select Training Module</label>
                    <select name="selectedCourse" required className={inputClass} value={formData.selectedCourse} onChange={handleChange}>
                      <option value="" className="bg-slate-900">Select a Course...</option>
                      <option value="Cybersecurity Fundamentals" className="bg-slate-900">Cybersecurity Fundamentals (Beginner)</option>
                      <option value="VAPT / Ethical Hacking" className="bg-slate-900">VAPT / Ethical Hacking (Advanced)</option>
                      <option value="IS Audit & Compliance" className="bg-slate-900">IS Audit & Compliance (Intermediate)</option>
                      <option value="Workshops & Awareness" className="bg-slate-900">Workshops & Awareness (All Levels)</option>
                    </select>
                  </div>
                </div>
              </section>

              <div className="pt-4 border-t border-white/10">
                <button
                  type="submit"
                  disabled={submitted}
                  className="group w-full flex justify-center py-4 px-4 border border-transparent rounded-lg shadow-lg shadow-cyan-500/20 text-sm font-bold uppercase tracking-widest text-white bg-linear-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-cyan-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitted ? (
                      <span className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 animate-spin" /> ENCRYPTING & SENDING...
                      </span>
                  ) : (
                      <span className="flex items-center gap-2">
                          INITIATE REGISTRATION <Terminal className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                  )}
                </button>
              </div>
            </form>
          </div>
          
          <p className="text-center text-slate-500 text-xs font-mono mt-8 mb-4">
              &copy; 2026 CYBER INTELLIGENCE ACADEMY. SECURE SYSTEMS.
          </p>
           {/* Admin Footer Link Removed */}
        </div>
      </div>
    </div>
  );
}