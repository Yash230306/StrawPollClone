import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, LayoutDashboard, Plus, LogOut, Crown } from 'lucide-react';
import { Button } from './ui/button';
import { navLinks, getAuth, clearAuth, isPremiumUser } from '../mock/mock';

const Logo = () => (
  <Link to="/" className="flex items-center gap-2 select-none">
    <span className="relative inline-flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-pink-500 to-indigo-500 shadow-md">
      <span className="w-4 h-4 rounded-full bg-white/90" />
    </span>
    <span className="text-2xl font-extrabold tracking-tight text-slate-900">
      Straw<span className="text-indigo-600">Poll</span>
    </span>
  </Link>
);

function UserMenu({ user, onLogout, navigate }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const premium = isPremiumUser();

  // Close when clicking outside
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const go = (path) => { setOpen(false); navigate(path); };

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2.5 px-3 py-1.5 rounded-full hover:bg-slate-100 transition-colors focus:outline-none"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
          {user.name?.charAt(0).toUpperCase() || 'U'}
        </div>
        <span className="text-sm font-semibold text-slate-800 max-w-[120px] truncate">{user.name}</span>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute right-0 top-[calc(100%+8px)] w-56 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-[200] animate-in fade-in slide-in-from-top-2 duration-150">
          {/* User header */}
          <div className="px-4 py-3 bg-gradient-to-br from-indigo-50 to-slate-50 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                {user.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-slate-900 truncate">{user.name}</p>
                <p className="text-xs text-slate-500 truncate">{user.email}</p>
              </div>
            </div>
            {premium && (
              <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold">
                <Crown className="w-2.5 h-2.5" /> Premium
              </div>
            )}
          </div>

          {/* Menu items */}
          <div className="p-1.5">
            <MenuItem icon={LayoutDashboard} label="Dashboard" onClick={() => go('/dashboard')} />
            <MenuItem icon={Plus} label="Create Poll" onClick={() => go('/create')} />
          </div>

          {/* Divider + Logout */}
          <div className="border-t border-slate-100 p-1.5">
            <button
              onClick={() => { setOpen(false); onLogout(); }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors text-left"
            >
              <LogOut className="w-4 h-4 shrink-0" />
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function MenuItem({ icon: Icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-indigo-600 transition-colors text-left"
    >
      <Icon className="w-4 h-4 shrink-0 text-slate-400" />
      {label}
    </button>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(getAuth());
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setUser(getAuth());
    setOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    clearAuth();
    setUser(null);
    navigate('/');
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white transition-shadow ${
        scrolled ? 'shadow-sm border-b border-slate-200' : 'border-b border-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Logo />
          <ul className="hidden lg:flex items-center gap-8">
            {user && (
              <li>
                <Link
                  to="/dashboard"
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === '/dashboard'
                      ? 'text-indigo-600'
                      : 'text-slate-700 hover:text-indigo-600'
                  }`}
                >
                  Dashboard
                </Link>
              </li>
            )}
            {navLinks.map((l) => (
              <li key={l.path}>
                <Link
                  to={l.path}
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === l.path
                      ? 'text-indigo-600'
                      : 'text-slate-700 hover:text-indigo-600'
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden lg:flex items-center gap-3">
          {user ? (
            <UserMenu user={user} onLogout={handleLogout} navigate={navigate} />
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-slate-700 hover:text-indigo-600 px-3 py-2">
                Login
              </Link>
              <Button
                onClick={() => navigate('/signup')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-5 py-2 h-auto font-semibold shadow-sm"
              >
                Sign up
              </Button>
            </>
          )}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2 text-slate-700"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden border-t border-slate-200 bg-white">
          <div className="px-5 py-4 flex flex-col gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.path}
                to={l.path}
                className="py-2.5 px-2 rounded-md text-slate-700 hover:bg-slate-100 font-medium"
              >
                {l.label}
              </Link>
            ))}
            <div className="h-px bg-slate-200 my-2" />
            {user ? (
              <>
                <Link to="/dashboard" className="py-2.5 px-2 rounded-md text-slate-700 hover:bg-slate-100 font-medium">
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="py-2.5 px-2 rounded-md text-red-600 hover:bg-red-50 font-medium text-left"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="py-2.5 px-2 rounded-md text-slate-700 hover:bg-slate-100 font-medium">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="mt-1 py-2.5 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-center"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
