import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PortfolioProvider } from './context/PortfolioContext';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Skills from './sections/Skills';
import Services from './sections/Services';
import Portfolio from './sections/Portfolio';
import Contact from './sections/Contact';
import InteractiveSection from './sections/InteractiveSection';
import AdminDashboard from './sections/AdminDashboard';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import InteractiveGrid from './components/InteractiveGrid';
import { motion, useScroll, useSpring } from 'framer-motion';

const MainLayout: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-blue origin-left z-[60] shadow-[0_0_15px_rgba(0,243,255,0.8)]"
        style={{ scaleX }}
      />

      <Navbar />
      
      <main className="relative">
        <Hero />
        
        <section id="about" className="relative">
          <Skills />
        </section>

        <section id="services" className="relative">
          <Services />
        </section>

        <section id="portfolio" className="relative">
          <Portfolio />
        </section>

        <section id="contact" className="relative">
          <Contact />
        </section>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <PortfolioProvider>
      <div className="bg-brand-dark min-h-screen text-white font-brand selection:bg-brand-blue selection:text-brand-dark">
        <LoadingScreen />
        <CustomCursor />
        <InteractiveGrid />
        
        <Router>
          <Routes>
            <Route path="/" element={<MainLayout />} />
            <Route path="/admin" element={<AdminDashboard />} />
            {/* Catch-all for undefined routes without full-screen crash */}
            <Route path="*" element={<MainLayout />} />
          </Routes>
        </Router>
      </div>
    </PortfolioProvider>
  );
};

export default App;
