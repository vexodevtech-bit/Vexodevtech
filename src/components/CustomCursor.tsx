import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [cursorType, setCursorType] = useState('default');
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);
  
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 20, stiffness: 250, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const trailCount = useRef(0);

  useEffect(() => {
    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Add trail point
      const id = trailCount.current++;
      setTrail(prev => [...prev.slice(-12), { x: e.clientX, y: e.clientY, id }]);
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('interactive') ||
        target.getAttribute('role') === 'button';

      if (isInteractive) {
        setIsHovered(true);
        if (target.tagName === 'A' || target.closest('a')) setCursorType('link');
        else if (target.tagName === 'BUTTON' || target.closest('button')) setCursorType('action');
        else setCursorType('hover');
      } else {
        setIsHovered(false);
        setCursorType('default');
      }
    };

    window.addEventListener('mousemove', moveMouse);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleHoverStart);

    return () => {
      window.removeEventListener('mousemove', moveMouse);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleHoverStart);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Trail Effect */}
      <div className="fixed inset-0 pointer-events-none z-[9998] overflow-hidden hidden md:block">
        {trail.map((point, i) => (
          <motion.div
            key={point.id}
            initial={{ opacity: 0.4, scale: 1 }}
            animate={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute w-1.5 h-1.5 bg-brand-blue/30 rounded-full blur-[1px]"
            style={{
              left: point.x,
              top: point.y,
              translateX: "-50%",
              translateY: "-50%",
            }}
          />
        ))}
      </div>

      {/* Main Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            scale: clicked ? 0.8 : isHovered ? 1.4 : 1,
            rotate: clicked ? 45 : 0,
          }}
          className="relative flex items-center justify-center"
        >
          {/* Outer Hexagon/Shape */}
          <div className={`w-12 h-12 border-2 transition-all duration-300 flex items-center justify-center ${
            isHovered ? 'border-brand-blue rotate-90 rounded-xl scale-110' : 'border-brand-blue/40 rounded-full'
          }`}>
            {/* Inner Core */}
            <motion.div 
              animate={{
                scale: isHovered ? [1, 1.5, 1] : 1,
                backgroundColor: isHovered ? '#00f3ff' : 'rgba(0, 243, 255, 0.4)'
              }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-2 h-2 rounded-full shadow-[0_0_15px_#00f3ff]"
            />
          </div>

          {/* Click Ripple */}
          <AnimatePresence>
            {clicked && (
              <motion.div
                initial={{ scale: 0.5, opacity: 1 }}
                animate={{ scale: 2.5, opacity: 0 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 border-2 border-brand-blue rounded-full"
              />
            )}
          </AnimatePresence>

          {/* Crosshair lines on hover */}
          {isHovered && (
            <>
              <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} className="absolute -left-4 w-2 h-[1px] bg-brand-blue" />
              <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} className="absolute -right-4 w-2 h-[1px] bg-brand-blue" />
              <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} className="absolute -top-4 w-[1px] h-2 bg-brand-blue" />
              <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} className="absolute -bottom-4 w-[1px] h-2 bg-brand-blue" />
            </>
          )}
        </motion.div>
      </motion.div>
    </>
  );
};

export default CustomCursor;
