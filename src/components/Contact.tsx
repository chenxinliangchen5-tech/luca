import { useState } from 'react';
import { useLang } from '@/lib/LanguageContext';
import { useReveal } from '@/lib/useReveal';
import { getIcon } from '@/lib/icons';
import { supabase } from '@/lib/supabase';
import type { ContactContent } from '@/lib/types';

export default function Contact({ contact }: { contact: ContactContent }) {
  const { t } = useLang();
  const { ref, revealed } = useReveal();
  const MailIcon = getIcon('Mail');
  const PhoneIcon = getIcon('Phone');
  const MessageCircleIcon = getIcon('MessageCircle');
  const SendIcon = getIcon('Send');
  const CheckCircleIcon = getIcon('CheckCircle');

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('sending');
    const { error } = await supabase.from('contact_messages').insert({
      name: form.name,
      email: form.email,
      message: form.message,
    });
    if (error) {
      setStatus('error');
    } else {
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const contactItems = [
    { icon: 'Mail', label: t('邮箱', 'Email'), value: contact.email },
    { icon: 'MessageCircle', label: t('微信', 'WeChat'), value: contact.wechat },
    { icon: 'Phone', label: t('电话', 'Phone'), value: contact.phone },
  ];

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-navy-900 to-navy-950 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 blur-3xl rounded-full" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-navy-500/10 blur-3xl rounded-full" />

      <div
        ref={ref}
        className={`relative max-w-5xl mx-auto px-6 transition-all duration-700 ${
          revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="text-center mb-16">
          <span className="text-gold-400 text-sm font-semibold tracking-widest uppercase">
            {t('联系我', 'Contact')}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mt-3">
            {t('与我联系', 'Get In Touch')}
          </h2>
          <div className="flex justify-center mt-4">
            <div className="h-1 w-16 bg-gold-400 rounded-full" />
          </div>
          <p className="text-slatey-300 text-sm mt-6 max-w-2xl mx-auto leading-relaxed">
            {t(contact.tagline, contact.tagline_en)}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact info */}
          <div className="space-y-4">
            {contactItems.map((item, i) => {
              const Icon = getIcon(item.icon);
              return (
                <div
                  key={i}
                  className="group flex items-center gap-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:border-gold-500/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center group-hover:bg-gold-500/20 transition-colors">
                    <Icon className="w-5 h-5 text-gold-400" />
                  </div>
                  <div>
                    <p className="text-slatey-400 text-xs uppercase tracking-wider">
                      {item.label}
                    </p>
                    <p className="text-white font-medium text-sm mt-0.5">
                      {item.value || t('待补充', 'To be added')}
                    </p>
                  </div>
                </div>
              );
            })}

            <div className="bg-gold-500/10 border border-gold-500/20 rounded-2xl p-5 mt-6">
              <p className="text-gold-200 text-sm leading-relaxed">
                {t(
                  '占位提示：以上联系方式为占位符，登录后台后可自行替换为真实信息。',
                  'Placeholder: The contact details above are placeholders. Log in to the admin panel to replace them with your real information.'
                )}
              </p>
            </div>
          </div>

          {/* Contact form */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-slatey-300 text-sm font-medium mb-2">
                  {t('姓名', 'Name')}
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-slatey-500 focus:outline-none focus:border-gold-500/50 focus:bg-white/10 transition-all"
                  placeholder={t('请输入您的姓名', 'Your name')}
                />
              </div>
              <div>
                <label className="block text-slatey-300 text-sm font-medium mb-2">
                  {t('邮箱', 'Email')}
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-slatey-500 focus:outline-none focus:border-gold-500/50 focus:bg-white/10 transition-all"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-slatey-300 text-sm font-medium mb-2">
                  {t('留言', 'Message')}
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-slatey-500 focus:outline-none focus:border-gold-500/50 focus:bg-white/10 transition-all resize-none"
                  placeholder={t('请输入留言内容', 'Your message')}
                />
              </div>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gold-500 hover:bg-gold-400 disabled:opacity-50 text-navy-950 font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-gold-500/30"
              >
                {status === 'sending' ? (
                  t('发送中...', 'Sending...')
                ) : (
                  <>
                    <SendIcon className="w-4 h-4" />
                    {t('发送留言', 'Send Message')}
                  </>
                )}
              </button>

              {status === 'sent' && (
                <div className="flex items-center gap-2 text-gold-300 text-sm bg-gold-500/10 rounded-xl px-4 py-3 animate-fade-in">
                  <CheckCircleIcon className="w-4 h-4 flex-shrink-0" />
                  {t('已记录，后续我会尽快回复。', 'Message recorded. I will reply soon.')}
                </div>
              )}
              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-300 text-sm bg-red-500/10 rounded-xl px-4 py-3">
                  {t('发送失败，请稍后重试。', 'Failed to send. Please try again later.')}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
