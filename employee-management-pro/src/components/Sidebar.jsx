import { NavLink } from 'react-router-dom';
import { Activity, LayoutDashboard, Users, UserPlus, Settings, CircleHelp } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <NavLink to="/" className="side-brand">
        <span className="brand-icon"><Activity size={21} strokeWidth={2.5} /></span>
        <span>People<span>Flow</span><small>PEOPLE OPERATIONS</small></span>
      </NavLink>
      <div className="side-label">WORKSPACE</div>
      <nav className="side-nav">
        <NavLink end to="/" className={({ isActive }) => `side-link ${isActive ? 'active' : ''}`}>
          <LayoutDashboard size={18} /> <span>Home</span>
        </NavLink>
        <NavLink to="/employees" className={({ isActive }) => `side-link ${isActive ? 'active' : ''}`}>
          <Users size={18} /> <span>Employees</span><span className="side-count">API</span>
        </NavLink>
        <NavLink to="/employee-form" className={({ isActive }) => `side-link ${isActive ? 'active' : ''}`}>
          <UserPlus size={18} /> <span>Employee form</span>
        </NavLink>
      </nav>
      <div className="side-bottom">
        <div className="side-label">SUPPORT</div>
        <div className="side-link muted"><CircleHelp size={18} /><span>Help centre</span></div>
        <div className="side-link muted"><Settings size={18} /><span>Settings</span></div>
        <div className="sidebar-note"><div className="note-orb">✦</div><strong>People first.</strong><p>A clearer view of your team starts here.</p></div>
        <div className="sidebar-version">PEOPLEFLOW WORKSPACE <span>v1.0</span></div>
      </div>
    </aside>
  );
}