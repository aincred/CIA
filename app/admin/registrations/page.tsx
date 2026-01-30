// 'use client';

// import React, { useState, useEffect } from 'react';
// import { 
//   Users, Search, Filter, MoreVertical, Eye, CheckCircle, Clock, 
//   FileText, Download, Terminal, ShieldCheck, Trash2, Activity, LogOut
// } from 'lucide-react';
// import Link from 'next/link';

// // 1. Define the Data Type
// interface FormDataType {
//   id: string;
//   fullName: string;
//   email: string;
//   selectedCourse: string;
//   studentContact: string;
//   status: 'Verified' | 'Pending';
//   registrationDate: string;
//   receiptNo: string;
// }

// export default function AdminDashboardPage() {
//   // 2. Initialize State locally
//   const [students, setStudents] = useState<FormDataType[]>([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isLoaded, setIsLoaded] = useState(false);

//   // 3. LOAD DATA FROM LOCAL STORAGE ON MOUNT
//   useEffect(() => {
//     // Only run this in the browser
//     const savedData = localStorage.getItem('cyber_students');
//     if (savedData) {
//       setStudents(JSON.parse(savedData));
//     }
//     setIsLoaded(true);
//   }, []);

//   // 4. Update Local Storage when students change (e.g., delete/update status)
//   useEffect(() => {
//     if (isLoaded) {
//       localStorage.setItem('cyber_students', JSON.stringify(students));
//     }
//   }, [students, isLoaded]);

//   // --- ACTIONS ---
//   const toggleStatus = (id: string) => {
//     setStudents(prev => prev.map(s => 
//       s.id === id ? { ...s, status: s.status === 'Verified' ? 'Pending' : 'Verified' } : s
//     ));
//   };

//   const deleteStudent = (id: string) => {
//     if(confirm("Are you sure you want to delete this record?")) {
//         setStudents(prev => prev.filter(s => s.id !== id));
//     }
//   };

//   // --- FILTER & EXPORT ---
//   // Safe filtering: defaults to empty array if students is somehow undefined
//   const filteredStudents = (students || []).filter(s => 
//     (s.fullName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
//     (s.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
//     (s.receiptNo || '').toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleExportCSV = () => {
//     const headers = ["Receipt ID", "Name", "Email", "Contact", "Course", "Status", "Date"];
//     const rows = filteredStudents.map(s => [
//         s.receiptNo, s.fullName, s.email, s.studentContact, s.selectedCourse, s.status, s.registrationDate
//     ]);
//     const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement("a");
//     link.setAttribute("href", encodedUri);
//     link.setAttribute("download", `academy_export_${new Date().toISOString().split('T')[0]}.csv`);
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const total = students.length;
//   const verified = students.filter(s => s.status === 'Verified').length;
//   const pending = total - verified;

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

//   // Prevent hydration mismatch by returning null until client loads
//   if (!isLoaded) return <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center">Loading Secure Data...</div>;

//   return (
//     <div className="min-h-screen bg-[#020617] text-slate-200 p-4 md:p-8 font-sans selection:bg-cyan-900/50">
//       <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(8,51,68,0.15),transparent)] pointer-events-none" />
//       <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />

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
//             {/* Link back to the main page */}
//             <Link href="/" className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors border border-slate-700">
//                <LogOut size={16} /> Exit
//             </Link>
//             <button onClick={handleExportCSV} className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-cyan-900/20">
//               <Download size={16} /> Export CSV
//             </button>
//           </div>
//         </header>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//           <StatCard title="Total Cadets" value={total} icon={Users} color="cyan" />
//           <StatCard title="Verified Secure" value={verified} icon={CheckCircle} color="emerald" />
//           <StatCard title="Pending Clearance" value={pending} icon={Clock} color="amber" />
//           <StatCard title="Active Protocols" value="ACTIVE" icon={Activity} color="blue" />
//         </div>

//         <div className="bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden backdrop-blur-sm">
//           <div className="p-4 border-b border-slate-800 flex flex-col md:flex-row gap-4 justify-between bg-black/20">
//             <div className="relative flex-1 max-w-md">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
//               <input 
//                 type="text" 
//                 placeholder="Search by name, email, or ID..." 
//                 className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
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
//                   <th className="px-6 py-4">Registration Date</th>
//                   <th className="px-6 py-4">Clearance Status</th>
//                   <th className="px-6 py-4 text-right">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-slate-800/50">
//                 {filteredStudents.length > 0 ? (
//                   filteredStudents.map((student) => (
//                     <tr key={student.id} className="hover:bg-cyan-500/2 transition-colors group">
//                       <td className="px-6 py-4">
//                         <div className="flex items-center gap-3">
//                           <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 text-cyan-500 font-bold text-xs">
//                             {(student.fullName || '?').charAt(0)}
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
//                           onClick={() => toggleStatus(student.id)}
//                           className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider cursor-pointer hover:opacity-80 transition-opacity ${
//                             student.status === 'Verified' 
//                               ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' 
//                               : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
//                           }`}
//                         >
//                           {student.status === 'Verified' ? <CheckCircle size={10} /> : <Clock size={10} />}
//                           {student.status}
//                         </button>
//                       </td>
//                       <td className="px-6 py-4 text-right">
//                         <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
//                           <button 
//                              onClick={() => deleteStudent(student.id)} 
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
// }

'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users, Search, CheckCircle, Clock, 
  Download, ShieldCheck, Trash2, Activity, LogOut,
  RefreshCw, FileSpreadsheet // Added FileSpreadsheet icon
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

