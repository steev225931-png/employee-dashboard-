import { Bell, ChevronDown, LogOut, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useLocation } from 'react-router-dom';

const titles = {
  '/': ['Overview', 'A snapshot of your people and activity.'],
  '/employees': ['Employees', 'Browse the employee directory.'],
  '/employee-form': ['Add employee', 'Create a new employee record.']
};

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [title, subtitle] = titles[location.pathname] || ['Workspace', 'Manage your team.'];
  const initials = (user?.name || 'Admin').split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase();
  return (
    <header className="topbar">
      <div className="topbar-heading"><span className="breadcrumb-label">WORKSPACE <span>/</span> {title.toUpperCase()}</span><h2>{title}</h2><p>{subtitle}</p></div>
      <div className="topbar-actions">
        <label className="search-box"><Search size={16} /><input aria-label="Search" placeholder="Search anything..." onKeyDown={e => { if (e.key === 'Enter') alert('Search is a UI demo.'); }} /></label>
        <button className="icon-button notification-button" aria-label="Notifications" onClick={() => alert('You are all caught up!')}><Bell size={18}/><i /></button>
        <div className="user-menu"><div className="user-avatar">{initials}</div><div className="user-meta"><strong>{user?.name || 'Administrator'}</strong><small>Administrator</small></div><button className="logout-button" onClick={logout} title="Sign out" aria-label="Sign out"><LogOut size={17}/></button><ChevronDown size={15} className="user-chevron" /></div>
      </div>
    </header>
  );
}