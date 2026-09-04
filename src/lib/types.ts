export type Lang = 'zh' | 'en';

export interface Strength {
  icon: string;
  label: string;
  label_en: string;
  desc: string;
  desc_en: string;
}

export interface HeroContent {
  name: string;
  name_en: string;
  title: string;
  title_en: string;
  tagline: string;
  tagline_en: string;
  avatar: string;
  buttons: {
    primary: string;
    primary_en: string;
    secondary: string;
    secondary_en: string;
  };
  strengths: Strength[];
}

export interface AboutParagraph {
  zh: string;
  en: string;
}

export interface AboutBullet {
  zh: string;
  en: string;
}

export interface AboutContent {
  paragraphs: AboutParagraph[];
  bullets: AboutBullet[];
}

export interface Skill {
  icon: string;
  title: string;
  title_en: string;
  desc: string;
  desc_en: string;
}

export interface ProjectDetail {
  customer_profile?: { label: string; label_en: string; text: string; text_en: string };
  dev_letter?: { label: string; label_en: string; text: string; text_en: string };
  inquiry?: { label: string; label_en: string; text: string; text_en: string };
  reply?: { label: string; label_en: string; text: string; text_en: string };
  followup?: { label: string; label_en: string; text: string; text_en: string };
}

export interface ProjectMetric {
  value: string;
  label: string;
  label_en: string;
}

export interface TimelineItem {
  time: string;
  time_en: string;
  event: string;
  event_en: string;
}

export interface Project {
  title: string;
  title_en: string;
  featured: boolean;
  tags: string[];
  tags_en: string[];
  summary: string;
  summary_en: string;
  image: string;
  details?: ProjectDetail;
  timeline?: TimelineItem[];
  metrics?: ProjectMetric[];
  note: string;
  note_en: string;
}

export interface EducationContent {
  school: string;
  school_en: string;
  degree: string;
  degree_en: string;
  period: string;
  rank: string;
  rank_en: string;
  majors: string[];
  majors_en: string[];
  certificates: { name: string; name_en: string }[];
  honors: { name: string; name_en: string }[];
}

export interface ContactContent {
  email: string;
  wechat: string;
  phone: string;
  tagline: string;
  tagline_en: string;
}

export interface SiteContent {
  hero: HeroContent;
  about: AboutContent;
  skills: Skill[];
  projects: Project[];
  education: EducationContent;
  contact: ContactContent;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}
