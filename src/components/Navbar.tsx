import { useState, useEffect } from 'react';
import { useLang } from '@/lib/LanguageContext';
import { getIcon } from '@/lib/icons';

const navItems = [
  { id: 'home', zh: '首页', en: 'Home' },
  { id: 'about', zh: '关于我', en: 'About' },
  { id: 'skills', zh: '核心能力', en: 'Skills' },
  { id: 'projects', zh: '实践项目', en: 'Projects' },
  { id: 'education', zh: '教育背景', en: 'Education' },
  { id: 'contact', zh: '联系我', en: 'Contact' },
];

export default function Navbar() {
  const { lang, setLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNav = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const MenuIcon = getIcon('Menu');
  const XIcon = getIcon('X');
  const GlobeIcon = getIcon('Globe');

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <button
          onClick={() => handleNav('home')}
          className={`font-serif text-xl font-bold tracking-wide transition-colors ${
            scrolled ? 'text-navy-800' : 'text-white'
          }`}
        >
          {t('陈新亮', 'Chen Xinliang')}
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                activeSection === item.id
                  ? scrolled
                    ? 'text-gold-600 bg-gold-50'
                    : 'text-gold-300 bg-white/10'
                  : scrolled
                    ? 'text-slatey-600 hover:text-navy-700 hover:bg-navy-50'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              {t(item.zh, item.en)}
            </button>
          ))}
          <button
            onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
            className={`ml-2 flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg border transition-all duration-200 ${
              scrolled
                ? 'border-slatey-200 text-slatey-700 hover:border-navy-400 hover:text-navy-700'
                : 'border-white/30 text-white hover:border-white/60'
            }`}
          >
            <GlobeIcon className="w-4 h-4" />
            {lang === 'zh' ? 'EN' : '中'}
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden p-2 rounded-lg transition-colors ${
            scrolled ? 'text-navy-800' : 'text-white'
          }`}
        >
          {mobileOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="mx-4 mt-3 bg-white rounded-xl shadow-lg p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`w-full text-left px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                activeSection === item.id
                  ? 'text-gold-600 bg-gold-50'
                  : 'text-slatey-600 hover:bg-navy-50'
              }`}
            >
              {t(item.zh, item.en)}
            </button>
          ))}
          <button
            onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
            className="w-full flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-lg text-slatey-600 hover:bg-navy-50 border-t border-slatey-100 mt-2 pt-3"
          >
            <GlobeIcon className="w-4 h-4" />
            {lang === 'zh' ? 'English' : '中文'}
          </button>
        </div>
      </div>
    </nav>
  );
}
