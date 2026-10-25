import { useEffect, useMemo, useState } from 'react';
import { Download, Search, Users, RefreshCw } from 'lucide-react';
import EmployeeTable from '../components/EmployeeTable.jsx';
import LoadingState from '../components/LoadingState.jsx';

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');

  function loadEmployees() {
    setLoading(true); setError('');
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(setEmployees)
      .catch(() => setError('Could not load the employee directory. Please try again.'))
      .finally(() => setLoading(false));
  }
  useEffect(() => { loadEmployees(); }, []);

  const filtered = useMemo(() => employees.filter(e => `${e.name} ${e.email} ${e.username}`.toLowerCase().includes(query.toLowerCase())), [employees, query]);

  function exportCsv() {
    const rows = [['ID', 'Name', 'Email'], ...filtered.map(e => [e.id, e.name, e.email])];
    const csv = rows.map(row => row.map(value => `"${String(value).replace(/"/g, '""')}"`).join(',')).join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
    const a = document.createElement('a'); a.href = url; a.download = 'employee-directory.csv'; a.click(); URL.revokeObjectURL(url);
  }

  return (
    <main className="page-content">
      <div className="page-title-row"><div><span className="section-overline">PEOPLE DIRECTORY</span><h1>Employee directory</h1><p>Search and explore employee records from the external API.</p></div><button className="primary-action" onClick={exportCsv} disabled={!filtered.length}><Download size={16}/> Export CSV</button></div>
      <div className="directory-summary"><div className="directory-summary-icon"><Users size={20}/></div><div><strong>{loading ? 'Loading...' : `${filtered.length} employees`}</strong><small>{query ? 'Matching your search' : 'Records loaded from JSONPlaceholder'}</small></div><button className="refresh-action" onClick={loadEmployees}><RefreshCw size={15}/> Refresh</button></div>
      <section className="content-panel directory-panel">
        <div className="directory-toolbar"><div><h2>All employees</h2><p>Employee name, ID, email and company</p></div><label className="directory-search"><Search size={16}/><input placeholder="Search name or email..." value={query} onChange={e => setQuery(e.target.value)}/></label></div>
        {loading ? <LoadingState /> : error ? <div className="api-error"><p>{error}</p><button className="btn btn-sm btn-outline-primary" onClick={loadEmployees}>Try again</button></div> : <EmployeeTable employees={filtered}/>}
        <div className="table-footnote">{loading ? 'Loading records…' : `Showing ${filtered.length} of ${employees.length} records`} <span>•</span> Source: JSONPlaceholder API</div>
      </section>
      <footer className="app-footer"><span>© 2026 PeopleFlow</span><span>Made for better workdays <span className="footer-star">✦</span></span></footer>
    </main>
  );
}