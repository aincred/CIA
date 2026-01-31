// // / E:\project\app\app\polytechnicRegister\page.tsx

// 'use client';

// import React, { useState, ChangeEvent, FormEvent } from 'react';
// import { Shield, User, GraduationCap, FileText, CreditCard, CheckCircle, AlertTriangle, Terminal, Upload, Lock, Calendar } from 'lucide-react';

// // Define the shape of the form data
// interface RegistrationFormData {
//   fullName: string;
//   parentName: string;
//   dob: string;
//   gender: string;
//   aadhaarLast4: string;
//   studentContact: string;
//   parentContact: string;
//   email: string;
//   address: string;
//   photo: File | null;
//   collegeName: string;
//   branch: string;
//   yearSemester: string;
//   rollNo: string;
//   collegeIdNo: string;
//   cgpa: string;
//   docAadhaar: boolean;
//   docCollegeId: boolean;
//   docNoc: boolean;
//   docPayment: boolean;
//   docPhoto: boolean;
//   feeAmount: string;
//   installmentType: string;
//   paymentMode: string;
//   transactionId: string;
//   paymentDate: string;
//   agreedToTerms: boolean;
//   signatureFile: File | null;
//   declarationDate: string;
// }

// export default function RegistrationForm() {
//   // batchSequence is no longer needed on client side as the DB handles it
//   const [generatedBatchCode, setGeneratedBatchCode] = useState('');
//   const [submitted, setSubmitted] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false); // Added loading state

//   const initialFormState: RegistrationFormData = {
//     // Personal Details
//     fullName: '',
//     parentName: '',
//     dob: '',
//     gender: '',
//     aadhaarLast4: '',
//     studentContact: '',
//     parentContact: '',
//     email: '',
//     address: '',
//     photo: null,

//     // Academic Details
//     collegeName: '',
//     branch: '',
//     yearSemester: '',
//     rollNo: '',
//     collegeIdNo: '',
//     cgpa: '',

//     // Documents (Booleans)
//     docAadhaar: false,
//     docCollegeId: false,
//     docNoc: false,
//     docPayment: false,
//     docPhoto: false,

//     // Fee Details
//     feeAmount: '',
//     installmentType: 'One Time',
//     paymentMode: '',
//     transactionId: '',
//     paymentDate: '',

//     // Declaration
//     agreedToTerms: false,
//     signatureFile: null,
//     declarationDate: new Date().toISOString().split('T')[0],
//   };

//   const [formData, setFormData] = useState<RegistrationFormData>(initialFormState);

//   const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value, type } = e.target;
//     // Handle checkbox separately since 'checked' property exists on HTMLInputElement
//     const checked = (e.target as HTMLInputElement).checked;
    
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, files } = e.target;
//     if (files && files[0]) {
//       setFormData(prev => ({
//         ...prev,
//         [name]: files[0]
//       }));
//     }
//   };

//   const handleAadhaarChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const value = e.target.value.replace(/\D/g, '').slice(0, 4);
//     setFormData(prev => ({ ...prev, aadhaarLast4: value }));
//   };

//   // --- MODIFIED SUBMIT LOGIC TO CONNECT TO BACKEND ---
//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
    
//     if (!formData.agreedToTerms) {
//       alert("You must agree to the declaration terms.");
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       // 1. Convert Files to Base64
//       let photoBase64 = '';
//       let signatureBase64 = '';

//       if (formData.photo) {
//         photoBase64 = await convertToBase64(formData.photo);
//       }
//       if (formData.signatureFile) {
//         signatureBase64 = await convertToBase64(formData.signatureFile);
//       }

//       // 2. Prepare the payload
//       // We strip out the raw File objects and replace them with the Base64 strings
//       const payload = {
//         ...formData,
//         photoBase64,
//         signatureBase64,
//         photo: undefined, 
//         signatureFile: undefined
//       };

//       // 3. Send to API
//       const response = await fetch('/api/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//       });

//       const data = await response.json();

//       if (response.ok && data.success) {
//         // 4. Handle Success
//         setGeneratedBatchCode(data.batchCode);
//         setSubmitted(true);
//         window.scrollTo(0, 0);
//       } else {
//         // 5. Handle Server Errors
//         alert(`Registration failed: ${data.message || 'Unknown error'}`);
//       }

//     } catch (error) {
//       console.error("Submission Error:", error);
//       alert("An error occurred while connecting to the server. Please check your connection.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleReset = () => {
//     setSubmitted(false);
//     setGeneratedBatchCode('');
//     // Reset form to initial state
//     setFormData({
//       ...initialFormState,
//       declarationDate: new Date().toISOString().split('T')[0]
//     });
//   };

//   if (submitted) {
//     return (
//       <div className="min-h-screen bg-slate-950 text-emerald-400 flex items-center justify-center p-4 font-mono">
//         <div className="max-w-lg w-full bg-slate-900 border border-emerald-500/50 rounded-lg p-8 shadow-2xl shadow-emerald-500/10 text-center relative overflow-hidden">
//           {/* Background Glow */}
//           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-emerald-500/20 blur-3xl rounded-full pointer-events-none"></div>

//           <div className="flex justify-center mb-6 relative">
//             <div className="h-24 w-24 bg-emerald-500/10 rounded-full flex items-center justify-center border-2 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]">
//               <CheckCircle size={48} />
//             </div>
//           </div>
          
