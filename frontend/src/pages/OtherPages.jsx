import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, CalendarDays, PartyPopper, Film, UtensilsCrossed, MessageSquare, Code, Sun, Map, Calendar, Check, Users, Video } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { templates, samplePolls } from '../mock/mock';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

const iconMap = { CalendarDays, PartyPopper, Film, UtensilsCrossed, MessageSquare, Code, Sun, Map };

export function TemplatesPage() {
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('All');
  const categories = ['All', ...new Set(templates.map((t) => t.category))];

  const filtered = templates.filter((t) => {
    const matchQ = t.title.toLowerCase().includes(query.toLowerCase()) || t.description.toLowerCase().includes(query.toLowerCase());
    const matchC = cat === 'All' || t.category === cat;
    return matchQ && matchC;
  });

  return (
    _jsx("div", { className: "bg-white", children:
      _jsxs("section", { className: "max-w-7xl mx-auto px-5 lg:px-8 py-14", children: [
        _jsxs("div", { className: "text-center max-w-2xl mx-auto", children: [
          _jsx("h1", { className: "text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight", children: "Poll Templates" }),
          _jsx("p", { className: "mt-4 text-slate-600", children: "Kickstart your next poll with a pre-made template. One click to customize." })] }
        ),

        _jsxs("div", { className: "mt-10 max-w-xl mx-auto relative", children: [
          _jsx(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" }),
          _jsx(Input, { value: query, onChange: (e) => setQuery(e.target.value), placeholder: "Search templates...", className: "pl-11 h-12 bg-white" })] }
        ),

        _jsx("div", { className: "mt-6 flex flex-wrap items-center justify-center gap-2", children:
          categories.map((c) =>
          _jsx("button", {

            onClick: () => setCat(c),
            className: `px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
            cat === c ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`, children:


            c }, c
          )
          ) }
        ),

        _jsx("div", { className: "mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5", children:
          filtered.map((t) => {
            const Icon = iconMap[t.icon] || CalendarDays;
            return (
              _jsx(Link, { to: "/create", className: "group", children:
                _jsxs(Card, { className: "p-6 border-slate-200 hover:border-indigo-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full", children: [
                  _jsx("div", { className: `w-14 h-14 rounded-2xl bg-gradient-to-br ${t.color} flex items-center justify-center shadow-md`, children:
                    _jsx(Icon, { className: "w-7 h-7 text-white" }) }
                  ),
                  _jsxs("div", { className: "mt-5", children: [
                    _jsx("span", { className: "text-xs font-semibold text-indigo-600 uppercase tracking-wide", children: t.category }),
                    _jsx("h3", { className: "mt-1 text-lg font-bold text-slate-900", children: t.title }),
                    _jsx("p", { className: "mt-2 text-sm text-slate-600 leading-relaxed", children: t.description })] }
                  ),
                  _jsxs("div", { className: "mt-5 inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 group-hover:gap-2 transition-all", children: ["Use template ",
                    _jsx(ArrowRight, { className: "w-4 h-4" })] }
                  )] }
                ) }, t.id
              ));

          }) }
        )] }
      ) }
    ));

}

export function DemoPage() {
  return (
    _jsx("div", { className: "bg-slate-50 min-h-screen py-12", children:
      _jsxs("div", { className: "max-w-4xl mx-auto px-5 lg:px-8", children: [
        _jsxs("div", { className: "text-center mb-10", children: [
          _jsx("span", { className: "inline-block px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold tracking-wide uppercase", children: "Live Demo" }),
          _jsx("h1", { className: "mt-3 text-4xl font-extrabold text-slate-900", children: "Try a sample poll" }),
          _jsx("p", { className: "mt-2 text-slate-600", children: "Click any poll below to vote and see live results." })] }
        ),
        _jsx("div", { className: "space-y-4", children:
          samplePolls.map((p) =>
          _jsx(Link, { to: `/polls/${p.id}`, children:
            _jsx(Card, { className: "p-6 border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all", children:
              _jsxs("div", { className: "flex items-start justify-between gap-4", children: [
                _jsxs("div", { className: "min-w-0", children: [
                  _jsx("h3", { className: "text-lg font-bold text-slate-900", children: p.title }),
                  _jsx("p", { className: "mt-1 text-sm text-slate-500 line-clamp-1", children: p.description }),
                  _jsxs("div", { className: "mt-2 flex items-center gap-4 text-xs text-slate-500", children: [
                    _jsxs("span", { className: "inline-flex items-center gap-1", children: [_jsx(Users, { className: "w-3 h-3" }), " ", p.totalVotes.toLocaleString(), " votes"] }),
                    _jsxs("span", { children: [p.options.length, " options"] }),
                    p.multiple && _jsx("span", { className: "px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 font-semibold", children: "Multiple" })] }
                  )] }
                ),
                _jsx(ArrowRight, { className: "w-5 h-5 text-slate-400 shrink-0 mt-1" })] }
              ) }
            ) }, p.id
          )
          ) }
        )] }
      ) }
    ));

}

export function MeetingsPage() {
  const [title, setTitle] = useState('');
  const [slots, setSlots] = useState(['', '']);

  return (
    _jsx("div", { className: "bg-white", children:
      _jsxs("section", { className: "max-w-7xl mx-auto px-5 lg:px-8 py-14 grid lg:grid-cols-2 gap-12 items-center", children: [
        _jsxs("div", { children: [
          _jsxs("span", { className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 text-pink-700 text-xs font-bold tracking-wide uppercase", children: [
            _jsx(Video, { className: "w-3.5 h-3.5" }), " Meeting Scheduler"] }
          ),
          _jsxs("h1", { className: "mt-4 text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight", children: ["Find the perfect time \u2014 ",
            _jsx("span", { className: "text-indigo-600", children: "without the back-and-forth" })] }
          ),
          _jsx("p", { className: "mt-5 text-slate-600 leading-relaxed", children: "Share a meeting poll with your team. Everyone picks the slots that work, you pick the winner. Done." }

          ),
          _jsx("ul", { className: "mt-6 space-y-2.5 text-sm text-slate-700", children:
            ['Unlimited time slots', 'Timezone-aware', 'No login required to vote', 'Calendar export'].map((b) =>
            _jsxs("li", { className: "flex items-center gap-2", children: [_jsx(Check, { className: "w-4 h-4 text-indigo-600" }), b] }, b)
            ) }
          )] }
        ),

        _jsxs(Card, { className: "p-6 border-slate-200 shadow-xl", children: [
          _jsxs("div", { className: "flex items-center gap-2 mb-5", children: [
            _jsx(Calendar, { className: "w-5 h-5 text-indigo-600" }),
            _jsx("h3", { className: "font-bold text-slate-900", children: "Quick setup" })] }
          ),
          _jsx("label", { className: "text-xs font-semibold text-slate-700", children: "Meeting title" }),
          _jsx(Input, { value: title, onChange: (e) => setTitle(e.target.value), placeholder: "Weekly sync", className: "mt-1.5 h-11" }),
          _jsx("label", { className: "text-xs font-semibold text-slate-700 mt-4 block", children: "Time options" }),
          _jsx("div", { className: "mt-1.5 space-y-2", children:
            slots.map((s, i) =>
            _jsx(Input, {

              value: s,
              onChange: (e) => {const c = [...slots];c[i] = e.target.value;setSlots(c);},
              placeholder: `e.g. Mon 10:00 AM`,
              className: "h-11" }, i
            )
            ) }
          ),
          _jsx(Button, { onClick: () => setSlots([...slots, '']), variant: "outline", className: "mt-2 w-full border-dashed", children: "+ Add slot" }),
          _jsx(Link, { to: "/create", className: "block", children:
            _jsx(Button, { className: "mt-4 w-full bg-indigo-600 hover:bg-indigo-700 h-11 font-semibold", children: "Create meeting poll" }) }
          )] }
        )] }
      ) }
    ));

}

