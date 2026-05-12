import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import Lenis from 'lenis';
import { 
  Menu, X, Wrench, Clock, Shield, Activity, Phone, 
  CheckCircle, Zap, ChevronDown, MapPin, Mail, Star, MoveRight
} from 'lucide-react';

const STATS = [
  { val: '12+', label: 'Years Experience' },
  { val: '5K+', label: 'Bikes Serviced' },
  { val: '4.9★', label: 'Average Rating' },
  { val: '98%', label: 'Satisfaction' },
];

const SERVICES = [
  {
    id: '01',
    title: 'MOT Testing',
    desc: 'Professional DVSA-standard MOT testing for motorcycles to ensure your bike is safe and legally roadworthy. Fast, efficient, and precise.',
    tags: ['DVSA Standard', 'Brake Test', 'Emissions'],
    price: '£29.65',
    img: 'https://images.unsplash.com/photo-1615175932599-2325fa1de5dc?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: '02',
    title: 'Bike Servicing',
    desc: 'Complete motorcycle servicing including oil changes, filter replacement, fluid checks, engine inspection, and preventative maintenance.',
    tags: ['Oil & Filter', 'Full Service', 'Major Service'],
    price: '£89.99',
    img: 'https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: '03',
    title: 'Diagnostics',
    desc: 'Advanced diagnostic scanning to identify engine faults, warning lights, electrical issues, and performance bottlenecks.',
    tags: ['Engine Scan', 'Brake Repairs', 'Electrical'],
    price: '£39.99',
    img: 'https://images.unsplash.com/photo-1621008014522-12e0325d9114?q=80&w=1200&auto=format&fit=crop'
  }
];

const FEATURES = [
  { icon: Wrench, title: 'Expert Mechanics', desc: 'Decades of combined hands-on experience.' },
  { icon: Clock, title: 'Fast Turnaround', desc: 'Prompt testing without compromising quality.' },
  { icon: Shield, title: 'No Hidden Fees', desc: '100% transparent pricing and honest quotes.' },
  { icon: Activity, title: 'Modern Tools', desc: 'State-of-the-art diagnostic equipment.' },
];

const TESTIMONIALS = [
  { name: 'Mark H.', text: 'Excellent service and very professional staff. Fast MOT testing and fair pricing.' },
  { name: 'Sarah D.', text: 'Honest mechanics and quality work. I won\'t take my bike anywhere else.' },
  { name: 'Tom B.', text: 'Very friendly team and quick repairs. Will definitely come back again.' },
];

