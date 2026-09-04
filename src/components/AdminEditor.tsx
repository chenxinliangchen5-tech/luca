import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { useLang } from '@/lib/LanguageContext';
import { supabase } from '@/lib/supabase';
import { getIcon } from '@/lib/icons';
import ImageUpload from '@/components/ImageUpload';
import type { SiteContent, ContactMessage } from '@/lib/types';

type Tab = 'hero' | 'about' | 'skills' | 'projects' | 'education' | 'contact' | 'messages';

const tabs: { id: Tab; zh: string; en: string; icon: string }[] = [
  { id: 'hero', zh: '首页', en: 'Hero', icon: 'Briefcase' },
  { id: 'about', zh: '关于我', en: 'About', icon: 'Users' },
  { id: 'skills', zh: '核心能力', en: 'Skills', icon: 'Sparkles' },
  { id: 'projects', zh: '实践项目', en: 'Projects', icon: 'Target' },
  { id: 'education', zh: '教育背景', en: 'Education', icon: 'GraduationCap' },
  { id: 'contact', zh: '联系方式', en: 'Contact', icon: 'Mail' },
  { id: 'messages', zh: '访客留言', en: 'Messages', icon: 'Inbox' },
];

export default function AdminEditor({ content }: { content: SiteContent }) {
  const { signOut } = useAuth();
  const { t } = useLang();
  const [tab, setTab] = useState<Tab>('hero');
  const [data, setData] = useState<SiteContent>(content);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [msgLoading, setMsgLoading] = useState(false);

  const LogOutIcon = getIcon('LogOut');
  const SaveIcon = getIcon('Save');
  const CheckCircleIcon = getIcon('CheckCircle');
  const TrashIcon = getIcon('Trash2');
  const InboxIcon = getIcon('Inbox');

  useEffect(() => {
    setData(content);
  }, [content]);

  useEffect(() => {
    if (tab === 'messages') loadMessages();
  }, [tab]);

  const loadMessages = async () => {
    setMsgLoading(true);
    const { data: msgs } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });
    setMessages(msgs || []);
    setMsgLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase
      .from('site_content')
      .update({
        hero: data.hero,
        about: data.about,
        skills: data.skills,
        projects: data.projects,
        education: data.education,
        contact: data.contact,
        updated_at: new Date().toISOString(),
      })
      .eq('id', 1);
    setSaving(false);
    if (!error) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  const deleteMessage = async (id: string) => {
    await supabase.from('contact_messages').delete().eq('id', id);
    loadMessages();
  };

  // Helper to update nested fields
  const update = <K extends keyof SiteContent>(key: K, value: SiteContent[K]) => {
    setData({ ...data, [key]: value });
  };

  return (
    <div className="min-h-screen bg-slatey-50">
      {/* Top bar */}
      <div className="sticky top-0 z-40 bg-white border-b border-slatey-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-navy-700 flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <div>
              <h1 className="font-serif font-bold text-navy-800 text-lg">
                {t('内容管理', 'Content Manager')}
              </h1>
              <p className="text-slatey-400 text-xs">{t('编辑你的网站内容', 'Edit your site content')}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {saved && (
              <span className="flex items-center gap-1.5 text-green-600 text-sm font-medium animate-fade-in">
                <CheckCircleIcon className="w-4 h-4" />
                {t('已保存', 'Saved')}
              </span>
            )}
            {tab !== 'messages' && (
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-5 py-2.5 bg-gold-500 hover:bg-gold-400 disabled:opacity-50 text-navy-950 font-semibold rounded-xl transition-all text-sm"
              >
                <SaveIcon className="w-4 h-4" />
                {saving ? t('保存中...', 'Saving...') : t('保存', 'Save')}
              </button>
            )}
            <button
              onClick={() => (window.location.hash = '')}
              className="px-4 py-2.5 text-slatey-500 hover:text-navy-700 font-medium text-sm transition-colors"
            >
              {t('预览', 'Preview')}
            </button>
            <button
              onClick={signOut}
              className="flex items-center gap-1.5 px-4 py-2.5 text-slatey-500 hover:text-red-500 font-medium text-sm transition-colors"
            >
              <LogOutIcon className="w-4 h-4" />
              {t('退出', 'Logout')}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-[200px_1fr] gap-6">
          {/* Sidebar tabs */}
          <div className="space-y-1">
            {tabs.map((tabItem) => {
              const Icon = getIcon(tabItem.icon);
              return (
                <button
                  key={tabItem.id}
                  onClick={() => setTab(tabItem.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    tab === tabItem.id
                      ? 'bg-navy-700 text-white shadow-md'
                      : 'text-slatey-600 hover:bg-white hover:text-navy-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {t(tabItem.zh, tabItem.en)}
                </button>
              );
            })}
          </div>

          {/* Content panel */}
          <div className="bg-white rounded-2xl shadow-sm border border-slatey-100 p-6">
            {tab === 'hero' && <HeroEditor data={data.hero} onChange={(v) => update('hero', v)} />}
            {tab === 'about' && <AboutEditor data={data.about} onChange={(v) => update('about', v)} />}
            {tab === 'skills' && <SkillsEditor data={data.skills} onChange={(v) => update('skills', v)} />}
            {tab === 'projects' && <ProjectsEditor data={data.projects} onChange={(v) => update('projects', v)} />}
            {tab === 'education' && <EducationEditor data={data.education} onChange={(v) => update('education', v)} />}
            {tab === 'contact' && <ContactEditor data={data.contact} onChange={(v) => update('contact', v)} />}
            {tab === 'messages' && (
              <div>
                <h2 className="font-serif text-xl font-bold text-navy-800 mb-6 flex items-center gap-2">
                  <InboxIcon className="w-5 h-5" />
                  {t('访客留言', 'Visitor Messages')}
                </h2>
                {msgLoading ? (
                  <p className="text-slatey-400 text-sm">{t('加载中...', 'Loading...')}</p>
                ) : messages.length === 0 ? (
                  <p className="text-slatey-400 text-sm py-8 text-center">
                    {t('暂无留言', 'No messages yet')}
                  </p>
                ) : (
                  <div className="space-y-3">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className="bg-slatey-50 rounded-xl p-4 border border-slatey-100"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-semibold text-navy-800 text-sm">{msg.name}</p>
                            <p className="text-slatey-400 text-xs">{msg.email}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-slatey-400 text-xs">
                              {new Date(msg.created_at).toLocaleString()}
                            </span>
                            <button
                              onClick={() => deleteMessage(msg.id)}
                              className="text-slatey-400 hover:text-red-500 transition-colors"
                            >
                              <TrashIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <p className="text-slatey-600 text-sm mt-2">{msg.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Reusable input components ──

function Field({
  label,
  value,
  onChange,
  placeholder,
  textarea,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  textarea?: boolean;
}) {
  return (
    <div>
      <label className="block text-slatey-600 text-sm font-medium mb-1.5">{label}</label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={4}
          className="w-full px-3 py-2.5 bg-slatey-50 border border-slatey-200 rounded-lg text-slatey-800 text-sm focus:outline-none focus:border-navy-400 focus:bg-white transition-all resize-none"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-2.5 bg-slatey-50 border border-slatey-200 rounded-lg text-slatey-800 text-sm focus:outline-none focus:border-navy-400 focus:bg-white transition-all"
        />
      )}
    </div>
  );
}

function BilingualField({
  label,
  zh,
  en,
  onChange,
  textarea,
}: {
  label: string;
  zh: string;
  en: string;
  onChange: (zh: string, en: string) => void;
  textarea?: boolean;
}) {
  return (
    <div>
      <label className="block text-slatey-600 text-sm font-medium mb-1.5">{label}</label>
      <div className="grid grid-cols-2 gap-2">
        {textarea ? (
          <>
            <textarea
              value={zh}
              onChange={(e) => onChange(e.target.value, en)}
              placeholder="中文"
              rows={4}
              className="px-3 py-2.5 bg-slatey-50 border border-slatey-200 rounded-lg text-slatey-800 text-sm focus:outline-none focus:border-navy-400 focus:bg-white transition-all resize-none"
            />
            <textarea
              value={en}
              onChange={(e) => onChange(zh, e.target.value)}
              placeholder="English"
              rows={4}
              className="px-3 py-2.5 bg-slatey-50 border border-slatey-200 rounded-lg text-slatey-800 text-sm focus:outline-none focus:border-navy-400 focus:bg-white transition-all resize-none"
            />
          </>
        ) : (
          <>
            <input
              type="text"
              value={zh}
              onChange={(e) => onChange(e.target.value, en)}
              placeholder="中文"
              className="px-3 py-2.5 bg-slatey-50 border border-slatey-200 rounded-lg text-slatey-800 text-sm focus:outline-none focus:border-navy-400 focus:bg-white transition-all"
            />
            <input
              type="text"
              value={en}
              onChange={(e) => onChange(zh, e.target.value)}
              placeholder="English"
              className="px-3 py-2.5 bg-slatey-50 border border-slatey-200 rounded-lg text-slatey-800 text-sm focus:outline-none focus:border-navy-400 focus:bg-white transition-all"
            />
          </>
        )}
      </div>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-serif text-xl font-bold text-navy-800 mb-6">{children}</h2>
  );
}

// ── Hero Editor ──

function HeroEditor({ data, onChange }: { data: SiteContent['hero']; onChange: (v: SiteContent['hero']) => void }) {
  const { t } = useLang();
  return (
    <div className="space-y-5">
      <SectionTitle>{t('首页内容', 'Hero Section')}</SectionTitle>
      <BilingualField label={t('姓名', 'Name')} zh={data.name} en={data.name_en} onChange={(zh, en) => onChange({ ...data, name: zh, name_en: en })} />
      <BilingualField label={t('副标题', 'Subtitle')} zh={data.title} en={data.title_en} onChange={(zh, en) => onChange({ ...data, title: zh, title_en: en })} />
      <BilingualField label={t('定位文案', 'Tagline')} zh={data.tagline} en={data.tagline_en} onChange={(zh, en) => onChange({ ...data, tagline: zh, tagline_en: en })} textarea />
      <ImageUpload label={t('头像图片（留空显示占位图）', 'Avatar Image (leave empty for placeholder)')} value={data.avatar} onChange={(v) => onChange({ ...data, avatar: v })} />
      <BilingualField label={t('按钮1', 'Primary Button')} zh={data.buttons.primary} en={data.buttons.primary_en} onChange={(zh, en) => onChange({ ...data, buttons: { ...data.buttons, primary: zh, primary_en: en } })} />
      <BilingualField label={t('按钮2', 'Secondary Button')} zh={data.buttons.secondary} en={data.buttons.secondary_en} onChange={(zh, en) => onChange({ ...data, buttons: { ...data.buttons, secondary: zh, secondary_en: en } })} />

      <div className="pt-4">
        <h3 className="font-semibold text-navy-700 text-sm mb-3">{t('核心优势', 'Core Strengths')}</h3>
        <div className="space-y-3">
          {data.strengths.map((s, i) => (
            <div key={i} className="bg-slatey-50 rounded-xl p-4 space-y-3">
              <Field label={t('图标名称', 'Icon Name')} value={s.icon} onChange={(v) => {
                const strengths = [...data.strengths];
                strengths[i] = { ...s, icon: v };
                onChange({ ...data, strengths });
              }} />
              <BilingualField label={t('标签', 'Label')} zh={s.label} en={s.label_en} onChange={(zh, en) => {
                const strengths = [...data.strengths];
                strengths[i] = { ...s, label: zh, label_en: en };
                onChange({ ...data, strengths });
              }} />
              <BilingualField label={t('描述', 'Description')} zh={s.desc} en={s.desc_en} onChange={(zh, en) => {
                const strengths = [...data.strengths];
                strengths[i] = { ...s, desc: zh, desc_en: en };
                onChange({ ...data, strengths });
              }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── About Editor ──

function AboutEditor({ data, onChange }: { data: SiteContent['about']; onChange: (v: SiteContent['about']) => void }) {
  const { t } = useLang();
  return (
    <div className="space-y-5">
      <SectionTitle>{t('关于我', 'About Section')}</SectionTitle>
      <div>
        <h3 className="font-semibold text-navy-700 text-sm mb-3">{t('段落', 'Paragraphs')}</h3>
        <div className="space-y-3">
          {data.paragraphs.map((p, i) => (
            <div key={i} className="bg-slatey-50 rounded-xl p-4 space-y-2">
              <BilingualField label={`${t('段落', 'Paragraph')} ${i + 1}`} zh={p.zh} en={p.en} onChange={(zh, en) => {
                const paragraphs = [...data.paragraphs];
                paragraphs[i] = { zh, en };
                onChange({ ...data, paragraphs });
              }} textarea />
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-navy-700 text-sm mb-3">{t('亮点', 'Highlights')}</h3>
        <div className="space-y-3">
          {data.bullets.map((b, i) => (
            <div key={i} className="bg-slatey-50 rounded-xl p-4">
              <BilingualField label={`${t('亮点', 'Bullet')} ${i + 1}`} zh={b.zh} en={b.en} onChange={(zh, en) => {
                const bullets = [...data.bullets];
                bullets[i] = { zh, en };
                onChange({ ...data, bullets });
              }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Skills Editor ──

function SkillsEditor({ data, onChange }: { data: SiteContent['skills']; onChange: (v: SiteContent['skills']) => void }) {
  const { t } = useLang();
  return (
    <div className="space-y-5">
      <SectionTitle>{t('核心能力', 'Skills')}</SectionTitle>
      <div className="space-y-3">
        {data.map((skill, i) => (
          <div key={i} className="bg-slatey-50 rounded-xl p-4 space-y-3">
            <Field label={t('图标名称', 'Icon Name')} value={skill.icon} onChange={(v) => {
              const skills = [...data];
              skills[i] = { ...skill, icon: v };
              onChange(skills);
            }} />
            <BilingualField label={t('标题', 'Title')} zh={skill.title} en={skill.title_en} onChange={(zh, en) => {
              const skills = [...data];
              skills[i] = { ...skill, title: zh, title_en: en };
              onChange(skills);
            }} />
            <BilingualField label={t('描述', 'Description')} zh={skill.desc} en={skill.desc_en} onChange={(zh, en) => {
              const skills = [...data];
              skills[i] = { ...skill, desc: zh, desc_en: en };
              onChange(skills);
            }} textarea />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Projects Editor ──

function ProjectsEditor({ data, onChange }: { data: SiteContent['projects']; onChange: (v: SiteContent['projects']) => void }) {
  const { t } = useLang();
  return (
    <div className="space-y-5">
      <SectionTitle>{t('实践项目', 'Projects')}</SectionTitle>
      <div className="space-y-4">
        {data.map((proj, i) => (
          <div key={i} className="bg-slatey-50 rounded-xl p-4 space-y-3 border border-slatey-200">
            <BilingualField label={t('标题', 'Title')} zh={proj.title} en={proj.title_en} onChange={(zh, en) => {
              const projects = [...data];
              projects[i] = { ...proj, title: zh, title_en: en };
              onChange(projects);
            }} />
            <BilingualField label={t('摘要', 'Summary')} zh={proj.summary} en={proj.summary_en} onChange={(zh, en) => {
              const projects = [...data];
              projects[i] = { ...proj, summary: zh, summary_en: en };
              onChange(projects);
            }} textarea />
            <ImageUpload label={t('项目配图（可选）', 'Project Image (optional)')} value={proj.image || ''} onChange={(v) => {
              const projects = [...data];
              projects[i] = { ...proj, image: v };
              onChange(projects);
            }} />
            <BilingualField label={t('备注', 'Note')} zh={proj.note} en={proj.note_en} onChange={(zh, en) => {
              const projects = [...data];
              projects[i] = { ...proj, note: zh, note_en: en };
              onChange(projects);
            }} />
            <div>
              <label className="block text-slatey-600 text-sm font-medium mb-1.5">
                {t('标签（中文，逗号分隔）', 'Tags (Chinese, comma-separated)')}
              </label>
              <input
                type="text"
                value={proj.tags.join(', ')}
                onChange={(e) => {
                  const projects = [...data];
                  projects[i] = { ...proj, tags: e.target.value.split(',').map((s) => s.trim()) };
                  onChange(projects);
                }}
                className="w-full px-3 py-2.5 bg-white border border-slatey-200 rounded-lg text-slatey-800 text-sm focus:outline-none focus:border-navy-400 transition-all"
              />
            </div>
            <div>
              <label className="block text-slatey-600 text-sm font-medium mb-1.5">
                {t('标签（英文，逗号分隔）', 'Tags (English, comma-separated)')}
              </label>
              <input
                type="text"
                value={proj.tags_en.join(', ')}
                onChange={(e) => {
                  const projects = [...data];
                  projects[i] = { ...proj, tags_en: e.target.value.split(',').map((s) => s.trim()) };
                  onChange(projects);
                }}
                className="w-full px-3 py-2.5 bg-white border border-slatey-200 rounded-lg text-slatey-800 text-sm focus:outline-none focus:border-navy-400 transition-all"
              />
            </div>
            {proj.details && (
              <div className="space-y-3 pl-4 border-l-2 border-gold-300">
                <p className="text-xs font-semibold text-gold-600 uppercase tracking-wider">{t('详细内容', 'Details')}</p>
                {proj.details.dev_letter && (
                  <BilingualField label={t('开发信', 'Dev Letter')} zh={proj.details.dev_letter.text} en={proj.details.dev_letter.text_en} onChange={(zh, en) => {
                    const projects = [...data];
                    projects[i] = { ...proj, details: { ...proj.details!, dev_letter: { ...proj.details!.dev_letter!, text: zh, text_en: en } } };
                    onChange(projects);
                  }} textarea />
                )}
                {proj.details.inquiry && (
                  <BilingualField label={t('询盘', 'Inquiry')} zh={proj.details.inquiry.text} en={proj.details.inquiry.text_en} onChange={(zh, en) => {
                    const projects = [...data];
                    projects[i] = { ...proj, details: { ...proj.details!, inquiry: { ...proj.details!.inquiry!, text: zh, text_en: en } } };
                    onChange(projects);
                  }} textarea />
                )}
                {proj.details.reply && (
                  <BilingualField label={t('回复', 'Reply')} zh={proj.details.reply.text} en={proj.details.reply.text_en} onChange={(zh, en) => {
                    const projects = [...data];
                    projects[i] = { ...proj, details: { ...proj.details!, reply: { ...proj.details!.reply!, text: zh, text_en: en } } };
                    onChange(projects);
                  }} textarea />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Education Editor ──

function EducationEditor({ data, onChange }: { data: SiteContent['education']; onChange: (v: SiteContent['education']) => void }) {
  const { t } = useLang();
  return (
    <div className="space-y-5">
      <SectionTitle>{t('教育背景', 'Education')}</SectionTitle>
      <BilingualField label={t('学校', 'School')} zh={data.school} en={data.school_en} onChange={(zh, en) => onChange({ ...data, school: zh, school_en: en })} />
      <BilingualField label={t('学位', 'Degree')} zh={data.degree} en={data.degree_en} onChange={(zh, en) => onChange({ ...data, degree: zh, degree_en: en })} />
      <Field label={t('时间段', 'Period')} value={data.period} onChange={(v) => onChange({ ...data, period: v })} />
      <BilingualField label={t('排名', 'Rank')} zh={data.rank} en={data.rank_en} onChange={(zh, en) => onChange({ ...data, rank: zh, rank_en: en })} />
      <div>
        <label className="block text-slatey-600 text-sm font-medium mb-1.5">
          {t('主修课程（中文，逗号分隔）', 'Major Courses (Chinese, comma-separated)')}
        </label>
        <input
          type="text"
          value={data.majors.join(', ')}
          onChange={(e) => onChange({ ...data, majors: e.target.value.split(',').map((s) => s.trim()) })}
          className="w-full px-3 py-2.5 bg-slatey-50 border border-slatey-200 rounded-lg text-slatey-800 text-sm focus:outline-none focus:border-navy-400 focus:bg-white transition-all"
        />
      </div>
      <div>
        <label className="block text-slatey-600 text-sm font-medium mb-1.5">
          {t('主修课程（英文，逗号分隔）', 'Major Courses (English, comma-separated)')}
        </label>
        <input
          type="text"
          value={data.majors_en.join(', ')}
          onChange={(e) => onChange({ ...data, majors_en: e.target.value.split(',').map((s) => s.trim()) })}
          className="w-full px-3 py-2.5 bg-slatey-50 border border-slatey-200 rounded-lg text-slatey-800 text-sm focus:outline-none focus:border-navy-400 focus:bg-white transition-all"
        />
      </div>
    </div>
  );
}

// ── Contact Editor ──

function ContactEditor({ data, onChange }: { data: SiteContent['contact']; onChange: (v: SiteContent['contact']) => void }) {
  const { t } = useLang();
  return (
    <div className="space-y-5">
      <SectionTitle>{t('联系方式', 'Contact Info')}</SectionTitle>
      <Field label={t('邮箱', 'Email')} value={data.email} onChange={(v) => onChange({ ...data, email: v })} placeholder={t('待补充', 'To be added')} />
      <Field label={t('微信', 'WeChat')} value={data.wechat} onChange={(v) => onChange({ ...data, wechat: v })} placeholder={t('待补充', 'To be added')} />
      <Field label={t('电话', 'Phone')} value={data.phone} onChange={(v) => onChange({ ...data, phone: v })} placeholder={t('待补充', 'To be added')} />
      <BilingualField label={t('一句话', 'Tagline')} zh={data.tagline} en={data.tagline_en} onChange={(zh, en) => onChange({ ...data, tagline: zh, tagline_en: en })} textarea />
      <div className="bg-gold-50 border border-gold-200 rounded-xl p-4 mt-4">
        <p className="text-gold-700 text-sm">
          {t(
            '提示：将"待补充"替换为你的真实联系方式即可。保存后首页联系区域会自动更新。',
            'Tip: Replace "To be added" with your real contact info. The contact section will update automatically after saving.'
          )}
        </p>
      </div>
    </div>
  );
}
