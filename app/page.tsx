'use client';
import React, { useState, useEffect, useRef, SVGProps } from 'react';
import Link from "next/link";

// --- Types ---
interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  children?: React.ReactNode;
}

// --- Image Constant ---
// Note: Ensure this file exists in your 'public' folder. 
// We use forward slashes for web paths.
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

const Shield = (props: IconProps) => <IconWrapper {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /></IconWrapper>;
const Terminal = (props: IconProps) => <IconWrapper {...props}><polyline points="4 17 10 11 4 5" /><line x1="12" x2="20" y1="19" y2="19" /></IconWrapper>;
const Briefcase = (props: IconProps) => <IconWrapper {...props}><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></IconWrapper>;
const Globe = (props: IconProps) => <IconWrapper {...props}><circle cx="12" cy="12" r="10" /><line x1="2" x2="22" y1="12" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z" /></IconWrapper>;
const ChevronRight = (props: IconProps) => <IconWrapper {...props}><path d="m9 18 6-6-6-6" /></IconWrapper>;
const Play = (props: IconProps) => <IconWrapper {...props}><polygon points="5 3 19 12 5 21 5 3" /></IconWrapper>;
const Award = (props: IconProps) => <IconWrapper {...props}><circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" /></IconWrapper>;
const Menu = (props: IconProps) => <IconWrapper {...props}><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></IconWrapper>;
const X = (props: IconProps) => <IconWrapper {...props}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></IconWrapper>;
const Zap = (props: IconProps) => <IconWrapper {...props}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></IconWrapper>;
const CheckCircle = (props: IconProps) => <IconWrapper {...props}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></IconWrapper>;
const Layers = (props: IconProps) => <IconWrapper {...props}><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></IconWrapper>;
const Lock = (props: IconProps) => <IconWrapper {...props}><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></IconWrapper>;

/**
 * COMPONENT: Hacker Background Animation
 */
const HackerBackground = () => {
  // Fix: Explicitly type refs to allow .getContext()
  const containerRef = useRef<HTMLDivElement>(null);
  const canvas3dRef = useRef<HTMLCanvasElement>(null);
  const canvasBarsRef = useRef<HTMLCanvasElement>(null);
  const consoleRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Null safety checks - Critical for TS environments
    if (!containerRef.current || !canvas3dRef.current || !canvasBarsRef.current || !consoleRef.current) {
        return;
    }

    const canvas = canvas3dRef.current;
    const ctx = canvas.getContext("2d");
    const canvasBars = canvasBarsRef.current;
    const ctxBars = canvasBars.getContext("2d");
    const outputConsole = consoleRef.current;
    const container = containerRef.current;

    if (!ctx || !ctxBars) return;

    let animationFrameId: number;
    // FIX: Use ReturnType<typeof setTimeout> to handle both NodeJS and Browser environments safely
    let timeoutId: ReturnType<typeof setTimeout>;

    // Configuration
    const THEME_COLOR = '#06b6d4'; // Cyan-500
    const THEME_COLOR_DIM = '#0e7490'; // Cyan-700
    
    // Initialize Logic Variables with defaults to avoid NaN issues
    let squares: any[] = [], 
        focal = 300, 
        vpx = 150, 
        vpy = 150, 
        barVals: any[] = [], 
        sineVal = 0;

    // --- 3D Logic Helpers ---
    // Fix: Add ': any' to internal legacy class parameters to suppress implicit any errors
    function Point(this: any, pos: any) {
        this.x = pos.x - (canvas.width / 2 || 0);
        this.y = pos.y - (canvas.height / 2 || 0);
        this.z = pos.z || 0;
        this.cX = 0;
        this.cY = 0;
        this.cZ = 0;
        this.xPos = 0;
        this.yPos = 0;
        this.map2D();
    }

    Point.prototype.rotateZ = function (angleZ: number) {
        var cosZ = Math.cos(angleZ),
            sinZ = Math.sin(angleZ),
            x1 = this.x * cosZ - this.y * sinZ,
            y1 = this.y * cosZ + this.x * sinZ;
        this.x = x1;
        this.y = y1;
    }

    Point.prototype.map2D = function () {
        var scaleX = focal / (focal + this.z + this.cZ),
            scaleY = focal / (focal + this.z + this.cZ);
        this.xPos = vpx + (this.cX + this.x) * scaleX;
        this.yPos = vpy + (this.cY + this.y) * scaleY;
    };

    function Square(this: any, z: number) {
        this.width = canvas.width / 2;
        if (canvas.height < 200) this.width = 200;
        this.height = canvas.height;
        z = z || 0;

        // @ts-ignore - Ignoring construct signature error for legacy internal class
        this.points = [
            new (Point as any)({ x: (canvas.width / 2) - this.width, y: (canvas.height / 2) - this.height, z: z }),
            new (Point as any)({ x: (canvas.width / 2) + this.width, y: (canvas.height / 2) - this.height, z: z }),
            new (Point as any)({ x: (canvas.width / 2) + this.width, y: (canvas.height / 2) + this.height, z: z }),
            new (Point as any)({ x: (canvas.width / 2) - this.width, y: (canvas.height / 2) + this.height, z: z })
        ];
        this.dist = 0;
    }

    Square.prototype.update = function () {
        for (var p = 0; p < this.points.length; p++) {
            this.points[p].rotateZ(0.001);
            this.points[p].z -= 3;
            if (this.points[p].z < -300) {
                this.points[p].z = 2700;
            }
            this.points[p].map2D();
        }
    }

    Square.prototype.render = function () {
        if (!ctx) return;
        ctx.beginPath();
        ctx.moveTo(this.points[0].xPos, this.points[0].yPos);
        for (var p = 1; p < this.points.length; p++) {
            if (this.points[p].z > -(focal - 50)) {
                ctx.lineTo(this.points[p].xPos, this.points[p].yPos);
            }
        }
        ctx.closePath();
        ctx.stroke();
        this.dist = this.points[this.points.length - 1].z;
    };

    // Resize handler
    const resize = () => {
        // Double check refs are still valid in case of unmount during resize
        if (!containerRef.current || !canvas3dRef.current || !canvasBarsRef.current) return;
        
        const width = containerRef.current.offsetWidth;
        const height = containerRef.current.offsetHeight;

        // Prevent division by zero or NaN issues if hidden
        if (width === 0 || height === 0) return;

        canvas3dRef.current.width = (width / 3) * 2;
        canvas3dRef.current.height = height / 3;

        canvasBarsRef.current.width = width / 3;
        canvasBarsRef.current.height = height / 3;

        // Reset logic variables
        focal = canvas3dRef.current.width / 2;
        vpx = canvas3dRef.current.width / 2;
        vpy = canvas3dRef.current.height / 2;
        
        if (ctx) ctx.strokeStyle = THEME_COLOR;
        if (ctxBars) {
            ctxBars.strokeStyle = THEME_COLOR;
            ctxBars.fillStyle = THEME_COLOR;
        }

        // REGENERATE SQUARES on resize to prevent 3D distortion
        squares = [];
        for (var i = 0; i < 15; i++) {
             // @ts-ignore
            squares.push(new Square(-300 + (i * 200)));
        }
    };

    // --- Render Loop ---
    function render() {
        if (!ctx || !ctxBars || !canvas) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Render 3D Tunnel
        squares.sort((a, b) => b.dist - a.dist);
        for (var i = 0, len = squares.length; i < len; i++) {
            squares[i].update();
            squares[i].render();
        }

        // Render Bars
        ctxBars.clearRect(0, 0, canvasBars.width, canvasBars.height);
        ctxBars.beginPath();
        var y = canvasBars.height / 6;
        ctxBars.moveTo(0, y);
        
        for (i = 0; i < canvasBars.width; i++) {
            var ran = (Math.random() * 20) - 10;
            if (Math.random() > 0.98) {
                ran = (Math.random() * 50) - 25;
            }
            ctxBars.lineTo(i, y + ran);
        }
        ctxBars.stroke();

        for (i = 0; i < canvasBars.width; i += 20) {
            if (!barVals[i]) {
                barVals[i] = {
                    val: Math.random() * (canvasBars.height / 2),
                    freq: 0.1,
                    sineVal: Math.random() * 100
                };
            }
            barVals[i].sineVal += barVals[i].freq;
            barVals[i].val += Math.sin(barVals[i].sineVal * Math.PI / 2) * 5;
            ctxBars.fillStyle = THEME_COLOR;
            ctxBars.fillRect(i + 5, canvasBars.height, 15, -barVals[i].val);
        }

        animationFrameId = requestAnimationFrame(render);
    }

    // --- Console Output Logic ---
    const commandStart = ['Initiating VAPT Protocol for ', 'Tracing IP ', 'Decrypting Handshake ', 'Locating Node ', 'Injecting Payload ', 'Requesting Root Access: ', 'nmap -sV ', 'cat /etc/shadow ', 'DreamWorks Proxy: ', 'Compiling Exploit ', 'Downloading '];
    const commandParts = ['Target_Server_Alpha', '192.168.X.X', 'Secure Hash', 'Firewall Bypass', '... Buffering ...', 'root@sys-admin', 'SQL Injection Vector'];
    const commandResponses = ['Access Granted.', 'Connection Established.', 'Handshake Successful.', 'Packet Loss Detected...', 'Encryption Failed, Retrying...', 'Root Access Denied.', 'Proxy Chained.', 'Analyzing Network Topography...', 'Wormhole Opened...'];
    
    let isProcessing = false;
    let processTime = 0;
    let lastProcess = 0;

    function consoleOutput() {
        if (!outputConsole || !container) return;
        
        // FIX: Explicitly type as HTMLElement to accommodate both <p> and <span>
        let textEl: HTMLElement = document.createElement('p');

        textEl.style.margin = '0';
        textEl.style.fontFamily = "'Source Code Pro', monospace";
        textEl.style.fontSize = '12px';
        textEl.style.color = THEME_COLOR_DIM;
        textEl.style.textShadow = `0 0 5px ${THEME_COLOR_DIM}`;
        
        if (isProcessing) {
            textEl = document.createElement('span');
            textEl.style.color = THEME_COLOR;
            textEl.textContent += Math.random() + " ";
            if (Date.now() > lastProcess + processTime) {
                isProcessing = false;
            }
        } else {
            var commandType = ~~(Math.random() * 4);
            switch (commandType) {
                case 0:
                    textEl.textContent = commandStart[~~(Math.random() * commandStart.length)] + commandParts[~~(Math.random() * commandParts.length)];
                    break;
                case 3:
                    isProcessing = true;
                    processTime = ~~(Math.random() * 5000);
                    lastProcess = Date.now();
                    break;
                default:
                    textEl.textContent = commandResponses[~~(Math.random() * commandResponses.length)];
                    break;
            }
        }

        outputConsole.scrollTop = outputConsole.scrollHeight;
        outputConsole.appendChild(textEl);

        if (outputConsole.scrollHeight > container.offsetHeight) {
            var removeNodes = outputConsole.querySelectorAll('*');
            for (var n = 0; n < ~~(removeNodes.length / 3); n++) {
                if(removeNodes[n].parentNode === outputConsole) {
                   outputConsole.removeChild(removeNodes[n]);
                }
            }
        }
        
        timeoutId = setTimeout(consoleOutput, ~~(Math.random() * 200));
    }

    // Initialization
    resize();
    window.addEventListener('resize', resize);
    
    // Initial generation is handled by resize() now to ensure correct dimensions
    if (squares.length === 0) {
         for (var i = 0; i < 15; i++) {
             // @ts-ignore
            squares.push(new Square(-300 + (i * 200)));
        }
    }
    
    render();
    consoleOutput();

    return () => {
        window.removeEventListener('resize', resize);
        cancelAnimationFrame(animationFrameId);
        clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden bg-black pointer-events-none opacity-60">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;600&display=swap');
        `}</style>
        {/* Top 1/3: Graphics */}
        <div className="absolute top-0 left-0 w-full h-[33%] flex border-b border-cyan-900/30">
            <canvas ref={canvas3dRef} className="w-2/3 h-full" />
            <canvas ref={canvasBarsRef} className="w-1/3 h-full border-l border-cyan-900/30" />
        </div>
        {/* Bottom 2/3: Console */}
        <div 
            ref={consoleRef} 
            className="absolute top-[33%] left-0 w-full h-[67%] bg-black/90 p-4 overflow-hidden font-mono"
            style={{ maskImage: 'linear-gradient(to bottom, transparent, black 10%)' }}
        >
        </div>
        {/* Scanlines Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none z-10" />
    </div>
  );
};

/**
 * COMPONENT: Background Blobs (Cyan/Blue Theme) - Kept for other sections
 */
const GradientBackground = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-black">
    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[100px] animate-pulse" />
    <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-cyan-900/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-950/20 rounded-full blur-[100px]" />
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" />
  </div>
);

/**
 * COMPONENT: Course Card (Cyan/Glass)
 */
interface CourseCardProps {
    title: string;
    level: string;
    price: string;
    tags: string[];
    icon: React.ComponentType<IconProps>;
    features: string[];
}

const CourseCard = ({ title, level, price, tags, icon: Icon, features }: CourseCardProps) => (
  <div className="group relative bg-slate-900/60 backdrop-blur-md border border-cyan-900/30 rounded-2xl p-6 hover:bg-slate-800/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-900/20 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    <div className="relative z-10 h-full flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <div className="p-3 bg-gradient-to-br from-slate-800 to-black rounded-xl border border-cyan-500/20 shadow-lg group-hover:scale-110 transition-transform duration-300 group-hover:border-cyan-400/50">
          <Icon size={24} className="text-cyan-400" />
        </div>
        <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${
          level === 'Beginner' ? 'border-emerald-500/30 text-emerald-400 bg-emerald-950/30' :
          level === 'Advanced' ? 'border-cyan-500/30 text-cyan-400 bg-cyan-950/30' :
          'border-indigo-500/30 text-indigo-400 bg-indigo-950/30'
        }`}>
          {level}
        </span>
      </div>
      
      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">{title}</h3>
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, idx) => (
          <span key={idx} className="text-xs text-slate-400 font-medium">#{tag}</span>
        ))}
      </div>

      <div className="text-sm text-slate-400 mb-6 flex-grow">
        <ul className="space-y-1">
          {features && features.map((f, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-cyan-500 mt-1">›</span> {f}
            </li>
          ))}
        </ul>
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
        <span className="text-2xl font-bold text-white tracking-tight">{price}</span>
        <button className="p-2 rounded-full bg-white/5 hover:bg-cyan-600 hover:text-black text-slate-400 transition-colors">
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  </div>
);