const FAQS = [
  { q: 'How long does an MOT take?', a: 'Usually around 45 minutes to 1 hour. You can wait in our premium lounge.' },
  { q: 'Do you repair bikes after failure?', a: 'Yes, we provide full repair services and a free retest within 10 days.' },
  { q: 'Can I book online?', a: 'Yes, use our booking form below and we will confirm your slot immediately.' },
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formStatus, setFormStatus] = useState<'idle'|'sent'>('idle');

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });
    
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      lenis.destroy();
    };
  }, []);

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sent');
    setTimeout(() => setFormStatus('idle'), 3000);
  };

  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="min-h-screen bg-[#050505] text-[#FAFAFA] font-sans selection:bg-red-500 selection:text-white">
      
      {/* Navigation */}
      <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? 'bg-black/40 backdrop-blur-2xl border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          <a href="#" className="text-xl md:text-2xl font-display font-black tracking-tighter flex items-center gap-1 group">
            ACE <span className="text-red-500 transition-colors group-hover:text-red-400">MOT</span>
          </a>
          
          <div className="hidden lg:flex items-center gap-10 bg-white/[0.03] px-8 py-3 rounded-full border border-white/5 backdrop-blur-md">
            {['Services', 'About', 'Reviews', 'Contact'].map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} className="text-[11px] font-semibold text-zinc-400 hover:text-white tracking-[0.15em] uppercase transition-colors">
                {link}
              </a>
            ))}
          </div>

          <div className="hidden lg:block border border-white/5 p-1 rounded-full bg-white/[0.02]">
            <a href="#contact" className="bg-white text-black hover:bg-zinc-200 px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all flex items-center gap-2">
              Book Slot
            </a>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 text-zinc-400 hover:text-white transition-colors">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-3xl flex flex-col items-center justify-center gap-8 lg:hidden"
          >
             {['Services', 'About', 'Reviews', 'Contact'].map(link => (
              <a onClick={() => setIsMenuOpen(false)} key={link} href={`#${link.toLowerCase()}`} className="text-3xl font-display font-bold tracking-tight text-zinc-400 hover:text-white transition-colors">
                {link}
              </a>
            ))}
            <a onClick={() => setIsMenuOpen(false)} href="#contact" className="mt-8 bg-white text-black px-8 py-4 rounded-full text-sm font-bold tracking-widest uppercase flex items-center gap-2">
              Book Appointment <MoveRight size={16} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero */}
      <section className="relative min-h-[100svh] flex items-center justify-center pt-24 overflow-hidden" id="home">
        <motion.div style={{ y: yHero, opacity: opacityHero, scale: useTransform(scrollYProgress, [0, 1], [1, 1.1]) }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-top opacity-30 mix-blend-luminosity will-change-transform" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-transparent to-transparent" />
          
          {/* Cinematic glows */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-10%] right-[0%] w-[800px] h-[800px] bg-red-600/20 blur-[150px] rounded-full pointer-events-none mix-blend-screen" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[0%] left-[-10%] w-[600px] h-[600px] bg-red-900/20 blur-[120px] rounded-full pointer-events-none" 
          />
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 w-full flex flex-col items-center text-center">
          
          <motion.div 
            className="inline-flex items-center gap-2 border border-white/10 bg-white/5 rounded-full px-4 py-1.5 backdrop-blur-md mb-8 overflow-hidden"
            initial={{ opacity: 0, y: 20, scale: 0.9 }} 
            animate={{ opacity: 1, y: 0, scale: 1 }} 
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[10px] text-zinc-300 font-medium tracking-[0.2em] uppercase">Premium Service Centre</span>
          </motion.div>
          
          <div className="overflow-hidden mb-6 filter drop-shadow-2xl">
            <motion.h1 
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="font-display text-6xl md:text-8xl lg:text-[11rem] font-black uppercase leading-[0.85] tracking-tighter text-white"
            >
              ACE <span className="text-red-500 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-800">MOT</span>
            </motion.h1>
          </div>
          
          <div className="overflow-hidden mb-12">
            <motion.p 
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: "0%" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
              className="text-lg md:text-2xl text-zinc-400 max-w-2xl leading-relaxed font-light"
            >
              Professional MOT testing, diagnostics, and performance servicing. Engineered for precision, delivered with trust.
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <a href="#contact" className="group relative overflow-hidden bg-white text-black px-8 py-5 rounded-full text-xs font-bold tracking-[0.1em] uppercase transition-all duration-300 flex items-center justify-center gap-3">
              <span className="relative z-10 flex items-center gap-3">
                Book Service <MoveRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-zinc-200 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-[0.6s] ease-out z-0" />
            </a>
            <a href="#services" className="group bg-transparent hover:bg-white/5 border border-white/10 text-white px-8 py-5 rounded-full text-xs font-bold tracking-[0.1em] uppercase transition-all duration-300 flex items-center justify-center gap-3 text-center overflow-hidden relative">
              <span className="relative z-10 flex items-center gap-3">
                Explore Work <MoveRight size={16} className="opacity-0 -ml-8 group-hover:ml-0 group-hover:opacity-100 transition-all duration-300" />
              </span>
            </a>
          </motion.div>

        </div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[9px] uppercase tracking-[0.3em] text-zinc-500 font-medium">Scroll</span>
          <div className="w-[1px] h-12 bg-white/10 relative overflow-hidden">
            <motion.div 
              animate={{ y: ['-100%', '100%'] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
              className="absolute inset-0 bg-red-500"
            />
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="relative z-20 py-16 border-y border-white/5 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 divide-x-0 md:divide-x divide-white/5">
          {STATS.map((stat, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              key={i} className="text-center px-4"
            >
              <div className="font-display text-4xl md:text-5xl font-black text-white mb-2">{stat.val}</div>
              <div className="text-[10px] text-zinc-500 tracking-[0.15em] uppercase font-semibold">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 relative bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="flex flex-col md:flex-row gap-6 md:gap-0 justify-between items-end mb-24">
            <div className="max-w-2xl">
              <h2 className="font-display text-5xl md:text-7xl font-black uppercase tracking-tight leading-[0.9] mb-6">
                Premium<br/>Services
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed font-light">
                Meticulous attention from certified technicians using modern tools and high-grade components.
              </p>
            </div>
            <a href="#contact" className="inline-flex items-center gap-2 text-red-500 hover:text-red-400 font-bold uppercase tracking-[0.15em] text-xs transition-colors">
              View All Services <MoveRight size={16} />
            </a>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:gap-16">
            {SERVICES.map((srv, index) => (
              <motion.div 
                key={srv.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="group flex flex-col md:flex-row gap-8 md:gap-16 items-center"
              >
                <div className={`w-full md:w-1/2 rounded-[2rem] overflow-hidden bg-white/5 border border-white/5 relative aspect-[4/3] block ${index % 2 === 1 ? 'md:order-2' : 'md:order-1'}`}>
                  <img src={srv.img} alt={srv.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105 opacity-80" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />
                </div>
                
                <div className={`w-full md:w-1/2 flex flex-col justify-center ${index % 2 === 1 ? 'md:order-1' : 'md:order-2'}`}>
                  <div className="font-mono text-red-500 font-bold tracking-widest text-sm mb-6">{srv.id} //</div>
                  <h3 className="font-display text-4xl md:text-5xl font-black mb-6 tracking-tight text-white">{srv.title}</h3>
                  <p className="text-zinc-400 text-lg leading-relaxed mb-8 font-light max-w-xl">{srv.desc}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-10">
                    {srv.tags.map(tag => (
                      <span key={tag} className="text-[10px] uppercase tracking-wider font-semibold text-zinc-400 border border-white/10 px-4 py-2 rounded-full bg-white/[0.02]">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="font-mono text-zinc-300 text-sm">
                      Starting from <span className="text-white text-xl font-medium ml-2">{srv.price}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="about" className="py-32 bg-zinc-950 border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="font-display text-5xl md:text-6xl font-black uppercase tracking-tight mb-6">Engineered for Trust</h2>
            <p className="text-zinc-400 text-lg md:text-xl font-light">We combine technical expertise with honest, transparent service to deliver the best results for your machine.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  key={i} 
                  className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 hover:bg-white/[0.04] transition-colors group cursor-default"
                >
                  <div className="w-12 h-12 bg-zinc-900 border border-white/10 rounded-2xl flex items-center justify-center text-red-500 mb-8 group-hover:scale-110 transition-transform duration-500">
                    <Icon size={20} className="stroke-[1.5]" />
                  </div>
                  <h4 className="font-display font-bold text-xl mb-3 text-white">{feat.title}</h4>
                  <p className="text-zinc-500 text-sm leading-relaxed font-light">{feat.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="reviews" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col items-center text-center mb-20">
            <h2 className="font-display text-5xl md:text-6xl font-black uppercase tracking-tight mb-6">Client Stories</h2>
            <div className="flex gap-1 text-red-500">
              {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
            </div>
            <p className="mt-4 text-zinc-400">Trusted by over 5,000 riders.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                key={i} 
                className="bg-white/[0.03] border border-white/5 rounded-[2rem] p-10 hover:border-white/10 transition-colors flex flex-col"
              >
                <p className="text-zinc-300 text-base leading-relaxed flex-1 mb-8 font-light italic">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-4 border-t border-white/5 pt-6 mt-auto">
                  <div className="w-10 h-10 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center font-mono text-xs font-bold text-white">
                    {t.name.substring(0,2)}
                  </div>
                  <div className="font-bold text-sm text-white">{t.name}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ & Contact grid */}
      <section id="contact" className="py-32 border-t border-white/5 relative bg-zinc-950 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* FAQ */}
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-black uppercase tracking-tight mb-12">FAQ</h2>
            <div className="space-y-4">
              {FAQS.map((faq, i) => (
                <div key={i} className="border-b border-white/10 last:border-0 pb-4">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full py-4 flex items-center justify-between text-left focus:outline-none group">
                    <span className="font-bold text-white group-hover:text-red-400 transition-colors">{faq.q}</span>
                    <span className="text-zinc-500 font-mono transform transition-transform duration-300" style={{ rotate: openFaq === i ? '45deg' : '0deg' }}>+</span>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="pb-6 text-zinc-400 text-sm leading-relaxed font-light">{faq.a}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white/[0.02] border border-white/5 backdrop-blur-3xl rounded-[2rem] p-10 relative overflow-hidden"
            >
              <h3 className="font-display text-3xl font-black uppercase tracking-tight mb-2 text-white">Book Your Slot</h3>
              <p className="text-sm text-zinc-400 mb-8 font-light">Fill out the form and we'll confirm within hours.</p>
              
              <form onSubmit={handleBook} className="space-y-6">
                <div>
                  <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all font-sans" placeholder="Full Name" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all font-sans" placeholder="Email Address" />
                  <input type="tel" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all font-sans" placeholder="Phone (opt)" />
                </div>
                <div>
                  <select required defaultValue="" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm text-zinc-300 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all font-sans appearance-none cursor-pointer">
                    <option value="" disabled>Select Service...</option>
                    <option value="mot">MOT Testing</option>
                    <option value="servicing">Full Servicing</option>
                    <option value="diagnostics">Diagnostics & Repair</option>
                  </select>
                </div>
                <button type="submit" disabled={formStatus === 'sent'} className={`w-full py-5 rounded-xl text-xs font-bold tracking-[0.15em] uppercase transition-all flex items-center justify-center gap-2 ${formStatus === 'sent' ? 'bg-zinc-800 text-white border border-white/10' : 'bg-white hover:bg-zinc-200 text-black active:scale-[0.98]'}`}>
                  {formStatus === 'sent' ? 'Request Sent' : 'Confirm Request'} {formStatus === 'sent' ? <CheckCircle size={16}/> : <MoveRight size={16}/>}
                </button>
              </form>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#050505] pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
            
            <div className="md:col-span-4">
              <a href="#" className="inline-block font-display text-4xl font-black tracking-tighter mb-4 text-white">
                ACE <span className="text-red-500">MOT</span>
              </a>
              <p className="text-sm text-zinc-500 leading-relaxed max-w-sm font-light">
                Professional motorcycle testing, diagnostics, and performance servicing in Hoddesdon.
              </p>
            </div>
            
            <div className="md:col-span-3 md:col-start-7">
              <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-300 mb-6 font-mono">Company</h5>
              <ul className="space-y-4 text-sm text-zinc-500">
                {['Services', 'About Us', 'Reviews', 'Contact'].map(link => (
                  <li key={link}><a href={`#${link.toLowerCase().replace(' ', '')}`} className="hover:text-white transition-colors block">{link}</a></li>
                ))}
              </ul>
            </div>
            
            <div className="md:col-span-3">
              <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-300 mb-6 font-mono">Contact</h5>
              <ul className="space-y-4 text-sm text-zinc-500">
                <li><span className="block text-zinc-600 mb-1 text-xs">Email</span> info@acemot.com</li>
                <li><span className="block text-zinc-600 mb-1 text-xs">Phone</span> +44 1234 567890</li>
                <li><span className="block text-zinc-600 mb-1 text-xs">Location</span> Hoddesdon, EN11</li>
              </ul>
            </div>
            
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 gap-4">
            <p className="text-[11px] text-zinc-600 font-mono tracking-wider">
              &copy; {new Date().getFullYear()} ACE MOT. ALL RIGHTS RESERVED.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-zinc-600 hover:text-white transition-colors text-sm font-medium">IG</a>
              <a href="#" className="text-zinc-600 hover:text-white transition-colors text-sm font-medium">XT</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
