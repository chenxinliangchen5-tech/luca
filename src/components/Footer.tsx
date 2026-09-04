import { useLang } from '@/lib/LanguageContext';

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="bg-navy-950 py-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="font-serif text-lg font-bold text-white mb-2">
          {t('陈新亮', 'Chen Xinliang')}
        </p>
        <p className="text-slatey-400 text-sm mb-4">
          {t('商务英语 · 外贸业务员求职作品集', 'Business English · Foreign Trade Portfolio')}
        </p>
        <div className="flex justify-center gap-6 text-sm">
          {[
            { id: 'about', label: t('关于', 'About') },
            { id: 'skills', label: t('能力', 'Skills') },
            { id: 'projects', label: t('项目', 'Projects') },
            { id: 'contact', label: t('联系', 'Contact') },
          ].map((link) => (
            <button
              key={link.id}
              onClick={() =>
                document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' })
              }
              className="text-slatey-400 hover:text-gold-400 transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>
        <p className="text-slatey-500 text-xs mt-6">
          © {new Date().getFullYear()} {t('陈新亮. 保留所有权利。', 'Chen Xinliang. All rights reserved.')}
        </p>
      </div>
    </footer>
  );
}
