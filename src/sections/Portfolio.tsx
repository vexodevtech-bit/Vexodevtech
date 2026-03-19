import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X, PlayCircle, Layers, Monitor, Car, Cpu, Code2, Bot, Layout, Palette, Package, ChevronLeft, ChevronRight } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const Portfolio: React.FC = () => {
  const { data } = usePortfolio();
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [filter, setFilter] = useState('All');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const categories = ['All', 'Bots', 'Web', 'UI/UX', 'Car Dev'];

  const filteredProjects = filter === 'All' 
    ? data.projects 
    : data.projects.filter(p => p.category === filter);

  const getIcon = (category: string) => {
    switch (category) {
      case 'Bots': return <Bot size={24} />;
      case 'Car Dev': return <Car size={24} />;
      case 'Web': return <Layout size={24} />;
      case 'UI/UX': return <Palette size={24} />;
      default: return <Package size={24} />;
    }
  };

  return (
    <section id="portfolio" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 mb-4 text-brand-blue font-mono text-xs uppercase tracking-[0.4em]"
            >
              <span className="w-12 h-[1px] bg-brand-blue" />
              PROJECT_REPOSITORY
            </motion.div>
            <h2 className="text-5xl font-black text-white uppercase tracking-tighter">
              Featured <span className="text-brand-blue">Modules</span>
            </h2>
          </div>
          
          <div className="flex flex-wrap gap-3 p-2 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-xl">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-xl text-xs font-mono uppercase tracking-widest transition-all duration-300 ${
                  filter === cat 
                    ? 'bg-brand-blue text-brand-dark font-bold shadow-[0_0_20px_rgba(0,243,255,0.3)]' 
                    : 'text-slate-500 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {filteredProjects.map((project, idx) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ 
                y: -10,
                rotateX: 2,
                rotateY: 2,
                transition: { duration: 0.3 }
              }}
              className="group relative rounded-[2.5rem] bg-white/[0.02] border border-white/5 overflow-hidden backdrop-blur-sm cursor-pointer perspective-1000"
              onClick={() => {
                setSelectedProject(project);
                setCurrentImageIndex(0);
              }}
            >
              {/* Image Container */}
              <div className="aspect-[16/10] overflow-hidden relative">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                />
                <div className="absolute inset-0 bg-brand-dark/40 group-hover:bg-brand-dark/10 transition-colors duration-500" />
                
                {/* Floating Icon */}
                <div className="absolute top-6 left-6 w-12 h-12 rounded-2xl bg-brand-dark/80 border border-white/10 flex items-center justify-center text-brand-blue backdrop-blur-md group-hover:border-brand-blue/50 transition-colors">
                  {getIcon(project.category)}
                </div>
              </div>
              
              {/* Content */}
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="text-[10px] font-mono text-brand-blue uppercase tracking-[0.4em] mb-1">
                      {project.category}
                    </div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight group-hover:text-brand-blue transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  <div className="flex gap-2">
                    {project.tech.slice(0, 2).map((t, i) => (
                      <span key={i} className="px-2 py-1 text-[8px] font-mono bg-white/5 text-slate-400 rounded border border-white/5 uppercase tracking-widest">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                
                <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-6">
                  {project.description}
                </p>
                
                <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                  <span className="text-[10px] font-mono text-brand-blue uppercase tracking-widest flex items-center gap-2">
                    Open Project <PlayCircle size={14} />
                  </span>
                </div>
              </div>

              {/* Hover Overlay Line */}
              <motion.div 
                className="absolute bottom-0 left-0 h-1 bg-brand-blue shadow-[0_0_10px_#00f3ff]"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Live Preview Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-brand-dark/95 backdrop-blur-2xl"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              className="relative w-full max-w-6xl bg-brand-dark rounded-[3rem] border border-white/10 overflow-hidden shadow-[0_0_100px_rgba(0,243,255,0.1)]"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-colors z-20 border border-white/10"
              >
                <X size={24} />
              </button>

              <div className="flex flex-col lg:flex-row h-full max-h-[90vh]">
                <div className="flex-1 bg-black/40 relative overflow-hidden group min-h-[300px] lg:min-h-0">
                  <AnimatePresence mode="wait">
                    <motion.img 
                      key={currentImageIndex}
                      src={selectedProject.images?.[currentImageIndex] || selectedProject.image} 
                      alt={selectedProject.title}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full object-cover"
                    />
                  </AnimatePresence>
                  
                  {selectedProject.images && selectedProject.images.length > 1 && (
                    <>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex(prev => (prev === 0 ? selectedProject.images.length - 1 : prev - 1));
                        }}
                        className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-brand-blue/80 hover:border-brand-blue transition-all"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex(prev => (prev === selectedProject.images.length - 1 ? 0 : prev + 1));
                        }}
                        className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-brand-blue/80 hover:border-brand-blue transition-all"
                      >
                        <ChevronRight size={24} />
                      </button>
                      
                      {/* Pagination dots */}
                       <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                         {selectedProject.images && selectedProject.images.map((_: string, i: number) => (
                           <div 
                             key={i}
                             className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === currentImageIndex ? 'bg-brand-blue w-6' : 'bg-white/30'}`}
                           />
                         ))}
                       </div>
                    </>
                  )}
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark to-transparent opacity-60 pointer-events-none" />
                </div>
                
                <div className="w-full lg:w-[450px] p-10 md:p-14 overflow-y-auto bg-brand-dark/50 backdrop-blur-md">
                  <div className="text-brand-blue font-mono text-[10px] uppercase tracking-[0.4em] mb-6">
                    {selectedProject.category}
                  </div>
                  <h3 className="text-5xl font-black text-white mb-8 leading-[0.9] uppercase tracking-tighter">
                    {selectedProject.title}
                  </h3>
                  
                  <div className="space-y-10">
                    <div>
                      <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em] mb-4">Project Overview</h4>
                      <p className="text-slate-400 leading-relaxed text-lg italic">"{selectedProject.description}"</p>
                    </div>
                    
                    <div>
                      <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em] mb-4">Tech Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tech.map((t: string, i: number) => (
                          <span key={i} className="px-4 py-2 text-xs font-mono bg-white/5 border border-white/5 text-brand-blue rounded-xl uppercase tracking-widest">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;