//           <h2 className="text-3xl font-bold mb-2 text-white">Registration Successful</h2>
//           <p className="text-slate-400 mb-8">
//             Welcome to the Cyber Intelligence Academy. Your seat has been confirmed.
//           </p>

//           <div className="bg-black/40 p-6 rounded-lg border border-emerald-500/30 text-left space-y-4 mb-8 relative">
//             {/* Batch Code Display */}
//             <div className="flex justify-between items-center border-b border-slate-800 pb-3">
//               <span className="text-slate-400 text-sm uppercase tracking-wider">Batch Code</span>
//               <span className="text-2xl font-bold text-white tracking-widest drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
//                 {generatedBatchCode}
//               </span>
//             </div>

//             <div className="space-y-2 text-sm">
//               <div className="flex justify-between">
//                 <span className="text-slate-500">Applicant:</span>
//                 <span className="text-emerald-300">{formData.fullName}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-slate-500">Date:</span>
//                 <span className="text-emerald-300">{new Date().toLocaleDateString()}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-slate-500">Transaction ID:</span>
//                 <span className="text-emerald-300 font-mono">{formData.transactionId}</span>
//               </div>
//             </div>
//           </div>

//           <button 
//             onClick={handleReset}
//             className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded transition-all shadow-lg shadow-emerald-500/20"
//           >
//             Start New Registration
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Helper for document mapping to avoid implicit any in map loops
//   const documentFields: { key: keyof RegistrationFormData; label: string }[] = [
//     { key: 'docAadhaar', label: 'Aadhaar Card Copy' },
//     { key: 'docCollegeId', label: 'College ID Card Copy' },
//     { key: 'docNoc', label: 'NOC from College (If required)' },
//     { key: 'docPayment', label: 'Payment Proof' },
//     { key: 'docPhoto', label: 'Passport Photo' }
//   ];

//   return (
//     <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
//       {/* Background Grid Effect */}
//       <div className="fixed inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-size-[2rem_2rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-50"></div>

//       <header className="relative bg-slate-900 border-b border-emerald-900/50 pt-8 pb-16 px-4">
//         <div className="max-w-4xl mx-auto text-center space-y-4">
//           <div className="inline-flex items-center justify-center p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/30 mb-2">
//             <Shield className="w-10 h-10 text-emerald-400" />
//           </div>
//           <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
//             Cyber Intelligence Academy
//             <span className="text-emerald-500">.</span>
//           </h1>
//           <div className="space-y-1">
//             <p className="text-lg text-emerald-400 font-medium">Cybersecurity Training & Industrial Internship Program</p>
//             <p className="text-slate-400 text-sm font-mono">(For Polytechnic College Students)</p>
//           </div>
//           <div className="inline-block bg-slate-800/50 border border-slate-700 rounded-full px-4 py-1 text-sm text-slate-300 mt-4">
//             <span className="text-emerald-500 mr-2">●</span>
//             Internship Date: 20/02/2026 – 20/06/2026
//           </div>
//         </div>
//       </header>

//       <main className="relative max-w-4xl mx-auto px-4 -mt-10 pb-20">
//         <form onSubmit={handleSubmit} className="space-y-6">
          
//           {/* Section 1: Personal Details */}
//           <Section title="1. Student Personal Details" icon={<User className="w-5 h-5" />}>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <Input 
//                 label="Full Name (As per Academic Records)" 
//                 name="fullName" 
//                 value={formData.fullName} 
//                 onChange={handleChange} 
//                 placeholder="Ex: John Doe"
//                 required
//               />
//               <Input 
//                 label="Father's / Mother's Name" 
//                 name="parentName" 
//                 value={formData.parentName} 
//                 onChange={handleChange} 
//                 required
//               />
//               <Input 
//                 label="Date of Birth" 
//                 name="dob" 
//                 type="date" 
//                 value={formData.dob} 
//                 onChange={handleChange} 
//                 required
//                 icon={<Calendar className="w-4 h-4 text-emerald-500" />}
//               />
//               <Select 
//                 label="Gender" 
//                 name="gender" 
//                 value={formData.gender} 
//                 onChange={handleChange}
//                 options={["Select Gender", "Male", "Female", "Other"]}
//                 required
//               />
//               <Input 
//                 label="Aadhaar No. (Last 4 digits)" 
//                 name="aadhaarLast4" 
//                 value={formData.aadhaarLast4} 
//                 onChange={handleAadhaarChange} 
//                 placeholder="XXXX"
//                 maxLength={4}
//                 required
//                 icon={<Lock className="w-4 h-4 text-emerald-500" />}
//               />
//               <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <Input 
//                   label="Student Contact No." 
//                   name="studentContact" 
//                   value={formData.studentContact} 
//                   onChange={handleChange} 
//                   type="tel"
//                   required
//                 />
//                 <Input 
//                   label="Parent/Guardian Contact No." 
//                   name="parentContact" 
//                   value={formData.parentContact} 
//                   onChange={handleChange} 
//                   type="tel"
//                   required
//                 />
//               </div>
//               <Input 
//                 label="Email ID (For Certification)" 
//                 name="email" 
//                 type="email"
//                 value={formData.email} 
//                 onChange={handleChange} 
//                 className="md:col-span-2"
//                 required
//               />
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-slate-400 mb-1">Residential Address</label>
//                 <textarea 
//                   name="address"
//                   value={formData.address}
//                   onChange={handleChange}
//                   rows={3}
//                   className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors placeholder-slate-600"
//                   required
//                 ></textarea>
//               </div>
              
