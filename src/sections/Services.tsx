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
            <h2 className="text-5xl font-black text-white uppercase tracking-tighter">
              Specialized <span className="text-brand-blue">Solutions</span>
            </h2>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 px-8 py-4 rounded-full bg-white text-brand-dark font-black text-[10px] uppercase tracking-[0.2em] hover:bg-brand-blue hover:shadow-[0_0_20px_rgba(0,243,255,0.4)] transition-all"
          >
            Napisz do mnie <ArrowUpRight size={16} />
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
                
                <p className="text-slate-400 text-lg mb-10 leading-relaxed max-w-sm">
                  {service.description}
                </p>
                
                <motion.button
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-2 text-brand-blue font-mono text-[10px] uppercase tracking-[0.3em]"
                >
                  SYSTEM_INFO <ArrowUpRight size={14} />
                </motion.button>
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
