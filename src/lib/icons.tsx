import {
  Languages, Users, GraduationCap, ShieldCheck, BookOpen, Wrench,
  Sparkles, TrendingUp, Mail, Phone, MessageCircle, Send,
  ChevronDown, ChevronRight, Menu, X, Globe, LogOut, Lock,
  CheckCircle, Award, Briefcase, Target, ArrowRight, Star,
  Pencil, Save, UserPlus, Inbox, Trash2,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Languages, Users, GraduationCap, ShieldCheck, BookOpen, Wrench,
  Sparkles, TrendingUp, Mail, Phone, MessageCircle, Send,
  ChevronDown, ChevronRight, Menu, X, Globe, LogOut, Lock,
  CheckCircle, Award, Briefcase, Target, ArrowRight, Star,
  Pencil, Save, UserPlus, Inbox, Trash2,
};

export function getIcon(name: string) {
  return iconMap[name] ?? Briefcase;
}