//               {/* Photo Upload with Logic */}
//               <div className="md:col-span-2 border-2 border-dashed border-slate-700 rounded-lg p-6 flex flex-col items-center justify-center bg-slate-900/50 hover:bg-slate-900 transition-colors group cursor-pointer relative">
//                 {formData.photo && formData.photo.name ? (
//                   <div className="flex flex-col items-center z-10">
//                     <CheckCircle className="w-8 h-8 text-emerald-500 mb-2" />
//                     <span className="text-sm font-medium text-emerald-400">{formData.photo.name}</span>
//                     <span className="text-xs text-slate-500 mt-1">Click to replace</span>
//                   </div>
//                 ) : (
//                   <div className="flex flex-col items-center pointer-events-none">
//                     <Upload className="w-8 h-8 text-slate-500 group-hover:text-emerald-500 mb-2 transition-colors" />
//                     <span className="text-sm text-slate-400 group-hover:text-slate-300">Upload Passport Size Photo</span>
//                   </div>
//                 )}
//                 <input 
//                   type="file" 
//                   name="photo"
//                   onChange={handleFileChange}
//                   className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
//                   accept="image/*" 
//                 />
//               </div>
//             </div>
//           </Section>

//           {/* Section 2: Academic Details */}
//           <Section title="2. Academic Details" icon={<GraduationCap className="w-5 h-5" />}>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <Input 
//                 label="Polytechnic College Name" 
//                 name="collegeName" 
//                 value={formData.collegeName} 
//                 onChange={handleChange} 
//                 className="md:col-span-2"
//                 required
//               />
//               <Input 
//                 label="Branch / Department" 
//                 name="branch" 
//                 value={formData.branch} 
//                 onChange={handleChange} 
//                 required
//               />
//               <Input 
//                 label="Year / Semester" 
//                 name="yearSemester" 
//                 value={formData.yearSemester} 
//                 onChange={handleChange} 
//                 placeholder="Ex: 3rd Year / 5th Sem"
//                 required
//               />
//               <Input 
//                 label="Roll No. / Registration No." 
//                 name="rollNo" 
//                 value={formData.rollNo} 
//                 onChange={handleChange} 
//                 required
//               />
//               <Input 
//                 label="College ID No." 
//                 name="collegeIdNo" 
//                 value={formData.collegeIdNo} 
//                 onChange={handleChange} 
//                 required
//               />
//               <Input 
//                 label="Latest Semester Percentage / CGPA" 
//                 name="cgpa" 
//                 value={formData.cgpa} 
//                 onChange={handleChange} 
//                 required
//               />
//             </div>
//           </Section>

//           {/* Section 3: Documents Submitted */}
//           <Section title="3. Documents Submitted" icon={<FileText className="w-5 h-5" />}>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                {documentFields.map((doc) => (
//                  <label key={doc.key} className="flex items-center space-x-3 p-3 bg-slate-900 rounded-lg border border-slate-800 cursor-pointer hover:border-emerald-500/50 transition-colors">
//                    <div className="relative flex items-center">
//                      <input 
//                        type="checkbox" 
//                        name={doc.key}
//                        checked={!!formData[doc.key]}
//                        onChange={handleChange}
//                        className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-slate-600 checked:bg-emerald-500 checked:border-emerald-500 transition-all"
//                      />
//                      <CheckCircle className="absolute hidden peer-checked:block text-slate-900 pointer-events-none" size={14} style={{left: '3px', top: '3px'}} />
//                    </div>
//                    <span className="text-slate-300">{doc.label}</span>
//                  </label>
//                ))}
//             </div>
//           </Section>

//           {/* Section 4: Fee Details */}
//           <Section title="4. Fee Details" icon={<CreditCard className="w-5 h-5" />}>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="md:col-span-2">
//                  <label className="block text-sm font-medium text-slate-400 mb-2">Payment Type</label>
//                  <div className="flex space-x-6">
//                    <label className="flex items-center space-x-2 cursor-pointer">
//                      <input 
//                        type="radio" 
//                        name="installmentType" 
//                        value="One Time"
//                        checked={formData.installmentType === 'One Time'}
//                        onChange={handleChange}
//                        className="text-emerald-500 focus:ring-emerald-500 bg-slate-900 border-slate-600"
//                      />
//                      <span>One Time Payment</span>
//                    </label>
//                    <label className="flex items-center space-x-2 cursor-pointer">
//                      <input 
//                        type="radio" 
//                        name="installmentType" 
//                        value="Installment"
//                        checked={formData.installmentType === 'Installment'}
//                        onChange={handleChange}
//                        className="text-emerald-500 focus:ring-emerald-500 bg-slate-900 border-slate-600"
//                      />
//                      <span>Installment (1 & 2)</span>
//                    </label>
//                  </div>
//               </div>
              
//               <div className="relative">
//                 <Input 
//                   label="Amount (₹)" 
//                   name="feeAmount" 
//                   type="number"
//                   value={formData.feeAmount} 
//                   onChange={handleChange} 
//                   required
//                 />
//               </div>

//               <Select 
//                 label="Mode of Payment" 
//                 name="paymentMode" 
//                 value={formData.paymentMode} 
//                 onChange={handleChange}
//                 options={["Select Mode", "UPI", "Bank Transfer", "Cash"]}
//                 required
//               />

//               <Input 
//                 label="Transaction ID" 
//                 name="transactionId" 
//                 value={formData.transactionId} 
//                 onChange={handleChange} 
//                 required
//               />

