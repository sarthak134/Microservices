import { useState, type FormEvent } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname || '/dashboard';
  if (isAuthenticated) return <Navigate to={from} replace />;
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(''); setLoading(true);
    try { await login(username, password); navigate(from, { replace: true }); }
    catch (e) { setError(e instanceof Error ? e.message : 'Login failed. Check your credentials and try again.'); }
    finally { setLoading(false); }
  }
  return <main className="login-page"><section className="login-brand-panel"><div className="brand brand-light"><span className="brand-mark"><i className="bi bi-bank2" /></span><span>northstar<span className="brand-sub">BANKING</span></span></div><div className="login-hero"><div className="hero-kicker"><span /> YOUR FINANCES, IN GOOD HANDS</div><h1>Banking that<br />moves <em>you forward.</em></h1><p>A clearer view of your customers, accounts, and the details that keep your business moving.</p><div className="hero-decoration"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="hero-bank"><i className="bi bi-bank2" /></div><div className="float-card float-card-top"><i className="bi bi-shield-check" /><span>Secure workspace</span></div><div className="float-card float-card-bottom"><span className="float-dot" /><span>Everything in one place</span></div></div></div><div className="panel-foot"><i className="bi bi-lock-fill me-2" />A focused workspace for modern banking teams</div></section>
  <section className="login-form-panel"><div className="login-form-wrap"><div className="mobile-brand brand"><span className="brand-mark"><i className="bi bi-bank2" /></span><span>northstar<span className="brand-sub">BANKING</span></span></div><div className="welcome-label">WELCOME BACK</div><h2>Sign in to your account</h2><p className="login-subtitle">Enter your registered name and password to access your banking workspace.</p><form onSubmit={handleSubmit} className="mt-4"><label className="form-label" htmlFor="username">Username</label><div className="input-with-icon"><i className="bi bi-person" /><input id="username" type="text" className="form-control" value={username} onChange={e => setUsername(e.target.value)} placeholder="Your registered name" autoComplete="username" required /></div><div className="d-flex justify-content-between align-items-center mt-3"><label className="form-label mb-2" htmlFor="password">Password</label></div><div className="input-with-icon"><i className="bi bi-lock" /><input id="password" type={showPassword ? 'text' : 'password'} className="form-control" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" autoComplete="current-password" required /><button type="button" className="password-toggle" onClick={() => setShowPassword(v => !v)} aria-label={showPassword ? 'Hide password' : 'Show password'}><i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`} /></button></div>{error && <div className="alert alert-danger py-2 mt-3 mb-0 small">{error}</div>}<button className="btn btn-primary w-100 sign-in-btn mt-4" type="submit" disabled={loading}>{loading ? 'Signing in…' : <>Sign in <i className="bi bi-arrow-right ms-2" /></>}</button></form><div className="text-center mt-4 small text-secondary">New to Northstar? <Link className="fw-semibold" to="/signup">Create your profile</Link></div><div className="demo-note mt-4"><i className="bi bi-shield-lock" /><span><strong>Secure sign in</strong><br />Your credentials are verified by your authentication service.</span></div><div className="login-legal">By continuing, you agree to the workspace terms and privacy policy.</div></div></section></main>;
}
