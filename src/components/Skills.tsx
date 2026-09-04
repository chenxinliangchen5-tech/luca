import { useState } from 'react';
import { useLang } from '@/lib/LanguageContext';
import { useReveal } from '@/lib/useReveal';
import { getIcon } from '@/lib/icons';
import type { Skill } from '@/lib/types';

const categories = [
  { zh: '全部', en: 'All', filter: '' },
  { zh: '语言', en: 'Language', filter: 'Languages' },
  { zh: '课程', en: 'Courses', filter: 'BookOpen' },
  { zh: '工具', en: 'Tools', filter: 'Wrench' },
  { zh: '实践', en: 'Practice', filter: 'Users' },
  { zh: '软技能', en: 'Soft Skills', filter: 'Sparkles' },
];

export default function Skills({ skills }: { skills: Skill[] }) {
  const { t } = useLang();
  const { ref, revealed } = useReveal();
  const [activeFilter, setActiveFilter] = useState('');

  const filtered = activeFilter
    ? skills.filter((s) => s.icon === activeFilter)
    : skills;

  return (
    <section id="skills" className="py-24 bg-slatey-50">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto px-6 transition-all duration-700 ${
          revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="text-center mb-12">
          <span className="text-gold-600 text-sm font-semibold tracking-widest uppercase">
            {t('核心能力', 'Core Skills')}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy-800 mt-3">
            {t('技能与能力', 'Skills & Competencies')}
          </h2>
          <div className="flex justify-center mt-4">
            <div className="h-1 w-16 bg-gold-400 rounded-full" />
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.filter}
              onClick={() => setActiveFilter(cat.filter)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                activeFilter === cat.filter
                  ? 'bg-navy-700 text-white shadow-md'
                  : 'bg-white text-slatey-500 hover:bg-navy-50 hover:text-navy-700 border border-slatey-200'
              }`}
            >
              {t(cat.zh, cat.en)}
            </button>
          ))}
        </div>

        {/* Skill cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((skill, i) => {
            const Icon = getIcon(skill.icon);
            return (
              <div
                key={i}
                className="group bg-white rounded-2xl p-6 border border-slatey-100 hover:border-gold-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-default"
                style={{
                  transitionDelay: `${i * 50}ms`,
                }}
              >
                <div className="w-14 h-14 rounded-2xl bg-navy-50 flex items-center justify-center mb-4 group-hover:bg-gold-50 transition-colors duration-300">
                  <Icon className="w-7 h-7 text-navy-600 group-hover:text-gold-500 transition-colors duration-300 group-hover:scale-110" />
                </div>
                <h3 className="font-semibold text-navy-800 text-lg mb-2">
                  {t(skill.title, skill.title_en)}
                </h3>
                <p className="text-slatey-500 text-sm leading-relaxed">
                  {t(skill.desc, skill.desc_en)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
