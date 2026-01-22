'use client';
import React, { useState, useEffect, useRef, SVGProps } from 'react';
import Link from 'next/link'; // Added for navigation

// --- Types ---
interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
}

// --- Image Constant ---
const LOGO_URL = "/ChatGPT Image Jan 17, 2026, 04_21_47 PM.png";

// --- Icons ---
const IconWrapper = ({ children, size = 24, className = "", ...props }: IconProps) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
    {...props}
  >
    {children}
  </svg>
);

// Added ArrowLeft Icon
const ArrowLeft = (props: IconProps) => <IconWrapper {...props}><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></IconWrapper>;

const Shield = (props: IconProps) => <IconWrapper {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /></IconWrapper>;
const Clock = (props: IconProps) => <IconWrapper {...props}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></IconWrapper>;
const BarChart = (props: IconProps) => <IconWrapper {...props}><line x1="12" x2="12" y1="20" y2="10" /><line x1="18" x2="18" y1="20" y2="4" /><line x1="6" x2="6" y1="20" y2="16" /></IconWrapper>;
const Users = (props: IconProps) => <IconWrapper {...props}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></IconWrapper>;
const Globe = (props: IconProps) => <IconWrapper {...props}><circle cx="12" cy="12" r="10" /><line x1="2" x2="22" y1="12" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z" /></IconWrapper>;
const Award = (props: IconProps) => <IconWrapper {...props}><circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" /></IconWrapper>;
const ChevronDown = (props: IconProps) => <IconWrapper {...props}><path d="m6 9 6 6 6-6" /></IconWrapper>;
const ChevronRight = (props: IconProps) => <IconWrapper {...props}><path d="m9 18 6-6-6-6" /></IconWrapper>;
const Play = (props: IconProps) => <IconWrapper {...props}><polygon points="5 3 19 12 5 21 5 3" /></IconWrapper>;
const Target = (props: IconProps) => <IconWrapper {...props}><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></IconWrapper>;
const Megaphone = (props: IconProps) => <IconWrapper {...props}><path d="m3 11 18-5v12L3 14v-3z" /><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" /></IconWrapper>;
const FileText = (props: IconProps) => <IconWrapper {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" x2="8" y1="13" y2="13" /><line x1="16" x2="8" y1="17" y2="17" /><polyline points="10 9 9 9 8 9" /></IconWrapper>;

/**
 * COMPONENT: Hacker Background Animation
 */
const HackerBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvas3dRef = useRef<HTMLCanvasElement>(null);
  const canvasBarsRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!containerRef.current || !canvas3dRef.current || !canvasBarsRef.current) return;
    const canvas = canvas3dRef.current;
    const ctx = canvas.getContext("2d");
    const canvasBars = canvasBarsRef.current;
    const ctxBars = canvasBars.getContext("2d");
    if (!ctx || !ctxBars) return;

    let animationFrameId: number;
    const THEME_COLOR = '#06b6d4'; 
    let squares: any[] = [], focal = 300, vpx = 150, vpy = 150;

    function Point(this: any, pos: any) {
        this.x = pos.x - (canvas.width / 2 || 0);
        this.y = pos.y - (canvas.height / 2 || 0);
        this.z = pos.z || 0;
        this.cX = 0; this.cY = 0; this.cZ = 0; this.xPos = 0; this.yPos = 0;
        this.map2D();
    }
    Point.prototype.rotateZ = function (angleZ: number) {
        var cosZ = Math.cos(angleZ), sinZ = Math.sin(angleZ), x1 = this.x * cosZ - this.y * sinZ, y1 = this.y * cosZ + this.x * sinZ;
        this.x = x1; this.y = y1;
    }
    Point.prototype.map2D = function () {
        var scaleX = focal / (focal + this.z + this.cZ), scaleY = focal / (focal + this.z + this.cZ);
        this.xPos = vpx + (this.cX + this.x) * scaleX;
        this.yPos = vpy + (this.cY + this.y) * scaleY;
    };
    function Square(this: any, z: number) {
        this.width = canvas.width / 2;
        if (canvas.height < 200) this.width = 200;
        this.height = canvas.height;
        // @ts-ignore
        this.points = [new Point({ x: (canvas.width/2)-this.width, y: (canvas.height/2)-this.height, z: z }), new Point({ x: (canvas.width/2)+this.width, y: (canvas.height/2)-this.height, z: z }), new Point({ x: (canvas.width/2)+this.width, y: (canvas.height/2)+this.height, z: z }), new Point({ x: (canvas.width/2)-this.width, y: (canvas.height/2)+this.height, z: z })];
        this.dist = 0;
    }
    Square.prototype.update = function () {
        for (var p = 0; p < this.points.length; p++) {
            this.points[p].rotateZ(0.001);
            this.points[p].z -= 3;
            if (this.points[p].z < -300) this.points[p].z = 2700;
            this.points[p].map2D();
        }
    }
    Square.prototype.render = function () {
        if (!ctx) return;
        ctx.beginPath();
        ctx.moveTo(this.points[0].xPos, this.points[0].yPos);
        for (var p = 1; p < this.points.length; p++) {
            if (this.points[p].z > -(focal - 50)) ctx.lineTo(this.points[p].xPos, this.points[p].yPos);
        }
        ctx.closePath();
        ctx.stroke();
        this.dist = this.points[this.points.length - 1].z;
    };
    const resize = () => {
        if (!containerRef.current || !canvas3dRef.current || !canvasBarsRef.current) return;
        const width = containerRef.current.offsetWidth;
        const height = containerRef.current.offsetHeight;
        canvas3dRef.current.width = (width / 3) * 2; canvas3dRef.current.height = height / 3;
        canvasBarsRef.current.width = width / 3; canvasBarsRef.current.height = height / 3;
        focal = canvas3dRef.current.width / 2; vpx = canvas3dRef.current.width / 2; vpy = canvas3dRef.current.height / 2;
        if (ctx) ctx.strokeStyle = THEME_COLOR;
        if (ctxBars) { ctxBars.strokeStyle = THEME_COLOR; ctxBars.fillStyle = THEME_COLOR; }
        squares = [];
        for (var i = 0; i < 15; i++) { 
              // @ts-ignore
            squares.push(new Square(-300 + (i * 200))); 
        }
    };
    function render() {
        if (!ctx || !ctxBars || !canvas) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        squares.sort((a, b) => b.dist - a.dist);
        for (var i = 0, len = squares.length; i < len; i++) { squares[i].update(); squares[i].render(); }
        ctxBars.clearRect(0, 0, canvasBars.width, canvasBars.height);
        ctxBars.beginPath();
        var y = canvasBars.height / 6;
        ctxBars.moveTo(0, y);
        for (i = 0; i < canvasBars.width; i++) {
            var ran = (Math.random() > 0.98) ? (Math.random() * 50) - 25 : (Math.random() * 20) - 10;
            ctxBars.lineTo(i, y + ran);
        }
        ctxBars.stroke();
        animationFrameId = requestAnimationFrame(render);
    }
    resize();
    window.addEventListener('resize', resize);
    if (squares.length === 0) { 
        for (var i = 0; i < 15; i++) { 
              // @ts-ignore
            squares.push(new Square(-300 + (i * 200))); 
        } 
    }
    render();
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animationFrameId); };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden bg-black pointer-events-none opacity-40">
        <div className="absolute top-0 left-0 w-full h-[33%] flex border-b border-cyan-900/30">
            <canvas ref={canvas3dRef} className="w-2/3 h-full" />
            <canvas ref={canvasBarsRef} className="w-1/3 h-full border-l border-cyan-900/30" />
        </div>
    </div>
  );
};

