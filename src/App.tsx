import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import { LanguageProvider } from '@/lib/LanguageContext';
import { supabase } from '@/lib/supabase';
import type { SiteContent } from '@/lib/types';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Education from '@/components/Education';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import AdminLogin from '@/components/AdminLogin';
import AdminEditor from '@/components/AdminEditor';

function PortfolioSite() {
  const { session, loading } = useAuth();
  const [content, setContent] = useState<SiteContent | null>(null);
  const [contentLoading, setContentLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if admin route
  useEffect(() => {
    const checkHash = () => setIsAdmin(window.location.hash === '#admin');
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  // Load content from database
  useEffect(() => {
    const loadContent = async () => {
      const { data, error } = await supabase
        .from('site_content')
        .select('*')
        .eq('id', 1)
        .maybeSingle();

      if (data && !error) {
        setContent({
          hero: data.hero,
          about: data.about,
          skills: data.skills,
          projects: data.projects,
          education: data.education,
          contact: data.contact,
        });
      }
      setContentLoading(false);
    };
    loadContent();
  }, []);

  // Show admin if hash is #admin
  if (isAdmin) {
    if (loading) return <LoadingScreen />;
    if (!session) return <AdminLogin />;
    if (!content) return <LoadingScreen />;
    return <AdminEditor content={content} />;
  }

  if (contentLoading || !content) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero hero={content.hero} />
      <About about={content.about} />
      <Skills skills={content.skills} />
      <Projects projects={content.projects} />
      <Education education={content.education} />
      <Contact contact={content.contact} />
      <Footer />
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-navy-950">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-navy-700 border-t-gold-400 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slatey-400 text-sm">Loading...</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <PortfolioSite />
      </LanguageProvider>
    </AuthProvider>
  );
}
