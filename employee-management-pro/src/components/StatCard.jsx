import { ArrowUpRight } from 'lucide-react';

export default function StatCard({ label, value, helper, icon: Icon, tone = 'violet', trend }) {
  return (
    <article className="stat-card">
      <div className={`stat-icon ${tone}`}><Icon size={20} /></div>
      <div className="stat-trend"><ArrowUpRight size={14}/>{trend || 'Live'}</div>
      <p className="stat-label">{label}</p>
      <div className="stat-value">{value}</div>
      <div className="stat-helper">{helper}</div>
    </article>
  );
}