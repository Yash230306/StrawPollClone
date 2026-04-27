import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Clock,
  Smile,
  BarChart3,
  Code2,
  Rocket,
  ArrowRight,
  Check,
  Sparkles,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { stats, features, testimonials } from '../mock/mock';

const iconMap = { ShieldCheck, Clock, Smile, BarChart3, Code2, Rocket };

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* HERO */}
      <section className="relative max-w-7xl mx-auto px-5 lg:px-8 pt-10 pb-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a0e2e] via-[#141a4a] to-[#1e1560] shadow-2xl">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-10 right-20 w-72 h-72 rounded-full bg-indigo-500/40 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-purple-500/30 blur-3xl" />
          </div>
          <div className="relative grid lg:grid-cols-2 gap-8 p-10 md:p-16">
            <div className="flex flex-col justify-center">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight">
                Create a poll<br />
                <span className="text-indigo-300">in seconds</span>
              </h1>
              <p className="mt-6 text-lg text-indigo-100/80 max-w-lg leading-relaxed">
                Want to ask your friends where to go friday night or arrange a meeting with co-workers?
                Create a poll - and get answers in no time.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/create">
                  <Button className="bg-white text-indigo-700 hover:bg-slate-100 rounded-lg px-7 py-6 h-auto font-bold text-base shadow-lg">
                    Create a poll
                  </Button>
                </Link>
                <Link to="/demo">
                  <Button className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg px-7 py-6 h-auto font-bold text-base shadow-lg">
                    Live Demo
                  </Button>
                </Link>
              </div>
              <p className="mt-4 text-sm text-indigo-200/70">No signup required</p>
            </div>
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative">
                {/* Ballot illustration */}
                <div className="relative w-80 h-80">
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-72 h-16 rounded-md bg-gradient-to-r from-rose-700 to-rose-600 shadow-xl" />
                  <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-64 h-3 bg-rose-900/60 rounded-sm" />
                  <div className="absolute bottom-16 left-1/2 -translate-x-[30%] w-36 h-48 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-sm shadow-2xl rotate-6" />
                  <Sparkles className="absolute top-8 right-4 w-8 h-8 text-yellow-300 animate-pulse" />
                  <Sparkles className="absolute top-24 left-0 w-5 h-5 text-pink-300 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="max-w-7xl mx-auto px-5 lg:px-8 py-12">
        <p className="text-center text-xs font-bold text-slate-500 tracking-widest uppercase">
          Trusted by over 2,300,000 users worldwide
        </p>
        <div className="mt-10 grid grid-cols-3 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-4xl md:text-6xl font-extrabold text-indigo-600 tracking-tight">{s.value}</div>
              <div className="mt-2 text-sm md:text-base text-slate-600 font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* POLL MAKER PROMO */}
      <section className="max-w-7xl mx-auto px-5 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-indigo-600 mb-3">Poll Maker</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
              Use our advanced poll maker
            </h2>
            <p className="mt-5 text-slate-600 leading-relaxed">
              A straw poll is a voting that can be used to help people to easily determine the opinion of a group or
              the public on some issue. Straw polls are very useful when only the majority opinion is important and
              not the opinion of each individual participant.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/create">
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-6 py-5 h-auto font-semibold">
                  Create a poll
                </Button>
              </Link>
              <Link to="/polls/eNg6RNDvjgA">
                <Button variant="outline" className="rounded-lg px-6 py-5 h-auto font-semibold border-slate-300">
                  View example <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
          <PollMockup />
        </div>
      </section>

      {/* MEETINGS PROMO */}
      <section className="max-w-7xl mx-auto px-5 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <MeetingsMockup />
          <div>
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-pink-600 mb-3">Meetings</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
              Schedule your meetings in no-time
            </h2>
            <p className="mt-5 text-slate-600 leading-relaxed">
              StrawPoll Meetings is a great and simple tool to schedule meetings and other times with clients,
              colleagues or friends. A meeting poll is very helpful in situations where the opinion of each individual
              participant is important.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/meetings">
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-6 py-5 h-auto font-semibold">
                  Schedule a meeting
                </Button>
              </Link>
              <Link to="/polls/eNg6RNDvjgA">
                <Button variant="outline" className="rounded-lg px-6 py-5 h-auto font-semibold border-slate-300">
                  View example <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-slate-50 py-20 mt-8">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Polling made easy</h2>
            <p className="mt-3 text-slate-600">Simple polls with powerful configuration</p>
            <p className="mt-3 text-slate-500 text-sm">
              While we make our polls as simple and beautiful as possible, we also offer powerful customization options
              to enable on-demand adjustments for many different purposes.
            </p>
          </div>
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => {
              const Icon = iconMap[f.icon];
              return (
                <div key={f.title} className="group p-7 bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 group-hover:bg-indigo-600 flex items-center justify-center transition-colors">
                    <Icon className="w-6 h-6 text-indigo-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-slate-900">{f.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{f.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-5 lg:px-8 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Loved by teams & creators</h2>
          <p className="mt-3 text-slate-600">See what our users say about StrawPoll.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="p-7 bg-white rounded-2xl border border-slate-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-semibold text-slate-900">{t.name}</div>
                  <div className="text-xs text-slate-500">{t.role}</div>
                </div>
              </div>
              <p className="mt-5 text-slate-700 leading-relaxed">“{t.quote}”</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-5 lg:px-8 pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-600 p-12 md:p-16 text-center shadow-xl">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white">Ready to get started?</h2>
          <p className="mt-3 text-xl text-indigo-100 font-semibold">It's free!</p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link to="/create">
              <Button className="bg-white text-indigo-700 hover:bg-slate-100 rounded-lg px-7 py-6 h-auto font-bold text-base">
                Create a poll
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-indigo-800 hover:bg-indigo-900 text-white rounded-lg px-7 py-6 h-auto font-bold text-base border border-indigo-400">
                Sign up
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function PollMockup() {
  const options = [
    { label: 'Pepperoni', pct: 38, votes: 1823 },
    { label: 'Pineapple', pct: 19, votes: 934 },
    { label: 'Margherita', pct: 18, votes: 852 },
    { label: 'Mushroom', pct: 15, votes: 712 },
  ];
  return (
    <div className="relative">
      <div className="absolute -inset-4 bg-gradient-to-br from-indigo-200 to-pink-200 rounded-3xl blur-2xl opacity-60" />
      <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-red-400" />
          <div className="w-2 h-2 rounded-full bg-yellow-400" />
          <div className="w-2 h-2 rounded-full bg-green-400" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">What is the best pizza topping?</h3>
        <p className="text-xs text-slate-500 mt-1">4,821 total votes</p>
        <div className="mt-5 space-y-3">
          {options.map((o, i) => (
            <div key={o.label}>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className={`font-medium ${i === 0 ? 'text-indigo-600' : 'text-slate-700'}`}>{o.label}</span>
                <span className="text-slate-500">{o.pct}%</span>
              </div>
              <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                  style={{ width: `${o.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MeetingsMockup() {
  const slots = [
    { day: 'Mon', time: '10:00', count: 8, ok: true },
    { day: 'Tue', time: '14:00', count: 12, ok: true },
    { day: 'Wed', time: '11:00', count: 10, ok: true },
    { day: 'Thu', time: '15:00', count: 7, ok: false },
    { day: 'Fri', time: '09:00', count: 5, ok: false },
  ];
  return (
    <div className="relative">
      <div className="absolute -inset-4 bg-gradient-to-br from-pink-200 to-indigo-200 rounded-3xl blur-2xl opacity-60" />
      <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 p-6">
        <h3 className="text-lg font-bold text-slate-900">Team meeting – Week of July 15</h3>
        <p className="text-xs text-slate-500 mt-1">Select all times that work for you</p>
        <div className="mt-5 space-y-2">
          {slots.map((s) => (
            <div key={s.day} className={`flex items-center justify-between p-3 rounded-lg border ${s.ok ? 'border-indigo-200 bg-indigo-50' : 'border-slate-200'}`}>
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-md flex items-center justify-center ${s.ok ? 'bg-indigo-600' : 'border-2 border-slate-300'}`}>
                  {s.ok && <Check className="w-3.5 h-3.5 text-white" />}
                </div>
                <span className="font-medium text-slate-800">{s.day}, {s.time}</span>
              </div>
              <span className="text-xs text-slate-500">{s.count} votes</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
