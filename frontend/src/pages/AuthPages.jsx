import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Mail, Lock, Eye, EyeOff, User, ArrowRight, CheckCircle2,
  BarChart3, Users, Zap, Shield, Loader2, AlertCircle
} from 'lucide-react';
import { setAuth } from '../mock/mock';
import { useToast } from '../hooks/use-toast';

/* ─── Shared Sub-components ──────────────────────────────────────── */

function FormInput({ icon: Icon, type = 'text', placeholder, value, onChange, rightElement, id }) {
  return (
    <div className="relative">
      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full h-12 bg-white/80 backdrop-blur border border-slate-200 rounded-xl pl-11 pr-11 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 hover:border-slate-300"
      />
      {rightElement && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightElement}</div>
      )}
    </div>
  );
}

function ErrorBanner({ message }) {
  if (!message) return null;
  return (
    <div className="flex items-center gap-2.5 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
      <AlertCircle className="w-4 h-4 shrink-0" />
      <span>{message}</span>
    </div>
  );
}

function AuthShell({ children, side }) {
  return (
    <div className="min-h-screen flex">
      {/* Centered form panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-slate-50">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-8 justify-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md">
              <span className="w-4 h-4 rounded-full bg-white/90 block" />
            </div>
            <span className="text-2xl font-extrabold text-slate-900">
              Straw<span className="text-indigo-600">Poll</span>
            </span>
          </Link>
          {children}
        </div>
      </div>
    </div>
  );
}

/* ─── Login Page ──────────────────────────────────────────────────── */

export function LoginPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !pwd) { setError('Please fill in all fields.'); return; }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pwd }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || 'Login failed');

      setAuth({ name: data.user.name, email: data.user.email, token: data.token, isPremium: data.user.isPremium || false });
      toast({ title: '👋 Welcome back!', description: `Good to see you, ${data.user.name}.` });
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const eyeBtn = (
    <button type="button" onClick={() => setShow(!show)} className="p-1 text-slate-400 hover:text-slate-600 transition-colors">
      {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
    </button>
  );

  return (
    <AuthShell side="login">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">Sign in</h1>
        <p className="mt-1.5 text-slate-500 text-sm">Welcome back — enter your details below.</p>

        <form onSubmit={submit} className="mt-8 space-y-4">
          <ErrorBanner message={error} />

          <div className="space-y-1">
            <label htmlFor="login-email" className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Email</label>
            <FormInput
              id="login-email"
              icon={Mail}
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label htmlFor="login-password" className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Password</label>
              <a href="#" className="text-xs text-indigo-600 hover:text-indigo-700 hover:underline font-medium">Forgot password?</a>
            </div>
            <FormInput
              id="login-password"
              icon={Lock}
              type={show ? 'text' : 'password'}
              placeholder="••••••••"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              rightElement={eyeBtn}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-md shadow-indigo-200 flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98]"
          >
            {loading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Signing in…</>
            ) : (
              <>Sign in <ArrowRight className="w-4 h-4" /></>
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="text-indigo-600 font-semibold hover:underline">
            Create one free
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}

/* ─── Signup Page ─────────────────────────────────────────────────── */

export function SignupPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [confirm, setConfirm] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Password strength
  const strength = pwd.length === 0 ? 0 : pwd.length < 6 ? 1 : pwd.length < 10 ? 2 : 3;
  const strengthLabel = ['', 'Weak', 'Good', 'Strong'];
  const strengthColor = ['', 'bg-red-400', 'bg-amber-400', 'bg-emerald-500'];

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !pwd || !confirm) { setError('Please fill in all fields.'); return; }
    if (pwd.length < 6) { setError('Password must be at least 6 characters.'); return; }
    if (pwd !== confirm) { setError('Passwords do not match.'); return; }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password: pwd }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || 'Registration failed');

      setAuth({ name: data.user.name, email: data.user.email, token: data.token, isPremium: data.user.isPremium || false });
      toast({ title: '🎉 Account created!', description: `Welcome to StrawPoll, ${data.user.name}!` });
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const eyeBtn = (
    <button type="button" onClick={() => setShow(!show)} className="p-1 text-slate-400 hover:text-slate-600 transition-colors">
      {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
    </button>
  );

  return (
    <AuthShell side="signup">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">Create account</h1>
        <p className="mt-1.5 text-slate-500 text-sm">Free forever. No credit card required.</p>

        <form onSubmit={submit} className="mt-8 space-y-4">
          <ErrorBanner message={error} />

          <div className="space-y-1">
            <label htmlFor="signup-name" className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Full name</label>
            <FormInput
              id="signup-name"
              icon={User}
              placeholder="Jane Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="signup-email" className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Email</label>
            <FormInput
              id="signup-email"
              icon={Mail}
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="signup-password" className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Password</label>
            <FormInput
              id="signup-password"
              icon={Lock}
              type={show ? 'text' : 'password'}
              placeholder="At least 6 characters"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              rightElement={eyeBtn}
            />
            {/* Strength meter */}
            {pwd.length > 0 && (
              <div className="flex items-center gap-2 pt-1">
                <div className="flex gap-1 flex-1">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= strength ? strengthColor[strength] : 'bg-slate-200'}`}
                    />
                  ))}
                </div>
                <span className={`text-xs font-medium ${strength === 1 ? 'text-red-500' : strength === 2 ? 'text-amber-500' : 'text-emerald-600'}`}>
                  {strengthLabel[strength]}
                </span>
              </div>
            )}
          </div>

          <div className="space-y-1">
            <label htmlFor="signup-confirm" className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Confirm password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                id="signup-confirm"
                type={show ? 'text' : 'password'}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Repeat your password"
                className="w-full h-12 bg-white/80 backdrop-blur border border-slate-200 rounded-xl pl-11 pr-11 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 hover:border-slate-300"
              />
              {confirm.length > 0 && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {confirm === pwd
                    ? <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    : <AlertCircle className="w-4 h-4 text-red-400" />}
                </div>
              )}
            </div>
          </div>

          <p className="text-xs text-slate-400">
            By creating an account, you agree to our{' '}
            <a href="#" className="text-indigo-600 hover:underline">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-indigo-600 hover:underline">Privacy Policy</a>.
          </p>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-md shadow-indigo-200 flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98]"
          >
            {loading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Creating account…</>
            ) : (
              <>Create free account <ArrowRight className="w-4 h-4" /></>
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}
