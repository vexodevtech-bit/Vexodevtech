import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Terminal, ChevronRight, User, Cpu, Clock } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timer);
    };
  }, []);

  const navLinks = [
    { name: 'O mnie', href: '#about' },
    { name: 'Usługi', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Kontakt', href: '#contact' },
  ];

  if (location.pathname === '/admin') return null;

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
      scrolled ? 'py-4 bg-brand-dark/80 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-brand-blue/5' : 'py-8 bg-transparent'
    }`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <motion.a 
            href="#"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-brand-blue flex items-center justify-center text-brand-dark group-hover:shadow-[0_0_20px_rgba(0,243,255,0.6)] transition-all duration-300">
              <Terminal size={20} />
            </div>
            <span className="text-2xl font-black tracking-tighter text-white group-hover:text-brand-blue transition-colors uppercase">VEXO</span>
          </motion.a>

          {/* System Status Widget (Cool Addition) */}
          <div className="hidden xl:flex items-center gap-6 px-6 py-2 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-md">
            <div className="flex items-center gap-2">
              <Clock className="w-3 h-3 text-brand-blue" />
              <span className="text-[10px] font-mono text-slate-400">{time}</span>
            </div>
            <div className="w-[1px] h-3 bg-white/10" />
            <div className="flex items-center gap-2">
              <Cpu className="w-3 h-3 text-brand-purple" />
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-tighter">OS_STABLE</span>
            </div>
            <div className="w-[1px] h-3 bg-white/10" />
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-tighter">ONLINE</span>
            </div>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link, idx) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="text-[10px] font-mono font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-[0.2em] relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-blue group-hover:w-full transition-all duration-300" />
            </motion.a>
          ))}
          <div className="h-6 w-[1px] bg-white/10" />
          <Link
            to="/admin"
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-500 hover:text-brand-blue hover:border-brand-blue/30 transition-all"
          >
            <User size={18} />
          </Link>
          <motion.a
            href="#contact"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-8 py-3 rounded-full bg-white text-brand-dark font-black text-[10px] uppercase tracking-[0.2em] hover:bg-brand-blue hover:shadow-[0_0_20px_rgba(0,243,255,0.4)] transition-all"
          >
            Hire Me
          </motion.a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-white p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-brand-dark border-b border-white/5 overflow-hidden backdrop-blur-2xl"
          >
            <div className="flex flex-col p-8 space-y-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between text-2xl font-black text-slate-300 hover:text-brand-blue transition-colors uppercase tracking-tighter"
                >
                  {link.name}
                  <ChevronRight size={20} className="text-brand-blue" />
                </a>
              ))}
              <div className="pt-6 border-t border-white/5 flex flex-col gap-4">
                <Link
                  to="/admin"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 text-slate-500 font-mono text-xs uppercase tracking-widest"
                >
                  <User size={16} /> Admin Portal
                </Link>
                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-5 rounded-2xl bg-brand-blue text-brand-dark font-black text-center text-lg uppercase tracking-widest shadow-xl shadow-brand-blue/20"
                >
                  Hire Me
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
