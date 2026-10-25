import { Mail, MoreHorizontal } from 'lucide-react';

const colors = ['lavender', 'blue', 'mint', 'peach', 'pink'];
export default function EmployeeTable({ employees, compact = false }) {
  return (
    <div className="table-responsive">
      <table className="table people-table align-middle mb-0">
        <thead><tr><th>EMPLOYEE</th><th>EMPLOYEE ID</th><th>EMAIL ADDRESS</th><th>COMPANY</th><th className="text-end"> </th></tr></thead>
        <tbody>
          {employees.map((employee, index) => {
            const initials = employee.name.split(' ').map(s => s[0]).slice(0, 2).join('').toUpperCase();
            return (
              <tr key={employee.id}>
                <td><div className="employee-person"><div className={`person-avatar ${colors[index % colors.length]}`}>{initials}</div><div><strong>{employee.name}</strong><small>@{employee.username || 'employee'}</small></div></div></td>
                <td><span className="employee-id">EMP-{String(employee.id).padStart(4, '0')}</span></td>
                <td><a className="person-email" href={`mailto:${employee.email}`}><Mail size={14}/>{employee.email}</a></td>
                <td><span className="company-pill">{employee.company?.name || 'PeopleFlow'}</span></td>
                <td className="text-end"><button className="row-menu" aria-label={`More options for ${employee.name}`} onClick={() => alert(`Employee: ${employee.name}\\nEmail: ${employee.email}`)}><MoreHorizontal size={18}/></button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {!employees.length && <div className="empty-state">No employee records found.</div>}
    </div>
  );
}