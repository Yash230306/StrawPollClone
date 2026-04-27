import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, LayoutDashboard, Plus, LogOut, Crown } from 'lucide-react';
import { Button } from './ui/button';
import { navLinks, getAuth, clearAuth, isPremiumUser } from '../mock/mock';import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";

const Logo = () =>
_jsxs(Link, { to: "/", className: "flex items-center gap-2 select-none", children: [
  _jsx("span", { className: "relative inline-flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-pink-500 to-indigo-500 shadow-md", children:
    _jsx("span", { className: "w-4 h-4 rounded-full bg-white/90" }) }
  ),
  _jsxs("span", { className: "text-2xl font-extrabold tracking-tight text-slate-900", children: ["Straw",
    _jsx("span", { className: "text-indigo-600", children: "Poll" })] }
  )] }
);


function UserMenu({ user, onLogout, navigate }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const premium = isPremiumUser();


  useEffect(() => {
    const handler = (e) => {if (ref.current && !ref.current.contains(e.target)) setOpen(false);};
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const go = (path) => {setOpen(false);navigate(path);};

  return (
    _jsxs("div", { ref: ref, className: "relative", children: [

      _jsxs("button", {
        onClick: () => setOpen((o) => !o),
        className: "flex items-center gap-2.5 px-3 py-1.5 rounded-full hover:bg-slate-100 transition-colors focus:outline-none", children: [

        _jsx("div", { className: "w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm shrink-0", children:
          user.name?.charAt(0).toUpperCase() || 'U' }
        ),
        _jsx("span", { className: "text-sm font-semibold text-slate-800 max-w-[120px] truncate", children: user.name }),
        _jsx(ChevronDown, { className: `w-4 h-4 text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}` })] }
      ),


      open &&
      _jsxs("div", { className: "absolute right-0 top-[calc(100%+8px)] w-56 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-[200] animate-in fade-in slide-in-from-top-2 duration-150", children: [

        _jsxs("div", { className: "px-4 py-3 bg-gradient-to-br from-indigo-50 to-slate-50 border-b border-slate-100", children: [
          _jsxs("div", { className: "flex items-center gap-3", children: [
            _jsx("div", { className: "w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm shrink-0", children:
              user.name?.charAt(0).toUpperCase() || 'U' }
            ),
            _jsxs("div", { className: "min-w-0", children: [
              _jsx("p", { className: "text-sm font-bold text-slate-900 truncate", children: user.name }),
              _jsx("p", { className: "text-xs text-slate-500 truncate", children: user.email })] }
            )] }
          ),
          premium &&
          _jsxs("div", { className: "mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold", children: [
            _jsx(Crown, { className: "w-2.5 h-2.5" }), " Premium"] }
          )] }

        ),


        _jsxs("div", { className: "p-1.5", children: [
          _jsx(MenuItem, { icon: LayoutDashboard, label: "Dashboard", onClick: () => go('/dashboard') }),
          _jsx(MenuItem, { icon: Plus, label: "Create Poll", onClick: () => go('/create') })] }
        ),


        _jsx("div", { className: "border-t border-slate-100 p-1.5", children:
          _jsxs("button", {
            onClick: () => {setOpen(false);onLogout();},
            className: "w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors text-left", children: [

            _jsx(LogOut, { className: "w-4 h-4 shrink-0" }), "Log out"] }

          ) }
        )] }
      )] }

    ));

}

function MenuItem({ icon: Icon, label, onClick }) {
  return (
    _jsxs("button", {
      onClick: onClick,
      className: "w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-indigo-600 transition-colors text-left", children: [

      _jsx(Icon, { className: "w-4 h-4 shrink-0 text-slate-400" }),
      label] }
    ));

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
    _jsxs("header", {
      className: `sticky top-0 z-50 w-full bg-white transition-shadow ${
      scrolled ? 'shadow-sm border-b border-slate-200' : 'border-b border-transparent'}`, children: [


      _jsxs("nav", { className: "max-w-7xl mx-auto px-5 lg:px-8 h-16 flex items-center justify-between", children: [
        _jsxs("div", { className: "flex items-center gap-10", children: [
          _jsx(Logo, {}),
          _jsxs("ul", { className: "hidden lg:flex items-center gap-8", children: [
            user &&
            _jsx("li", { children:
              _jsx(Link, {
                to: "/dashboard",
                className: `text-sm font-medium transition-colors ${
                location.pathname === '/dashboard' ?
                'text-indigo-600' :
                'text-slate-700 hover:text-indigo-600'}`, children:

                "Dashboard" }

              ) }
            ),

            navLinks.map((l) =>
            _jsx("li", { children:
              _jsx(Link, {
                to: l.path,
                className: `text-sm font-medium transition-colors ${
                location.pathname === l.path ?
                'text-indigo-600' :
                'text-slate-700 hover:text-indigo-600'}`, children:


                l.label }
              ) }, l.path
            )
            )] }
          )] }
        ),

        _jsx("div", { className: "hidden lg:flex items-center gap-3", children:
          user ?
          _jsx(UserMenu, { user: user, onLogout: handleLogout, navigate: navigate }) :

          _jsxs(_Fragment, { children: [
            _jsx(Link, { to: "/login", className: "text-sm font-medium text-slate-700 hover:text-indigo-600 px-3 py-2", children: "Login" }

            ),
            _jsx(Button, {
              onClick: () => navigate('/signup'),
              className: "bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-5 py-2 h-auto font-semibold shadow-sm", children:
              "Sign up" }

            )] }
          ) }

        ),

        _jsx("button", {
          onClick: () => setOpen(!open),
          className: "lg:hidden p-2 text-slate-700",
          "aria-label": "Toggle menu", children:

          open ? _jsx(X, { className: "w-6 h-6" }) : _jsx(Menu, { className: "w-6 h-6" }) }
        )] }
      ),

      open &&
      _jsx("div", { className: "lg:hidden border-t border-slate-200 bg-white", children:
        _jsxs("div", { className: "px-5 py-4 flex flex-col gap-1", children: [
          navLinks.map((l) =>
          _jsx(Link, {

            to: l.path,
            className: "py-2.5 px-2 rounded-md text-slate-700 hover:bg-slate-100 font-medium", children:

            l.label }, l.path
          )
          ),
          _jsx("div", { className: "h-px bg-slate-200 my-2" }),
          user ?
          _jsxs(_Fragment, { children: [
            _jsx(Link, { to: "/dashboard", className: "py-2.5 px-2 rounded-md text-slate-700 hover:bg-slate-100 font-medium", children: "Dashboard" }

            ),
            _jsx("button", {
              onClick: handleLogout,
              className: "py-2.5 px-2 rounded-md text-red-600 hover:bg-red-50 font-medium text-left", children:
              "Log out" }

            )] }
          ) :

          _jsxs(_Fragment, { children: [
            _jsx(Link, { to: "/login", className: "py-2.5 px-2 rounded-md text-slate-700 hover:bg-slate-100 font-medium", children: "Login" }

            ),
            _jsx(Link, {
              to: "/signup",
              className: "mt-1 py-2.5 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-center", children:
              "Sign up" }

            )] }
          )] }

        ) }
      )] }

    ));

}