export function LegalPage() {
  return (
    _jsx("div", { className: "bg-slate-50 min-h-[60vh] py-16", children:
      _jsxs("div", { className: "max-w-3xl mx-auto px-5 lg:px-8", children: [
        _jsx("h1", { className: "text-4xl font-extrabold text-slate-900 mb-6", children: "Legal Information" }),
        _jsxs("div", { className: "bg-white p-8 rounded-2xl shadow-sm border border-slate-200 prose prose-slate", children: [
          _jsx("p", { children: "This is a StrawPoll clone created for demonstration purposes. No actual legal policies apply. Data submitted to this application is stored in a local/mock database and is not used for any commercial purposes." }



          ),
          _jsx("h3", { children: "Privacy" }),
          _jsx("p", { children: "We do not collect or sell your personal data. Any polls created are public." })] }
        )] }
      ) }
    ));

}

export function AboutPage() {
  const team = [
  { name: 'Sarthak Baldaniya', role: 'Backend Lead', photo: '/team/sarthak baldaniya.webp' },
  { name: 'Bharat Upadhyay', role: 'Backend Lead', photo: '/team/bharat upadhyay.avif' },
  { name: 'Shreyanshu Mishra', role: 'Frontend Lead', photo: '/team/shreyanshu.webp' },
  { name: 'Rakshit Tyagi', role: 'Frontend Lead', photo: '/team/rakshit tyaGI.webp' }];


  return (
    _jsx("div", { className: "bg-slate-50 min-h-[70vh] py-16", children:
      _jsxs("div", { className: "max-w-5xl mx-auto px-5 lg:px-8", children: [
        _jsxs("div", { className: "text-center mb-16", children: [
          _jsx("span", { className: "inline-block px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold tracking-widest uppercase mb-4", children: "Our Team" }),
          _jsx("h1", { className: "text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight", children: "About Us" }),
          _jsx("p", { className: "mt-5 text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed", children: "We are a passionate team of developers dedicated to building the best polling experience on the web. We believe in open data, beautiful design, and seamless user interfaces." }

          )] }
        ),

        _jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-6", children:
          team.map(({ name, role, photo }) => {
            const initials = name.split(' ').map((n) => n[0]).join('');
            return (
              _jsxs("div", { className: "flex flex-col items-center text-center p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-indigo-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300", children: [
                photo ?
                _jsx("img", { src: photo, alt: name, className: "w-20 h-20 rounded-full object-cover shadow-inner mb-5 border-2 border-indigo-50" }) :

                _jsx("div", { className: "w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-extrabold text-2xl shadow-inner mb-5", children:
                  initials }
                ),

                _jsx("h3", { className: "font-extrabold text-slate-900 text-lg leading-tight", children: name }),
                _jsx("p", { className: "text-sm text-indigo-600 font-semibold mt-1", children: role })] }, name
              ));

          }) }
        )] }
      ) }
    ));

}