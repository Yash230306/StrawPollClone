import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { setAuth } from '../mock/mock';
import { useToast } from '../hooks/use-toast';

export function LoginPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [show, setShow] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!email || !pwd) return toast({ title: 'Fill in all fields', variant: 'destructive' });
    setAuth({ name: email.split('@')[0], email });
    toast({ title: 'Welcome back!', description: 'You are now logged in.' });
    navigate('/dashboard');
  };

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Log in to access your polls and dashboard."
      footer={<>Don't have an account? <Link to="/signup" className="text-indigo-600 font-semibold hover:underline">Sign up</Link></>}
    >
      <form onSubmit={submit} className="space-y-4">
        <div>
          <Label className="text-sm font-semibold text-slate-800">Email</Label>
          <div className="mt-1.5 relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="pl-10 h-11" type="email" />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <Label className="text-sm font-semibold text-slate-800">Password</Label>
            <a href="#" className="text-xs text-indigo-600 hover:underline">Forgot?</a>
          </div>
          <div className="mt-1.5 relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input value={pwd} onChange={(e) => setPwd(e.target.value)} placeholder="••••••••" className="pl-10 pr-10 h-11" type={show ? 'text' : 'password'} />
            <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
              {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
        <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 h-11 font-semibold">Log in</Button>
      </form>
      <SocialAuth />
    </AuthShell>
  );
}

export function SignupPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [show, setShow] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!name || !email || !pwd) return toast({ title: 'Fill in all fields', variant: 'destructive' });
    setAuth({ name, email });
    toast({ title: 'Account created!', description: 'Welcome to StrawPoll.' });
    navigate('/dashboard');
  };

  return (
    <AuthShell
      title="Create your account"
      subtitle="Sign up for free — no credit card required."
      footer={<>Already have an account? <Link to="/login" className="text-indigo-600 font-semibold hover:underline">Log in</Link></>}
    >
      <form onSubmit={submit} className="space-y-4">
        <div>
          <Label className="text-sm font-semibold text-slate-800">Name</Label>
          <div className="mt-1.5 relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" className="pl-10 h-11" />
          </div>
        </div>
        <div>
          <Label className="text-sm font-semibold text-slate-800">Email</Label>
          <div className="mt-1.5 relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="pl-10 h-11" type="email" />
          </div>
        </div>
        <div>
          <Label className="text-sm font-semibold text-slate-800">Password</Label>
          <div className="mt-1.5 relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input value={pwd} onChange={(e) => setPwd(e.target.value)} placeholder="At least 6 characters" className="pl-10 pr-10 h-11" type={show ? 'text' : 'password'} />
            <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
              {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
        <p className="text-xs text-slate-500">By signing up, you agree to our <a href="#" className="text-indigo-600 hover:underline">Terms</a> and <a href="#" className="text-indigo-600 hover:underline">Privacy Policy</a>.</p>
        <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 h-11 font-semibold">Create account</Button>
      </form>
      <SocialAuth />
    </AuthShell>
  );
}

function SocialAuth() {
  return (
    <>
      <div className="my-6 flex items-center gap-3">
        <div className="flex-1 h-px bg-slate-200" />
        <span className="text-xs text-slate-400">or continue with</span>
        <div className="flex-1 h-px bg-slate-200" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <button className="flex items-center justify-center gap-2 h-11 rounded-lg border border-slate-200 hover:bg-slate-50 font-medium text-sm text-slate-700 transition-colors">
          <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          Google
        </button>
        <button className="flex items-center justify-center gap-2 h-11 rounded-lg border border-slate-200 hover:bg-slate-50 font-medium text-sm text-slate-700 transition-colors">
          <svg className="w-4 h-4" fill="#1877F2" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          Facebook
        </button>
      </div>
    </>
  );
}

function AuthShell({ title, subtitle, children, footer }) {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-16 px-5">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          <h1 className="text-2xl font-extrabold text-slate-900">{title}</h1>
          <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
          <div className="mt-6">{children}</div>
        </div>
        <p className="mt-5 text-center text-sm text-slate-600">{footer}</p>
      </div>
    </div>
  );
}
