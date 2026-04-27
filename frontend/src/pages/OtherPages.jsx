import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, CalendarDays, PartyPopper, Film, UtensilsCrossed, MessageSquare, Code, Sun, Map, Calendar, Check, Users, Video } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { templates, samplePolls } from '../mock/mock';

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
    <div className="bg-white">
      <section className="max-w-7xl mx-auto px-5 lg:px-8 py-14">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">Poll Templates</h1>
          <p className="mt-4 text-slate-600">Kickstart your next poll with a pre-made template. One click to customize.</p>
        </div>

        <div className="mt-10 max-w-xl mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search templates..." className="pl-11 h-12 bg-white" />
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                cat === c ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((t) => {
            const Icon = iconMap[t.icon] || CalendarDays;
            return (
              <Link to="/create" key={t.id} className="group">
                <Card className="p-6 border-slate-200 hover:border-indigo-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${t.color} flex items-center justify-center shadow-md`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="mt-5">
                    <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">{t.category}</span>
                    <h3 className="mt-1 text-lg font-bold text-slate-900">{t.title}</h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">{t.description}</p>
                  </div>
                  <div className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 group-hover:gap-2 transition-all">
                    Use template <ArrowRight className="w-4 h-4" />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export function DemoPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-5 lg:px-8">
        <div className="text-center mb-10">
          <span className="inline-block px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold tracking-wide uppercase">Live Demo</span>
          <h1 className="mt-3 text-4xl font-extrabold text-slate-900">Try a sample poll</h1>
          <p className="mt-2 text-slate-600">Click any poll below to vote and see live results.</p>
        </div>
        <div className="space-y-4">
          {samplePolls.map((p) => (
            <Link to={`/polls/${p.id}`} key={p.id}>
              <Card className="p-6 border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold text-slate-900">{p.title}</h3>
                    <p className="mt-1 text-sm text-slate-500 line-clamp-1">{p.description}</p>
                    <div className="mt-2 flex items-center gap-4 text-xs text-slate-500">
                      <span className="inline-flex items-center gap-1"><Users className="w-3 h-3" /> {p.totalVotes.toLocaleString()} votes</span>
                      <span>{p.options.length} options</span>
                      {p.multiple && <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 font-semibold">Multiple</span>}
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-400 shrink-0 mt-1" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function MeetingsPage() {
  const [title, setTitle] = useState('');
  const [slots, setSlots] = useState(['', '']);

  return (
    <div className="bg-white">
      <section className="max-w-7xl mx-auto px-5 lg:px-8 py-14 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 text-pink-700 text-xs font-bold tracking-wide uppercase">
            <Video className="w-3.5 h-3.5" /> Meeting Scheduler
          </span>
          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
            Find the perfect time — <span className="text-indigo-600">without the back-and-forth</span>
          </h1>
          <p className="mt-5 text-slate-600 leading-relaxed">
            Share a meeting poll with your team. Everyone picks the slots that work, you pick the winner. Done.
          </p>
          <ul className="mt-6 space-y-2.5 text-sm text-slate-700">
            {['Unlimited time slots', 'Timezone-aware', 'No login required to vote', 'Calendar export'].map((b) => (
              <li key={b} className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-600" />{b}</li>
            ))}
          </ul>
        </div>

        <Card className="p-6 border-slate-200 shadow-xl">
          <div className="flex items-center gap-2 mb-5">
            <Calendar className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-slate-900">Quick setup</h3>
          </div>
          <label className="text-xs font-semibold text-slate-700">Meeting title</label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Weekly sync" className="mt-1.5 h-11" />
          <label className="text-xs font-semibold text-slate-700 mt-4 block">Time options</label>
          <div className="mt-1.5 space-y-2">
            {slots.map((s, i) => (
              <Input
                key={i}
                value={s}
                onChange={(e) => { const c = [...slots]; c[i] = e.target.value; setSlots(c); }}
                placeholder={`e.g. Mon 10:00 AM`}
                className="h-11"
              />
            ))}
          </div>
          <Button onClick={() => setSlots([...slots, ''])} variant="outline" className="mt-2 w-full border-dashed">+ Add slot</Button>
          <Link to="/create" className="block">
            <Button className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 h-11 font-semibold">Create meeting poll</Button>
          </Link>
        </Card>
      </section>
    </div>
  );
}

export function LegalPage() {
  return (
    <div className="bg-slate-50 min-h-[60vh] py-16">
      <div className="max-w-3xl mx-auto px-5 lg:px-8">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-6">Legal Information</h1>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 prose prose-slate">
          <p>
            This is a StrawPoll clone created for demonstration purposes. 
            No actual legal policies apply. Data submitted to this application 
            is stored in a local/mock database and is not used for any commercial purposes.
          </p>
          <h3>Privacy</h3>
          <p>We do not collect or sell your personal data. Any polls created are public.</p>
        </div>
      </div>
    </div>
  );
}

export function AboutPage() {
  const team = [
    { name: 'Sarthak Baldaniya', role: 'Backend Lead', photo: '/team/sarthak baldaniya.webp' },
    { name: 'Bharat Upadhyay', role: 'Backend Lead', photo: '/team/bharat upadhyay.avif' },
    { name: 'Shreyanshu Mishra', role: 'Frontend Lead', photo: '/team/shreyanshu.webp' },
    { name: 'Rakshit Tyagi', role: 'Frontend Lead', photo: '/team/rakshit tyaGI.webp' },
  ];

  return (
    <div className="bg-slate-50 min-h-[70vh] py-16">
      <div className="max-w-5xl mx-auto px-5 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold tracking-widest uppercase mb-4">Our Team</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">About Us</h1>
          <p className="mt-5 text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            We are a passionate team of developers dedicated to building the best polling experience on the web. We believe in open data, beautiful design, and seamless user interfaces.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map(({ name, role, photo }) => {
            const initials = name.split(' ').map(n => n[0]).join('');
            return (
              <div key={name} className="flex flex-col items-center text-center p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-indigo-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                {photo ? (
                  <img src={photo} alt={name} className="w-20 h-20 rounded-full object-cover shadow-inner mb-5 border-2 border-indigo-50" />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-extrabold text-2xl shadow-inner mb-5">
                    {initials}
                  </div>
                )}
                <h3 className="font-extrabold text-slate-900 text-lg leading-tight">{name}</h3>
                <p className="text-sm text-indigo-600 font-semibold mt-1">{role}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
