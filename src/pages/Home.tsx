import { motion } from "motion/react";
import { Home as HomeIcon, Building2, Key, Search, MapPin, Phone } from "lucide-react";
import { Logo } from "../App";

// Home Components moved from App.tsx
const Hero = () => (
  <section className="relative h-[450px] hero-gradient flex items-center justify-center text-center px-4 overflow-hidden mt-16">
    <div className="absolute inset-0 opacity-20 flex items-center justify-center pointer-events-none">
      <div className="w-[600px] h-[600px] rounded-full border-[60px] border-white"></div>
    </div>
    <div className="relative z-10 text-white max-w-2xl flex flex-col items-center gap-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Logo isDark={true} className="w-56 md:w-72 mb-8" />
      </motion.div>
      <div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold mb-3"
        >
          Geleceğinizin Evini Bizimle Bulun.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg opacity-90"
        >
          Modern Çözümler, Güvenilir Hizmet.
        </motion.p>
      </div>
    </div>
  </section>
);

const SearchBox = () => (
  <div className="relative z-20 max-w-5xl mx-auto px-8 -mt-8">
    <div className="bg-white dark:bg-dark-surface p-6 rounded-lg card-shadow flex flex-col md:flex-row gap-4 items-end transition-colors duration-300">
      <div className="flex-1 w-full">
        <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400 dark:text-dark-muted mb-1">Konum</label>
        <select className="w-full border-b-2 border-gray-100 dark:border-dark-border py-2 text-sm focus:outline-none focus:border-brand-navy bg-transparent dark:text-dark-text">
          <option className="dark:bg-dark-surface">Tüm Bölgeler</option>
          <option className="dark:bg-dark-surface">Yozgat / Boğazlıyan</option>
        </select>
      </div>
      <div className="flex-1 w-full">
        <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400 dark:text-dark-muted mb-1">Emlak Tipi</label>
        <select className="w-full border-b-2 border-gray-100 dark:border-dark-border py-2 text-sm focus:outline-none focus:border-brand-navy bg-transparent dark:text-dark-text">
          <option className="dark:bg-dark-surface">Satılık / Kiralık</option>
          <option className="dark:bg-dark-surface">Satılık</option>
          <option className="dark:bg-dark-surface">Kiralık</option>
        </select>
      </div>
      <div className="flex-1 w-full">
        <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400 dark:text-dark-muted mb-1">Fiyat Aralığı</label>
        <select className="w-full border-b-2 border-gray-100 dark:border-dark-border py-2 text-sm focus:outline-none focus:border-brand-navy bg-transparent dark:text-dark-text">
          <option className="dark:bg-dark-surface">Tüm Fiyatlar</option>
          <option className="dark:bg-dark-surface">0 - 1.000.000 TL</option>
        </select>
      </div>
      <button className="w-full md:w-auto bg-brand-navy text-white px-8 py-3 rounded font-bold text-sm uppercase tracking-wider hover:bg-brand-dark transition-colors shadow-lg shadow-brand-navy/10">
        Mülk Ara
      </button>
    </div>
  </div>
);

