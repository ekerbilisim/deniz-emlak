import { motion } from "motion/react";
import { Phone, MapPin, MessageSquare, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { Logo } from "../App";
import { ThemeContext } from "../context/ThemeContext";
import React, { useState, useContext, useRef } from "react";
import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile";

const Contact = () => {
  const { isDark } = useContext(ThemeContext);
  const address = "Yenidoğan Mah. Gökveren Cad. No: 5, Boğazlıyan / Yozgat";
  const phone1 = "+90 533 377 20 98";
  const whatsappLink = `https://wa.me/905333772098`;
  const turnstileRef = useRef<TurnstileInstance>(null);

  const mapAppUrl = (typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent))
    ? `maps://?q=${encodeURIComponent(address)}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    message: ''
  });

  // 100% Free Google Maps Embed (No API Key Required)
  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!turnstileToken) {
      setErrorMessage("Lütfen robot olmadığınızı doğrulayın.");
      setFormState('error');
      return;
    }

    setFormState('loading');
    setErrorMessage('');

    // Client-side rate limiting for Static Hosting (GitHub Pages)
    const today = new Date().toLocaleDateString('tr-TR');
    const storageKey = 'deniz_emlak_limit';
    
    try {
      const rawData = localStorage.getItem(storageKey);
      let limitData = rawData ? JSON.parse(rawData) : { date: today, count: 0 };

      if (limitData.date !== today) {
        limitData = { date: today, count: 0 };
      }

      if (limitData.count >= 2) {
        setErrorMessage("Günlük limitinize ulaştınız. Günde en fazla 2 kez form gönderebilirsiniz. Lütfen yarın tekrar deneyin.");
        setFormState('error');
        return;
      }

      // Simulation of a successful send (Since static pages don't have a backend)
      // Note: In production, integrate with a service like Formspree or Getform for real emails.
      await new Promise(resolve => setTimeout(resolve, 1500));

      limitData.count += 1;
      localStorage.setItem(storageKey, JSON.stringify(limitData));

      setFormState('success');
      setFormData({ firstName: '', lastName: '', phone: '', message: '' });
      setTurnstileToken(null);
      turnstileRef.current?.reset();
    } catch (error) {
      setErrorMessage('İşlem sırasında bir sorun oluştu.');
      setFormState('error');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="pt-24 min-h-screen transition-colors duration-300">
      <section className="py-12 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16 flex flex-col items-center gap-6"
          >
            <Logo className="w-48 md:w-56 mb-4" />
            <div>
              <h1 
                className={`text-4xl font-bold mb-4 transition-colors duration-300 ${isDark ? 'text-white' : 'text-brand-navy'}`}
                style={{ color: isDark ? '#FFFFFF' : '#0B2556' }}
              >
                İletişim
              </h1>
              <p className={`transition-colors duration-300 ${isDark ? 'text-dark-muted' : 'text-gray-600'}`}>
                Sorularınız ve danışmanlık hizmetlerimiz için bizimle iletişime geçin.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info & Form */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-dark-surface p-8 rounded-lg card-shadow border-t-4 border-brand-navy dark:border-blue-500 transition-colors duration-300"
            >
              <h2 className="text-xl font-bold mb-6 text-brand-navy dark:text-white">Bize Mesaj Gönderin</h2>
              
              {formState === 'success' ? (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-8 rounded-lg text-center">
                  <CheckCircle2 size={48} className="mx-auto text-green-500 mb-4" />
                  <h3 className="text-xl font-bold text-green-800 dark:text-green-300 mb-2">Mesajınız Gönderildi!</h3>
                  <p className="text-green-700 dark:text-green-400 mb-6">En kısa sürede size dönüş yapacağız.</p>
                  <button 
                    onClick={() => setFormState('idle')}
                    className="text-sm font-bold text-green-800 dark:text-green-300 underline"
                  >
                    Yeni Mesaj Gönder
                  </button>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 dark:text-dark-muted">Adınız</label>
                      <input 
                        type="text" 
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Adınız"
                        className="w-full border-b-2 border-gray-100 dark:border-dark-border py-2 text-sm focus:outline-none focus:border-brand-navy bg-transparent dark:text-dark-text"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 dark:text-dark-muted">Soyadınız</label>
                      <input 
                        type="text" 
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Soyadınız"
                        className="w-full border-b-2 border-gray-100 dark:border-dark-border py-2 text-sm focus:outline-none focus:border-brand-navy bg-transparent dark:text-dark-text"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 dark:text-dark-muted">Telefon Numaranız</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="05XX XXX XX XX"
                      className="w-full border-b-2 border-gray-100 dark:border-dark-border py-2 text-sm focus:outline-none focus:border-brand-navy bg-transparent dark:text-dark-text"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 dark:text-dark-muted">Mesajınız</label>
                    <textarea 
                      rows={4}
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Mesajınızı buraya yazın..."
                      className="w-full border-b-2 border-gray-100 dark:border-dark-border py-2 text-sm focus:outline-none focus:border-brand-navy bg-transparent dark:text-white resize-none"
                      required
                    ></textarea>
                  </div>

                  {formState === 'error' && (
                    <div className="flex items-center gap-2 text-red-500 text-xs font-bold bg-red-50 dark:bg-red-900/20 p-3 rounded">
                      <AlertCircle size={14} />
                      {errorMessage}
                    </div>
                  )}

                  {/* Cloudflare Turnstile */}
                  <div className="flex justify-center my-2">
                    <Turnstile
                      ref={turnstileRef}
                      siteKey="0x4AAAAAADELWGyxOFjEv1tu"
                      onSuccess={(token) => setTurnstileToken(token)}
                      onError={() => {
                        setErrorMessage("Güvenlik doğrulaması başarısız oldu. Lütfen sayfayı yenileyip tekrar deneyin.");
                        setFormState('error');
                      }}
                      onExpire={() => setTurnstileToken(null)}
                      options={{
                        theme: isDark ? 'dark' : 'light',
                        size: 'normal',
                      }}
                    />
                  </div>

                  <button 
                    disabled={formState === 'loading'}
                    className="w-full bg-brand-navy text-white py-4 rounded font-bold text-sm uppercase tracking-wider hover:bg-brand-dark transition-all shadow-lg shadow-brand-navy/10 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {formState === 'loading' ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <Send size={16} />
                        MESAJI GÖNDER
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Quick Contact Buttons */}
              <div className="mt-8 pt-8 border-t border-gray-100 dark:border-dark-border flex flex-wrap gap-4 justify-center">
                <a 
                  href={whatsappLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[150px] bg-[#25D366] text-white py-3 rounded-lg flex items-center justify-center gap-2 font-bold text-sm hover:opacity-90 transition-opacity"
                >
                  <MessageSquare size={18} />
                  WHATSAPP
                </a>
                <a 
                  href={`tel:${phone1.replace(/\s/g, '')}`}
                  className="flex-1 min-w-[150px] bg-brand-navy text-white py-3 rounded-lg flex items-center justify-center gap-2 font-bold text-sm hover:opacity-90 transition-opacity"
                >
                  <Phone size={18} />
                  HEMEN ARA
                </a>
              </div>
            </motion.div>

            {/* Map & Address Info */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="bg-white dark:bg-dark-surface p-8 rounded-lg card-shadow border-l-4 border-brand-wood transition-colors duration-300">
                <h2 className="text-xl font-bold mb-6 text-brand-navy dark:text-white">Adres Bilgilerimiz</h2>
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-10 h-10 bg-brand-bg dark:bg-dark-bg rounded-full flex items-center justify-center shrink-0 border border-brand-wood/20">
                    <MapPin className="text-brand-wood" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-navy dark:text-white text-sm uppercase tracking-wider mb-1">Merkez Ofis</h3>
                    <a 
                      href={mapAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 dark:text-dark-muted text-sm leading-relaxed hover:text-brand-red transition-colors block"
                    >
                      {address}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-brand-bg dark:bg-dark-bg rounded-full flex items-center justify-center shrink-0 border border-brand-navy/20 dark:border-blue-500/20">
                    <Phone className="text-brand-navy dark:text-blue-400" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-navy dark:text-white text-sm uppercase tracking-wider mb-1">Müşteri Hizmetleri</h3>
                    <a href={`tel:${phone1.replace(/\s/g, '')}`} className="text-gray-500 dark:text-dark-muted text-sm hover:text-brand-red transition-colors">{phone1}</a>
                  </div>
                </div>
              </div>

              {/* Map Embed */}
              <div className="h-[400px] w-full rounded-lg overflow-hidden card-shadow border border-gray-100 dark:border-dark-border bg-gray-50 dark:bg-dark-surface relative group">
                <iframe 
                  title="Deniz Emlak Konum"
                  className="w-full h-full grayscale opacity-80 group-hover:grayscale-0 transition-all duration-700"
                  src={mapUrl}
                  allowFullScreen
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
