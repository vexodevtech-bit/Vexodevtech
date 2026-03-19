import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Github, Mail, Terminal, Sparkles } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const Hero: React.FC = () => {
  const { data } = usePortfolio();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 px-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto relative z-10"
      >
        <div className="flex flex-col items-center text-center">
          {/* Brand Badge */}
          <motion.div
            variants={itemVariants}
            className="mb-8 flex items-center gap-3 px-4 py-2 rounded-full border border-brand-blue/20 bg-brand-blue/5 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-blue"></span>
            </span>
            <span className="text-[10px] font-mono text-brand-blue uppercase tracking-[0.3em]">
              {data.hero.subtitle}
            </span>
          </motion.div>

          {/* Main Title - The Brand */}
          <motion.div variants={itemVariants} className="relative mb-6">
            <h1 className="text-[clamp(4rem,15vw,12rem)] font-black leading-[0.8] tracking-tighter text-white select-none">
              {data.hero.title}<span className="text-brand-blue">.</span>
            </h1>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, delay: 1, ease: "circOut" }}
              className="absolute -bottom-2 left-0 h-[2px] bg-gradient-to-r from-brand-blue via-brand-purple to-transparent"
            />
          </motion.div>

          {/* Subtitle */}
          <motion.h2
            variants={itemVariants}
            className="text-xl md:text-3xl font-light text-slate-400 mb-12 tracking-tight flex items-center gap-3"
          >
            <Sparkles className="text-brand-blue w-5 h-5 animate-pulse" />
            Frontend UI Explorer & <span className="text-white font-medium italic underline decoration-brand-blue/30">Car Enthusiast</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="max-w-xl text-slate-500 text-lg leading-relaxed mb-12"
          >
            {data.hero.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6">
            <a
              href="#portfolio"
              className="group relative px-10 py-5 bg-white text-black font-bold rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(0,243,255,0.3)]"
            >
              <div className="absolute inset-0 bg-brand-blue translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors">
                EXPLORE PROJECTS <ChevronRight size={20} />
              </span>
            </a>
            
            <a
              href="#contact"
              className="group px-10 py-5 border border-white/10 text-white font-bold rounded-full hover:bg-white/5 transition-all hover:border-white/30"
            >
              INITIATE_CONTACT
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute bottom-10 left-10 hidden lg:flex flex-col gap-6 text-slate-600">
        <a 
          href="https://discord.com/users/954471192096555048"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-brand-blue transition-all hover:scale-110 active:scale-95 group relative"
        >
          <Terminal size={20} />
          <div className="absolute -inset-2 bg-brand-blue/20 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
        </a>
        <div className="w-[1px] h-20 bg-slate-800 mx-auto mt-2" />
      </div>

      <div className="absolute top-1/2 -right-20 -translate-y-1/2 hidden xl:block">
        <div className="rotate-90 text-[10px] font-mono text-slate-700 tracking-[1em] uppercase">
          VEXO_JUNIOR_FRONTEND_CORE
        </div>
      </div>
    </section>
  );
};

export default Hero;
