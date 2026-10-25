import { useEffect, useState } from 'react';
import { Users, UserCheck, Building2, Globe2, ArrowRight, CalendarDays, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import StatCard from '../components/StatCard.jsx';
import EmployeeTable from '../components/EmployeeTable.jsx';
import LoadingState from '../components/LoadingState.jsx';

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    fetch('https://jsonplaceholder.typicode.com/users', { signal: controller.signal })
      .then(response => { if (!response.ok) throw new Error('Request failed'); return response.json(); })
      .then(data => setEmployees(data))
      .catch(err => { if (err.name !== 'AbortError') setError('We could not connect to the employee API. Please check your connection and try again.'); })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  return (
    <main className="page-content">
      <div className="welcome-banner">
        <div className="welcome-copy"><div className="welcome-kicker"><Sparkles size={14}/> YOUR PEOPLE, AT A GLANCE</div><h1>Good work starts<br/>with <span>good people.</span></h1><p>Welcome to your employee workspace. Here's what's happening across your directory.</p><Link to="/employees" className="welcome-button">Explore directory <ArrowRight size={16}/></Link></div>
        <div className="welcome-art" aria-hidden="true"><div className="art-orbit orbit-one"/><div className="art-orbit orbit-two"/><div className="art-glow"/><div className="art-card art-card-main"><div className="art-people"><span>AM</span><span>JK</span><span>SR</span><span>+7</span></div><strong>People make progress.</strong><small>Your team is your greatest asset.</small></div><div className="art-card art-card-float"><div className="float-check">✓</div><div><strong>Directory synced</strong><small>API connection ready</small></div></div><div className="art-spark spark-a">✦</div><div className="art-spark spark-b">✧</div></div>
      </div>

      <div className="section-heading"><div><span className="section-overline">YOUR WORKSPACE</span><h2>At a glance</h2></div><div className="date-chip"><CalendarDays size={15}/> Live overview</div></div>
      <div className="stats-grid">
        <StatCard label="Total employees" value={loading ? '—' : employees.length} helper="People in the directory" icon={Users} tone="violet" trend="API data"/>
        <StatCard label="Directory status" value={loading ? 'Loading' : error ? 'Offline' : 'Connected'} helper="External API connection" icon={UserCheck} tone="green" trend={error ? 'Check connection' : 'Live'}/>
        <StatCard label="Organizations" value={loading ? '—' : new Set(employees.map(e => e.company?.name).filter(Boolean)).size} helper="Unique company records" icon={Building2} tone="blue" trend="From API"/>
        <StatCard label="Data source" value="REST API" helper="JSONPlaceholder users" icon={Globe2} tone="orange" trend="JSON"/>
      </div>

      <section className="content-panel">
        <div className="content-panel-heading"><div><span className="section-overline">PEOPLE DIRECTORY</span><h2>Recently listed employees</h2><p>Fetched from the external JSONPlaceholder users endpoint.</p></div><Link to="/employees" className="text-action">View all employees <ArrowRight size={15}/></Link></div>
        {loading ? <LoadingState /> : error ? <div className="api-error"><strong>Connection issue</strong><p>{error}</p><button className="btn btn-sm btn-outline-primary" onClick={() => window.location.reload()}>Try again</button></div> : <EmployeeTable employees={employees.slice(0, 5)} compact />}
        <div className="table-footnote">Showing {loading ? '…' : Math.min(5, employees.length)} of {loading ? '…' : employees.length} API records <span>•</span> Demo data supplied by JSONPlaceholder</div>
      </section>
      <footer className="app-footer"><span>© 2026 PeopleFlow</span><span>Made for better workdays <span className="footer-star">✦</span></span></footer>
    </main>
  );
}