// 1. IMPORT XLSX
import * as XLSX from 'xlsx';

// 2. IMPORT SERVER ACTIONS
import { getStudents, toggleStatus, deleteStudent } from '@/actions';

// 3. Define Data Type
interface FormDataType {
  id: string;
  fullName: string;
  email: string;
  selectedCourse: string;
  studentContact: string;
  status: 'Verified' | 'Pending';
  registrationDate: string;
  receiptNo: string;
}

export default function AdminDashboardPage() {
  const [students, setStudents] = useState<FormDataType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // LOAD DATA FROM NEON DB
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = await getStudents();
      // @ts-ignore 
      setStudents(data);
    } catch (error) {
      toast.error("Failed to fetch data from Neon DB");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- ACTIONS ---
  const handleToggleStatus = async (id: string, currentStatus: string) => {
    setStudents(prev => prev.map(s => 
      s.id === id ? { ...s, status: s.status === 'Verified' ? 'Pending' : 'Verified' } : s
    ));
    try {
      await toggleStatus(id, currentStatus);
      toast.success("Status Updated");
    } catch (error) {
      toast.error("Update failed, reverting...");
      fetchData();
    }
  };

  const handleDelete = async (id: string) => {
    if(confirm("Are you sure you want to permanently delete this record from the database?")) {
        setStudents(prev => prev.filter(s => s.id !== id));
        try {
          await deleteStudent(id);
          toast.success("Record Deleted from DB");
        } catch (error) {
          toast.error("Deletion failed");
          fetchData();
        }
    }
  };

  // --- FILTER & EXPORT ---
  const filteredStudents = (students || []).filter(s => 
    (s.fullName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (s.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (s.receiptNo || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- NEW EXCEL EXPORT FUNCTION ---
  const handleExportXLSX = () => {
    // 1. Format data for Excel
    const dataToExport = filteredStudents.map(s => ({
      "Receipt ID": s.receiptNo,
      "Full Name": s.fullName,
      "Email Address": s.email,
      "Contact Number": s.studentContact,
      "Selected Course": s.selectedCourse,
      "Current Status": s.status,
      "Registration Date": s.registrationDate
    }));

    // 2. Create a Worksheet
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);

    // 3. Create a Workbook and append the sheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

    // 4. Generate file name with date
    const fileName = `Academy_Report_${new Date().toISOString().split('T')[0]}.xlsx`;

    // 5. Download the file
    XLSX.writeFile(workbook, fileName);
  };

  const total = students.length;
  const verified = students.filter(s => s.status === 'Verified').length;
  const pending = total - verified;

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

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 p-4 md:p-8 font-sans selection:bg-cyan-900/50">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(8,51,68,0.15),transparent)] pointer-events-none" />
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <ShieldCheck className="text-cyan-500" />
              Command Center <span className="text-slate-500 font-mono text-sm font-normal">/admin/v1</span>
            </h1>
            <p className="text-slate-500 text-sm mt-1">Student enrollment and security clearance management.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/" className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors border border-slate-700">
               <LogOut size={16} /> Exit
            </Link>
            
            {/* EXCEL EXPORT BUTTON */}
            <button 
              onClick={handleExportXLSX} 
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-emerald-900/20"
            >
              <FileSpreadsheet size={16} /> Export Excel
            </button>
          </div>
        </header>

        {/* Loading State Overlay */}
        {isLoading && (
            <div className="mb-4 p-4 bg-cyan-900/20 border border-cyan-500/30 rounded-lg flex items-center gap-3 text-cyan-400 animate-pulse">
                <RefreshCw className="animate-spin" size={20} />
                <span className="text-sm font-mono">ESTABLISHING SECURE CONNECTION TO NEON DB...</span>
            </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard title="Total Cadets" value={total} icon={Users} color="cyan" />
          <StatCard title="Verified Secure" value={verified} icon={CheckCircle} color="emerald" />
          <StatCard title="Pending Clearance" value={pending} icon={Clock} color="amber" />
          <StatCard title="System Load" value="Normal" icon={Activity} color="blue" />
        </div>

        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden backdrop-blur-sm">
          <div className="p-4 border-b border-slate-800 flex flex-col md:flex-row gap-4 justify-between bg-black/20">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="text" 
                placeholder="Search by name, email, or ID..." 
                className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
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
                {!isLoading && filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-cyan-500/2 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 text-cyan-500 font-bold text-xs">
                            {(student.fullName || '?').charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white">{student.fullName}</p>
                            <p className="text-xs text-slate-500 font-mono">{student.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-slate-300">{student.selectedCourse}</span>
                      </td>
                      <td className="px-6 py-4 font-mono text-xs text-slate-400">
                        {student.registrationDate}
                      </td>
                      <td className="px-6 py-4">
                        <button 
                          onClick={() => handleToggleStatus(student.id, student.status)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider cursor-pointer hover:opacity-80 transition-opacity ${
                            student.status === 'Verified' 
                              ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' 
                              : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                          }`}
                        >
                          {student.status === 'Verified' ? <CheckCircle size={10} /> : <Clock size={10} />}
                          {student.status}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                             onClick={() => handleDelete(student.id)} 
                             title="Delete Record" 
                             className="p-1.5 hover:bg-red-900/30 rounded-md text-slate-400 hover:text-red-400 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-slate-500">
                        {isLoading ? "Decryption in progress..." : "No records found in database."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}