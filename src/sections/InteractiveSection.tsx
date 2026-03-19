import React, { useState } from 'react';
import { motion } from 'framer-motion';

const InteractiveSection: React.FC = () => {
  const [isGlowOn, setIsGlowOn] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <section className="py-24 relative bg-brand-dark/50 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-white mb-4"
          >
            INTERACTIVE <span className="text-brand-blue">LAB</span>
          </motion.h2>
          <p className="text-slate-500 font-mono text-sm uppercase tracking-widest">
            Experiment with the system interface
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* System Control Panel */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl relative overflow-hidden group"
          >
            <div className={`absolute inset-0 bg-brand-blue/5 transition-opacity duration-500 ${isGlowOn ? 'opacity-100' : 'opacity-0'}`} />
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
                SYSTEM CONTROLS
              </h3>

              <div className="space-y-8">
                {/* Glow Switch */}
                <div className="flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-brand-blue/30 transition-all">
                  <div>
                    <div className="text-white font-bold mb-1 uppercase tracking-tight">OVERDRIVE_GLOW</div>
                    <div className="text-xs text-slate-500 font-mono">Enhance visual fidelity</div>
                  </div>
                  <button 
                    onClick={() => setIsGlowOn(!isGlowOn)}
                    className={`w-16 h-8 rounded-full relative transition-colors duration-500 ${isGlowOn ? 'bg-brand-blue' : 'bg-white/10'}`}
                  >
                    <motion.div 
                      animate={{ x: isGlowOn ? 32 : 4 }}
                      className="absolute top-1 left-0 w-6 h-6 bg-white rounded-full shadow-xl"
                    />
                  </button>
                </div>

                {/* Progress Bars */}
                <div className="space-y-6">
                  {[
                    { label: "FRONTEND_STABILITY", value: 98 },
                    { label: "VEHICLE_OPTIMIZATION", value: 85 },
                    { label: "UI_RESPONSIVENESS", value: 92 }
                  ].map((item, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-2">
                        <span>{item.label}</span>
                        <span>{item.value}%</span>
                      </div>
                      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.value}%` }}
                          transition={{ duration: 1, delay: idx * 0.2 }}
                          className={`h-full ${isGlowOn ? 'bg-brand-blue shadow-[0_0_10px_#00f3ff]' : 'bg-slate-700'}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Interactive Cards */}
          <div className="grid grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                onMouseEnter={() => setActiveCard(i)}
                onMouseLeave={() => setActiveCard(null)}
                whileHover={{ scale: 1.05, y: -10 }}
                className={`aspect-square rounded-3xl border transition-all duration-500 flex flex-col items-center justify-center gap-4 cursor-pointer relative overflow-hidden ${
                  activeCard === i 
                    ? 'bg-brand-blue/10 border-brand-blue/50 shadow-[0_0_30px_rgba(0,243,255,0.2)]' 
                    : 'bg-white/[0.02] border-white/5'
                }`}
              >
                <div className={`text-4xl transition-transform duration-500 ${activeCard === i ? 'scale-125' : 'scale-100'}`}>
                  {i === 1 ? '⚡' : i === 2 ? '💎' : i === 3 ? '🛸' : '🚀'}
                </div>
                <div className={`text-[10px] font-mono uppercase tracking-[0.2em] ${activeCard === i ? 'text-brand-blue' : 'text-slate-500'}`}>
                  MODULE_0{i}
                </div>
                {activeCard === i && (
                  <motion.div 
                    layoutId="glow"
                    className="absolute inset-0 bg-brand-blue/5 blur-xl pointer-events-none"
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveSection;
