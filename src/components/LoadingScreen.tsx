import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setLoading(false), 800);
            return 100;
          }
          return prev + Math.random() * 5;
        });
      }, 50);
      return () => clearInterval(interval);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-brand-dark overflow-hidden"
        >
          {/* Cyber Background elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
            <motion.div 
              animate={{ top: ["-10%", "110%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 w-full h-[1px] bg-brand-blue/50 blur-sm shadow-[0_0_15px_#00f3ff]" 
            />
          </div>

          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12 relative"
            >
              <div className="text-6xl md:text-8xl font-black tracking-tighter text-white relative z-10">
                VEXO<span className="text-brand-blue">.</span>
              </div>
              <motion.div 
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -inset-4 text-6xl md:text-8xl font-black tracking-tighter text-brand-blue/20 blur-xl select-none"
              >
                VEXO.
              </motion.div>
            </motion.div>

            <div className="w-64 h-[2px] bg-white/5 rounded-full overflow-hidden relative border border-white/10">
              <motion.div
                className="absolute top-0 left-0 h-full bg-brand-blue shadow-[0_0_10px_#00f3ff]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
            </div>

            <div className="mt-6 flex flex-col items-center gap-2">
              <motion.div 
                className="text-[10px] font-mono text-brand-blue uppercase tracking-[0.5em]"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                System_Status: <span className="text-white">Optimizing</span>
              </motion.div>
              <div className="text-[10px] font-mono text-white/40 uppercase tracking-[0.3em]">
                {Math.floor(progress)}% Complete
              </div>
            </div>
          </div>

          {/* Corner accents */}
          <div className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-brand-blue/30" />
          <div className="absolute bottom-10 right-10 w-20 h-20 border-b-2 border-r-2 border-brand-blue/30" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
