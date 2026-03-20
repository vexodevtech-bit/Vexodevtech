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
    description: "Jestem Junior Frontend Developerem, który tworzy immersyjne doświadczenia webowe oraz optymalizuje fizykę pojazdów w świecie FiveM."
  },
  about: {
    text1: "Jestem zmotywowanym Junior Frontend Developerem z pasją do budowania wysoce interaktywnych i wizualnie oszałamiających interfejsów internetowych.",
    text2: "Poza przeglądarką specjalizuję się w FiveM Car Development, gdzie dopracowuję fizykę pojazdów i optymalizuję ich wydajność, aby zapewnić najlepsze wrażenia z jazdy na każdym serwerze.",
    text3: "Obecnie poszerzam swoje horyzonty kreatywne, ucząc się projektowania niestandardowych malowań pojazdów (liveries), łącząc umiejętności techniczne z artyzmem wizualnym."
  },
  projects: [
    {
      id: 1,
      title: "VEXO_BOT_ULTIMATE",
      description: "Zaawansowany system bota Discord zawierający w pełni konfigurowalne systemy ticketów, dynamiczne obrazy powitalne oraz zautomatyzowane moduły zarządzania serwerem.",
      category: "Bots",
      tech: ["Node.js", "Discord.js", "Canvas", "MongoDB"],
      image: "https://i.postimg.cc/1z0QVRSG/chatbot-chat-message-vectorart-78370-4104.avif",
      images: [
        "https://i.postimg.cc/1z0QVRSG/chatbot-chat-message-vectorart-78370-4104.avif",
        "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000"
      ],
      demoUrl: "#",
      githubUrl: "#"
    },
    {
      id: 2,
      title: "VEXO_VEHICLE_STORE",
      description: "Unikalny system sklepu z pojazdami dla FiveM. Przeglądaj samochody o wysokich osiągach, sprawdzaj statystyki prowadzenia i kupuj niestandardowo dostrojone pojazdy na swój serwer.",
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
      description: "Interaktywny system otwierania skrzynek z niestandardowymi animacjami. Funkcje obejmują rzadkość przedmiotów, modyfikację skrzynek oraz elegancki interfejs dla serwerów FiveM.",
      category: "Car Dev",
      tech: ["React", "Framer Motion", "CSS3", "Lua"],
      image: "https://i.postimg.cc/9QJk64cZ/E92DEFF9-655A-4870-81F3-E0202D793BBC.png",
      images: [
        "https://i.postimg.cc/9QJk64cZ/E92DEFF9-655A-4870-81F3-E0202D793BBC.png",
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
    // Bardziej agresywna migracja: Szukamy projektów po słowach kluczowych w tytule
    const newBotImage = "https://i.postimg.cc/1z0QVRSG/chatbot-chat-message-vectorart-78370-4104.avif";
    const newCrateImage = "https://i.postimg.cc/9QJk64cZ/E92DEFF9-655A-4870-81F3-E0202D793BBC.png";
    
    let needsUpdate = false;
    const updatedProjects = data.projects.map(p => {
      // Szukamy Bota po kategorii lub tytule
      if ((p.category === "Bots" || p.title.toLowerCase().includes("bot")) && p.image !== newBotImage) {
        needsUpdate = true;
        return { 
          ...p, 
          image: newBotImage,
          images: [newBotImage, ...(p.images || []).filter(img => !img.includes("unsplash") && img !== newBotImage)]
        };
      }
      // Szukamy systemu skrzyń po tytule
      if (p.title.toLowerCase().includes("skrzyn") && p.image !== newCrateImage) {
        needsUpdate = true;
        return { 
          ...p, 
          image: newCrateImage,
          images: [newCrateImage, ...(p.images || []).filter(img => !img.includes("unsplash") && img !== newCrateImage)]
        };
      }
      return p;
    });

    if (needsUpdate) {
      setData(prev => ({ ...prev, projects: updatedProjects }));
    }
    
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
