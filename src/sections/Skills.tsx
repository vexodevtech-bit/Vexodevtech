import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Settings, Palette, Gauge, Monitor, Terminal } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const Skills: React.FC = () => {
  const { data } = usePortfolio();
  
  const skillCategories = [
    {
      title: "Frontend Development",
      icon: <Layout className="text-brand-blue" />,
      skills: ["React.js", "Vite", "Tailwind CSS", "Framer Motion", "JavaScript (ES6+)", "NUI (FiveM UI)"]
    },
    {
      title: "Car Development",
      icon: <Gauge className="text-brand-purple" />,
      skills: ["Handling Tuning", "Physics Optimization", "Performance Balancing", "LOD Optimization", "Vehicle Metadata"]
    },
    {
      title: "Visual & Design",
      icon: <Palette className="text-brand-pink" />,
      skills: ["UI/UX Design", "Custom Liveries", "Blender (Basic)", "Photoshop", "Typography", "Color Theory"]
    },
    {
      title: "Core Tools",
      icon: <Settings className="text-white" />,
      skills: ["Git", "VS Code", "OpenIV", "ZModeler3", "Postman", "Chrome DevTools"]
    }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <div className="flex items-center gap-2 mb-6 text-brand-blue font-mono text-sm uppercase tracking-[0.4em]">
              <span className="w-12 h-[1px] bg-brand-blue" />
              SYSTEM_PROFILE
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-8 uppercase tracking-tighter">
              Junior <span className="text-brand-blue">Frontend</span> <br />
              Architect<span className="text-brand-purple">.</span>
            </h2>
            <div className="space-y-6 text-slate-400 text-lg leading-relaxed">
              <p>{data.about.text1}</p>
              <p>{data.about.text2}</p>
              <p>{data.about.text3}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex-1 w-full grid grid-cols-2 gap-6"
          >
            {[
              { label: "Frontend Projects", value: "15+", icon: <Monitor className="w-5 h-5" /> },
              { label: "Vehicles Tuned", value: "120+", icon: <Gauge className="w-5 h-5" /> },
              { label: "Design Hours", value: "450+", icon: <Palette className="w-5 h-5" /> },
              { label: "System Uptime", value: "99%", icon: <Terminal className="w-5 h-5" /> }
            ].map((stat, i) => (
              <div key={i} className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl group hover:border-brand-blue/30 transition-all duration-500">
                <div className="text-brand-blue mb-4 opacity-50 group-hover:opacity-100 transition-opacity">{stat.icon}</div>
                <div className="text-4xl font-black text-white mb-2 tracking-tighter">{stat.value}</div>
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="text-center mb-16">
          <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tight">Technical <span className="text-brand-blue">Matrix</span></h3>
          <p className="text-slate-500 font-mono text-xs uppercase tracking-[0.2em]">Core modules and technologies I utilize</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-sm group hover:bg-brand-blue/[0.02] hover:border-brand-blue/20 transition-all duration-500"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/5 group-hover:border-brand-blue/30 transition-colors">
                {category.icon}
              </div>
              <h4 className="text-lg font-black text-white mb-8 uppercase tracking-widest">{category.title}</h4>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-3 py-1.5 text-[10px] font-mono rounded-lg bg-white/5 border border-white/5 text-slate-400 group-hover:text-slate-200 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
