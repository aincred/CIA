'use client';

import React, { useState, useEffect } from 'react';
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  BookOpen, 
  CreditCard, 
  CheckCircle,
  Users,
  Shield,
  Terminal,
  Activity,
  Printer,
  Download,
  ArrowLeft,
  Cpu,
  Calendar // Import Calendar Icon
} from 'lucide-react';

// --- CONSTANTS ---
const LOGO_URL = "/ChatGPT Image Jan 17, 2026, 04_21_47 PM.png";

/**
 * COMPONENT: Wave Animation Background
 */
const WaveBackground = () => {
  const waveSvg = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 88.7'%3E%3Cpath d='M800 56.9c-155.5 0-204.9-50-405.5-49.9-200 0-250 49.9-394.5 49.9v31.8h800v-.2-31.6z' fill='%23ffffff'/%3E%3C/svg%3E`;

  return (
    <>
      {/* FIX: Using dangerouslySetInnerHTML avoids the TypeScript error 
         with 'jsx' and 'global' attributes on the style tag.
      */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes move_wave {
          0% { transform: translateX(0) translateZ(0) scaleY(1); }
          50% { transform: translateX(-25%) translateZ(0) scaleY(0.55); }
          100% { transform: translateX(-50%) translateZ(0) scaleY(1); }
        }
        .waveWrapper {
          overflow: hidden;
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          top: 0;
          margin: auto;
          z-index: -10;
          background: linear-gradient(to top, #083344 20%, #020617 80%);
        }
        .waveWrapperInner {
          position: absolute;
          width: 100%;
          overflow: hidden;
          height: 100%;
          bottom: -1px;
        }
        .bgTop {
          z-index: 15;
          opacity: 0.5;
        }
        .bgMiddle {
          z-index: 10;
          opacity: 0.75;
        }
        .bgBottom {
          z-index: 5;
        }
        .wave {
          position: absolute;
          left: 0;
          width: 200%;
          height: 100%;
          background-repeat: repeat no-repeat;
          background-position: 0 bottom;
          transform-origin: center bottom;
        }
        .waveTop {
          background-size: 50% 100px;
        }
        .waveAnimation .waveTop {
          animation: move_wave 3s;
          animation-delay: 1s;
        }
        .waveMiddle {
          background-size: 50% 120px;
        }
        .waveAnimation .waveMiddle {
          animation: move_wave 10s linear infinite;
        }
        .waveBottom {
          background-size: 50% 100px;
        }
        .waveAnimation .waveBottom {
          animation: move_wave 15s linear infinite;
        }

        /* PRINT STYLES */
        @media print {
            @page { margin: 0.5cm; }
            body { 
                background: white !important; 
                color: black !important; 
                -webkit-print-color-adjust: exact; 
                print-color-adjust: exact;
            }
            .no-print, .waveWrapper, nav { display: none !important; }
            .print-only { display: block !important; }
            .print-container {
                width: 100% !important;
                margin: 0 !important;
                padding: 20px !important;
                background: white !important;
                border: 2px solid #000 !important;
                color: black !important;
                box-shadow: none !important;
            }
            .text-white, .text-slate-200, .text-slate-400, .text-cyan-500, .text-cyan-400, .text-cyan-300, .text-cyan-600 { 
                color: black !important; 
            }
            .border-white\\/10, .border-cyan-900\\/20, .border-cyan-500\\/20 { 
                border-color: #ccc !important; 
            }
            .bg-slate-900\\/60, .bg-black\\/40, .bg-slate-950\\/50, .bg-cyan-950\\/10 { 
                background: transparent !important; 
            }
            h1, h2, h3 { color: black !important; border-bottom: 1px solid #000 !important; }
            label { font-weight: bold !important; color: #444 !important; }
            input, select, textarea { border: 1px solid #ccc !important; color: black !important; background: white !important; }
        }
      `}} />
       
      <div className="waveWrapper waveAnimation">
        <div className="waveWrapperInner bgTop">
          <div className="wave waveTop" style={{ backgroundImage: `url("${waveSvg}")`, opacity: 0.1 }}></div>
        </div>
        <div className="waveWrapperInner bgMiddle">
          <div className="wave waveMiddle" style={{ backgroundImage: `url("${waveSvg}")`, opacity: 0.15 }}></div>
        </div>
        <div className="waveWrapperInner bgBottom">
          <div className="wave waveBottom" style={{ backgroundImage: `url("${waveSvg}")`, opacity: 0.05 }}></div>
        </div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 pointer-events-none" />
      </div>
    </>
  );
};

interface FormDataType {
  fullName: string;
  gender: string;
  dob: string;
  guardianType: string;
  guardianName: string;
  studentContact: string;
  whatsappContact: string;
  email: string;
  permAddress: string;
  tempAddress: string;
  college: string;
  passoutYear: string;
  semester: string;
  marks: string;
  bloodGroup: string;
  paymentMethod: string;
  paymentDate: string;
  receiptNo: string;
}

const ReceiptView = ({ data, onBack }: { data: FormDataType; onBack: () => void }) => {
    const [today, setToday] = useState('');

    useEffect(() => {
        setToday(new Date().toLocaleDateString('en-GB'));
    }, []);

    const receiptId = data.receiptNo || "PENDING";
    const formattedPaymentDate = data.paymentDate 
      ? new Date(data.paymentDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
      : today;
    
    return (
        <div className="min-h-screen pt-24 pb-10 px-4 flex flex-col items-center justify-center relative z-10">
            {/* Controls */}
            <div className="no-print w-full max-w-3xl mb-6 flex justify-between items-center bg-slate-900/50 backdrop-blur p-4 rounded-lg border border-cyan-900/30">
                <button onClick={onBack} className="text-white flex items-center gap-2 hover:text-cyan-400 transition-colors">
                    <ArrowLeft size={18} /> Back to Form
                </button>
                <div className="flex gap-4">
                    <button onClick={() => window.print()} className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded font-bold flex items-center gap-2 transition-all shadow-lg shadow-cyan-900/20">
                        <Printer size={18} /> Print
                    </button>
                </div>
            </div>

            {/* Receipt Card */}
            <div className="print-container w-full max-w-3xl bg-white text-black p-8 md:p-12 rounded-none md:rounded-xl shadow-2xl relative overflow-hidden">
                <div className="no-print absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.03]">
                    <Shield size={400} />
                </div>

                {/* Header */}
                <div className="border-b-2 border-slate-800 pb-6 mb-6 flex justify-between items-start">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-black flex items-center justify-center rounded-lg overflow-hidden border border-slate-200">
                             <img 
                                src={LOGO_URL}
                                alt="Academy Logo" 
                                className="w-full h-full object-contain" 
                             />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold uppercase tracking-wider text-slate-900">Cyber Intelligence Academy</h1>
                            <p className="text-sm font-mono text-slate-600">Official Registration Receipt</p>
                            <p className="text-xs text-slate-500 mt-1">ISO 27001 Certified Training Partner</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <h2 className="text-xl font-mono font-bold text-cyan-700">RECEIPT</h2>
                        <p className="font-mono text-sm mt-1">NO: {receiptId}</p>
                        <p className="font-mono text-sm">DATE: {today}</p>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-2 gap-8 mb-8">
                    <div>
                        <h3 className="font-bold border-b border-gray-300 pb-2 mb-3 text-sm uppercase text-slate-700">Student Information</h3>
                        <div className="space-y-2 text-sm text-slate-800">
                            <p><span className="font-semibold w-24 inline-block text-slate-600">Name:</span> {data.fullName}</p>
                            <p><span className="font-semibold w-24 inline-block text-slate-600">Gender:</span> {data.gender}</p>
                            <p><span className="font-semibold w-24 inline-block text-slate-600">DOB:</span> {data.dob}</p>
                            <p><span className="font-semibold w-24 inline-block text-slate-600">Contact:</span> {data.studentContact}</p>
                            <p><span className="font-semibold w-24 inline-block text-slate-600">Email:</span> {data.email}</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold border-b border-gray-300 pb-2 mb-3 text-sm uppercase text-slate-700">Academic Details</h3>
                        <div className="space-y-2 text-sm text-slate-800">
                            <p><span className="font-semibold w-28 inline-block text-slate-600">College:</span> {data.college}</p>
                            <p><span className="font-semibold w-28 inline-block text-slate-600">Year:</span> {data.passoutYear}</p>
                            <p><span className="font-semibold w-28 inline-block text-slate-600">Semester:</span> {data.semester}</p>
                            <p><span className="font-semibold w-28 inline-block text-slate-600">Marks:</span> {data.marks}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 mb-8">
                    <h3 className="font-bold text-sm uppercase mb-4 flex items-center gap-2 text-slate-700">
                        <CreditCard size={16} className="text-cyan-600" /> Payment Information
                    </h3>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                            <p className="text-slate-500 text-xs uppercase">Method</p>
                            <p className="font-mono font-bold">{data.paymentMethod}</p>
                        </div>
                        <div>
                            <p className="text-slate-500 text-xs uppercase">Transaction ID</p>
                            <p className="font-mono font-bold text-cyan-700">{receiptId}</p>
                        </div>
                         <div>
                            <p className="text-slate-500 text-xs uppercase">Date</p>
                            <p className="font-mono font-bold">{formattedPaymentDate}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-200 flex justify-between items-end">
                    <div className="text-xs text-slate-500">
                        <p>This is a computer-generated receipt.</p>
                        <p>Cyber Intelligence Academy | Ranchi, Jharkhand, India</p>
                        <p>www.ciacademy.in | support@ciacademy.in</p>
                    </div>
                    <div className="text-center">
                        <div className="h-12 w-32 mb-2 bg-contain bg-no-repeat bg-center opacity-50 font-script text-2xl text-slate-400 font-cursive" style={{fontFamily: 'cursive'}}>
                            Authorized
                        </div>
                        <p className="text-xs font-bold uppercase border-t border-slate-900 px-4 pt-1">Authorized Signatory</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function CyberRegistrationPage() {
  const [formData, setFormData] = useState<FormDataType>({
    fullName: '', gender: '', dob: '', guardianType: 'Father', guardianName: '',
    studentContact: '', whatsappContact: '', email: '', permAddress: '', tempAddress: '',
    college: '', passoutYear: '', semester: '', marks: '', bloodGroup: '',
    paymentMethod: 'Cash', paymentDate: '', receiptNo: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
        setSubmitted(false);
        setShowReceipt(true);
    }, 1500);
  };

  const inputClass = "w-full bg-slate-950/50 border border-slate-800 rounded p-3 text-white placeholder-slate-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 outline-none transition-all";
  const labelClass = "block text-xs font-bold text-cyan-500 uppercase tracking-wider mb-2";

  if (showReceipt) {
      return (
        <div className="min-h-screen bg-neutral-100 font-sans">
             <WaveBackground />
             <ReceiptView data={formData} onBack={() => setShowReceipt(false)} />
        </div>
      );
  }

  return (
    <div className="min-h-screen bg-transparent text-slate-200 font-sans selection:bg-cyan-900/50 selection:text-white overflow-x-hidden no-print">
      <WaveBackground />

      {/* NAVBAR */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center shadow-lg shadow-cyan-600/20 border border-white/10 overflow-hidden">
               <img 
                  src={LOGO_URL} 
                  alt="Academy Logo" 
                  className="w-full h-full object-contain"
                />
            </div>
            
            <div className="leading-tight">
              <h1 className="text-xl font-bold text-white tracking-tight">CYBER</h1>
              <span className="text-[10px] text-cyan-500 font-bold uppercase tracking-widest">Intelligence Academy</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="text-xs font-mono text-cyan-400 hidden sm:block">
                 SECURE_CONNECTION: <span className="text-emerald-500">ENCRYPTED</span>
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
              Student <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-white">Registration Protocol</span>
            </h1>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Complete the secure intake form below to begin your journey into offensive and defensive cybersecurity operations.
            </p>
          </div>

          <div className="relative rounded-2xl bg-slate-900/60 backdrop-blur-md border border-cyan-500/20 shadow-2xl shadow-cyan-900/10 overflow-hidden">
            <div className="h-1 w-full bg-gradient-to-r from-cyan-600 via-blue-800 to-black"></div>
            
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
                <div className="absolute left-0 top-0 h-full w-[1px] bg-gradient-to-b from-cyan-600/50 to-transparent -ml-2"></div>
                <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-3">
                  <User className="text-cyan-500 w-5 h-5" /> 
                  <span className="border-b border-cyan-500/30 pb-1">01. Identity Verification</span>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label htmlFor="fullName" className={labelClass}>1. Full Name</label>
                    <input type="text" name="fullName" id="fullName" required className={inputClass} placeholder="e.g. Neo Anderson" value={formData.fullName} onChange={handleChange} />
                  </div>
                  <div>
                    <label htmlFor="gender" className={labelClass}>2. Gender</label>
                    <select name="gender" id="gender" required className={inputClass} value={formData.gender} onChange={handleChange}>
                      <option value="" className="bg-slate-900">Select Gender</option>
                      <option value="Male" className="bg-slate-900">Male</option>
                      <option value="Female" className="bg-slate-900">Female</option>
                      <option value="Other" className="bg-slate-900">Other</option>
                    </select>
                  </div>
                  
                  {/* Calendar Icon for DOB */}
                  <div>
                    <label htmlFor="dob" className={labelClass}>3. Date of Birth</label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 z-20">
                          <Calendar className="h-4 w-4 text-slate-500" />
                      </div>
                      <input type="date" name="dob" id="dob" required className={`${inputClass} pl-10`} value={formData.dob} onChange={handleChange} />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="bloodGroup" className={labelClass}>12. Blood Group</label>
                    <select name="bloodGroup" id="bloodGroup" className={inputClass} value={formData.bloodGroup} onChange={handleChange}>
                      <option value="" className="bg-slate-900">Select Type</option>
                      <option value="A+" className="bg-slate-900">A+</option>
                      <option value="A-" className="bg-slate-900">A-</option>
                      <option value="B+" className="bg-slate-900">B+</option>
                      <option value="B-" className="bg-slate-900">B-</option>
                      <option value="O+" className="bg-slate-900">O+</option>
                      <option value="O-" className="bg-slate-900">O-</option>
                      <option value="AB+" className="bg-slate-900">AB+</option>
                      <option value="AB-" className="bg-slate-900">AB-</option>
                    </select>
                  </div>
                </div>
              </section>

              <section className="relative">
                <div className="absolute left-0 top-0 h-full w-[1px] bg-gradient-to-b from-cyan-600/50 to-transparent -ml-2"></div>
                <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-3">
                  <Phone className="text-cyan-500 w-5 h-5" /> 
                  <span className="border-b border-cyan-500/30 pb-1">02. Communication Protocols</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="studentContact" className={labelClass}>5. Primary Uplink (Mobile)</label>
                    <input type="tel" name="studentContact" id="studentContact" required className={inputClass} placeholder="+91 XXXXX XXXXX" value={formData.studentContact} onChange={handleChange} />
                  </div>
                  <div>
                    <label htmlFor="whatsappContact" className={labelClass}>8. Secure Msg (WhatsApp)</label>
                    <input type="tel" name="whatsappContact" id="whatsappContact" className={inputClass} placeholder="+91 XXXXX XXXXX" value={formData.whatsappContact} onChange={handleChange} />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="email" className={labelClass}>8. Digital Mail ID (Gmail)</label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Mail className="h-4 w-4 text-slate-500" />
                      </div>
                      <input type="email" name="email" id="email" required className={`${inputClass} pl-10`} placeholder="identity@gmail.com" value={formData.email} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="permAddress" className={labelClass}>9. Base Location (Permanent)</label>
                    <div className="relative">
                        <div className="pointer-events-none absolute top-3 left-3">
                        <MapPin className="h-4 w-4 text-slate-500" />
                      </div>
                      <textarea name="permAddress" id="permAddress" rows={2} required className={`${inputClass} pl-9 resize-none`} placeholder="Sector / Block / City / State" value={formData.permAddress} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="tempAddress" className={labelClass}>10. Current Location (Temporary)</label>
                    <textarea name="tempAddress" id="tempAddress" rows={2} className={`${inputClass} resize-none`} placeholder="If different from base location..." value={formData.tempAddress} onChange={handleChange} />
                  </div>
                </div>
              </section>

              <section className="relative">
                <div className="absolute left-0 top-0 h-full w-[1px] bg-gradient-to-b from-cyan-600/50 to-transparent -ml-2"></div>
                  <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-3">
                  <Users className="text-cyan-500 w-5 h-5" /> 
                  <span className="border-b border-cyan-500/30 pb-1">03. Next of Kin / Guardian</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                      <label htmlFor="guardianType" className={labelClass}>4. Relation</label>
                      <select name="guardianType" id="guardianType" className={inputClass} value={formData.guardianType} onChange={handleChange}>
                          <option value="Father" className="bg-slate-900">Father</option>
                          <option value="Mother" className="bg-slate-900">Mother</option>
                          <option value="Guardian" className="bg-slate-900">Local Guardian</option>
                      </select>
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="guardianName" className={labelClass}>Guardian Name</label>
                    <input type="text" name="guardianName" id="guardianName" required className={inputClass} placeholder="Enter Name" value={formData.guardianName} onChange={handleChange} />
                  </div>
                </div>
              </section>

              <section className="relative">
                <div className="absolute left-0 top-0 h-full w-[1px] bg-gradient-to-b from-cyan-600/50 to-transparent -ml-2"></div>
                <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-3">
                  <BookOpen className="text-cyan-500 w-5 h-5" /> 
                  <span className="border-b border-cyan-500/30 pb-1">04. Educational Background</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label htmlFor="college" className={labelClass}>6. Institution / Qualification</label>
                    <input type="text" name="college" id="college" className={inputClass} placeholder="University or College Name" value={formData.college} onChange={handleChange} />
                  </div>
                  <div>
                    <label htmlFor="passoutYear" className={labelClass}>Completion Year</label>
                    <input type="number" name="passoutYear" id="passoutYear" min="2000" max="2030" className={inputClass} placeholder="YYYY" value={formData.passoutYear} onChange={handleChange} />
                  </div>
                  <div>
                    <label htmlFor="semester" className={labelClass}>7. Current Semester</label>
                    <input type="text" name="semester" id="semester" className={inputClass} placeholder="e.g. 4th Sem" value={formData.semester} onChange={handleChange} />
                  </div>
                  <div>
                    <label htmlFor="marks" className={labelClass}>11. Academic Score (%)</label>
                    <input type="text" name="marks" id="marks" className={inputClass} placeholder="CGPA or %" value={formData.marks} onChange={handleChange} />
                  </div>
                </div>
              </section>

              <section className="bg-cyan-950/20 p-6 rounded-xl border border-cyan-500/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Cpu size={100} className="text-cyan-500" />
                </div>
                  <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-3 relative z-10">
                  <Activity className="text-cyan-500 w-5 h-5" /> 
                  <span className="border-b border-cyan-500/30 pb-1">05. Transaction Logs (Office Use)</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                  <div>
                    <label htmlFor="paymentMethod" className={labelClass}>14. Method</label>
                    <select name="paymentMethod" id="paymentMethod" className={inputClass} value={formData.paymentMethod} onChange={handleChange}>
                      <option value="Cash" className="bg-slate-900">Cash</option>
                      <option value="UPI" className="bg-slate-900">UPI / Crypto</option>
                      <option value="Card" className="bg-slate-900">Debit/Credit Card</option>
                    </select>
                  </div>
                  
                  {/* Calendar Icon for Payment Date */}
                  <div>
                    <label htmlFor="paymentDate" className={labelClass}>13. Payment Date</label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 z-20">
                          <Calendar className="h-4 w-4 text-slate-500" />
                      </div>
                      <input 
                        type="date" 
                        name="paymentDate" 
                        id="paymentDate" 
                        className={`${inputClass} pl-10`} 
                        value={formData.paymentDate} 
                        onChange={handleChange} 
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="receiptNo" className={labelClass}>15. Transaction Hash / Receipt ID</label>
                    <input type="text" name="receiptNo" id="receiptNo" className={`${inputClass} font-mono tracking-wider`} placeholder="TX-2025-XXXX-HASH" value={formData.receiptNo} onChange={handleChange} />
                  </div>
                </div>
              </section>

              <div className="pt-4 border-t border-white/10">
                <button
                  type="submit"
                  disabled={submitted}
                  className="group w-full flex justify-center py-4 px-4 border border-transparent rounded-lg shadow-lg shadow-cyan-500/20 text-sm font-bold uppercase tracking-widest text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-cyan-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
          
          <p className="text-center text-slate-500 text-xs font-mono mt-8">
              &copy; 2025 CYBER INTELLIGENCE ACADEMY. SECURE SYSTEMS.
          </p>
        </div>
      </div>
    </div>
  );
}