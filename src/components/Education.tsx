import { useLang } from '@/lib/LanguageContext';
import { useReveal } from '@/lib/useReveal';
import { getIcon } from '@/lib/icons';
import type { EducationContent } from '@/lib/types';

export default function Education({ education }: { education: EducationContent }) {
  const { t } = useLang();
  const { ref, revealed } = useReveal();
  const GraduationCapIcon = getIcon('GraduationCap');
  const AwardIcon = getIcon('Award');
  const BookOpenIcon = getIcon('BookOpen');
  const CheckCircleIcon = getIcon('CheckCircle');

  return (
    <section id="education" className="py-24 bg-slatey-50">
      <div
        ref={ref}
        className={`max-w-5xl mx-auto px-6 transition-all duration-700 ${
          revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="text-center mb-16">
          <span className="text-gold-600 text-sm font-semibold tracking-widest uppercase">
            {t('教育背景', 'Education')}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy-800 mt-3">
            {t('教育与证书', 'Education & Certificates')}
          </h2>
          <div className="flex justify-center mt-4">
            <div className="h-1 w-16 bg-gold-400 rounded-full" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* School card */}
          <div className="bg-white rounded-2xl p-8 border border-slatey-100 shadow-sm hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-navy-50 flex items-center justify-center flex-shrink-0">
                <GraduationCapIcon className="w-7 h-7 text-navy-600" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-navy-800">
                  {t(education.school, education.school_en)}
                </h3>
                <p className="text-slatey-500 text-sm mt-1">
                  {t(education.degree, education.degree_en)}
                </p>
                <p className="text-slatey-400 text-xs mt-1">{education.period}</p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 bg-gold-50 text-gold-700 px-3 py-1.5 rounded-lg text-sm font-medium mb-6">
              <AwardIcon className="w-4 h-4" />
              {t(education.rank, education.rank_en)}
            </div>

            <div>
              <h4 className="text-xs font-semibold text-slatey-400 uppercase tracking-wider mb-3">
                {t('主修课程', 'Major Courses')}
              </h4>
              <div className="flex flex-wrap gap-2">
                {(t('zh', 'en') === 'zh'
                  ? education.majors
                  : education.majors_en
                ).map((m, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg bg-navy-50 text-navy-600"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Certificates & honors */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 border border-slatey-100 shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gold-50 flex items-center justify-center">
                  <AwardIcon className="w-5 h-5 text-gold-500" />
                </div>
                <h3 className="font-semibold text-navy-800">
                  {t('证书', 'Certificates')}
                </h3>
              </div>
              {education.certificates.map((c, i) => (
                <div key={i} className="flex items-center gap-2 text-slatey-600 text-sm">
                  <CheckCircleIcon className="w-4 h-4 text-gold-500 flex-shrink-0" />
                  {t(c.name, c.name_en)}
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl p-8 border border-slatey-100 shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-navy-50 flex items-center justify-center">
                  <BookOpenIcon className="w-5 h-5 text-navy-600" />
                </div>
                <h3 className="font-semibold text-navy-800">
                  {t('荣誉', 'Honors')}
                </h3>
              </div>
              {education.honors.map((h, i) => (
                <div key={i} className="flex items-center gap-2 text-slatey-600 text-sm">
                  <CheckCircleIcon className="w-4 h-4 text-navy-500 flex-shrink-0" />
                  {t(h.name, h.name_en)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