const Services = () => {
  const services = [
    { title: "Konut Satışı", desc: "Hayalinizdeki eve kavuşmanız için profesyonel danışmanlık.", icon: "🏢" },
    { title: "Kiralama", desc: "Güvenilir ve hızlı kiralama süreçleri.", icon: "🔑" },
    { title: "Ticari", desc: "İşletmeniz için en uygun ticari alanlar ve ofisler.", icon: "💼" }
  ];

  return (
    <section className="py-20 px-8 geometric-pattern">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-brand-navy dark:text-blue-400 mb-2">Hizmetlerimiz</h2>
          <div className="h-1 w-12 bg-brand-navy dark:bg-blue-400 rounded"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((s, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-dark-surface p-8 rounded-lg card-shadow border-t-4 border-brand-wood transition-all duration-300"
            >
              <div className="text-3xl mb-4 opacity-80">{s.icon}</div>
              <h3 className="font-bold text-lg mb-3 text-brand-navy dark:text-white">{s.title}</h3>
              <p className="text-sm text-gray-500 dark:text-dark-muted leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Listings = () => (
  <section className="py-20 px-8 geometric-pattern bg-gray-50/50 dark:bg-transparent">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col items-center mb-12">
        <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-brand-navy dark:text-blue-400 mb-2">Son Eklenen Mülkler</h2>
        <div className="h-1 w-12 bg-brand-navy dark:bg-blue-400 rounded"></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {[
          { 
            type: "SATILIK", 
            title: "Modern 3+1 Daire", 
            loc: "Boğazlıyan, Merkez", 
            price: "2.450.000 TL",
            image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80&w=400&h=400"
          },
          { 
            type: "KİRALIK", 
            title: "Lüks Rezidans", 
            loc: "Boğazlıyan, Yeni Mah.", 
            price: "12.000 TL",
            image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=400&h=400"
          }
        ].map((p, idx) => (
          <div key={idx} className="bg-white dark:bg-dark-surface rounded-lg overflow-hidden card-shadow h-[160px] flex group transition-all duration-300 hover:translate-x-1 border border-transparent dark:border-dark-border">
            <div className="w-40 bg-gray-200 dark:bg-dark-border shrink-0 relative overflow-hidden">
              <img 
                src={p.image} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                alt={p.title}
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-6 flex flex-col justify-between flex-1">
              <div>
                <p className="text-[10px] text-brand-navy dark:text-blue-400 font-bold mb-1 tracking-widest">{p.type}</p>
                <h4 className="text-lg font-bold text-brand-navy dark:text-white line-clamp-1">{p.title}</h4>
                <div className="flex items-center gap-1 text-[11px] text-gray-400 dark:text-dark-muted mt-1">
                  <MapPin size={10} />
                  {p.loc}
                </div>
              </div>
              <p className="text-xl font-black text-brand-navy dark:text-white mt-auto">{p.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Team = () => (
  <section className="py-20 px-8 geometric-pattern">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col items-center mb-12">
        <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-brand-navy dark:text-blue-400 mb-2">Uzman Ekibimiz</h2>
        <div className="h-1 w-12 bg-brand-navy dark:bg-blue-400 rounded"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          { 
            name: "Selim Erbaş", 
            phone: "+90 533 377 20 98", 
            role: "Gayrimenkul Danışmanı", 
            init: "SE",
            image: "https://i.ibb.co/8gRft0kT/Whats-App-mage-2026-04-20-at-21-12-48.jpg"
          },
          { 
            name: "Ahmet Dursun", 
            phone: "+90 541 419 67 18", 
            role: "Yatırım Uzmanı", 
            init: "AD",
            image: "https://i.ibb.co/gbmvzGYL/Whats-App-mage-2026-04-20-at-21-11-37.jpg"
          }
        ].map((m, idx) => (
          <div key={idx} className="bg-white dark:bg-dark-surface p-8 rounded-lg card-shadow flex items-center gap-8 border-l-4 border-brand-navy dark:border-blue-500 group hover:bg-gray-50 dark:hover:bg-dark-border transition-all duration-300">
            <div className="w-24 h-24 rounded-full bg-gray-50 dark:bg-dark-bg border-2 border-gray-100 dark:border-dark-border flex items-center justify-center font-bold text-gray-300 dark:text-dark-border text-2xl group-hover:border-brand-navy transition-all duration-500 shrink-0 overflow-hidden relative">
              {m.image ? (
                <img 
                  src={m.image} 
                  alt={m.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span className="group-hover:text-white transition-colors duration-500 z-10">{m.init}</span>
              )}
              {!m.image && <div className="absolute inset-0 bg-brand-navy translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>}
            </div>
            <div>
              <h4 className="font-bold text-xl text-brand-navy dark:text-white mb-1">{m.name}</h4>
              <a 
                href={`tel:${m.phone.replace(/\s/g, '')}`}
                className="text-sm text-gray-500 dark:text-dark-muted mb-2 flex items-center gap-2 hover:text-brand-red transition-colors"
              >
                <Phone size={14} className="text-brand-navy dark:text-blue-400" />
                {m.phone}
              </a>
              <p className="text-[10px] text-brand-navy dark:text-blue-400 font-bold uppercase tracking-widest">{m.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Home = () => {
  return (
    <>
      <Hero />
      <SearchBox />
      <main className="min-h-screen">
        <Services />
        <Listings />
        <Team />
      </main>
    </>
  );
};

export default Home;
