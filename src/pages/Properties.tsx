import { motion } from "motion/react";
import { Hammer, Clock, ArrowRight, ExternalLink } from "lucide-react";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Logo } from "../App";

const Properties = () => {
  const { isDark } = useContext(ThemeContext);

  return (
    <div className="pt-24 min-h-[80vh] flex flex-col items-center justify-center px-8 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5 dark:opacity-10 z-0">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-navy rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-brand-red rounded-full blur-3xl"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-3xl w-full text-center relative z-10"
      >
        <div className="flex flex-col items-center mb-12">
          <Logo className="w-48 md:w-64 mb-8" />
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 bg-brand-navy text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
          >
            <Clock size={14} />
            YAKINDA SİZLERLE
          </motion.div>
          
          <h1 className={`text-5xl md:text-7xl font-bold mb-8 leading-tight tracking-tighter ${isDark ? 'text-white' : 'text-brand-navy'}`}>
            Satılık/Kiralık Mülkler <br /> 
            <span className="text-brand-red">Çok Yakında</span>
          </h1>
          
          <div className="w-24 h-1 bg-brand-navy dark:bg-blue-500 rounded mb-10"></div>
          
          <p className={`text-lg md:text-xl leading-relaxed mb-12 max-w-2xl ${isDark ? 'text-dark-muted' : 'text-gray-600'}`}>
            Deniz Emlak olarak dijital dönüşümümüzü sürdürüyoruz. <span className="font-bold text-brand-navy dark:text-white">Sahibinden.com</span> üzerindeki güncel portföyümüzü, en güncel fiyat ve detaylarıyla birlikte doğrudan bu sayfada sunmak için altyapı çalışmalarımız devam ediyor.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-xl mx-auto">
            <div className={`p-6 rounded-2xl border text-left flex flex-col gap-3 ${isDark ? 'bg-dark-surface border-dark-border text-white' : 'bg-white border-gray-100 text-brand-navy shadow-sm'}`}>
              <div className="w-10 h-10 rounded-lg bg-brand-navy flex items-center justify-center text-white">
                <Hammer size={20} />
              </div>
              <h3 className="font-bold">Aktif Çalışma</h3>
              <p className="text-sm opacity-70">Sistemlerimizi Sahibinden.com ile entegre ediyoruz.</p>
            </div>
            
            <div className={`p-6 rounded-2xl border text-left flex flex-col gap-3 ${isDark ? 'bg-dark-surface border-dark-border text-white' : 'bg-white border-gray-100 text-brand-navy shadow-sm'}`}>
              <div className="w-10 h-10 rounded-lg bg-brand-red flex items-center justify-center text-white">
                <ArrowRight size={20} />
              </div>
              <h3 className="font-bold">Anlık Senkronizasyon</h3>
              <p className="text-sm opacity-70">Fiyat ve ilan güncellemeleri anında burada olacak.</p>
            </div>
          </div>

          <div className="mt-16 flex flex-col items-center gap-6">
            <p className={`text-sm tracking-widest font-bold uppercase ${isDark ? 'text-dark-muted' : 'text-gray-400'}`}>
              Takipte Kalın
            </p>
            <a 
              href="https://denizemlakbogazliyan.sahibinden.com/?userId=a6KgnJEsq-Lhqvx0ASE661A" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-brand-navy text-white px-8 py-4 rounded-xl font-bold shadow-xl hover:bg-brand-dark transition-all hover:scale-105"
            >
              İlanlarımızı Sahibinden'de Gör
              <ExternalLink size={20} />
            </a>
          </div>
        </div>
      </motion.div>

      {/* Subtle loader-like animation */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ 
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.3
            }}
            className="w-2 h-2 rounded-full bg-brand-navy dark:bg-blue-500"
          />
        ))}
      </div>
    </div>
  );
};

export default Properties;
