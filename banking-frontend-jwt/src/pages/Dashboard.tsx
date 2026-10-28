import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import StatCard from '../components/StatCard';
import { accountApi, customerApi, type Account, type Customer } from '../services/api';
export default function Dashboard() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState('');
  useEffect(() => {
    let active = true;
    Promise.allSettled([customerApi.getAll(), accountApi.getAll()]).then(results => {
      if (!active) return;
      if (results[0].status === 'fulfilled') setCustomers(results[0].value);
      if (results[1].status === 'fulfilled') setAccounts(results[1].value);
      if (results.every(r => r.status === 'rejected')) setApiError('Could not reach the backend. Check that customer-service (8081) and account-service (8082) are running.');
      setLoading(false);
    });
    return () => { active = false; };
  }, []);
  const totalBalance = accounts.reduce((sum, account) => sum + Number(account.balance || 0), 0);
  const money = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });
  return <div className="content-stack"><div className="welcome-row"><div><p className="section-kicker">YOUR BANKING AT A GLANCE</p><h2>Good to see you, Administrator.</h2><p className="muted-text">Here’s what’s happening across your banking workspace.</p></div><span className="date-pill"><i className="bi bi-calendar3 me-2" />{new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span></div>
    {apiError && <div className="alert alert-warning"><i className="bi bi-exclamation-triangle me-2" />{apiError} The dashboard will show live values when the API is available.</div>}
    <div className="row g-3"><div className="col-12 col-md-6 col-xl-4"><StatCard label="Total customers" value={loading ? '—' : customers.length.toLocaleString('en-IN')} note="Registered customers" icon="bi-people" tone="blue" /></div><div className="col-12 col-md-6 col-xl-4"><StatCard label="Active accounts" value={loading ? '—' : accounts.length.toLocaleString('en-IN')} note="Accounts on record" icon="bi-wallet2" tone="green" /></div><div className="col-12 col-md-6 col-xl-4"><StatCard label="Total account balance" value={loading ? '—' : money.format(totalBalance)} note="Combined account balances" icon="bi-graph-up-arrow" tone="gold" /></div></div>
    <div className="row g-3"><div className="col-12 col-xl-8"><section className="panel-card h-100"><div className="panel-heading"><div><h3>Recent customers</h3><p>Latest customer records from your system</p></div><Link to="/customers" className="text-link">View all <i className="bi bi-arrow-up-right ms-1" /></Link></div><div className="table-responsive"><table className="table custom-table align-middle"><thead><tr><th>Customer</th><th>Customer ID</th><th>City</th><th>Status</th></tr></thead><tbody>{loading ? <tr><td colSpan={4} className="empty-state">Loading customers…</td></tr> : customers.length ? [...customers].slice(-5).reverse().map((customer, index) => <tr key={customer.customerId ?? `${customer.email}-${index}`}><td><div className="customer-cell"><span className="table-avatar">{customer.name?.split(' ').map(part => part[0]).join('').slice(0, 2).toUpperCase()}</span><div><strong>{customer.name}</strong><small>{customer.email}</small></div></div></td><td>#{customer.customerId ?? '—'}</td><td>{customer.city}</td><td><span className="status-pill"><span /> Active</span></td></tr>) : <tr><td colSpan={4} className="empty-state">No customers found yet. Add your first customer.</td></tr>}</tbody></table></div></section></div><div className="col-12 col-xl-4"><section className="panel-card quick-actions h-100"><div className="panel-heading"><div><h3>Quick actions</h3><p>Common tasks, one click away</p></div></div><Link to="/customers/new" className="action-link"><span className="action-icon blue"><i className="bi bi-person-plus" /></span><span><strong>Add a customer</strong><small>Create a customer profile</small></span><i className="bi bi-chevron-right ms-auto" /></Link><Link to="/accounts/new" className="action-link"><span className="action-icon green"><i className="bi bi-plus-circle" /></span><span><strong>Open an account</strong><small>Register a new bank account</small></span><i className="bi bi-chevron-right ms-auto" /></Link><Link to="/accounts" className="action-link"><span className="action-icon gold"><i className="bi bi-card-list" /></span><span><strong>Review accounts</strong><small>Browse account records</small></span><i className="bi bi-chevron-right ms-auto" /></Link><div className="security-note"><i className="bi bi-shield-check" /><span><strong>Keep things secure</strong><small>Always sign out when you’re finished.</small></span></div></section></div></div></div>;
}