//               <Input 
//                 label="Date of Payment" 
//                 name="paymentDate" 
//                 type="date"
//                 value={formData.paymentDate} 
//                 onChange={handleChange} 
//                 required
//                 icon={<Calendar className="w-4 h-4 text-emerald-500" />}
//               />
//             </div>
//           </Section>

//           {/* Section 5: Declaration */}
//           <Section title="5. Student Declaration" icon={<Terminal className="w-5 h-5" />}>
//             <div className="bg-slate-900/50 rounded-lg p-6 border border-emerald-500/20 mb-6">
//               <div className="flex items-start gap-3 mb-4">
//                 <AlertTriangle className="text-amber-500 shrink-0 mt-1" size={20} />
//                 <p className="text-slate-300 leading-relaxed text-sm">
//                   I hereby declare that the information provided above is true and correct to the best of my knowledge. 
//                   I understand that cybersecurity tools and techniques taught during the training/internship must be used 
//                   <strong className="text-emerald-400"> strictly for ethical and educational purposes only</strong>.
//                 </p>
//               </div>
              
//               <ul className="space-y-3 text-sm text-slate-400 list-disc pl-5 mb-6">
//                 <li>I agree not to misuse any hacking or penetration testing tools outside authorized lab environments.</li>
//                 <li>To maintain discipline and follow institutional code of conduct.</li>
//                 <li>That minimum 80% attendance is mandatory for certification.</li>
//                 <li>That certificate issuance is subject to successful project completion and internal evaluation.</li>
//                 <li>That Cyber Intelligence Academy is not responsible for misuse of knowledge acquired during training.</li>
//               </ul>

//               <div className="flex items-center space-x-3 mb-6 p-4 bg-emerald-900/10 rounded border border-emerald-500/30">
//                 <input 
//                   type="checkbox" 
//                   id="agree"
//                   name="agreedToTerms"
//                   checked={formData.agreedToTerms}
//                   onChange={handleChange}
//                   className="h-5 w-5 rounded border-slate-600 bg-slate-900 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-slate-900"
//                 />
//                 <label htmlFor="agree" className="text-slate-200 font-medium cursor-pointer select-none">
//                   I Agree to the above terms and conditions
//                 </label>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="space-y-1">
//                   <label className="block text-sm font-medium text-slate-400">
//                     Student Signature Upload <span className="text-emerald-500">*</span>
//                   </label>
//                   <div className="relative w-full bg-slate-950 border border-slate-700 border-dashed rounded-lg p-2.5 flex items-center justify-center hover:border-emerald-500 hover:bg-slate-900 transition-all cursor-pointer group h-11.5">
//                     {formData.signatureFile && formData.signatureFile.name ? (
//                       <div className="flex items-center space-x-2 z-10">
//                         <CheckCircle className="w-4 h-4 text-emerald-500" />
//                         <span className="text-sm font-medium text-emerald-400 truncate max-w-50">{formData.signatureFile.name}</span>
//                       </div>
//                     ) : (
//                       <div className="flex items-center space-x-2 pointer-events-none">
//                         <Upload className="w-4 h-4 text-slate-500 group-hover:text-emerald-500 transition-colors" />
//                         <span className="text-slate-500 text-sm group-hover:text-slate-300 transition-colors">Click to upload signature</span>
//                       </div>
//                     )}
//                     <input 
//                       type="file" 
//                       name="signatureFile"
//                       onChange={handleFileChange}
//                       className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
//                       accept="image/*" 
//                     />
//                   </div>
//                 </div>
//                 <Input 
//                   label="Date" 
//                   name="declarationDate" 
//                   type="date"
//                   value={formData.declarationDate} 
//                   onChange={handleChange} 
//                   disabled
//                   icon={<Calendar className="w-4 h-4 text-emerald-500" />}
//                 />
//               </div>
//             </div>
//           </Section>

//           {/* Submit Action */}
//           <div className="flex flex-col md:flex-row gap-4 items-center justify-between pt-6 border-t border-slate-800">
//              <div className="text-xs text-slate-500">
//                * Dreamworks Infotech Pvt. Ltd.
//              </div>
//              <button 
//                type="submit"
//                disabled={isSubmitting}
//                className={`w-full md:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg shadow-emerald-500/20 transition-all transform hover:scale-105 active:scale-95 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
//              >
//                {isSubmitting ? 'Submitting...' : 'Submit Registration'}
//              </button>
//           </div>

//         </form>
//       </main>
//     </div>
//   );
// }

// // Reusable Components & Interfaces

// interface SectionProps {
//   title: string;
//   icon: React.ReactNode;
//   children: React.ReactNode;
// }

// function Section({ title, icon, children }: SectionProps) {
//   return (
//     <div className="bg-slate-800 rounded-xl shadow-xl overflow-hidden border border-slate-700 mb-6">
//       <div className="bg-slate-900/80 px-6 py-4 border-b border-slate-700 flex items-center gap-3">
//         <div className="p-2 bg-slate-800 rounded-lg text-emerald-400 border border-slate-700">
//           {icon}
//         </div>
//         <h2 className="text-lg font-bold text-white uppercase tracking-wide">{title}</h2>
//       </div>
//       <div className="p-6">
//         {children}
//       </div>
//     </div>
//   );
// }

// interface InputProps {
//   label: string;
//   name: string;
//   type?: string;
//   value: string | number;
//   onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
//   placeholder?: string;
//   required?: boolean;
//   className?: string;
//   disabled?: boolean;
//   icon?: React.ReactNode;
//   maxLength?: number;
// }

