import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, FileText, Settings, LogOut, Plus, Edit2, Trash2, User, Package, Eye, Save, RotateCcw, Terminal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';

const AdminDashboard: React.FC = () => {
  const { data, updateHero, updateAbout, addProject, deleteProject, updateProject, resetToDefault } = usePortfolio();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLogged, setIsLogged] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Local state for logs - moved up to be available for save functions
  const [logs, setLogs] = useState([
    { id: 1, type: 'info', msg: 'System initialized successfully', time: '12:00:01' },
    { id: 2, type: 'auth', msg: 'Admin session started', time: '12:05:23' },
    { id: 3, type: 'data', msg: 'PortfolioContext provider mounted', time: '12:05:24' },
  ]);

  const addLog = (type: string, msg: string) => {
    setLogs(prev => [{ id: Date.now(), type, msg, time: new Date().toLocaleTimeString() }, ...prev].slice(0, 10));
  };

  // Local state for forms with defensive initialization
  const [heroForm, setHeroForm] = useState(data?.hero || { title: '', subtitle: '', description: '' });
  const [aboutForm, setAboutForm] = useState(data?.about || { text1: '', text2: '', text3: '' });
  const [editingProject, setEditingProject] = useState<any>(null);

  useEffect(() => {
    console.log("AdminDashboard mounted");
    const auth = localStorage.getItem('vexo_auth');
    if (auth === 'true') {
      setIsLogged(true);
    }
  }, []);

  // Update form state if data changes (e.g. after reset)
  useEffect(() => {
    if (data) {
      setHeroForm(data.hero);
      setAboutForm(data.about);
    }
  }, [data]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'vexo' && password === 'Ksawier01') {
      setIsLogged(true);
      localStorage.setItem('vexo_auth', 'true');
      setError('');
    } else {
      setError('Invalid credentials_');
    }
  };

  const handleLogout = () => {
    setIsLogged(false);
    localStorage.removeItem('vexo_auth');
    navigate('/');
  };

  const saveHero = () => {
    updateHero(heroForm);
    addLog('data', 'Hero section updated');
    alert('Hero updated successfully!');
  };

  const saveAbout = () => {
    updateAbout(aboutForm);
    addLog('data', 'About section updated');
    alert('About section updated successfully!');
  };

  if (!isLogged) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-brand-dark px-6 relative overflow-hidden">
        <div className="text-white mb-4 z-[100]">VEXO_OS_ADMIN_LOGIN</div>
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-blue/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-purple/20 rounded-full blur-[120px]" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md p-10 rounded-[3rem] bg-white/[0.02] border border-white/10 backdrop-blur-3xl relative z-10 shadow-2xl"
        >
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-blue/10 text-brand-blue mb-6 border border-brand-blue/20">
              <User size={32} />
            </div>
            <h1 className="text-3xl font-black text-white mb-2 tracking-tighter uppercase">Access <span className="text-brand-blue">Kernel</span></h1>
            <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.3em]">Vexo_OS v2.0 // Admin Portal</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest px-1">Identity_Key</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full p-5 rounded-2xl bg-white/5 border border-white/5 text-white focus:border-brand-blue outline-none transition-all placeholder:text-white/10 font-mono text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest px-1">Access_Code</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-5 rounded-2xl bg-white/5 border border-white/5 text-white focus:border-brand-blue outline-none transition-all placeholder:text-white/10 font-mono text-sm"
              />
            </div>
            
            {error && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-[10px] font-mono uppercase tracking-widest text-center"
              >
                {error}
              </motion.div>
            )}

            <button 
              type="submit"
              className="w-full py-5 rounded-2xl bg-brand-blue text-brand-dark font-black uppercase tracking-[0.2em] text-xs hover:shadow-[0_0_30px_rgba(0,243,255,0.4)] transition-all active:scale-95"
            >
              INITIALIZE_SYSTEM
            </button>
            
            <button 
              type="button"
              onClick={() => navigate('/')}
              className="w-full py-2 text-slate-500 text-[10px] font-mono uppercase tracking-widest hover:text-white transition-colors"
            >
              Abort_and_Exit
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  const menuItems = [
    { id: 'dashboard', label: 'System_Stats', icon: <LayoutDashboard size={20} /> },
    { id: 'projects', label: 'Modules', icon: <Package size={20} /> },
    { id: 'content', label: 'Core_Text', icon: <FileText size={20} /> },
    { id: 'logs', label: 'System_Logs', icon: <Terminal size={20} /> },
    { id: 'settings', label: 'Kernel_Settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-brand-dark flex text-white font-brand">
      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-80 border-r border-white/5 flex flex-col p-8 hidden lg:flex bg-white/[0.01] backdrop-blur-md"
      >
        <div className="mb-16 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-blue flex items-center justify-center text-brand-dark">
            <Settings size={20} />
          </div>
          <h2 className="text-2xl font-black text-white tracking-tighter uppercase">VEXO <span className="text-brand-blue">OS</span></h2>
        </div>

        <nav className="flex-1 space-y-3">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full p-5 rounded-2xl flex items-center gap-4 transition-all group ${
                activeTab === item.id 
                  ? 'bg-brand-blue text-brand-dark font-black shadow-[0_0_20px_rgba(0,243,255,0.2)]' 
                  : 'text-slate-500 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className={`transition-transform duration-300 ${activeTab === item.id ? 'scale-110' : 'group-hover:scale-110'}`}>
                {item.icon}
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em]">{item.label}</span>
            </button>
          ))}
        </nav>

        <button 
          onClick={handleLogout}
          className="p-5 rounded-2xl text-slate-500 hover:text-red-500 hover:bg-red-500/5 transition-all flex items-center gap-4 group mt-auto border border-transparent hover:border-red-500/20"
        >
          <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] uppercase tracking-[0.2em]">Terminate_Session</span>
        </button>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 p-8 md:p-12 lg:p-20 overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-20 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-2 text-brand-blue font-mono text-[10px] uppercase tracking-[0.4em]">
              <span className="w-8 h-[1px] bg-brand-blue" />
              ADMIN_ACCESS_GRANTED
            </div>
            <h1 className="text-5xl font-black text-white uppercase tracking-tighter">System <span className="text-brand-blue">{activeTab}</span></h1>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={() => {
                setActiveTab('projects');
                setEditingProject({ id: Date.now(), title: '', description: '', category: 'Web', tech: [], image: '', demoUrl: '#', githubUrl: '#' });
              }}
              className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-[10px] uppercase tracking-[0.2em] hover:bg-white/10 hover:border-brand-blue/30 transition-all flex items-center gap-3"
            >
              <Plus size={16} className="text-brand-blue" /> New Module
            </button>
            <button 
              onClick={() => navigate('/')}
              className="w-14 h-14 rounded-2xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue hover:bg-brand-blue hover:text-brand-dark transition-all"
            >
              <Eye size={24} />
            </button>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div 
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { label: "Total_Data_Flow", value: "48,201", trend: "+15.4%", color: "text-brand-blue" },
                  { label: "Active_Modules", value: data?.projects?.length?.toString() || "0", trend: "STABLE", color: "text-brand-purple" },
                  { label: "Security_Level", value: "MAX", trend: "ENCRYPTED", color: "text-green-500" }
                ].map((stat, i) => (
                  <div key={i} className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl relative overflow-hidden group hover:border-white/10 transition-all">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/5 to-transparent" />
                    <div className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.3em] mb-6">{stat.label}</div>
                    <div className="flex items-end justify-between">
                      <div className={`text-5xl font-black ${stat.color} tracking-tighter`}>{stat.value}</div>
                      <div className="text-[10px] font-mono text-slate-600 uppercase tracking-widest mb-2">{stat.trend}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-12 rounded-[3.5rem] bg-white/[0.02] border border-white/5 h-[400px] flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                   <div className="w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
                </div>
                <Terminal size={48} className="text-brand-blue mb-6 opacity-20" />
                <div className="text-slate-600 font-mono text-[10px] uppercase tracking-[0.5em] animate-pulse">
                  Analyzing_System_Performance...
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'content' && (
            <motion.div 
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-12"
            >
              <div className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl">
                <h3 className="text-2xl font-black mb-8 uppercase tracking-tight">Hero Section</h3>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Title</label>
                      <input 
                        className="w-full p-4 rounded-xl bg-white/5 border border-white/5 text-white outline-none focus:border-brand-blue" 
                        value={heroForm.title}
                        onChange={e => setHeroForm({...heroForm, title: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Subtitle</label>
                      <input 
                        className="w-full p-4 rounded-xl bg-white/5 border border-white/5 text-white outline-none focus:border-brand-blue" 
                        value={heroForm.subtitle}
                        onChange={e => setHeroForm({...heroForm, subtitle: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Description</label>
                    <textarea 
                      rows={3}
                      className="w-full p-4 rounded-xl bg-white/5 border border-white/5 text-white outline-none focus:border-brand-blue resize-none" 
                      value={heroForm.description}
                      onChange={e => setHeroForm({...heroForm, description: e.target.value})}
                    />
                  </div>
                  <button 
                    onClick={saveHero}
                    className="flex items-center gap-2 px-6 py-3 bg-brand-blue text-brand-dark font-black text-[10px] uppercase tracking-widest rounded-xl hover:shadow-lg transition-all"
                  >
                    <Save size={16} /> Update Hero
                  </button>
                </div>
              </div>

              <div className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl">
                <h3 className="text-2xl font-black mb-8 uppercase tracking-tight">About Section</h3>
                <div className="space-y-6">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="space-y-2">
                      <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Paragraph {i}</label>
                      <textarea 
                        rows={2}
                        className="w-full p-4 rounded-xl bg-white/5 border border-white/5 text-white outline-none focus:border-brand-blue resize-none" 
                        value={(aboutForm as any)[`text${i}`]}
                        onChange={e => setAboutForm({...aboutForm, [`text${i}`]: e.target.value})}
                      />
                    </div>
                  ))}
                  <button 
                    onClick={saveAbout}
                    className="flex items-center gap-2 px-6 py-3 bg-brand-purple text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:shadow-lg transition-all"
                  >
                    <Save size={16} /> Update About
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'projects' && (
            <motion.div 
              key="projects"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 gap-6"
            >
              {data?.projects?.map((p, i) => (
                <div key={p.id} className="p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 flex flex-col md:flex-row items-center gap-10 group hover:border-brand-blue/30 transition-all">
                  <div className="w-40 h-24 rounded-2xl bg-white/5 overflow-hidden relative border border-white/5">
                    <img src={p.image} className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <div className="text-[10px] font-mono text-brand-blue uppercase tracking-[0.3em] mb-2">{p.category} // MODULE_0{i+1}</div>
                    <h4 className="text-2xl font-black text-white uppercase tracking-tight">{p.title}</h4>
                  </div>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setEditingProject(p)}
                      className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-brand-blue hover:text-brand-dark transition-all"
                    >
                      <Edit2 size={20} />
                    </button>
                    <button 
                      onClick={() => {
                        if (confirm('Are you sure?')) {
                          deleteProject(p.id);
                          addLog('data', `Module ${p.title} deleted`);
                        }
                      }}
                      className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'logs' && (
            <motion.div 
              key="logs"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="p-10 rounded-[3rem] bg-black/40 border border-white/5 font-mono text-sm space-y-4">
                <div className="flex items-center gap-4 text-slate-500 mb-6 border-b border-white/5 pb-4">
                  <span className="text-brand-blue">TIMESTAMP</span>
                  <span className="text-brand-purple">EVENT_TYPE</span>
                  <span className="text-white">DESCRIPTION</span>
                </div>
                {logs.map(log => (
                  <div key={log.id} className="flex gap-4 hover:bg-white/5 p-2 rounded transition-colors">
                    <span className="text-slate-600">[{log.time}]</span>
                    <span className={`uppercase w-20 ${
                      log.type === 'auth' ? 'text-brand-purple' : 
                      log.type === 'data' ? 'text-brand-blue' : 
                      'text-green-500'
                    }`}>{log.type}</span>
                    <span className="text-slate-300">_ {log.msg}</span>
                  </div>
                ))}
                <div className="pt-8 text-slate-600 animate-pulse">
                  &gt; Awaiting new system events...
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div 
              key="settings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl"
            >
              <h3 className="text-2xl font-black mb-8 uppercase tracking-tight text-red-500">Kernel Reset</h3>
              <p className="text-slate-400 mb-8">This will restore all content to default values. Use with caution.</p>
              <button 
                onClick={() => {
                  if (confirm('Are you sure?')) resetToDefault();
                }}
                className="flex items-center gap-2 px-8 py-4 bg-white/5 border border-red-500/30 text-red-500 font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-red-500 hover:text-white transition-all"
              >
                <RotateCcw size={16} /> Reset_All_Modules
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Project Editor Modal */}
      <AnimatePresence>
        {editingProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-brand-dark/95 backdrop-blur-2xl"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="w-full max-w-2xl bg-white/[0.02] border border-white/10 rounded-[3rem] p-10 overflow-y-auto max-h-[90vh]"
            >
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-3xl font-black uppercase tracking-tighter">Edit <span className="text-brand-blue">Module</span></h3>
                <button onClick={() => setEditingProject(null)} className="text-slate-500 hover:text-white">
                  <LogOut size={24} className="rotate-180" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest px-1">Title</label>
                    <input 
                      className="w-full p-4 rounded-xl bg-white/5 border border-white/5 text-white outline-none focus:border-brand-blue" 
                      value={editingProject.title}
                      onChange={e => setEditingProject({...editingProject, title: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest px-1">Category</label>
                    <select 
                      className="w-full p-4 rounded-xl bg-white/5 border border-white/5 text-white outline-none focus:border-brand-blue" 
                      value={editingProject.category}
                      onChange={e => setEditingProject({...editingProject, category: e.target.value})}
                    >
                      <option value="Bots">Bots</option>
                      <option value="Web">Web</option>
                      <option value="UI/UX">UI/UX</option>
                      <option value="Car Dev">Car Dev</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest px-1">Description</label>
                  <textarea 
                    rows={3}
                    className="w-full p-4 rounded-xl bg-white/5 border border-white/5 text-white outline-none focus:border-brand-blue resize-none" 
                    value={editingProject.description}
                    onChange={e => setEditingProject({...editingProject, description: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest px-1">Image URL</label>
                   <input 
                     className="w-full p-4 rounded-xl bg-white/5 border border-white/5 text-white outline-none focus:border-brand-blue" 
                     value={editingProject.image}
                     onChange={e => setEditingProject({...editingProject, image: e.target.value})}
                   />
                 </div>

                 <div className="space-y-2">
                   <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest px-1">Technologies (comma separated)</label>
                   <input 
                     className="w-full p-4 rounded-xl bg-white/5 border border-white/5 text-white outline-none focus:border-brand-blue" 
                     value={editingProject.tech.join(', ')}
                     onChange={e => setEditingProject({...editingProject, tech: e.target.value.split(',').map((t: string) => t.trim())})}
                   />
                 </div>

                 <div className="flex gap-4 pt-6">
                  <button 
                      onClick={() => {
                        const exists = data.projects.find(p => p.id === editingProject.id);
                        if (exists) {
                          updateProject(editingProject);
                          addLog('data', `Module ${editingProject.title} updated`);
                        } else {
                          addProject(editingProject);
                          addLog('data', `New module ${editingProject.title} added`);
                        }
                        setEditingProject(null);
                      }}
                      className="flex-1 py-4 bg-brand-blue text-brand-dark font-black uppercase tracking-widest rounded-xl hover:shadow-lg transition-all"
                    >
                      Save Changes
                    </button>
                  <button 
                    onClick={() => setEditingProject(null)}
                    className="flex-1 py-4 bg-white/5 text-white font-black uppercase tracking-widest rounded-xl hover:bg-white/10 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
