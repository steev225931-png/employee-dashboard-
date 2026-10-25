import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Activity, ArrowRight, Eye, EyeOff, LockKeyhole, Mail, ShieldCheck, Users, ChartNoAxesCombined } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const [email, setEmail] = useState('admin@peopleflow.demo');
  const [password, setPassword] = useState('peopleflow123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  if (isLoggedIn) return <Navigate to="/" replace />;
  function handleSubmit(e) {
    e.preventDefault();
    if (!email.includes('@') || password.length < 6) {
      setError('Enter a valid email address and a password with at least 6 characters.');
      return;
    }
    setError('');
    login(email);
    navigate(location.state?.from?.pathname || '/', { replace: true });
  }
  return (
    <div className="login-page">
      <section className="login-showcase">
        <div className="login-brand"><span className="brand-icon"><Activity size={22}/></span><span>People<span>Flow</span></span></div>
        <div className="showcase-content">
          <div className="showcase-tag"><span/> PEOPLE OPERATIONS, REIMAGINED</div>
          <h1>Great teams<br/>start with <em>clarity.</em></h1>
          <p>A calmer, clearer way to see your people, understand your team, and keep everything moving forward.</p>
          <div className="showcase-metrics">
            <div><Users size={19}/><strong>People-first</strong><small>Team overview</small></div>
            <div><ChartNoAxesCombined size={19}/><strong>One workspace</strong><small>Simple insights</small></div>
            <div><ShieldCheck size={19}/><strong>Easy access</strong><small>Demo sign-in</small></div>
          </div>
        </div>
        <div className="showcase-footer">DESIGNED FOR BETTER WORKDAYS <span>© 2026 PEOPLEFLOW</span></div>
      </section>
      <section className="login-panel">
        <div className="login-form-wrap">
          <div className="mobile-login-brand"><span className="brand-icon"><Activity size={20}/></span> PeopleFlow</div>
          <div className="login-welcome"><div className="login-icon"><LockKeyhole size={21}/></div><div className="eyebrow">WELCOME BACK</div><h2>Sign in to your workspace</h2><p>Enter your details to access your dashboard.</p></div>
          <form onSubmit={handleSubmit} className="login-form">
            <label htmlFor="email">Work email</label>
            <div className="login-input"><Mail size={17}/><input id="email" type="email" placeholder="you@company.com" value={email} onChange={e => setEmail(e.target.value)} required /></div>
            <div className="password-label"><label htmlFor="password">Password</label><span>Demo access</span></div>
            <div className="login-input"><LockKeyhole size={17}/><input id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required minLength="6"/><button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <EyeOff size={17}/> : <Eye size={17}/>}</button></div>
            {error && <div className="login-error" role="alert">{error}</div>}
            <button type="submit" className="login-submit">Sign in to dashboard <ArrowRight size={17}/></button>
            <div className="login-safe"><ShieldCheck size={15}/> Your demo session is stored only in this browser tab.</div>
          </form>
          <div className="demo-credentials"><strong>Demo credentials</strong><span>Email: admin@peopleflow.demo</span><span>Password: peopleflow123</span><button type="button" onClick={() => { setEmail('admin@peopleflow.demo'); setPassword('peopleflow123'); }}>Use demo credentials</button></div>
          <p className="login-legal">By continuing, you agree to the demo workspace terms.</p>
        </div>
      </section>
    </div>
  );
}