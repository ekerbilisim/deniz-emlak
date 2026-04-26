import { motion } from "motion/react";
import { Phone, Instagram, Facebook, Moon, Sun, Menu, X } from "lucide-react";
import { Link, HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Properties from "./pages/Properties";
import { ThemeContext } from "./context/ThemeContext";

export const Logo = ({ isDark: manualIsDark, className = "" }: { isDark?: boolean; className?: string }) => {
  const { isDark: contextIsDark } = useContext(ThemeContext);
  const isDark = manualIsDark !== undefined ? manualIsDark : contextIsDark;
  
  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <img 
        src="https://i.ibb.co/N22StdM5/Logo-Photoroom.png" 
        alt="Deniz Emlak"
        className={`w-full h-auto object-contain ${isDark ? 'brightness-0 invert' : ''}`}
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Navbar = () => {
  const { isDark, toggle } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);
  
  return (
    <>
      <nav className={`fixed top-0 w-full h-20 flex items-center justify-between px-6 md:px-8 border-b z-50 transition-all duration-300 ${isDark ? 'bg-dark-bg/95 border-dark-border backdrop-blur-md' : 'bg-white/95 border-gray-100 backdrop-blur-md'}`}>
        <Link to="/" className="hover:opacity-80 transition-opacity">
          <Logo isDark={isDark} className="w-24 md:w-36" />
        </Link>
        
        <div className="flex items-center gap-3 md:gap-6">
          <nav className={`hidden md:flex gap-8 text-sm font-semibold ${isDark ? 'text-dark-muted' : 'text-gray-600'}`}>
            <Link to="/" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-brand-navy'}`}>Ana Sayfa</Link>
            <Link to="/properties" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-brand-navy'}`}>Satılık/Kiralık Mülkler</Link>
            <Link to="/contact" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-brand-navy'}`}>İletişim</Link>
          </nav>

          <div className="h-6 w-[1px] bg-gray-200 dark:bg-dark-border hidden md:block"></div>

          <button 
            onClick={toggle}
            className={`p-2 rounded-full transition-all duration-300 ${isDark ? 'bg-dark-surface text-yellow-400 hover:bg-dark-border' : 'bg-gray-100 text-brand-navy hover:bg-gray-200'}`}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          <a 
            href="tel:+905333772098"
            className={`bg-brand-navy text-white px-4 md:px-6 py-2.5 rounded shadow-lg transition-all active:scale-95 hidden sm:flex items-center gap-2 text-sm font-bold ${isDark ? 'hover:bg-blue-800 shadow-blue-900/20' : 'hover:bg-brand-dark shadow-brand-navy/10'}`}
          >
            <Phone size={14} className="opacity-70" />
            <span className="hidden lg:inline">+90 533 377 20 98</span>
            <span className="lg:hidden text-xs truncate">Ara</span>
          </a>

          {/* Mobile Menu Button */}
          <button 
            className={`md:hidden p-2 rounded-lg transition-colors ${isDark ? 'text-white hover:bg-dark-surface' : 'text-brand-navy hover:bg-gray-100'}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <motion.div 
        initial={false}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className={`fixed top-20 right-0 h-[calc(100vh-80px)] w-full sm:w-80 z-40 border-l shadow-2xl md:hidden overflow-y-auto ${isDark ? 'bg-dark-bg border-dark-border' : 'bg-white border-gray-100'}`}
      >
        <div className="p-8 flex flex-col gap-6">
          <Link to="/" className={`text-xl font-bold flex items-center justify-between pb-4 border-b ${isDark ? 'text-white border-dark-border' : 'text-brand-navy border-gray-100'}`}>
            Ana Sayfa
          </Link>
          <Link to="/properties" className={`text-xl font-bold flex items-center justify-between pb-4 border-b ${isDark ? 'text-white border-dark-border' : 'text-brand-navy border-gray-100'}`}>
            Satılık/Kiralık Mülkler
          </Link>
          <Link to="/contact" className={`text-xl font-bold flex items-center justify-between pb-4 border-b ${isDark ? 'text-white border-dark-border' : 'text-brand-navy border-gray-100'}`}>
            İletişim
          </Link>

          <div className="mt-8">
            <p className={`text-xs uppercase tracking-widest font-bold mb-4 ${isDark ? 'text-dark-muted' : 'text-gray-400'}`}>İletişim Bilgileri</p>
            <div className="flex flex-col gap-4">
              <a href="tel:+905333772098" className={`flex items-center gap-4 text-lg font-bold ${isDark ? 'text-white' : 'text-brand-navy'}`}>
                <div className="w-10 h-10 rounded-full bg-brand-navy text-white flex items-center justify-center">
                  <Phone size={18} />
                </div>
                +90 533 377 20 98
              </a>
              <a href="https://www.instagram.com/deniz_emlak66" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-4 text-lg font-bold ${isDark ? 'text-white' : 'text-brand-navy'}`}>
                <div className="w-10 h-10 rounded-full bg-brand-navy text-white flex items-center justify-center">
                  <Instagram size={18} />
                </div>
                Instagram
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

const Footer = () => {
  const { isDark } = useContext(ThemeContext);
  
  const address = "Yenidoğan Mah. Gökveren Cad. No: 5, Boğazlıyan / Yozgat";
  const mapAppUrl = (typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent))
    ? `maps://?q=${encodeURIComponent(address)}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  return (
    <footer className={`py-16 px-8 transition-colors duration-300 ${isDark ? 'bg-dark-surface' : 'bg-brand-navy text-white'}`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-12">
        <div className="flex flex-col gap-6 items-center md:items-start">
          <Logo isDark={true} className="w-40 md:w-48" />
          <a 
            href={mapAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-sm max-w-[280px] leading-relaxed transition-colors hover:text-brand-red ${isDark ? 'text-dark-muted' : 'opacity-70'}`}
          >
            Yenidoğan Mah. Gökveren Cad. No: 5 <br /> Boğazlıyan / YOZGAT
          </a>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="flex gap-8 mb-6">
            <a href="#" className={`transition-all ${isDark ? 'text-dark-muted hover:text-white' : 'hover:text-brand-red'}`}><Facebook size={24} /></a>
            <a href="https://www.instagram.com/deniz_emlak66" target="_blank" rel="noopener noreferrer" className={`transition-all ${isDark ? 'text-dark-muted hover:text-white' : 'hover:text-brand-red'}`}><Instagram size={24} /></a>
          </div>
          <p className={`text-xs uppercase tracking-widest ${isDark ? 'text-dark-muted' : 'opacity-60'}`}>© {new Date().getFullYear()} Deniz Emlak - Tüm Hakları Saklıdır</p>
        </div>
        
        <div className={`flex flex-col items-center md:items-end gap-2 ${isDark ? 'text-dark-text' : 'text-white'}`}>
          <p className="font-bold text-sm uppercase tracking-wider mb-2">Hızlı İletişim</p>
          <a href="tel:+905333772098" className={`text-base font-bold transition-colors hover:text-brand-red ${isDark ? 'text-white' : ''}`}>+90 533 377 20 98</a>
          <a href="tel:+905414196718" className={`text-base font-bold transition-colors hover:text-brand-red ${isDark ? 'text-white' : ''}`}>+90 541 419 67 18</a>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') setIsDark(true);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggle = () => setIsDark(!isDark);

  return (
    <ThemeContext.Provider value={{ isDark, toggle }}>
      <Router>
        <ScrollToTop />
        <div className={`min-h-screen transition-colors duration-300 selection:bg-brand-navy selection:text-white font-sans ${isDark ? 'bg-dark-bg text-dark-text' : 'bg-brand-bg text-brand-dark'}`}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ThemeContext.Provider>
  );
}

