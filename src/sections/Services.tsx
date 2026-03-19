import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Bot, Settings, Zap, ArrowUpRight, Palette, MousePointer2 } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      title: "Frontend UI/UX",
      description: "Developing highly interactive and responsive web interfaces using React and Tailwind CSS. Focused on smooth animations and pixel-perfect design.",
      icon: <Layout className="text-brand-blue" size={32} />,
      gradient: "from-brand-blue/20 to-transparent",
      tag: "CORE_DEV"
    },
    {
      title: "FiveM Vehicle Physics",
      description: "Complete vehicle performance tuning (handling.meta). Optimizing physics for realism, drifting, or competitive racing on FiveM servers.",
      icon: <Zap className="text-brand-purple" size={32} />,
      gradient: "from-brand-purple/20 to-transparent",
      tag: "CAR_DEV"
    },
    {
      title: "Interactive NUI Design",
      description: "Creating custom user interfaces for FiveM scripts (NUI). Bridging the gap between web technologies and game engine interaction.",
      icon: <MousePointer2 className="text-brand-pink" size={32} />,
      gradient: "from-brand-pink/20 to-transparent",
      tag: "UI_UX"
    },
    {
      title: "Custom Car Liveries",
      description: "Designing unique vehicle wraps and liveries. High-quality textures and 4K templates for a standout visual presence in-game.",
      icon: <Palette className="text-brand-cyan" size={32} />,
      gradient: "from-brand-cyan/20 to-transparent",
      tag: "VISUALS"
    }
  ];

  return (
    <section id="services" className="py-24 bg-brand-dark/30 relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 mb-4 text-brand-blue font-mono text-xs uppercase tracking-[0.4em]"
            >
              <span className="w-12 h-[1px] bg-brand-blue" />
              CAPABILITIES_LOG
            </motion.div>
            <h2 className="text-5xl font-black text-white uppercase tracking-tighter mb-8">
              Specialized <span className="text-brand-blue">Solutions</span>
            </h2>

            {/* Quick Status Panel */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="flex flex-wrap gap-8 p-6 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-md"
            >
              <div className="flex flex-col gap-1">
                <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">Availability</span>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">Available for projects</span>
                </div>
              </div>
              <div className="w-[1px] h-8 bg-white/10 hidden sm:block" />
              <div className="flex flex-col gap-1">
                <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">Response Time</span>
                <span className="text-xs font-bold text-white uppercase tracking-wider">~24 Hours</span>
              </div>
              <div className="w-[1px] h-8 bg-white/10 hidden sm:block" />
              <div className="flex flex-col gap-1">
                <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">Core Focus</span>
                <span className="text-xs font-bold text-white uppercase tracking-wider">FiveM / UI / Web</span>
              </div>
            </motion.div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center gap-3 px-10 py-5 rounded-full bg-white text-brand-dark font-black text-xs uppercase tracking-[0.2em] hover:bg-brand-blue hover:shadow-[0_0_30px_rgba(0,243,255,0.4)] transition-all"
          >
            Get In Touch <ArrowUpRight size={18} />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="relative group p-10 md:p-14 rounded-[3rem] bg-white/[0.02] border border-white/5 overflow-hidden hover:border-brand-blue/30 transition-all duration-500"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-10">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-brand-blue/50 transition-colors">
                    {service.icon}
                  </div>
                  <span className="text-[10px] font-mono text-slate-600 group-hover:text-brand-blue transition-colors uppercase tracking-[0.3em]">
                    {service.tag}
                  </span>
                </div>
                
                <h3 className="text-3xl font-black text-white mb-6 uppercase tracking-tight group-hover:translate-x-2 transition-transform duration-500">
                  {service.title}
                </h3>
                
                <p className="text-slate-400 text-lg leading-relaxed max-w-sm">
                  {service.description}
                </p>
                
                <div className="flex items-center gap-2 text-brand-blue/40 font-mono text-[10px] uppercase tracking-[0.3em]">
                   Premium Service Module
                </div>
              </div>

              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
