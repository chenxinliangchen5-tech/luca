import { useLang } from '@/lib/LanguageContext';
import { getIcon } from '@/lib/icons';
import type { HeroContent } from '@/lib/types';

export default function Hero({ hero }: { hero: HeroContent }) {
  const { lang, t } = useLang();
  const ArrowRightIcon = getIcon('ArrowRight');
  const MailIcon = getIcon('Mail');

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-navy-950 via-navy-800 to-navy-900"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-navy-500/10 blur-3xl" />
        <div className="absolute bottom-0 -left-32 w-[28rem] h-[28rem] rounded-full bg-gold-500/5 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-28 pb-20 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: text */}
          <div className="animate-slide-in-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
              <span className="text-gold-300 text-sm font-medium tracking-wide">
                {t('求职中', 'Open to Opportunities')}
              </span>
            </div>

            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4">
              {t(hero.name, hero.name_en)}
            </h1>

            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-gold-400" />
              <p className="text-gold-300 text-lg font-medium">
                {t(hero.title, hero.title_en)}
              </p>
            </div>

            <p className="text-slatey-200 text-base md:text-lg leading-relaxed max-w-xl mb-8">
              {t(hero.tagline, hero.tagline_en)}
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo('projects')}
                className="group flex items-center gap-2 px-6 py-3.5 bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-gold-500/30 hover:-translate-y-0.5"
              >
                {t(hero.buttons.primary, hero.buttons.primary_en)}
                <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => scrollTo('contact')}
                className="group flex items-center gap-2 px-6 py-3.5 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 text-white font-semibold rounded-xl transition-all duration-300 hover:-translate-y-0.5"
              >
                <MailIcon className="w-4 h-4" />
                {t(hero.buttons.secondary, hero.buttons.secondary_en)}
              </button>
            </div>
          </div>

          {/* Right: avatar */}
          <div className="flex justify-center md:justify-end animate-slide-in-right">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-gold-500/20 to-navy-400/20 rounded-3xl blur-2xl" />
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-3xl overflow-hidden bg-gradient-to-br from-slatey-200 to-slatey-300 border-2 border-white/10 shadow-2xl">
                {hero.avatar ? (
                  <img
                    src={hero.avatar}
                    alt={t(hero.name, hero.name_en)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slatey-400">
                    <div className="w-24 h-24 rounded-full bg-slatey-300 flex items-center justify-center mb-3">
                      <span className="text-4xl font-serif text-slatey-500">
                        {t('陈', 'C')}
                      </span>
                    </div>
                    <span className="text-sm text-slatey-500">
                      {t('头像占位图', 'Avatar Placeholder')}
                    </span>
                  </div>
                )}
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-xl px-5 py-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold-100 flex items-center justify-center">
                  <span className="text-gold-600 font-bold text-sm">CET-4</span>
                </div>
                <div>
                  <p className="text-xs text-slatey-500">{t('英语能力', 'English')}</p>
                  <p className="text-sm font-semibold text-navy-800">
                    {t('良好', 'Proficient')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Strengths bar */}
        <div className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-4">
          {hero.strengths.map((s, i) => {
            const Icon = getIcon(s.icon);
            return (
              <div
                key={i}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:border-gold-500/30 transition-all duration-300 hover:-translate-y-1 cursor-default"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="w-11 h-11 rounded-xl bg-gold-500/10 flex items-center justify-center mb-3 group-hover:bg-gold-500/20 transition-colors">
                  <Icon className="w-5 h-5 text-gold-400" />
                </div>
                <h4 className="text-white font-semibold text-sm mb-1">
                  {t(s.label, s.label_en)}
                </h4>
                <p className="text-slatey-300 text-xs leading-relaxed">
                  {t(s.desc, s.desc_en)}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollTo('about')}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 hover:text-white/70 transition-colors"
      >
        <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-current rounded-full animate-bounce" />
        </div>
      </button>
    </section>
  );
}
