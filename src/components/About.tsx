import { useLang } from '@/lib/LanguageContext';
import { useReveal } from '@/lib/useReveal';
import { getIcon } from '@/lib/icons';
import type { AboutContent } from '@/lib/types';

export default function About({ about }: { about: AboutContent }) {
  const { t } = useLang();
  const { ref, revealed } = useReveal();
  const CheckIcon = getIcon('CheckCircle');

  return (
    <section id="about" className="py-24 bg-white">
      <div
        ref={ref}
        className={`max-w-5xl mx-auto px-6 transition-all duration-700 ${
          revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="text-center mb-16">
          <span className="text-gold-600 text-sm font-semibold tracking-widest uppercase">
            {t('关于我', 'About Me')}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy-800 mt-3">
            {t('个人简介', 'Personal Profile')}
          </h2>
          <div className="flex justify-center mt-4">
            <div className="h-1 w-16 bg-gold-400 rounded-full" />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {/* Paragraphs */}
          <div className="md:col-span-2 space-y-6">
            {about.paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-slatey-600 text-base leading-[1.8] text-justify"
              >
                {t(p.zh, p.en)}
              </p>
            ))}
          </div>

          {/* Highlights */}
          <div className="bg-navy-50 rounded-2xl p-6 space-y-4 h-fit">
            <h3 className="font-semibold text-navy-800 text-sm uppercase tracking-wider mb-2">
              {t('核心亮点', 'Key Highlights')}
            </h3>
            {about.bullets.map((b, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckIcon className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
                <span className="text-slatey-600 text-sm leading-relaxed">
                  {t(b.zh, b.en)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