// --- Module Data Structure ---
interface ModuleData {
    title: string;
    items?: string[];
    isQuiz?: boolean;
}

const workshopSessions: ModuleData[] = [
    { 
        title: "Session 1: The Human Firewall",
        items: [
            "1.1. Introduction to Social Engineering",
            "1.2. The Psychology of Manipulation",
            "1.3. Real-world Case Studies: CEO Fraud",
            "1.4. Interactive Roleplay: Spot the Scammer"
        ]
    },
    { 
        title: "Session 2: Phishing & Email Security",
        items: [
            "2.1. Anatomy of a Phishing Email",
            "2.2. Spear Phishing vs. Whaling",
            "2.3. URL Analysis and Header Inspection",
            "2.4. Workshop: Live Phishing Simulation Analysis",
            "2.5. Assessment: Phishing ID Challenge"
        ]
    },
    { 
        title: "Session 3: Digital Hygiene & Passwords",
        items: [
            "3.1. Creating Unbreakable Passwords",
            "3.2. Multi-Factor Authentication (MFA)",
            "3.3. Update Management and Patching",
            "3.4. Secure Browsing Habits",
            "3.5. Practical Lab: Password Manager Setup"
        ]
    },
    { 
        title: "Session 4: Remote Work & Mobile Security",
        items: [
            "4.1. Securing Home Wi-Fi Networks",
            "4.2. Risks of Public Wi-Fi",
            "4.3. Mobile Device Management (MDM)",
            "4.4. Lost or Stolen Devices Protocols",
            "4.5. Quiz: Remote Security Best Practices"
        ]
    },
    { 
        title: "Session 5: Incident Reporting & Culture",
        items: [
            "5.1. When to Report an Incident",
            "5.2. How to Report Suspicious Activity",
            "5.3. Building a 'No Blame' Security Culture",
            "5.4. Final Workshop: Crisis Response Simulation"
        ]
    },
    { 
        title: "Certification & Wrap Up",
        items: [
            "Security Awareness Pledge",
            "Final Awareness Assessment",
            "Certificate Distribution"
        ]
    }
];

