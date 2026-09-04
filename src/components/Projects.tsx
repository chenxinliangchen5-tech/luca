import { useState } from 'react';
import { useLang } from '@/lib/LanguageContext';
import { useReveal } from '@/lib/useReveal';
import { getIcon } from '@/lib/icons';
import type { Project } from '@/lib/types';

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { t } = useLang();
  const [expanded, setExpanded] = useState(false);
  const { ref, revealed } = useReveal();
  const ChevronDownIcon = getIcon('ChevronDown');
  const StarIcon = getIcon('Star');
  const TargetIcon = getIcon('Target');
  const MailIcon = getIcon('Mail');
  const MessageCircleIcon = getIcon('MessageCircle');
  const ArrowRightIcon = getIcon('ArrowRight');
  const TrendingUpIcon = getIcon('TrendingUp');

  return (
    <div
      ref={ref}
      className={`bg-white rounded-2xl border border-slatey-100 overflow-hidden transition-all duration-700 ${
        revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${
        project.featured
          ? 'md:col-span-2 border-gold-200 shadow-lg hover:shadow-2xl'
          : 'hover:shadow-xl hover:border-gold-200'
      } hover:-translate-y-1`}
    >
      {/* Featured badge */}
      {project.featured && (
        <div className="bg-gradient-to-r from-navy-800 to-navy-700 px-6 py-3 flex items-center gap-2">
          <StarIcon className="w-4 h-4 text-gold-400" />
          <span className="text-gold-300 text-sm font-medium">
            {t('重点案例', 'Featured Case')}
          </span>
        </div>
      )}

      {/* Project image */}
      {project.image && (
        <div className="relative h-48 md:h-56 overflow-hidden bg-slatey-100">
          <img
            src={project.image}
            alt={t(project.title, project.title_en)}
            className="w-full h-full object-cover"
          />
          {project.featured && (
            <div className="absolute top-3 right-3 bg-navy-800/80 backdrop-blur-sm px-3 py-1 rounded-full">
              <span className="text-gold-300 text-xs font-medium flex items-center gap-1">
                <StarIcon className="w-3 h-3" />
                {t('重点案例', 'Featured')}
              </span>
            </div>
          )}
        </div>
      )}

      <div className="p-6 md:p-8">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {(t('zh', 'en') === 'zh' ? project.tags : project.tags_en).map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 text-xs font-medium rounded-full bg-navy-50 text-navy-600"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="font-serif text-xl md:text-2xl font-bold text-navy-800 mb-3 leading-snug">
          {t(project.title, project.title_en)}
        </h3>

        <p className="text-slatey-500 text-sm leading-relaxed mb-5">
          {t(project.summary, project.summary_en)}
        </p>

        {/* Note */}
        <div className="flex items-start gap-2 mb-4 text-xs text-slatey-400 bg-slatey-50 rounded-lg px-3 py-2">
          <span className="font-semibold">{t('注', 'Note')}:</span>
          <span>{t(project.note, project.note_en)}</span>
        </div>

        {/* Expand button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-navy-700 hover:text-gold-600 font-medium text-sm transition-colors"
        >
          {expanded ? t('收起详情', 'Hide Details') : t('查看详情', 'View Details')}
          <ChevronDownIcon
            className={`w-4 h-4 transition-transform duration-300 ${
              expanded ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* Expandable details */}
        <div
          className={`overflow-hidden transition-all duration-500 ${
            expanded ? 'max-h-[3000px] opacity-100 mt-6' : 'max-h-0 opacity-0'
          }`}
        >
          {project.details && (
            <div className="space-y-6 pt-4 border-t border-slatey-100">
              {/* Flow diagram for featured project */}
              <div className="flex flex-col md:flex-row items-center gap-3 text-center">
                {[
                  { icon: 'Target', label: t('开发信', 'Dev Letter'), color: 'navy' },
                  { icon: 'Mail', label: t('询盘', 'Inquiry'), color: 'slatey' },
                  { icon: 'MessageCircle', label: t('专业回复', 'Reply'), color: 'gold' },
                  { icon: 'TrendingUp', label: t('跟进', 'Follow-up'), color: 'navy' },
                ].map((step, i) => {
                  const StepIcon = getIcon(step.icon);
                  return (
                    <div key={i} className="flex items-center gap-3">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 rounded-full bg-navy-50 flex items-center justify-center">
                          <StepIcon className="w-5 h-5 text-navy-600" />
                        </div>
                        <span className="text-xs font-medium text-slatey-500">
                          {step.label}
                        </span>
                      </div>
                      {i < 3 && (
                        <ArrowRightIcon className="w-4 h-4 text-slatey-300 hidden md:block" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Detail blocks */}
              {project.details.customer_profile && (
                <DetailBlock
                  icon="Target"
                  label={t(
                    project.details.customer_profile.label,
                    project.details.customer_profile.label_en
                  )}
                  text={t(
                    project.details.customer_profile.text,
                    project.details.customer_profile.text_en
                  )}
                />
              )}
              {project.details.dev_letter && (
                <DetailBlock
                  icon="Mail"
                  label={t(
                    project.details.dev_letter.label,
                    project.details.dev_letter.label_en
                  )}
                  text={t(
                    project.details.dev_letter.text,
                    project.details.dev_letter.text_en
                  )}
                  mono
                />
              )}
              {project.details.inquiry && (
                <DetailBlock
                  icon="MessageCircle"
                  label={t(
                    project.details.inquiry.label,
                    project.details.inquiry.label_en
                  )}
                  text={t(
                    project.details.inquiry.text,
                    project.details.inquiry.text_en
                  )}
                  mono
                />
              )}
              {project.details.reply && (
                <DetailBlock
                  icon="MessageCircle"
                  label={t(project.details.reply.label, project.details.reply.label_en)}
                  text={t(project.details.reply.text, project.details.reply.text_en)}
                  mono
                />
              )}
              {project.details.followup && (
                <DetailBlock
                  icon="TrendingUp"
                  label={t(
                    project.details.followup.label,
                    project.details.followup.label_en
                  )}
                  text={t(
                    project.details.followup.text,
                    project.details.followup.text_en
                  )}
                />
              )}
            </div>
          )}

          {project.timeline && (
            <div className="pt-4 border-t border-slatey-100">
              <div className="space-y-4">
                {project.timeline.map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-navy-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-navy-700 font-bold text-sm">{i + 1}</span>
                      </div>
                      {i < project.timeline!.length - 1 && (
                        <div className="w-px h-12 bg-slatey-200 mt-1" />
                      )}
                    </div>
                    <div className="pt-2">
                      <span className="text-xs font-semibold text-gold-600 uppercase tracking-wider">
                        {t(item.time, item.time_en)}
                      </span>
                      <p className="text-slatey-600 text-sm mt-1">
                        {t(item.event, item.event_en)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {project.metrics && (
            <div className="pt-4 border-t border-slatey-100 grid grid-cols-3 gap-4">
              {project.metrics.map((m, i) => (
                <div
                  key={i}
                  className="text-center bg-navy-50 rounded-xl p-4"
                >
                  <p className="text-2xl font-bold text-navy-700">{m.value}</p>
                  <p className="text-xs text-slatey-500 mt-1">
                    {t(m.label, m.label_en)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DetailBlock({
  icon,
  label,
  text,
  mono,
}: {
  icon: string;
  label: string;
  text: string;
  mono?: boolean;
}) {
  const Icon = getIcon(icon);
  return (
    <div className="bg-slatey-50 rounded-xl p-5">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
          <Icon className="w-4 h-4 text-navy-600" />
        </div>
        <h4 className="font-semibold text-navy-800 text-sm">{label}</h4>
      </div>
      <pre
        className={`text-slatey-600 text-sm leading-relaxed whitespace-pre-wrap font-sans ${
          mono ? 'font-mono text-xs' : ''
        }`}
      >
        {text}
      </pre>
    </div>
  );
}

export default function Projects({ projects }: { projects: Project[] }) {
  const { t } = useLang();
  const { ref, revealed } = useReveal();

  return (
    <section id="projects" className="py-24 bg-white">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto px-6 transition-all duration-700 ${
          revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="text-center mb-16">
          <span className="text-gold-600 text-sm font-semibold tracking-widest uppercase">
            {t('实践项目', 'Practice Projects')}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy-800 mt-3">
            {t('项目经历', 'Project Experience')}
          </h2>
          <div className="flex justify-center mt-4">
            <div className="h-1 w-16 bg-gold-400 rounded-full" />
          </div>
          <p className="text-slatey-500 text-sm mt-6 max-w-2xl mx-auto">
            {t(
              '以下项目涵盖外贸开发信模拟、团队创业实践与多平台运营，展示商务英语写作与外贸沟通思维。',
              'These projects cover simulated trade correspondence, team entrepreneurship, and multi-platform operations — showcasing business English writing and foreign-trade communication thinking.'
            )}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={i} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
