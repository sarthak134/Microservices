import { useState, type FormEvent } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
export default function Signup() {
  const { isAuthenticated, register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(''); setSuccess('');
    if (password.length < 8) { setError('Use a password with at least 8 characters.'); return; }
    if (password !== confirmPassword) { setError('The passwords do not match.'); return; }
    setLoading(true);
    try {
      const result = await register({ name: name.trim(), email: email.trim(), password });
      setSuccess(typeof result === 'string' && result ? result.replace(/^"|"$/g, '') : 'Profile created successfully. Please sign in.');
      window.setTimeout(() => navigate('/login', { replace: true, state: { registered: true } }), 1000);
    } catch (e) { setError(e instanceof Error ? e.message : 'Could not create your profile. Please try again.'); }
    finally { setLoading(false); }
  }
  return <main className="login-page"><section className="login-brand-panel"><div className="brand brand-light"><span className="brand-mark"><i className="bi bi-bank2" /></span><span>northstar<span className="brand-sub">BANKING</span></span></div><div className="login-hero"><div className="hero-kicker"><span /> A BETTER VIEW OF YOUR BANKING</div><h1>Your next step<br />starts <em>right here.</em></h1><p>Create your profile to access the banking workspace and manage customers and accounts from one place.</p><div className="hero-decoration"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="hero-bank"><i className="bi bi-person-check" /></div><div className="float-card float-card-top"><i className="bi bi-shield-check" /><span>Protected access</span></div><div className="float-card float-card-bottom"><span className="float-dot" /><span>Simple, secure workspace</span></div></div></div><div className="panel-foot"><i className="bi bi-lock-fill me-2" />Your profile is registered through the authentication service</div></section>
  <section className="login-form-panel"><div className="login-form-wrap"><div className="mobile-brand brand"><span className="brand-mark"><i className="bi bi-bank2" /></span><span>northstar<span className="brand-sub">BANKING</span></span></div><div className="welcome-label">GET STARTED</div><h2>Create your profile</h2><p className="login-subtitle">Fill in your details to register a new login.</p><form onSubmit={handleSubmit} className="mt-4"><label className="form-label" htmlFor="name">Full name / login name</label><div className="input-with-icon"><i className="bi bi-person" /><input id="name" type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name" autoComplete="username" maxLength={100} required /></div><label className="form-label mt-3" htmlFor="signup-email">Email address</label><div className="input-with-icon"><i className="bi bi-envelope" /><input id="signup-email" type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" required /></div><label className="form-label mt-3" htmlFor="signup-password">Password</label><div className="input-with-icon"><i className="bi bi-lock" /><input id="signup-password" type={showPassword ? 'text' : 'password'} className="form-control" value={password} onChange={e => setPassword(e.target.value)} placeholder="At least 8 characters" autoComplete="new-password" minLength={8} required /><button type="button" className="password-toggle" onClick={() => setShowPassword(v => !v)} aria-label={showPassword ? 'Hide password' : 'Show password'}><i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`} /></button></div><label className="form-label mt-3" htmlFor="confirm-password">Confirm password</label><div className="input-with-icon"><i className="bi bi-shield-lock" /><input id="confirm-password" type={showPassword ? 'text' : 'password'} className="form-control" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Re-enter your password" autoComplete="new-password" required /></div>{error && <div className="alert alert-danger py-2 mt-3 mb-0 small">{error}</div>}{success && <div className="alert alert-success py-2 mt-3 mb-0 small">{success}</div>}<button className="btn btn-primary w-100 sign-in-btn mt-4" type="submit" disabled={loading}>{loading ? 'Creating profile…' : <>Create profile <i className="bi bi-arrow-right ms-2" /></>}</button></form><div className="text-center mt-4 small text-secondary">Already registered? <Link className="fw-semibold" to="/login">Sign in</Link></div><div className="demo-note mt-4"><i className="bi bi-info-circle" /><span><strong>Account security</strong><br />Use a unique password. The backend should store only a password hash, never plain text.</span></div><div className="login-legal">By continuing, you agree to the workspace terms and privacy policy.</div></div></section></main>;
}
