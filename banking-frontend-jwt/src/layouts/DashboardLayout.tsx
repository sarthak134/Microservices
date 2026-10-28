import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useLogout } from '../context/AuthContext';

const links = [
  { to: '/dashboard', label: 'Overview', icon: 'bi-grid-1x2', end: true },
  { to: '/customers', label: 'Customers', icon: 'bi-people' },
  { to: '/accounts', label: 'Accounts', icon: 'bi-wallet2' },
];
export default function DashboardLayout() {
  const logout = useLogout();
  const location = useLocation();
  const title = location.pathname.startsWith('/customers') ? 'Customers' : location.pathname.startsWith('/accounts') ? 'Accounts' : 'Overview';
  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><span className="brand-mark"><i className="bi bi-bank2" /></span><span>northstar<span className="brand-sub">BANKING</span></span></div>
      <div className="nav-caption">WORKSPACE</div>
      <nav className="nav flex-column gap-1">{links.map(link => <NavLink key={link.to} to={link.to} end={link.end} className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}><i className={`bi ${link.icon}`} /><span>{link.label}</span>{link.label === 'Customers' && <i className="bi bi-chevron-right ms-auto small" />}</NavLink>)}</nav>
      <div className="sidebar-bottom"><div className="help-card"><i className="bi bi-shield-check" /><div><strong>Secure banking</strong><small>Your workspace is protected</small></div></div><button className="sidebar-link logout-button" onClick={logout}><i className="bi bi-box-arrow-left" /><span>Sign out</span></button></div>
    </aside>
    <main className="main-area"><header className="topbar"><div><div className="eyebrow">BANKING MANAGEMENT</div><h1>{title}</h1></div><div className="d-flex align-items-center gap-3"><button className="icon-button" aria-label="Notifications"><i className="bi bi-bell" /><span /></button><div className="user-chip"><div className="avatar">AD</div><div className="d-none d-sm-block"><strong>Administrator</strong><small>Bank manager</small></div><i className="bi bi-chevron-down ms-2 text-muted small" /></div></div></header><div className="page-content"><Outlet /></div><footer className="app-footer"><span>© 2026 Northstar Banking</span><span>Banking made clearer.</span></footer></main>
  </div>;
}
