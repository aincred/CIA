'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users, Search, Filter, MoreVertical, Eye, X,
  ShieldCheck, GraduationCap, CreditCard, AlertCircle, 
  Download, Terminal, FileText, Loader2, User, Phone,
  Calendar, MapPin, CheckCircle, Smartphone
} from 'lucide-react';
import * as XLSX from 'xlsx'; // Import the library

export default function PolytechnicAdminDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);

  // 1. FETCH DATA
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/register');
        const json = await res.json();
        if (json.success) {
          setRegistrations(json.data);
        }
      } catch (error) {
        console.error("Failed to load registrations:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  // 2. EXCEL EXPORT FUNCTION
  const handleExportExcel = () => {
    // A. Prepare the data (Filter out large images and format fields)
    const dataToExport = registrations.map(reg => ({
      'Batch Code': reg.batchCode || 'PENDING',
      'Full Name': reg.fullName,
      'Parent Name': reg.parentName,
      'College Name': reg.collegeName,
      'Branch': reg.branch,
      'Semester': reg.yearSemester,
      'Student Contact': reg.studentContact,
      'Parent Contact': reg.parentContact,
      'Email': reg.email,
      'DOB': reg.dob,
      'Gender': reg.gender,
      'Aadhaar Last 4': reg.aadhaarLast4,
      'Fee Amount': reg.feeAmount,
      'Payment Mode': reg.paymentMode,
      'Transaction ID': reg.transactionId,
      'Payment Date': reg.paymentDate,
      'Installment Type': reg.installmentType,
      'Address': reg.address,
      'Registration Date': reg.declarationDate,
    }));

    // B. Create a new Worksheet
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);

    // C. Create a new Workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Registrations");

    // D. Generate Excel file and trigger download
    XLSX.writeFile(workbook, `CIA_Registrations_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  // 3. FILTER LOGIC
  const filteredData = registrations.filter((reg) => 
    (reg.fullName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (reg.collegeName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (reg.batchCode?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  // 4. STATS
  const totalStudents = registrations.length;
  const uniqueColleges = new Set(registrations.map(r => r.collegeName)).size;
  const totalRevenue = registrations.reduce((acc, curr) => acc + Number(curr.feeAmount || 0), 0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 p-4 md:p-8 font-sans">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05),transparent)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- HEADER --- */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <ShieldCheck className="text-emerald-500" />
              Academy Admin <span className="text-slate-500 font-mono text-sm font-normal">/polytechnic/v1</span>
            </h1>
            <p className="text-slate-500 text-sm mt-1">Management portal for Cybersecurity & Industrial Internship Program.</p>
          </div>
          <div className="flex gap-3">
             {/* UPDATED EXPORT BUTTON */}
             <button 
               onClick={handleExportExcel}
               className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 border border-slate-700 transition-all hover:border-emerald-500/50"
             >
               <Download size={16} className="text-emerald-500" /> Export Excel
             </button>
             
             <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 shadow-lg shadow-emerald-900/20 transition-all">
               <Terminal size={16} /> Batch Management
             </button>
          </div>
        </header>

        {/* --- STATS CARDS --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard title="Total Applicants" value={totalStudents} icon={Users} color="emerald" />
          <StatCard title="Colleges Represented" value={uniqueColleges} icon={GraduationCap} color="blue" />
          <StatCard title="Total Revenue" value={`₹${totalRevenue.toLocaleString()}`} icon={CreditCard} color="amber" />
          <StatCard title="Latest Batch" value={registrations[0]?.batchCode || "N/A"} icon={AlertCircle} color="cyan" />
        </div>

        {/* --- DATA TABLE --- */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden backdrop-blur-sm">
          <div className="p-4 border-b border-slate-800 flex flex-col md:flex-row gap-4 justify-between bg-black/20">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="text" 
                placeholder="Search students, colleges, or ID..." 
                className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950/50 text-slate-500 uppercase text-[10px] font-bold tracking-widest border-b border-slate-800">
                  <th className="px-6 py-4">Student & ID</th>
                  <th className="px-6 py-4">Polytechnic College</th>
                  <th className="px-6 py-4">Branch / Sem</th>
                  <th className="px-6 py-4">Payment</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {filteredData.length === 0 ? (
                  <tr><td colSpan={5} className="p-8 text-center text-slate-500">No records found.</td></tr>
                ) : (
                  filteredData.map((reg) => (
                    <tr key={reg.id} className="hover:bg-emerald-500/5 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center border border-slate-700 text-emerald-500 font-bold text-xs uppercase overflow-hidden">
                             {reg.photoBase64 ? (
                               <img src={reg.photoBase64} alt="Thumb" className="w-full h-full object-cover" />
                             ) : (
                               reg.fullName.substring(0, 2)
                             )}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white">{reg.fullName}</p>
                            <p className="text-[10px] text-emerald-400 font-mono tracking-tighter">
                              {reg.batchCode || 'Processing...'}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-slate-300">{reg.collegeName}</span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-xs text-slate-300 font-medium">{reg.branch}</p>
                        <p className="text-[10px] text-slate-500 uppercase">{reg.yearSemester}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1.5">
                          <span className="inline-flex items-center gap-1.5 w-fit px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                            {reg.paymentMode}
                          </span>
                          <span className="text-[9px] text-slate-500 px-1 font-mono">
                            ₹{reg.feeAmount} ({reg.installmentType})
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => setSelectedStudent(reg)}
                            title="View Details" 
                            className="p-1.5 hover:bg-slate-800 rounded-md text-slate-400 hover:text-emerald-400 transition-colors"
                          >
                            <Eye size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* --- STUDENT DETAILS MODAL --- */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
            onClick={() => setSelectedStudent(null)}
          ></div>
          
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-200">
            
            {/* Modal Header */}
            <div className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur border-b border-slate-800 px-6 py-4 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border-2 border-emerald-500 overflow-hidden bg-slate-800">
                  {selectedStudent.photoBase64 ? (
                    <img src={selectedStudent.photoBase64} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-emerald-500 font-bold text-lg">
                      {selectedStudent.fullName.substring(0, 2)}
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{selectedStudent.fullName}</h2>
                  <p className="text-emerald-400 font-mono text-xs tracking-wider">
                    {selectedStudent.batchCode || 'BATCH CODE PENDING'}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedStudent(null)}
                className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left Column: Personal Info */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Personal Section */}
                <SectionHeader title="Personal Information" icon={User} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <InfoItem label="Full Name" value={selectedStudent.fullName} />
                  <InfoItem label="Parent Name" value={selectedStudent.parentName} />
                  <InfoItem label="Date of Birth" value={selectedStudent.dob} />
                  <InfoItem label="Gender" value={selectedStudent.gender} />
                  <InfoItem label="Contact (Student)" value={selectedStudent.studentContact} icon={Smartphone} />
                  <InfoItem label="Contact (Parent)" value={selectedStudent.parentContact} icon={Phone} />
                  <InfoItem label="Email" value={selectedStudent.email} className="md:col-span-2" />
                  <InfoItem label="Address" value={selectedStudent.address} className="md:col-span-2" icon={MapPin} />
                  <InfoItem label="Aadhaar Last 4" value={selectedStudent.aadhaarLast4} />
                </div>

                {/* Academic Section */}
                <SectionHeader title="Academic Details" icon={GraduationCap} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <InfoItem label="College Name" value={selectedStudent.collegeName} className="md:col-span-2" />
                  <InfoItem label="Branch" value={selectedStudent.branch} />
                  <InfoItem label="Year / Sem" value={selectedStudent.yearSemester} />
                  <InfoItem label="Roll No" value={selectedStudent.rollNo} />
                  <InfoItem label="College ID" value={selectedStudent.collegeIdNo} />
                  <InfoItem label="CGPA / %" value={selectedStudent.cgpa} />
                </div>
              </div>

              {/* Right Column: Fee & Status */}
              <div className="space-y-6">
                
                {/* Fee Section */}
                <div className="bg-slate-950/50 rounded-xl p-5 border border-slate-800">
                  <div className="flex items-center gap-2 mb-4 text-emerald-400">
                    <CreditCard size={18} />
                    <h3 className="font-bold uppercase text-xs tracking-wider">Fee Details</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Amount Paid</span>
                      <span className="text-white font-bold">₹{selectedStudent.feeAmount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Payment Mode</span>
                      <span className="text-slate-300">{selectedStudent.paymentMode}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Txn ID</span>
                      <span className="text-slate-300 font-mono text-xs">{selectedStudent.transactionId}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Date</span>
                      <span className="text-slate-300">{selectedStudent.paymentDate}</span>
                    </div>
                    <div className="pt-2 border-t border-slate-800 mt-2">
                       <span className="inline-block w-full text-center py-1 bg-emerald-500/10 border border-emerald-500/20 rounded text-emerald-400 text-xs font-bold uppercase">
                         {selectedStudent.installmentType} Payment
                       </span>
                    </div>
                  </div>
                </div>

                {/* Documents Checklist */}
                <div className="bg-slate-950/50 rounded-xl p-5 border border-slate-800">
                  <div className="flex items-center gap-2 mb-4 text-blue-400">
                    <FileText size={18} />
                    <h3 className="font-bold uppercase text-xs tracking-wider">Documents Submitted</h3>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <CheckItem label="Aadhaar Card" checked={selectedStudent.docAadhaar} />
                    <CheckItem label="College ID" checked={selectedStudent.docCollegeId} />
                    <CheckItem label="Passport Photo" checked={selectedStudent.docPhoto} />
                    <CheckItem label="Payment Proof" checked={selectedStudent.docPayment} />
                    <CheckItem label="NOC (Optional)" checked={selectedStudent.docNoc} />
                  </ul>
                </div>

                {/* Signature Preview */}
                <div className="bg-slate-950/50 rounded-xl p-5 border border-slate-800">
                   <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Signature</h3>
                   <div className="h-16 bg-white/5 rounded border border-white/10 flex items-center justify-center overflow-hidden">
                      {selectedStudent.signatureBase64 ? (
                        <img src={selectedStudent.signatureBase64} alt="Sig" className="max-h-full max-w-full opacity-80 invert" />
                      ) : (
                        <span className="text-xs text-slate-600">No Signature</span>
                      )}
                   </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// --- HELPER COMPONENTS ---

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

const SectionHeader = ({ title, icon: Icon }: any) => (
  <div className="flex items-center gap-2 border-b border-slate-800 pb-2 mb-4">
    <Icon className="text-emerald-500 w-5 h-5" />
    <h3 className="text-lg font-bold text-white">{title}</h3>
  </div>
);

const InfoItem = ({ label, value, className = "", icon: Icon }: any) => (
  <div className={`flex flex-col ${className}`}>
    <span className="text-slate-500 text-xs uppercase font-bold tracking-wider mb-0.5 flex items-center gap-1">
      {Icon && <Icon size={10} />} {label}
    </span>
    <span className="text-slate-200 font-medium">{value || '-'}</span>
  </div>
);

const CheckItem = ({ label, checked }: { label: string, checked: boolean }) => (
  <li className={`flex items-center justify-between p-2 rounded ${checked ? 'bg-emerald-500/5' : 'bg-slate-900'}`}>
    <span className={checked ? 'text-slate-300' : 'text-slate-600'}>{label}</span>
    {checked ? <CheckCircle size={16} className="text-emerald-500" /> : <div className="w-4 h-4 rounded-full border border-slate-700"></div>}
  </li>
);