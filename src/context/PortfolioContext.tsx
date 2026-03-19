import React, { createContext, useContext, useState, useEffect } from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  tech: string[];
  image: string;
  images?: string[];
  demoUrl: string;
  githubUrl: string;
}

interface PortfolioData {
  hero: {
    title: string;
    subtitle: string;
    description: string;
  };
  about: {
    text1: string;
    text2: string;
    text3: string;
  };
  projects: Project[];
}

const defaultData: PortfolioData = {
  hero: {
    title: "VEXO",
    subtitle: "Junior Frontend Developer",
    description: "I'm a Junior Frontend Developer crafting immersive web experiences and optimizing performance-tuned cars for the FiveM universe."
  },
  about: {
    text1: "I am a driven Junior Frontend Developer with a passion for building highly interactive and visually stunning web interfaces.",
    text2: "Beyond the browser, I specialize in FiveM Car Development, where I fine-tune vehicle physics and optimize performance to ensure the best driving experience on any server.",
    text3: "I am currently expanding my creative horizon by learning Custom Car Livery Design, blending my technical skills with visual artistry."
  },
  projects: [
    {
      id: 1,
      title: "VEXO_BOT_ULTIMATE",
      description: "Advanced Discord bot system featuring fully customizable Ticket Systems, Dynamic Welcome Images, and automated server management modules.",
      category: "Bots",
      tech: ["Node.js", "Discord.js", "Canvas", "MongoDB"],
      image: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?auto=format&fit=crop&q=80&w=1000",
      images: [
        "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000"
      ],
      demoUrl: "#",
      githubUrl: "#"
    },
    {
      id: 2,
      title: "VEXO_VEHICLE_STORE",
      description: "A unique vehicle store system for FiveM. Browse high-performance cars, preview handling stats, and purchase custom-tuned vehicles for your server.",
      category: "Car Dev",
      tech: ["React", "NUI", "Lua", "MySQL"],
      image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1000",
      images: [
        "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&q=80&w=1000"
      ],
      demoUrl: "#",
      githubUrl: "#"
    },
    {
      id: 3,
      title: "CRATE_CASE_SYSTEM",
      description: "Interactive crate opening system with custom animations. Features include item rarity, crate modification, and a sleek UI for FiveM servers.",
      category: "Car Dev",
      tech: ["React", "Framer Motion", "CSS3", "Lua"],
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000",
      images: [
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=1000"
      ],
      demoUrl: "#",
      githubUrl: "#"
    }
  ]
};

interface PortfolioContextType {
  data: PortfolioData;
  updateHero: (hero: PortfolioData['hero']) => void;
  updateAbout: (about: PortfolioData['about']) => void;
  addProject: (project: Project) => void;
  deleteProject: (id: number) => void;
  updateProject: (project: Project) => void;
  resetToDefault: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem('vexo_portfolio_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Basic validation to ensure required properties exist
        if (parsed && typeof parsed === 'object' && parsed.hero && parsed.about && Array.isArray(parsed.projects)) {
          return parsed;
        }
      }
    } catch (e) {
      console.error("Failed to load portfolio data:", e);
    }
    return defaultData;
  });

  useEffect(() => {
    localStorage.setItem('vexo_portfolio_data', JSON.stringify(data));
  }, [data]);

  const updateHero = (hero: PortfolioData['hero']) => {
    setData(prev => ({ ...prev, hero }));
  };

  const updateAbout = (about: PortfolioData['about']) => {
    setData(prev => ({ ...prev, about }));
  };

  const addProject = (project: Project) => {
    setData(prev => ({ ...prev, projects: [...prev.projects, project] }));
  };

  const deleteProject = (id: number) => {
    setData(prev => ({ ...prev, projects: prev.projects.filter(p => p.id !== id) }));
  };

  const updateProject = (project: Project) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === project.id ? project : p)
    }));
  };

  const resetToDefault = () => {
    setData(defaultData);
  };

  return (
    <PortfolioContext.Provider value={{ data, updateHero, updateAbout, addProject, deleteProject, updateProject, resetToDefault }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) throw new Error('usePortfolio must be used within a PortfolioProvider');
  return context;
};