// function Input({ 
//   label, 
//   name, 
//   type = "text", 
//   value, 
//   onChange, 
//   placeholder = "", 
//   required = false, 
//   className = "", 
//   disabled = false, 
//   icon = null, 
//   maxLength = undefined 
// }: InputProps) {
//   return (
//     <div className={`space-y-1 ${className}`}>
//       <label className="block text-sm font-medium text-slate-400">
//         {label} {required && <span className="text-emerald-500">*</span>}
//       </label>
//       <div className="relative">
//         <input 
//           type={type} 
//           name={name} 
//           value={value} 
//           onChange={onChange} 
//           placeholder={placeholder}
//           required={required}
//           disabled={disabled}
//           maxLength={maxLength}
//           // The scheme-dark ensures the browser's date picker matches the dark theme
//           className={`w-full bg-slate-950 border ${disabled ? 'border-slate-800 text-slate-500' : 'border-slate-700 text-slate-200'} rounded-lg px-3 py-2.5 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors placeholder-slate-600 scheme-dark ${icon ? 'pr-10' : ''}`}
//         />
//         {icon && (
//           <div className="absolute right-3 top-3 pointer-events-none">
//             {icon}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// interface SelectProps {
//   label: string;
//   name: string;
//   value: string;
//   onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
//   options: string[];
//   required?: boolean;
//   className?: string;
// }

// function Select({ 
//   label, 
//   name, 
//   value, 
//   onChange, 
//   options = [], 
//   required = false, 
//   className = "" 
// }: SelectProps) {
//   return (
//     <div className={`space-y-1 ${className}`}>
//       <label className="block text-sm font-medium text-slate-400">
//         {label} {required && <span className="text-emerald-500">*</span>}
//       </label>
//       <div className="relative">
//         <select 
//           name={name} 
//           value={value} 
//           onChange={onChange} 
//           required={required}
//           className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors appearance-none"
//         >
//           {options.map(opt => (
//             <option key={opt} value={opt === options[0] ? "" : opt} disabled={opt === options[0]}>
//               {opt}
//             </option>
//           ))}
//         </select>
//         <div className="absolute right-3 top-3 pointer-events-none text-slate-500">
//           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
//         </div>
//       </div>
//     </div>
//   );
// }

// // --- HELPER FUNCTION FOR FILE UPLOAD ---
// // Converts a File object to a Base64 string for easier storage in this demo
// const convertToBase64 = (file: File): Promise<string> => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result as string);
//     reader.onerror = error => reject(error);
//   });
// };


// / E:\project\app\app\polytechnicRegister\page.tsx

'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Shield, User, GraduationCap, FileText, CheckCircle, AlertTriangle, Terminal, Upload, Lock, Calendar, Download, Phone, Mail } from 'lucide-react';

// Define the shape of the form data
interface RegistrationFormData {
  fullName: string;
  parentName: string;
  dob: string;
  gender: string;
  aadhaarLast4: string;
  studentContact: string;
  parentContact: string;
  email: string;
  address: string;
  photo: File | null;
  collegeName: string;
  branch: string;
  yearSemester: string;
  rollNo: string;
  collegeIdNo: string;
  cgpa: string;
  docAadhaar: boolean;
  docCollegeId: boolean;
  docNoc: boolean;
  docPhoto: boolean;
  agreedToTerms: boolean;
  signatureFile: File | null;
  declarationDate: string;
}