// --- Module Component ---
const ModuleItem = ({ module }: { module: ModuleData }) => {
    const [isOpen, setIsOpen] = useState(false);
    const hasItems = module.items && module.items.length > 0;

    return (
        <div className="border border-white/5 rounded-lg overflow-hidden transition-all bg-slate-900/40 hover:bg-slate-900/60 mb-3">
            <button 
                onClick={() => hasItems && setIsOpen(!isOpen)} 
                className={`w-full flex items-center p-4 text-left transition-colors ${isOpen ? 'bg-slate-800/50' : ''} ${!hasItems ? 'cursor-default' : 'cursor-pointer'}`}
            >
                <div className={`p-2 rounded mr-4 ${isOpen ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-slate-400'}`}>
                    {hasItems ? <FileText size={16} /> : <Play size={16} />}
                </div>
                
                <div className="flex-1">
                    <h4 className={`text-sm font-mono font-bold ${isOpen ? 'text-cyan-400' : 'text-slate-300'}`}>{module.title}</h4>
                </div>
                
                {hasItems && (
                    <ChevronDown size={16} className={`text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-cyan-400' : ''}`} />
                )}
            </button>

            {hasItems && (
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="p-2 bg-black/20 border-t border-white/5">
                        {module.items?.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3 py-2 px-4 hover:bg-white/5 rounded text-sm text-slate-400 transition-colors">
                                <div className={`w-1.5 h-1.5 rounded-full ${item.toLowerCase().includes('lab') || item.toLowerCase().includes('simulation') ? 'bg-emerald-500' : 'bg-cyan-900'}`} />
                                <span className={item.toLowerCase().includes('lab') || item.toLowerCase().includes('simulation') ? 'text-white font-semibold' : ''}>
                                    {item}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

// --- Stats Pill ---
const StatPill = ({ icon: Icon, label, value }: { icon: any, label: string, value: string }) => (
    <div className="flex items-center gap-3 px-5 py-3 bg-slate-900/50 backdrop-blur border border-white/10 rounded-lg">
        <Icon size={18} className="text-cyan-400" />
        <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">{label}</span>
            <span className="text-sm font-bold text-white">{value}</span>
        </div>
    </div>
);

/**
 * MAIN PAGE: Workshops & Awareness
 */
export default function AwarenessPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-slate-200 font-sans selection:bg-cyan-900/50 selection:text-cyan-100 overflow-x-hidden">
      
      {/* HEADER NAV */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
             {/* ADDED: Back to Home Button */}
             <Link href="/" className="flex items-center justify-center p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 text-slate-400 hover:text-white transition-all group">
                <ArrowLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
             </Link>

             <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center border border-white/10 overflow-hidden relative">
                     <img src={LOGO_URL} alt="Logo" className="w-full h-full object-cover"/>
                 </div>
                 <div className="leading-tight hidden sm:block">
                   <h1 className="text-lg font-bold text-white tracking-tight">CYBER</h1>
                   <span className="text-[9px] text-cyan-500 font-bold uppercase tracking-widest">Intelligence Academy</span>
                 </div>
             </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-sm font-bold text-slate-400 hover:text-white transition-colors">Course Catalog</button>
            <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-bold text-white hover:bg-white/10 transition-colors">Log In</button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden border-b border-white/5">
         <HackerBackground />
         <div className="container mx-auto relative z-10">
            <div className="max-w-4xl">
                {/* Breadcrumb / Tag */}
                <div className="inline-flex items-center gap-2 mb-6">
                    <span className="px-3 py-1 rounded bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
                        Corporate Training
                    </span>
                    <ChevronRight size={12} className="text-slate-600"/>
                    <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Security Awareness</span>
                </div>

                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                    Workshops & <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500">Awareness</span>
                </h1>
                
                <p className="text-lg text-slate-300 mb-8 max-w-2xl leading-relaxed">
                    Transform your workforce into your strongest line of defense. Our interactive workshops and simulations are designed to build a resilient security culture and combat social engineering.
                </p>

                <div className="flex flex-wrap gap-4 mb-10">
                    <StatPill icon={Users} label="Trained" value="50,000+" />
                    <StatPill icon={Clock} label="Duration" value="2 Days / Flexible" />
                    <StatPill icon={Target} label="Simulations" value="Live Phishing" />
                    <StatPill icon={Globe} label="Delivery" value="On-Site & Virtual" />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <button className="px-8 py-4 bg-cyan-600 text-black font-bold rounded-lg hover:bg-cyan-500 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:-translate-y-1">
                        Book a Workshop
                    </button>
                    <button className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold rounded-lg hover:bg-white/5 transition-all flex items-center gap-2">
                        <Play size={18} />
                        View Demo
                    </button>
                </div>
            </div>
         </div>
      </section>

      {/* MAIN CONTENT GRID */}
      <section className="py-16 px-6">
          <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* LEFT COLUMN (Content) */}
              <div className="lg:col-span-8 space-y-16">
                  
                  {/* About */}
                  <div>
                      <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                          <Megaphone className="text-cyan-500" size={24}/> 
                          Program Description
                      </h3>
                      <div className="prose prose-invert prose-slate max-w-none text-slate-400 leading-relaxed">
                          <p className="mb-4">
                              Technical controls alone cannot stop every cyber threat. Over 90% of data breaches start with a human error or social engineering attack. The <strong>Cyber Intelligence Academy Awareness Program</strong> is designed to mitigate this risk by educating employees on the latest threats.
                          </p>
                          <p>
                              Unlike standard compliance training, our workshops are <strong>interactive, gamified, and impact-driven</strong>. We utilize real-world phishing simulations, role-playing scenarios, and live hacking demonstrations to show—not just tell—why security matters.
                          </p>
                      </div>
                  </div>

                  {/* Skills */}
                  <div>
                      <h3 className="text-xl font-bold text-white mb-6">Key Takeaways</h3>
                      <div className="flex flex-wrap gap-3">
                          {["Phishing Identification", "Social Engineering Defense", "Password Hygiene", "Incident Reporting", "Clean Desk Policy", "Safe Browsing", "Device Security"].map((skill) => (
                              <span key={skill} className="px-4 py-2 rounded-full bg-slate-900 border border-cyan-900/50 text-cyan-300 text-sm font-medium shadow-sm">
                                  {skill}
                              </span>
                          ))}
                      </div>
                  </div>

                  {/* Curriculum */}
                  <div>
                        <h3 className="text-2xl font-bold text-white mb-6">Workshop Agenda</h3>
                        <div className="space-y-1">
                            {workshopSessions.map((mod, idx) => (
                                <ModuleItem key={idx} module={mod} />
                            ))}
                        </div>
                  </div>

                  {/* Badges */}
                  <div className="bg-linear-to-r from-slate-900 to-slate-900/50 border border-cyan-900/30 rounded-2xl p-8 flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2">Organization Verified</h3>
                            <p className="text-slate-400 text-sm">Employees receive a "Security Champion" badge upon successful completion of the workshop series.</p>
                        </div>
                        <div className="w-16 h-16 bg-cyan-900/20 rounded-full flex items-center justify-center border-2 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                            <Shield size={32} className="text-cyan-400" />
                        </div>
                  </div>

              </div>

              {/* RIGHT COLUMN (Sidebar) */}
              <div className="lg:col-span-4">
                  <div className="sticky top-28 space-y-6">
                      
                      {/* At a Glance Card */}
                      <div className="bg-slate-900/80 backdrop-blur border border-white/10 rounded-2xl p-6 shadow-xl">
                          <h4 className="text-white font-bold mb-4">Training Details</h4>
                          <div className="space-y-4">
                              <div className="flex justify-between items-center py-2 border-b border-white/5">
                                  <span className="text-slate-400 text-sm">Pricing</span>
                                  <span className="text-white font-bold">Contact Sales</span>
                              </div>
                              <div className="flex justify-between items-center py-2 border-b border-white/5">
                                  <span className="text-slate-400 text-sm">Format</span>
                                  <span className="text-white font-bold text-right">Workshop / Webinar</span>
                              </div>
                              <div className="flex justify-between items-center py-2 border-b border-white/5">
                                  <span className="text-slate-400 text-sm">Audience</span>
                                  <span className="text-white font-bold">All Employees</span>
                              </div>
                              <div className="flex justify-between items-center py-2 border-b border-white/5">
                                  <span className="text-slate-400 text-sm">Language</span>
                                  <span className="text-white font-bold">English / Regional</span>
                              </div>
                          </div>
                          <button className="w-full mt-6 py-3 bg-white text-black font-bold rounded hover:bg-slate-200 transition-colors">
                              Request Quote
                          </button>
                      </div>

                      {/* Training Kit */}
                      <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-6">
                          <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                              <Target size={16} className="text-slate-500"/> Included Resources
                          </h4>
                          <ul className="space-y-3">
                              {["Phishing Simulator Access", "Employee Handbooks", "Security Posters & Assets", "Monthly Newsletter Templates"].map((item, i) => (
                                  <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                                      <div className="mt-1.5 w-1 h-1 bg-cyan-500 rounded-full shrink-0" />
                                      {item}
                                  </li>
                              ))}
                          </ul>
                      </div>

                  </div>
              </div>
          </div>
      </section>
      
      {/* FOOTER */}
      <footer className="bg-black border-t border-white/10 py-12 text-sm text-slate-400">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
             <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded bg-slate-800 border border-white/10 overflow-hidden flex items-center justify-center">
                    <img src={LOGO_URL} alt="Logo" className="w-full h-full object-cover"/>
                 </div>
                 <span className="font-bold text-white">CYBER INTELLIGENCE ACADEMY</span>
             </div>
             <div className="text-xs text-slate-500">
                 © 2024. All rights reserved.
             </div>
          </div>
        </div>
      </footer>

    </div>
  );
}