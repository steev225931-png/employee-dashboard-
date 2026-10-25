import { useState } from 'react';
import { CheckCircle2, ArrowLeft, UserRoundPlus, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

const initialForm = { name: '', designation: '', location: '', salary: '' };
export default function EmployeeForm() {
  const [form, setForm] = useState(initialForm);
  const [saved, setSaved] = useState(null);
  function change(e) { setForm({ ...form, [e.target.name]: e.target.value }); setSaved(null); }
  function submit(e) {
    e.preventDefault();
    setSaved({ ...form });
    setForm(initialForm);
  }
  return (
    <main className="page-content">
      <div className="page-title-row"><div><span className="section-overline">PEOPLE DIRECTORY / NEW RECORD</span><h1>Add an employee</h1><p>Capture the essential details for a new team member.</p></div><Link to="/employees" className="secondary-action"><ArrowLeft size={16}/> Back to directory</Link></div>
      <div className="form-page-grid">
        <section className="content-panel form-content-panel">
          <div className="form-section-heading"><div className="form-heading-icon"><UserRoundPlus size={21}/></div><div><h2>Employee information</h2><p>Complete all required fields to create a record.</p></div></div>
          <form onSubmit={submit} className="professional-form">
            <div className="form-grid">
              <div className="field-wrap"><label htmlFor="name">Full name <span>*</span></label><input id="name" name="name" value={form.name} onChange={change} placeholder="e.g. Alex Johnson" required minLength="2"/><small>Enter the employee's first and last name.</small></div>
              <div className="field-wrap"><label htmlFor="designation">Designation <span>*</span></label><input id="designation" name="designation" value={form.designation} onChange={change} placeholder="e.g. Product Designer" required/><small>The employee's current role or job title.</small></div>
              <div className="field-wrap"><label htmlFor="location">Location <span>*</span></label><input id="location" name="location" value={form.location} onChange={change} placeholder="e.g. Kochi, Kerala" required/><small>Office location or city.</small></div>
              <div className="field-wrap"><label htmlFor="salary">Salary (₹) <span>*</span></label><div className="salary-input"><span>₹</span><input id="salary" name="salary" type="number" value={form.salary} onChange={change} placeholder="45000" min="0" step="0.01" required/></div><small>Enter the salary amount in Indian rupees.</small></div>
            </div>
            <div className="form-info"><Info size={16}/><span>All information is required. This assignment demo does not send form details to a server.</span></div>
            <div className="form-button-row"><button type="button" className="secondary-action" onClick={() => { setForm(initialForm); setSaved(null); }}>Clear fields</button><button type="submit" className="primary-action"><CheckCircle2 size={16}/> Save employee</button></div>
          </form>
          {saved && <div className="saved-result" role="status"><CheckCircle2 size={20}/><div><strong>Employee details submitted successfully</strong><p>{saved.name} · {saved.designation} · {saved.location} · ₹{Number(saved.salary).toLocaleString('en-IN')}</p><small>Demo only: this record is shown as a confirmation and is not permanently stored.</small></div></div>}
        </section>
        <aside className="form-aside">
          <div className="aside-art"><div className="aside-art-circle">✦</div><span>PEOPLEFLOW / GUIDE</span><h3>Every great team starts with a great record.</h3><p>Keep employee information clear and consistent so your team can focus on what matters.</p></div>
          <div className="aside-checklist"><h3>Before you save</h3><div><CheckCircle2 size={17}/><span>Confirm the employee's full name</span></div><div><CheckCircle2 size={17}/><span>Use their current designation</span></div><div><CheckCircle2 size={17}/><span>Enter salary in rupees</span></div></div>
        </aside>
      </div>
      <footer className="app-footer"><span>© 2026 PeopleFlow</span><span>Made for better workdays <span className="footer-star">✦</span></span></footer>
    </main>
  );
}