export default function RegistrationForm() {
  const [generatedBatchCode, setGeneratedBatchCode] = useState('');
  const [generatedRegNo, setGeneratedRegNo] = useState(''); // New state for Reg No
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialFormState: RegistrationFormData = {
    // Personal Details
    fullName: '',
    parentName: '',
    dob: '',
    gender: '',
    aadhaarLast4: '',
    studentContact: '',
    parentContact: '',
    email: '',
    address: '',
    photo: null,

    // Academic Details
    collegeName: '',
    branch: '',
    yearSemester: '',
    rollNo: '',
    collegeIdNo: '',
    cgpa: '',

    // Documents (Booleans)
    docAadhaar: false,
    docCollegeId: false,
    docNoc: false,
    docPhoto: false,

    // Declaration
    agreedToTerms: false,
    signatureFile: null,
    declarationDate: new Date().toISOString().split('T')[0],
  };

  const [formData, setFormData] = useState<RegistrationFormData>(initialFormState);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    }
  };

  const handleAadhaarChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setFormData(prev => ({ ...prev, aadhaarLast4: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreedToTerms) {
      alert("You must agree to the declaration terms.");
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Convert Files to Base64
      let photoBase64 = '';
      let signatureBase64 = '';

      if (formData.photo) {
        photoBase64 = await convertToBase64(formData.photo);
      }
      if (formData.signatureFile) {
        signatureBase64 = await convertToBase64(formData.signatureFile);
      }

      // 2. Prepare the payload
      const payload = {
        ...formData,
        photoBase64,
        signatureBase64,
        photo: undefined, 
        signatureFile: undefined
      };

      // 3. Send to API
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // 4. Handle Success
        setGeneratedBatchCode(data.batchCode || 'CIA/B1/001'); // Fallback if API doesn't send
        setGeneratedRegNo(data.registrationNo || 'CIA/B1'); // Fallback if API doesn't send
        setSubmitted(true);
        window.scrollTo(0, 0);
      } else {
        // 5. Handle Server Errors
        alert(`Registration failed: ${data.message || 'Unknown error'}`);
      }

    } catch (error) {
      console.error("Submission Error:", error);
      alert("An error occurred while connecting to the server. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setGeneratedBatchCode('');
    setGeneratedRegNo('');
    setFormData({
      ...initialFormState,
      declarationDate: new Date().toISOString().split('T')[0]
    });
  };

  const handlePrint = () => {
    window.print();
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-950 text-emerald-400 flex items-center justify-center p-4 font-mono print:bg-white print:p-0">
        <div className="max-w-lg w-full bg-slate-900 border border-emerald-500/50 rounded-lg p-8 shadow-2xl shadow-emerald-500/10 text-center relative overflow-hidden print:shadow-none print:border-2 print:border-black print:text-black print:bg-white">
          
          {/* Background Glow (Hide in Print) */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-emerald-500/20 blur-3xl rounded-full pointer-events-none print:hidden"></div>

          <div className="flex justify-center mb-6 relative print:hidden">
            <div className="h-24 w-24 bg-emerald-500/10 rounded-full flex items-center justify-center border-2 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]">
              <CheckCircle size={48} />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold mb-2 text-white print:text-black">Registration Successful</h2>
          <p className="text-slate-400 mb-8 print:text-gray-600">
            Welcome to the Cyber Intelligence Academy. Your seat has been confirmed.
          </p>

          <div className="bg-black/40 p-6 rounded-lg border border-emerald-500/30 text-left space-y-4 mb-6 relative print:bg-gray-50 print:border-gray-300">
            
            {/* Batch Code Display */}
            <div className="flex justify-between items-center border-b border-slate-800 pb-3 print:border-gray-300">
              <span className="text-slate-400 text-sm uppercase tracking-wider print:text-gray-600">Batch Code</span>
              <span className="text-xl font-bold text-white tracking-widest drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] print:text-black print:drop-shadow-none">
                {generatedBatchCode}
              </span>
            </div>

            {/* Registration No Display */}
            <div className="flex justify-between items-center border-b border-slate-800 pb-3 print:border-gray-300">
              <span className="text-slate-400 text-sm uppercase tracking-wider print:text-gray-600">Registration No</span>
              <span className="text-xl font-bold text-emerald-400 tracking-widest font-mono print:text-black">
                {generatedRegNo}
              </span>
            </div>

            <div className="space-y-2 text-sm pt-2">
              <div className="flex justify-between">
                <span className="text-slate-500 print:text-gray-600">Applicant:</span>
                <span className="text-emerald-300 font-semibold print:text-black">{formData.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 print:text-gray-600">Date:</span>
                <span className="text-emerald-300 print:text-black">{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Contact Info Block */}
          <div className="bg-emerald-900/20 p-4 rounded-lg border border-emerald-500/20 mb-8 print:border-gray-300 print:bg-gray-100">
            <div className="flex items-center justify-center gap-2 text-emerald-400 mb-2 print:text-black">
              <Mail size={16} />
              <span className="font-medium">Please check your email</span>
            </div>
            <p className="text-xs text-slate-400 mb-3 print:text-gray-600">
               A confirmation email with detailed instructions has been sent to {formData.email}.
            </p>
            <div className="flex items-center justify-center gap-2 text-white bg-slate-800 py-2 rounded border border-slate-700 print:bg-white print:border-gray-300 print:text-black">
               <Phone size={16} className="text-emerald-500 print:text-black" />
               <span className="font-mono tracking-wide">Helpdesk: 834012248</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 print:hidden">
            <button 
              onClick={handlePrint}
              className="flex items-center justify-center gap-2 w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-4 rounded transition-all border border-slate-700"
            >
              <Download size={18} />
              PDF
            </button>
            <button 
              onClick={handleReset}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded transition-all shadow-lg shadow-emerald-500/20"
            >
              New Form
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Helper for document mapping
  const documentFields: { key: keyof RegistrationFormData; label: string }[] = [
    { key: 'docAadhaar', label: 'Aadhaar Card Copy' },
    { key: 'docCollegeId', label: 'College ID Card Copy' },
    { key: 'docNoc', label: 'NOC from College (If required)' },
    { key: 'docPhoto', label: 'Passport Photo' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-emerald-500/30 selection:text-emerald-200 print:hidden">
      {/* Background Grid Effect */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-size-[2rem_2rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-50"></div>

      <header className="relative bg-slate-900 border-b border-emerald-900/50 pt-8 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center justify-center p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/30 mb-2">
            <Shield className="w-10 h-10 text-emerald-400" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Cyber Intelligence Academy
            <span className="text-emerald-500">.</span>
          </h1>
          <div className="space-y-1">
            <p className="text-lg text-emerald-400 font-medium">Cybersecurity Training & Industrial Internship Program</p>
            <p className="text-slate-400 text-sm font-mono">(For Polytechnic College Students)</p>
          </div>
          <div className="inline-block bg-slate-800/50 border border-slate-700 rounded-full px-4 py-1 text-sm text-slate-300 mt-4">
            <span className="text-emerald-500 mr-2">●</span>
            Internship Date: 20/02/2026 – 20/06/2026
          </div>
        </div>
      </header>

      <main className="relative max-w-4xl mx-auto px-4 -mt-10 pb-20">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Section 1: Personal Details */}
          <Section title="1. Student Personal Details" icon={<User className="w-5 h-5" />}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input 
                label="Full Name (As per Academic Records)" 
                name="fullName" 
                value={formData.fullName} 
                onChange={handleChange} 
                placeholder="Ex: John Doe"
                required
              />
              <Input 
                label="Father's / Mother's Name" 
                name="parentName" 
                value={formData.parentName} 
                onChange={handleChange} 
                required
              />
              <Input 
                label="Date of Birth" 
                name="dob" 
                type="date" 
                value={formData.dob} 
                onChange={handleChange} 
                required
                icon={<Calendar className="w-4 h-4 text-emerald-500" />}
              />
              <Select 
                label="Gender" 
                name="gender" 
                value={formData.gender} 
                onChange={handleChange}
                options={["Select Gender", "Male", "Female", "Other"]}
                required
              />
              <Input 
                label="Aadhaar No. (Last 4 digits)" 
                name="aadhaarLast4" 
                value={formData.aadhaarLast4} 
                onChange={handleAadhaarChange} 
                placeholder="XXXX"
                maxLength={4}
                required
                icon={<Lock className="w-4 h-4 text-emerald-500" />}
              />
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input 
                  label="Student Contact No." 
                  name="studentContact" 
                  value={formData.studentContact} 
                  onChange={handleChange} 
                  type="tel"
                  required
                />
                <Input 
                  label="Parent/Guardian Contact No." 
                  name="parentContact" 
                  value={formData.parentContact} 
                  onChange={handleChange} 
                  type="tel"
                  required
                />
              </div>
              <Input 
                label="Email ID (For Certification)" 
                name="email" 
                type="email"
                value={formData.email} 
                onChange={handleChange} 
                className="md:col-span-2"
                required
              />
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-400 mb-1">Residential Address</label>
                <textarea 
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={3}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors placeholder-slate-600"
                  required
                ></textarea>
              </div>
              
              {/* Photo Upload with Logic */}
              <div className="md:col-span-2 border-2 border-dashed border-slate-700 rounded-lg p-6 flex flex-col items-center justify-center bg-slate-900/50 hover:bg-slate-900 transition-colors group cursor-pointer relative">
                {formData.photo && formData.photo.name ? (
                  <div className="flex flex-col items-center z-10">
                    <CheckCircle className="w-8 h-8 text-emerald-500 mb-2" />
                    <span className="text-sm font-medium text-emerald-400">{formData.photo.name}</span>
                    <span className="text-xs text-slate-500 mt-1">Click to replace</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center pointer-events-none">
                    <Upload className="w-8 h-8 text-slate-500 group-hover:text-emerald-500 mb-2 transition-colors" />
                    <span className="text-sm text-slate-400 group-hover:text-slate-300">Upload Passport Size Photo</span>
                  </div>
                )}
                <input 
                  type="file" 
                  name="photo"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                  accept="image/*" 
                />
              </div>
            </div>
          </Section>

          {/* Section 2: Academic Details */}
          <Section title="2. Academic Details" icon={<GraduationCap className="w-5 h-5" />}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input 
                label="Polytechnic College Name" 
                name="collegeName" 
                value={formData.collegeName} 
                onChange={handleChange} 
                className="md:col-span-2"
                required
              />
              <Input 
                label="Branch / Department" 
                name="branch" 
                value={formData.branch} 
                onChange={handleChange} 
                required
              />
              <Input 
                label="Year / Semester" 
                name="yearSemester" 
                value={formData.yearSemester} 
                onChange={handleChange} 
                placeholder="Ex: 3rd Year / 5th Sem"
                required
              />
              <Input 
                label="Roll No. / Registration No." 
                name="rollNo" 
                value={formData.rollNo} 
                onChange={handleChange} 
                required
              />
              <Input 
                label="College ID No." 
                name="collegeIdNo" 
                value={formData.collegeIdNo} 
                onChange={handleChange} 
                required
              />
              <Input 
                label="Latest Semester Percentage / CGPA" 
                name="cgpa" 
                value={formData.cgpa} 
                onChange={handleChange} 
                required
              />
            </div>
          </Section>

          {/* Section 3: Documents Submitted */}
          <Section title="3. Documents Submitted" icon={<FileText className="w-5 h-5" />}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {documentFields.map((doc) => (
                 <label key={doc.key} className="flex items-center space-x-3 p-3 bg-slate-900 rounded-lg border border-slate-800 cursor-pointer hover:border-emerald-500/50 transition-colors">
                   <div className="relative flex items-center">
                     <input 
                       type="checkbox" 
                       name={doc.key}
                       checked={!!formData[doc.key]}
                       onChange={handleChange}
                       className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-slate-600 checked:bg-emerald-500 checked:border-emerald-500 transition-all"
                     />
                     <CheckCircle className="absolute hidden peer-checked:block text-slate-900 pointer-events-none" size={14} style={{left: '3px', top: '3px'}} />
                   </div>
                   <span className="text-slate-300">{doc.label}</span>
                 </label>
               ))}
            </div>
          </Section>

          {/* Section 4: Declaration */}
          <Section title="4. Student Declaration" icon={<Terminal className="w-5 h-5" />}>
            <div className="bg-slate-900/50 rounded-lg p-6 border border-emerald-500/20 mb-6">
              <div className="flex items-start gap-3 mb-4">
                <AlertTriangle className="text-amber-500 shrink-0 mt-1" size={20} />
                <p className="text-slate-300 leading-relaxed text-sm">
                  I hereby declare that the information provided above is true and correct to the best of my knowledge. 
                  I understand that cybersecurity tools and techniques taught during the training/internship must be used 
                  <strong className="text-emerald-400"> strictly for ethical and educational purposes only</strong>.
                </p>
              </div>
              
              <ul className="space-y-3 text-sm text-slate-400 list-disc pl-5 mb-6">
                <li>I agree not to misuse any hacking or penetration testing tools outside authorized lab environments.</li>
                <li>To maintain discipline and follow institutional code of conduct.</li>
                <li>That minimum 80% attendance is mandatory for certification.</li>
                <li>That certificate issuance is subject to successful project completion and internal evaluation.</li>
                <li>That Cyber Intelligence Academy is not responsible for misuse of knowledge acquired during training.</li>
              </ul>

              <div className="flex items-center space-x-3 mb-6 p-4 bg-emerald-900/10 rounded border border-emerald-500/30">
                <input 
                  type="checkbox" 
                  id="agree"
                  name="agreedToTerms"
                  checked={formData.agreedToTerms}
                  onChange={handleChange}
                  className="h-5 w-5 rounded border-slate-600 bg-slate-900 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-slate-900"
                />
                <label htmlFor="agree" className="text-slate-200 font-medium cursor-pointer select-none">
                  I Agree to the above terms and conditions
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-slate-400">
                    Student Signature Upload <span className="text-emerald-500">*</span>
                  </label>
                  <div className="relative w-full bg-slate-950 border border-slate-700 border-dashed rounded-lg p-2.5 flex items-center justify-center hover:border-emerald-500 hover:bg-slate-900 transition-all cursor-pointer group h-11.5">
                    {formData.signatureFile && formData.signatureFile.name ? (
                      <div className="flex items-center space-x-2 z-10">
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                        <span className="text-sm font-medium text-emerald-400 truncate max-w-50">{formData.signatureFile.name}</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2 pointer-events-none">
                        <Upload className="w-4 h-4 text-slate-500 group-hover:text-emerald-500 transition-colors" />
                        <span className="text-slate-500 text-sm group-hover:text-slate-300 transition-colors">Click to upload signature</span>
                      </div>
                    )}
                    <input 
                      type="file" 
                      name="signatureFile"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                      accept="image/*" 
                    />
                  </div>
                </div>
                <Input 
                  label="Date" 
                  name="declarationDate" 
                  type="date"
                  value={formData.declarationDate} 
                  onChange={handleChange} 
                  disabled
                  icon={<Calendar className="w-4 h-4 text-emerald-500" />}
                />
              </div>
            </div>
          </Section>

          {/* Submit Action */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between pt-6 border-t border-slate-800">
             <div className="text-xs text-slate-500">
               * Dreamworks Infotech Pvt. Ltd.
             </div>
             <button 
               type="submit"
               disabled={isSubmitting}
               className={`w-full md:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg shadow-emerald-500/20 transition-all transform hover:scale-105 active:scale-95 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
             >
               {isSubmitting ? 'Submitting...' : 'Submit Registration'}
             </button>
          </div>

        </form>
      </main>
    </div>
  );
}

// Reusable Components & Interfaces

interface SectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

function Section({ title, icon, children }: SectionProps) {
  return (
    <div className="bg-slate-800 rounded-xl shadow-xl overflow-hidden border border-slate-700 mb-6">
      <div className="bg-slate-900/80 px-6 py-4 border-b border-slate-700 flex items-center gap-3">
        <div className="p-2 bg-slate-800 rounded-lg text-emerald-400 border border-slate-700">
          {icon}
        </div>
        <h2 className="text-lg font-bold text-white uppercase tracking-wide">{title}</h2>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}

interface InputProps {
  label: string;
  name: string;
  type?: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  maxLength?: number;
}

function Input({ 
  label, 
  name, 
  type = "text", 
  value, 
  onChange, 
  placeholder = "", 
  required = false, 
  className = "", 
  disabled = false, 
  icon = null, 
  maxLength = undefined 
}: InputProps) {
  return (
    <div className={`space-y-1 ${className}`}>
      <label className="block text-sm font-medium text-slate-400">
        {label} {required && <span className="text-emerald-500">*</span>}
      </label>
      <div className="relative">
        <input 
          type={type} 
          name={name} 
          value={value} 
          onChange={onChange} 
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          maxLength={maxLength}
          className={`w-full bg-slate-950 border ${disabled ? 'border-slate-800 text-slate-500' : 'border-slate-700 text-slate-200'} rounded-lg px-3 py-2.5 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors placeholder-slate-600 scheme-dark ${icon ? 'pr-10' : ''}`}
        />
        {icon && (
          <div className="absolute right-3 top-3 pointer-events-none">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}

interface SelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  required?: boolean;
  className?: string;
}

function Select({ 
  label, 
  name, 
  value, 
  onChange, 
  options = [], 
  required = false, 
  className = "" 
}: SelectProps) {
  return (
    <div className={`space-y-1 ${className}`}>
      <label className="block text-sm font-medium text-slate-400">
        {label} {required && <span className="text-emerald-500">*</span>}
      </label>
      <div className="relative">
        <select 
          name={name} 
          value={value} 
          onChange={onChange} 
          required={required}
          className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors appearance-none"
        >
          {options.map(opt => (
            <option key={opt} value={opt === options[0] ? "" : opt} disabled={opt === options[0]}>
              {opt}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-3 pointer-events-none text-slate-500">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </div>
      </div>
    </div>
  );
}

// --- HELPER FUNCTION FOR FILE UPLOAD ---
const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};