/**
 * COMPONENT: Feature Grid Item
 */
interface FeatureItemProps {
    icon: React.ComponentType<IconProps>;
    title: string;
    desc: string;
}

const FeatureItem = ({ icon: Icon, title, desc }: FeatureItemProps) => (
  <div className="flex flex-col p-6 rounded-2xl bg-slate-900/40 border border-white/5 hover:border-cyan-500/30 hover:bg-slate-900/60 transition-all group">
    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-600 to-blue-800 flex items-center justify-center mb-4 shadow-lg shadow-cyan-900/20 group-hover:scale-110 transition-transform">
      <Icon size={24} className="text-white" />
    </div>
    <h4 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{title}</h4>
    <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
  </div>
);

/**
 * MAIN APP COMPONENT
 */
export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const terminalWindowRef = useRef<HTMLDivElement>(null);

  // --- Anime.js Animation Logic ---
  useEffect(() => {
    // Dynamically load anime.js
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js';
    script.async = true;
    script.onload = () => {
      const anime = (window as any).anime;
      if (anime && terminalWindowRef.current) {
        // Timeline for Terminal Appearance
        const tl = anime.timeline({
          easing: 'easeOutExpo',
          duration: 750
        });

        tl
        // 1. Terminal Window pop in
        .add({
          targets: terminalWindowRef.current,
          scale: [0.9, 1],
          opacity: [0, 1],
          duration: 800
        })
        // 2. Window dots (traffic lights) staggered pop in
        .add({
          targets: '.terminal-dot',
          scale: [0, 1],
          delay: anime.stagger(100)
        }, '-=400')
        // 3. Title sliding in
        .add({
          targets: '.terminal-title',
          opacity: [0, 1],
          translateX: [-20, 0],
          duration: 600
        }, '-=400')
        // 4. Sidebar items slide in
        .add({
            targets: '.terminal-sidebar-item',
            opacity: [0, 1],
            translateX: [-10, 0],
            delay: anime.stagger(100)
        }, '-=200')
        // 5. Terminal lines output (simulate typing/loading)
        .add({
            targets: '.terminal-line',
            opacity: [0, 1],
            translateY: [10, 0],
            delay: anime.stagger(300)
        }, '-=100')
        // 6. Stats pop in
        .add({
            targets: '.terminal-stat',
            scale: [0.8, 1],
            opacity: [0, 1],
            delay: anime.stagger(100)
        }, '-=200')
        // 7. Success message pulse
        .add({
            targets: '.terminal-success',
            opacity: [0, 1],
            scale: [0.9, 1],
            duration: 800
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const courses = [
    { 
      title: "Cybersecurity Fundamentals", 
      level: "Beginner", 
      price: "₹11,999", 
      tags: ["Networking", "Defense", "Basics"], 
      icon: Shield,
      features: ["Secure Networking", "Threat Detection", "Risk Management"]
    },
    { 
      title: "VAPT / Ethical Hacking", 
      level: "Advanced", 
      price: "₹14,999", 
      tags: ["Pentesting", "Web", "Network"], 
      icon: Terminal,
      features: ["Vulnerability Assessment", "Web App Pentesting", "Reporting & Risk"]
    },
    { 
      title: "IS Audit & Compliance", 
      level: "Intermediate", 
      price: "₹13,499", 
      tags: ["ISO 27001", "RBI", "CERT-In"], 
      icon: Briefcase,
      features: ["ISO 27001 Controls", "Banking Audit Overview", "IT General Controls (ITGC)"]
    },
    { 
      title: "Workshops & Awareness", 
      level: "All Levels", 
      price: "₹2,999", 
      tags: ["Phishing", "AI", "Career"], 
      icon: Globe,
      features: ["AI in Cybersecurity", "Social Engineering", "Career Guidance"]
    }
  ];

  return (
    <div className="min-h-screen bg-black text-slate-200 font-sans selection:bg-cyan-900/50 selection:text-cyan-100 overflow-x-hidden">
      <GradientBackground />

      {/* NAVBAR */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/90 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center shadow-lg shadow-cyan-600/20 overflow-hidden border border-white/10 relative z-50">
               {/* MODIFIED: LOGO IMAGE HERE */}
              <img 
                src={LOGO_URL}
                alt="Cyber Intelligence Academy Logo"
                className="w-full h-full "
              />
            </div>
            <div className="leading-tight">
              <h1 className="text-xl font-bold text-white tracking-tight">CYBER</h1>
              <span className="text-[10px] text-cyan-500 font-bold uppercase tracking-widest">Intelligence Academy</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center bg-slate-900/50 backdrop-blur-md rounded-full px-2 py-1.5 border border-white/5">
            {['Home', 'Training', 'Workshops', 'Corporate', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="px-5 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors hover:bg-white/5 rounded-full">
                {item}
              </a>
            ))}
          </div>
<div className="hidden md:flex items-center gap-4">
  {/* Replaced button with Link for navigation */}
  <Link 
    href="/login" 
    className="text-sm font-semibold text-white hover:text-cyan-400 transition-colors"
  >
    Log In
  </Link>

  {/* Replaced button with Link pointing to /signup */}
  <Link 
    href="/register" 
    className="px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-sm rounded-lg hover:from-cyan-500 hover:to-blue-500 transition-all hover:scale-105 shadow-lg shadow-cyan-900/20"
  >
    Get Started
  </Link>
</div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black pt-24 px-6 md:hidden">
          <div className="flex flex-col gap-6">
            {['Home', 'Training', 'Workshops', 'Corporate', 'Contact'].map((item) => (
              <a key={item} href="#" className="text-2xl font-bold text-white hover:text-cyan-500 border-b border-white/5 pb-4">
                {item}
              </a>
            ))}
            <button className="w-full py-4 bg-cyan-600 text-white font-bold rounded-xl mt-4">
              Access Portal
            </button>
          </div>
        </div>
      )}

      {/* HERO SECTION WITH HACKER BACKGROUND */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden border-b border-white/5">
        {/* The New Hacker Animation Background */}
        <HackerBackground />

        {/* Hero Content - Overlayed on top */}
        <div className="container mx-auto relative z-10 text-center pt-12 md:pt-0">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur border border-cyan-500/40 text-cyan-300 text-xs font-semibold mb-8 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            Training Partner of DreamWorks Infotech Pvt. Ltd.
          </div>
          
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-8 tracking-tight leading-[1.1] drop-shadow-2xl">
            Unlock the Power of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">
              Cyber Intelligence
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed drop-shadow-md bg-black/20 p-4 rounded-xl backdrop-blur-sm border border-white/5">
            Industry-Aligned Training | Elite Tactical Skills | Global Compliance.<br/>
            Master the art of digital defense with our expert-led, hands-on ecosystem.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-4 bg-cyan-600 text-black font-bold rounded-xl hover:bg-cyan-500 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]">
              Start Your Journey
            </button>
            <button className="px-8 py-4 bg-black/60 backdrop-blur-md border border-cyan-500/30 text-white font-bold rounded-xl hover:bg-slate-900 transition-all flex items-center justify-center gap-2 hover:-translate-y-1 group hover:border-cyan-400/60">
              <Play size={18} className="fill-current group-hover:text-cyan-500 transition-colors" />
              Explore Programs
            </button>
          </div>
        </div>
      </section>

      {/* DASHBOARD PREVIEW SECTION */}
      <section className="relative -mt-20 mb-24 px-6 z-20 pointer-events-none md:pointer-events-auto">
        <div className="container mx-auto">
          <div className="relative rounded-2xl bg-slate-900 border border-white/10 p-2 shadow-2xl shadow-cyan-900/20 transform md:rotate-x-12 md:perspective-[2000px]">
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-2xl pointer-events-none" />
            
            {/* TERMINAL WINDOW - Ref attached here for Anime.js */}
            <div ref={terminalWindowRef} className="bg-black rounded-xl overflow-hidden aspect-[16/9] md:aspect-[21/9] relative border border-slate-800 opacity-0">
              
              {/* Fake UI Header */}
              <div className="h-10 bg-slate-900 border-b border-white/5 flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                  <div className="terminal-dot w-3 h-3 rounded-full bg-slate-600" />
                  <div className="terminal-dot w-3 h-3 rounded-full bg-slate-700" />
                  <div className="terminal-dot w-3 h-3 rounded-full bg-slate-700" />
                </div>
                <div className="ml-4 h-5 w-64 bg-slate-800 rounded-md flex items-center px-2">
                  <span className="terminal-title text-[10px] text-slate-500 font-mono inline-block opacity-0">cia-intel-terminal -- bash</span>
                </div>
              </div>

              {/* Fake UI Body */}
              <div className="p-6 grid grid-cols-12 gap-6 h-full font-mono text-sm">
                <div className="col-span-3 hidden md:block space-y-4 border-r border-white/5 pr-4">
                   <div className="h-4 w-1/2 bg-slate-800 rounded-lg mb-4" />
                   <div className="space-y-2">
                     <div className="terminal-sidebar-item h-8 w-full bg-cyan-900/20 border-l-2 border-cyan-500 flex items-center px-2 text-cyan-400 opacity-0">./threat_intel.sh</div>
                     <div className="terminal-sidebar-item h-8 w-full text-slate-600 flex items-center px-2 opacity-0">./network_map</div>
                     <div className="terminal-sidebar-item h-8 w-full text-slate-600 flex items-center px-2 opacity-0">./compliance_audit</div>
                     <div className="terminal-sidebar-item h-8 w-full text-slate-600 flex items-center px-2 opacity-0">./logs_analysis</div>
                   </div>
                </div>
                <div className="col-span-12 md:col-span-9">
                   <div className="h-full bg-slate-900/30 rounded-xl border border-white/5 p-4 relative overflow-hidden">
                     {/* Scan Line Effect */}
                     <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent h-full w-full animate-scan pointer-events-none" />
                     
                     <div className="terminal-line text-emerald-500 mb-2 opacity-0">analyst@cia-node-01:~$ ./initiate_scan --target=all</div>
                     <div className="terminal-line text-slate-400 opacity-0">Initializing Cyber Intelligence Protocol v4.2...</div>
                     <div className="terminal-line text-slate-400 mt-2 opacity-0">SCANNING NETWORK TOPOLOGY...</div>
                     <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="terminal-stat p-3 bg-slate-950 border border-white/10 rounded opacity-0">
                            <div className="text-xs text-slate-500 mb-1">THREAT LEVEL</div>
                            <div className="text-lg text-yellow-500 font-bold">MODERATE</div>
                        </div>
                        <div className="terminal-stat p-3 bg-slate-950 border border-white/10 rounded opacity-0">
                            <div className="text-xs text-slate-500 mb-1">NODES ACTIVE</div>
                            <div className="text-lg text-cyan-500 font-bold">1,024</div>
                        </div>
                     </div>
                     <div className="terminal-success mt-4 text-cyan-400 animate-pulse flex items-center gap-2 opacity-0">
                        <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
                        INTELLIGENCE GATHERING COMPLETE
                     </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY US SECTION */}
      <section className="py-24 bg-slate-900/30">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Why <span className="text-cyan-500">Cyber Intelligence Academy?</span></h2>
            <p className="text-slate-400 text-lg">
              Bridging the gap between academic theory and operational warfare. We forge the next generation of cyber defenders.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureItem 
              icon={Layers} 
              title="Tactical Curriculum" 
              desc="Designed with direct input from defense contractors and DreamWorks Infotech protocols." 
            />
            <FeatureItem 
              icon={Terminal} 
              title="Hands-On Labs" 
              desc="Deploy on live ranges, simulate attacks, and defend infrastructure in real-time." 
            />
            <FeatureItem 
              icon={CheckCircle} 
              title="Global Compliance" 
              desc="Aligned with ISO 27001, NIST, and CERT-In standards for professional auditing." 
            />
            <FeatureItem 
              icon={Briefcase} 
              title="Career Acceleration" 
              desc="Dedicated placement cells for students, professionals, and transitioning veterans." 
            />
          </div>
        </div>
      </section>

      {/* COURSES SECTION */}
      <section id="training" className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Core <span className="text-cyan-500">Training Modules</span></h2>
              <p className="text-slate-400">Structured for operational readiness and certification success.</p>
            </div>
            <button className="text-cyan-500 font-bold hover:text-white transition-colors flex items-center gap-2 group">
              View All Programs <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course, idx) => (
              <CourseCard key={idx} {...course} />
            ))}
          </div>
        </div>
      </section>

      {/* CORPORATE / WORKSHOPS */}
      <section id="workshops" className="py-24 bg-slate-900/20 border-y border-white/5">
         <div className="container mx-auto px-6">
           <div className="flex flex-col md:flex-row items-center gap-16">
             <div className="md:w-1/2">
                <h2 className="text-3xl font-bold text-white mb-6">Corporate & <span className="text-cyan-500">Institutional Alliances</span></h2>
                <p className="text-slate-400 mb-8 leading-relaxed">
                  We empower organizations with bespoke training solutions, including College MoU-based programs, Faculty Development Programs (FDP), and executive war-gaming simulations.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-black/40 border border-white/5">
                    <div className="p-2 bg-cyan-900/20 rounded text-cyan-400"><Award size={20}/></div>
                    <div>
                      <h4 className="text-white font-bold">Academic Partnerships</h4>
                      <p className="text-sm text-slate-500">MoU-based curriculum integration & FDPs</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-black/40 border border-white/5">
                    <div className="p-2 bg-cyan-900/20 rounded text-cyan-400"><Zap size={20}/></div>
                    <div>
                      <h4 className="text-white font-bold">Live Seminars</h4>
                      <p className="text-sm text-slate-500">Rapid-fire workshops on emerging threats</p>
                    </div>
                  </div>
                </div>
             </div>
             <div className="md:w-1/2 relative">
               <div className="absolute inset-0 bg-cyan-600/20 blur-3xl rounded-full -z-10" />
               <div className="bg-black border border-cyan-900/30 p-8 rounded-2xl relative">
                  <h3 className="text-xl font-bold text-white mb-4">Request Partnership</h3>
                  <div className="space-y-4">
                    <input type="text" placeholder="Institution / Company Name" className="w-full bg-slate-900 border border-slate-800 rounded p-3 text-white focus:border-cyan-600 outline-none transition-colors" />
                    <input type="email" placeholder="Official Email" className="w-full bg-slate-900 border border-slate-800 rounded p-3 text-white focus:border-cyan-600 outline-none transition-colors" />
                    <button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-3 rounded transition-all">Submit Request</button>
                  </div>
               </div>
             </div>
           </div>
         </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-cyan-900/30 p-12 md:p-24 text-center">
             {/* Background Effects */}
             <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/80 -z-10" />
             <div className="absolute -top-1/2 -right-1/2 w-[600px] h-[600px] bg-cyan-600/10 blur-[120px] rounded-full pointer-events-none" />

             <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Train with Purpose. <br/><span className="text-cyan-500">Defend the Grid.</span></h2>
             <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
               Whether you're starting your career or hardening your organization's defenses, we provide the intelligence you need.
             </p>
             
             <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-8 py-4 bg-white text-black font-bold rounded-xl hover:scale-105 transition-transform shadow-xl shadow-white/10">
                Download Brochure
              </button>
              <button className="px-8 py-4 bg-transparent border border-cyan-500 text-cyan-400 font-bold rounded-xl hover:bg-cyan-950/30 transition-colors shadow-lg shadow-cyan-900/20">
                Contact Admissions
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black border-t border-white/10 py-12 text-sm text-slate-400">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4 text-white font-bold text-lg">
                <div className="w-12 h-12 rounded bg-slate-800 border border-white/10 overflow-hidden flex items-center justify-center">
                    {/* MODIFIED: LOGO IMAGE HERE */}
                   <img 
                    src={LOGO_URL}
                    alt="Logo"
                    className="w-full h-full "
                   />
                </div>
                CYBER INTELLIGENCE ACADEMY
              </div>
              <p className="mb-6 max-w-sm leading-relaxed">
                The premier destination for operational cybersecurity training. We don't just teach tools; we teach tradecraft.
              </p>
              <div className="text-xs text-cyan-500 font-mono">
                Training Partner: DreamWorks Infotech Pvt. Ltd.
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">Programs</h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Fundamentals</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">VAPT / Ethical Hacking</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">IS Audit & Compliance</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Workshops</a></li>
              </ul>
            </div>
            
             <div>
              <h4 className="text-white font-bold mb-4">Contact</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2"><Globe size={14}/> www.ciacademy.in</li>
                <li className="flex items-center gap-2"><Terminal size={14}/> support@ciacademy.in</li>
                <li className="flex items-center gap-2"><Briefcase size={14}/> Partner with us</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p>&copy; 2024 Cyber Intelligence Academy. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
              <a href="#" className="hover:text-white transition-colors">Refund Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}