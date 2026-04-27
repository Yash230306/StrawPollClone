import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Mail, Lock, Eye, EyeOff, User, ArrowRight, CheckCircle2,
  BarChart3, Users, Zap, Shield, Loader2, AlertCircle } from
'lucide-react';
import { setAuth } from '../mock/mock';
import { useToast } from '../hooks/use-toast';import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";



function FormInput({ icon: Icon, type = 'text', placeholder, value, onChange, rightElement, id }) {
  return (
    _jsxs("div", { className: "relative", children: [
      _jsx(Icon, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" }),
      _jsx("input", {
        id: id,
        type: type,
        value: value,
        onChange: onChange,
        placeholder: placeholder,
        className: "w-full h-12 bg-white/80 backdrop-blur border border-slate-200 rounded-xl pl-11 pr-11 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 hover:border-slate-300" }
      ),
      rightElement &&
      _jsx("div", { className: "absolute right-3 top-1/2 -translate-y-1/2", children: rightElement })] }

    ));

}

function ErrorBanner({ message }) {
  if (!message) return null;
  return (
    _jsxs("div", { className: "flex items-center gap-2.5 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm", children: [
      _jsx(AlertCircle, { className: "w-4 h-4 shrink-0" }),
      _jsx("span", { children: message })] }
    ));

}

function AuthShell({ children, side }) {
  return (
    _jsx("div", { className: "min-h-screen flex", children:

      _jsx("div", { className: "flex-1 flex items-center justify-center px-6 py-12 bg-slate-50", children:
        _jsxs("div", { className: "w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-slate-100", children: [

          _jsxs(Link, { to: "/", className: "flex items-center gap-2 mb-8 justify-center", children: [
            _jsx("div", { className: "w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md", children:
              _jsx("span", { className: "w-4 h-4 rounded-full bg-white/90 block" }) }
            ),
            _jsxs("span", { className: "text-2xl font-extrabold text-slate-900", children: ["Straw",
              _jsx("span", { className: "text-indigo-600", children: "Poll" })] }
            )] }
          ),
          children] }
        ) }
      ) }
    ));

}



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
    if (!email || !pwd) {setError('Please fill in all fields.');return;}

    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pwd })
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

  const eyeBtn =
  _jsx("button", { type: "button", onClick: () => setShow(!show), className: "p-1 text-slate-400 hover:text-slate-600 transition-colors", children:
    show ? _jsx(EyeOff, { className: "w-4 h-4" }) : _jsx(Eye, { className: "w-4 h-4" }) }
  );


  return (
    _jsx(AuthShell, { side: "login", children:
      _jsxs("div", { children: [
        _jsx("h1", { className: "text-3xl font-extrabold text-slate-900", children: "Sign in" }),
        _jsx("p", { className: "mt-1.5 text-slate-500 text-sm", children: "Welcome back \u2014 enter your details below." }),

        _jsxs("form", { onSubmit: submit, className: "mt-8 space-y-4", children: [
          _jsx(ErrorBanner, { message: error }),

          _jsxs("div", { className: "space-y-1", children: [
            _jsx("label", { htmlFor: "login-email", className: "text-xs font-semibold text-slate-600 uppercase tracking-wide", children: "Email" }),
            _jsx(FormInput, {
              id: "login-email",
              icon: Mail,
              type: "email",
              placeholder: "you@example.com",
              value: email,
              onChange: (e) => setEmail(e.target.value) }
            )] }
          ),

          _jsxs("div", { className: "space-y-1", children: [
            _jsxs("div", { className: "flex items-center justify-between", children: [
              _jsx("label", { htmlFor: "login-password", className: "text-xs font-semibold text-slate-600 uppercase tracking-wide", children: "Password" })] }
            ),
            _jsx(FormInput, {
              id: "login-password",
              icon: Lock,
              type: show ? 'text' : 'password',
              placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
              value: pwd,
              onChange: (e) => setPwd(e.target.value),
              rightElement: eyeBtn }
            )] }
          ),

          _jsx("button", {
            type: "submit",
            disabled: loading,
            className: "w-full h-12 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-md shadow-indigo-200 flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98]", children:

            loading ?
            _jsxs(_Fragment, { children: [_jsx(Loader2, { className: "w-4 h-4 animate-spin" }), " Signing in\u2026"] }) :

            _jsxs(_Fragment, { children: ["Sign in ", _jsx(ArrowRight, { className: "w-4 h-4" })] }) }

          )] }
        ),

        _jsxs("p", { className: "mt-6 text-center text-sm text-slate-500", children: ["Don't have an account?",
          ' ',
          _jsx(Link, { to: "/signup", className: "text-indigo-600 font-semibold hover:underline", children: "Create one free" }

          )] }
        )] }
      ) }
    ));

}



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


  const strength = pwd.length === 0 ? 0 : pwd.length < 6 ? 1 : pwd.length < 10 ? 2 : 3;
  const strengthLabel = ['', 'Weak', 'Good', 'Strong'];
  const strengthColor = ['', 'bg-red-400', 'bg-amber-400', 'bg-emerald-500'];

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !pwd || !confirm) {setError('Please fill in all fields.');return;}
    if (pwd.length < 6) {setError('Password must be at least 6 characters.');return;}
    if (pwd !== confirm) {setError('Passwords do not match.');return;}

    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password: pwd })
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

  const eyeBtn =
  _jsx("button", { type: "button", onClick: () => setShow(!show), className: "p-1 text-slate-400 hover:text-slate-600 transition-colors", children:
    show ? _jsx(EyeOff, { className: "w-4 h-4" }) : _jsx(Eye, { className: "w-4 h-4" }) }
  );


  return (
    _jsx(AuthShell, { side: "signup", children:
      _jsxs("div", { children: [
        _jsx("h1", { className: "text-3xl font-extrabold text-slate-900", children: "Create account" }),
        _jsx("p", { className: "mt-1.5 text-slate-500 text-sm", children: "Free forever. No credit card required." }),

        _jsxs("form", { onSubmit: submit, className: "mt-8 space-y-4", children: [
          _jsx(ErrorBanner, { message: error }),

          _jsxs("div", { className: "space-y-1", children: [
            _jsx("label", { htmlFor: "signup-name", className: "text-xs font-semibold text-slate-600 uppercase tracking-wide", children: "Full name" }),
            _jsx(FormInput, {
              id: "signup-name",
              icon: User,
              placeholder: "Jane Doe",
              value: name,
              onChange: (e) => setName(e.target.value) }
            )] }
          ),

          _jsxs("div", { className: "space-y-1", children: [
            _jsx("label", { htmlFor: "signup-email", className: "text-xs font-semibold text-slate-600 uppercase tracking-wide", children: "Email" }),
            _jsx(FormInput, {
              id: "signup-email",
              icon: Mail,
              type: "email",
              placeholder: "you@example.com",
              value: email,
              onChange: (e) => setEmail(e.target.value) }
            )] }
          ),

          _jsxs("div", { className: "space-y-1", children: [
            _jsx("label", { htmlFor: "signup-password", className: "text-xs font-semibold text-slate-600 uppercase tracking-wide", children: "Password" }),
            _jsx(FormInput, {
              id: "signup-password",
              icon: Lock,
              type: show ? 'text' : 'password',
              placeholder: "At least 6 characters",
              value: pwd,
              onChange: (e) => setPwd(e.target.value),
              rightElement: eyeBtn }
            ),

            pwd.length > 0 &&
            _jsxs("div", { className: "flex items-center gap-2 pt-1", children: [
              _jsx("div", { className: "flex gap-1 flex-1", children:
                [1, 2, 3].map((i) =>
                _jsx("div", {

                  className: `h-1 flex-1 rounded-full transition-all duration-300 ${i <= strength ? strengthColor[strength] : 'bg-slate-200'}` }, i
                )
                ) }
              ),
              _jsx("span", { className: `text-xs font-medium ${strength === 1 ? 'text-red-500' : strength === 2 ? 'text-amber-500' : 'text-emerald-600'}`, children:
                strengthLabel[strength] }
              )] }
            )] }

          ),

          _jsxs("div", { className: "space-y-1", children: [
            _jsx("label", { htmlFor: "signup-confirm", className: "text-xs font-semibold text-slate-600 uppercase tracking-wide", children: "Confirm password" }),
            _jsxs("div", { className: "relative", children: [
              _jsx(Lock, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" }),
              _jsx("input", {
                id: "signup-confirm",
                type: show ? 'text' : 'password',
                value: confirm,
                onChange: (e) => setConfirm(e.target.value),
                placeholder: "Repeat your password",
                className: "w-full h-12 bg-white/80 backdrop-blur border border-slate-200 rounded-xl pl-11 pr-11 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 hover:border-slate-300" }
              ),
              confirm.length > 0 &&
              _jsx("div", { className: "absolute right-3 top-1/2 -translate-y-1/2", children:
                confirm === pwd ?
                _jsx(CheckCircle2, { className: "w-4 h-4 text-emerald-500" }) :
                _jsx(AlertCircle, { className: "w-4 h-4 text-red-400" }) }
              )] }

            )] }
          ),

          _jsxs("p", { className: "text-xs text-slate-400", children: ["By creating an account, you agree to our",
            ' ',
            _jsx("a", { href: "#", className: "text-indigo-600 hover:underline", children: "Terms of Service" }),
            ' ', "and", ' ',
            _jsx("a", { href: "#", className: "text-indigo-600 hover:underline", children: "Privacy Policy" }), "."] }
          ),

          _jsx("button", {
            type: "submit",
            disabled: loading,
            className: "w-full h-12 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-md shadow-indigo-200 flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98]", children:

            loading ?
            _jsxs(_Fragment, { children: [_jsx(Loader2, { className: "w-4 h-4 animate-spin" }), " Creating account\u2026"] }) :

            _jsxs(_Fragment, { children: ["Create free account ", _jsx(ArrowRight, { className: "w-4 h-4" })] }) }

          )] }
        ),

        _jsxs("p", { className: "mt-6 text-center text-sm text-slate-500", children: ["Already have an account?",
          ' ',
          _jsx(Link, { to: "/login", className: "text-indigo-600 font-semibold hover:underline", children: "Sign in" }

          )] }
        )] }
      ) }
    ));

}