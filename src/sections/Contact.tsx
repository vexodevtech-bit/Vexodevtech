import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send, Github, Terminal, ArrowUpRight } from 'lucide-react';

const PROFILE_URL = "https://discord.com/users/954471192096555048";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'fivem',
    message: ''
  });

  const [isSent, setIsSent] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setIsSent(true);
        setFormData({ name: '', email: '', subject: 'fivem', message: '' });
        setTimeout(() => setIsSent(false), 5000);
        // Opcjonalne powiadomienie o auto-responderze
        alert('Wiadomość wysłana! Sprawdź swoją skrzynkę e-mail po potwierdzenie.');
      } else {
        throw new Error(result.error || 'Failed to send message');
      }
    } catch (error: any) {
      console.error('Error sending message:', error);
      alert(`Wystąpił błąd: ${error.message}. Spróbuj ponownie za chwilę.`);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Glow background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-blue/10 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 mb-4 text-brand-blue font-mono text-sm uppercase tracking-widest">
                <span className="w-10 h-[1px] bg-brand-blue" />
                Kontakt
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
                Gotowy na <span className="text-brand-blue neon-glow">współpracę?</span>
              </h2>
              <p className="text-slate-400 text-lg mb-12 leading-relaxed max-w-md">
                Masz pomysł na projekt lub potrzebujesz pomocy technicznej? Napisz do mnie, a wspólnie stworzymy coś wyjątkowego.
              </p>

              <div className="space-y-6">
                <a 
                  href={PROFILE_URL} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-6 p-6 rounded-2xl bg-white/[0.02] border border-white/5 group hover:border-brand-blue/30 transition-all backdrop-blur-sm relative overflow-hidden"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-blue/5 flex items-center justify-center text-brand-blue group-hover:bg-brand-blue/20 transition-all">
                    <Terminal size={24} />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-1">Profil Discord</div>
                    <div className="text-lg font-bold text-white group-hover:text-brand-blue transition-colors">3vexo3</div>
                  </div>
                  <ArrowUpRight className="ml-auto text-slate-500 group-hover:text-brand-blue group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" size={20} />
                </a>

                <a 
                  href="mailto:vexodevtech@gmail.com" 
                  className="flex items-center gap-6 p-6 rounded-2xl bg-white/[0.02] border border-white/5 group hover:border-brand-blue/30 transition-all backdrop-blur-sm"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-blue/5 flex items-center justify-center text-brand-blue group-hover:bg-brand-blue/20 transition-all">
                    <span className="text-xs font-mono font-bold">@</span>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-1">Adres Email</div>
                    <div className="text-lg font-bold text-white group-hover:text-brand-blue transition-colors">vexodevtech@gmail.com</div>
                  </div>
                  <ArrowUpRight className="ml-auto text-slate-500 group-hover:text-brand-blue group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" size={20} />
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="p-8 md:p-12 rounded-[2.5rem] bg-white/5 border border-white/10 glass shadow-2xl"
            >
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 uppercase tracking-widest px-1">Imię</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Twoje imię"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 uppercase tracking-widest px-1">Email</label>
                    <input 
                      type="email" 
                      required
                      placeholder="Twój email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500 uppercase tracking-widest px-1">Temat</label>
                  <select 
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white focus:border-brand-blue outline-none transition-all appearance-none cursor-pointer"
                  >
                    <option value="fivem" className="bg-[#0f172a]">Projekt FiveM</option>
                    <option value="web" className="bg-[#0f172a]">Strona Web</option>
                    <option value="other" className="bg-[#0f172a]">Inne</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500 uppercase tracking-widest px-1">Wiadomość</label>
                  <textarea 
                    rows={4}
                    required
                    placeholder="W czym mogę Ci pomóc?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all resize-none"
                  ></textarea>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSent || isSending}
                  whileHover={{ scale: (isSent || isSending) ? 1 : 1.02, boxShadow: (isSent || isSending) ? "none" : "0 0 20px rgba(0, 243, 255, 0.4)" }}
                  whileTap={{ scale: (isSent || isSending) ? 1 : 0.98 }}
                  className={`w-full py-5 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${
                    isSent 
                      ? 'bg-green-500 text-white' 
                      : 'bg-brand-blue text-brand-dark'
                  }`}
                >
                  {isSending ? (
                    'Wysyłanie...'
                  ) : isSent ? (
                    <>Wysłano pomyślnie <Send size={20} /></>
                  ) : (
                    <>Wyślij wiadomość <Send size={20} /></>
                  )}
                </motion.button>
                
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText('vexodevtech@gmail.com');
                    alert('Adres email skopiowany do schowka!');
                  }}
                  className="w-full py-2 text-slate-500 text-[10px] font-mono uppercase tracking-widest hover:text-white transition-colors text-center"
                >
                  Kliknij, aby skopiować email: vexodevtech@gmail.com
                </button>
              </form>
            </motion.div>
          </div>
        </div>

        {/* Footer Bottom */}
        <footer className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-2xl font-bold tracking-tighter text-white uppercase">
            <span className="text-brand-blue">VEXO</span> OS
          </div>
          
          <div className="text-slate-500 text-sm font-mono uppercase tracking-widest">
            © 2026 Vexo Developer. System Version 2.0
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-brand-blue hover:border-brand-blue/50 transition-all">
              <Github size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-brand-blue hover:border-brand-blue/50 transition-all">
              <Terminal size={18} />
            </a>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default Contact;
