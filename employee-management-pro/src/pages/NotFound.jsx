import { Link } from 'react-router-dom';
export default function NotFound() {
  return <main className="page-content"><section className="content-panel not-found"><div className="not-found-number">404</div><h1>Page not found</h1><p>This page isn't part of your PeopleFlow workspace.</p><Link to="/" className="primary-action">Return to Home</Link></section></main>;
}