import { useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { useLang } from '@/lib/LanguageContext';
import { getIcon } from '@/lib/icons';

export default function AdminLogin() {
  const { signIn, signUp } = useAuth();
  const { t } = useLang();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const LockIcon = getIcon('Lock');
  const UserPlusIcon = getIcon('UserPlus');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const fn = mode === 'login' ? signIn : signUp;
    const { error: err } = await fn(email, password);
    if (err) setError(err);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy-900 to-navy-950 px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gold-500/10 flex items-center justify-center mx-auto mb-4">
            <LockIcon className="w-8 h-8 text-gold-400" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-white">
            {t('管理后台', 'Admin Panel')}
          </h1>
          <p className="text-slatey-400 text-sm mt-2">
            {t('登录后可编辑网站内容', 'Log in to edit site content')}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Mode toggle */}
          <div className="flex gap-2 mb-6 bg-slatey-100 rounded-xl p-1">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
                mode === 'login'
                  ? 'bg-white text-navy-700 shadow-sm'
                  : 'text-slatey-500'
              }`}
            >
              <LockIcon className="w-4 h-4" />
              {t('登录', 'Sign In')}
            </button>
            <button
              onClick={() => setMode('signup')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
                mode === 'signup'
                  ? 'bg-white text-navy-700 shadow-sm'
                  : 'text-slatey-500'
              }`}
            >
              <UserPlusIcon className="w-4 h-4" />
              {t('注册', 'Sign Up')}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-slatey-600 text-sm font-medium mb-2">
                {t('邮箱', 'Email')}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-slatey-50 border border-slatey-200 rounded-xl text-slatey-800 text-sm focus:outline-none focus:border-navy-400 focus:bg-white transition-all"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-slatey-600 text-sm font-medium mb-2">
                {t('密码', 'Password')}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-3 bg-slatey-50 border border-slatey-200 rounded-xl text-slatey-800 text-sm focus:outline-none focus:border-navy-400 focus:bg-white transition-all"
                placeholder={t('至少6位', 'At least 6 characters')}
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm bg-red-50 rounded-lg px-4 py-3">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-navy-700 hover:bg-navy-800 disabled:opacity-50 text-white font-semibold rounded-xl transition-all duration-300"
            >
              {loading
                ? t('请稍候...', 'Please wait...')
                : mode === 'login'
                  ? t('登录', 'Sign In')
                  : t('注册并登录', 'Sign Up & Sign In')}
            </button>
          </form>

          {mode === 'signup' && (
            <p className="text-slatey-400 text-xs text-center mt-4">
              {t(
                '注册后即可登录后台编辑网站内容',
                'After signing up, you can log in to edit site content'
              )}
            </p>
          )}
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => (window.location.hash = '')}
            className="text-slatey-400 hover:text-gold-400 text-sm transition-colors"
          >
            {t('返回首页', 'Back to Home')}
          </button>
        </div>
      </div>
    </div>
  );
}
