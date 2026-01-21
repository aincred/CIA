'use client';
import React, { useEffect, useRef, SVGProps, useState } from 'react';

// --- Types ---
interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
}

// --- Constants ---
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

const Terminal = (props: IconProps) => <IconWrapper {...props}><polyline points="4 17 10 11 4 5" /><line x1="12" x2="20" y1="19" y2="19" /></IconWrapper>;
const Lock = (props: IconProps) => <IconWrapper {...props}><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></IconWrapper>;
const Eye = (props: IconProps) => <IconWrapper {...props}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></IconWrapper>;

/**
 * COMPONENT: Hacker Background Animation
 * (Identical to the one used in the Home page for consistency)
 */
const HackerBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvas3dRef = useRef<HTMLCanvasElement>(null);
  const canvasBarsRef = useRef<HTMLCanvasElement>(null);
  const consoleRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
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
    let timeoutId: ReturnType<typeof setTimeout>;

    const THEME_COLOR = '#06b6d4'; // Cyan-500
    const THEME_COLOR_DIM = '#0e7490'; // Cyan-700
    
    let squares: any[] = [], 
        focal = 300, 
        vpx = 150, 
        vpy = 150, 
        barVals: any[] = [], 
        sineVal = 0;

    // --- 3D Logic Helpers ---
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

        // @ts-ignore
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
        if (!containerRef.current || !canvas3dRef.current || !canvasBarsRef.current) return;
        
        const width = containerRef.current.offsetWidth;
        const height = containerRef.current.offsetHeight;

        if (width === 0 || height === 0) return;

        canvas3dRef.current.width = (width / 3) * 2;
        canvas3dRef.current.height = height / 3;

        canvasBarsRef.current.width = width / 3;
        canvasBarsRef.current.height = height / 3;

        focal = canvas3dRef.current.width / 2;
        vpx = canvas3dRef.current.width / 2;
        vpy = canvas3dRef.current.height / 2;
        
        if (ctx) ctx.strokeStyle = THEME_COLOR;
        if (ctxBars) {
            ctxBars.strokeStyle = THEME_COLOR;
            ctxBars.fillStyle = THEME_COLOR;
        }

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

    resize();
    window.addEventListener('resize', resize);
    
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
    <div ref={containerRef} className="fixed inset-0 z-[-1] overflow-hidden bg-black pointer-events-none opacity-60">
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
 * MAIN PAGE COMPONENT: Login
 */
export default function LoginPage() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <div className="min-h-screen bg-black text-neutral-200 font-sans selection:bg-cyan-900/50 selection:text-cyan-100 overflow-hidden flex items-center justify-center relative">
      <HackerBackground />

      {/* Main Login Container */}
      <div className="w-full max-w-[420px] px-6 relative z-10">
        
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-8 animate-fade-in-up">
           <div className="w-24 h-24 bg-black rounded-2xl flex items-center justify-center shadow-2xl shadow-cyan-600/20 mb-6 border border-white/10 overflow-hidden relative group">
             <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity z-20" />
             <img 
               src={LOGO_URL} 
               alt="Cyber Intelligence Academy Logo" 
               className="w-full h-full object-cover relative z-10"
             />
           </div>
           <h1 className="text-2xl font-bold text-white tracking-tight text-center">CYBER INTELLIGENCE</h1>
           <span className="text-xs text-cyan-500 font-bold uppercase tracking-[0.3em] mt-2">Access Portal</span>
        </div>

        {/* Login Card */}
        <div className="bg-neutral-900/60 backdrop-blur-xl border border-cyan-900/30 rounded-2xl p-8 shadow-2xl shadow-cyan-900/20 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-white mb-1">Welcome Back, Agent</h2>
            <p className="text-neutral-400 text-sm">Enter your credentials to continue</p>
          </div>

          <form className="space-y-5">
            <div className="group">
              <label className="block text-[10px] font-bold text-cyan-500 uppercase tracking-wider mb-2 group-focus-within:text-cyan-400 transition-colors">
                Identity / Email
              </label>
              <div className="relative">
                <input 
                  type="email" 
                  className="w-full bg-black/40 border border-neutral-700 rounded-lg pl-10 pr-4 py-3.5 text-white text-sm focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600/50 outline-none transition-all placeholder:text-neutral-600"
                  placeholder="agent@ciacademy.in"
                />
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-cyan-500 transition-colors">
                   <Terminal size={18} />
                </div>
              </div>
            </div>
            
            <div className="group">
              <label className="block text-[10px] font-bold text-cyan-500 uppercase tracking-wider mb-2 group-focus-within:text-cyan-400 transition-colors">
                Passcode
              </label>
              <div className="relative">
                <input 
                  type={isPasswordVisible ? "text" : "password"}
                  className="w-full bg-black/40 border border-neutral-700 rounded-lg pl-10 pr-10 py-3.5 text-white text-sm focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600/50 outline-none transition-all placeholder:text-neutral-600"
                  placeholder="••••••••••••"
                />
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-cyan-500 transition-colors">
                   <Lock size={18} />
                </div>
                <button 
                  type="button" 
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-600 hover:text-white transition-colors"
                >
                   <Eye size={18} />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer group select-none">
                <input type="checkbox" className="w-3.5 h-3.5 rounded border-neutral-700 bg-black/50 text-cyan-600 focus:ring-offset-0 focus:ring-cyan-600/50 accent-cyan-600" />
                <span className="text-neutral-400 group-hover:text-white transition-colors">Remember device</span>
              </label>
              <a href="#" className="text-cyan-500 hover:text-cyan-400 transition-colors hover:underline">Forgot passcode?</a>
            </div>

            <button type="button" className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-4 rounded-lg shadow-lg shadow-cyan-900/20 hover:shadow-cyan-900/40 transition-all hover:-translate-y-0.5 active:translate-y-0 text-sm tracking-wide">
              AUTHENTICATE
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-neutral-500 text-xs">
              Restricted Area. <a href="#" className="text-white hover:text-cyan-500 font-bold transition-colors">Request Access</a>
            </p>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-8 text-center text-[10px] text-neutral-600 font-mono animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <p>SECURE CONNECTION ESTABLISHED</p>
          <p className="mt-1">ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
        </div>
      </div>
    </div>
  );
}