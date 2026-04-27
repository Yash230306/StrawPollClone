import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, isPremiumUser } from '../mock/mock';
import {
  ShieldCheck,
  Clock,
  Smile,
  BarChart3,
  Code2,
  Rocket,
  ArrowRight,
  Check,
  Sparkles } from
'lucide-react';
import { Button } from '../components/ui/button';
import { stats, features, testimonials } from '../mock/mock';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

const iconMap = { ShieldCheck, Clock, Smile, BarChart3, Code2, Rocket };

export default function HomePage() {
  const navigate = useNavigate();

  const handleScheduleMeeting = () => {
    const user = getAuth();
    if (!user) {
      navigate('/signup');
      return;
    }
    if (!isPremiumUser()) {
      navigate('/pricing');
      return;
    }
    navigate('/create?type=meeting');
  };

  return (
    _jsxs("div", { className: "bg-white", children: [

      _jsx("section", { className: "relative max-w-7xl mx-auto px-5 lg:px-8 pt-10 pb-16", children:
        _jsxs("div", { className: "relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a0e2e] via-[#141a4a] to-[#1e1560] shadow-2xl", children: [
          _jsxs("div", { className: "absolute inset-0 opacity-30", children: [
            _jsx("div", { className: "absolute top-10 right-20 w-72 h-72 rounded-full bg-indigo-500/40 blur-3xl" }),
            _jsx("div", { className: "absolute bottom-0 right-0 w-96 h-96 rounded-full bg-purple-500/30 blur-3xl" })] }
          ),
          _jsxs("div", { className: "relative grid lg:grid-cols-2 gap-8 p-10 md:p-16", children: [
            _jsxs("div", { className: "flex flex-col justify-center", children: [
              _jsxs("h1", { className: "text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight", children: ["Create a poll",
                _jsx("br", {}),
                _jsx("span", { className: "text-indigo-300", children: "in seconds" })] }
              ),
              _jsx("p", { className: "mt-6 text-lg text-indigo-100/80 max-w-lg leading-relaxed", children: "Want to ask your friends where to go friday night or arrange a meeting with co-workers? Create a poll - and get answers in no time." }


              ),
              _jsxs("div", { className: "mt-8 flex flex-wrap gap-3", children: [
                _jsx(Link, { to: "/create", children:
                  _jsx(Button, { className: "bg-white text-indigo-700 hover:bg-slate-100 rounded-lg px-7 py-6 h-auto font-bold text-base shadow-lg", children: "Create a poll" }

                  ) }
                ),
                _jsx(Link, { to: "/demo", children:
                  _jsx(Button, { className: "bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg px-7 py-6 h-auto font-bold text-base shadow-lg", children: "Live Demo" }

                  ) }
                )] }
              ),
              _jsx("p", { className: "mt-4 text-sm text-indigo-200/70", children: "No signup required for standard polls" })] }
            ),
            _jsx("div", { className: "hidden lg:flex items-center justify-center", children:
              _jsx("div", { className: "relative", children:

                _jsxs("div", { className: "relative w-80 h-80", children: [
                  _jsx("div", { className: "absolute bottom-0 left-1/2 -translate-x-1/2 w-72 h-16 rounded-md bg-gradient-to-r from-rose-700 to-rose-600 shadow-xl" }),
                  _jsx("div", { className: "absolute bottom-16 left-1/2 -translate-x-1/2 w-64 h-3 bg-rose-900/60 rounded-sm" }),
                  _jsx("div", { className: "absolute bottom-16 left-1/2 -translate-x-[30%] w-36 h-48 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-sm shadow-2xl rotate-6" }),
                  _jsx(Sparkles, { className: "absolute top-8 right-4 w-8 h-8 text-yellow-300 animate-pulse" }),
                  _jsx(Sparkles, { className: "absolute top-24 left-0 w-5 h-5 text-pink-300 animate-pulse" })] }
                ) }
              ) }
            )] }
          )] }
        ) }
      ),


      _jsxs("section", { className: "max-w-7xl mx-auto px-5 lg:px-8 py-12", children: [
        _jsx("p", { className: "text-center text-xs font-bold text-slate-500 tracking-widest uppercase", children: "Trusted by over 2,300,000 users worldwide" }

        ),
        _jsx("div", { className: "mt-10 grid grid-cols-3 gap-6", children:
          stats.map((s) =>
          _jsxs("div", { className: "text-center", children: [
            _jsx("div", { className: "text-4xl md:text-6xl font-extrabold text-indigo-600 tracking-tight", children: s.value }),
            _jsx("div", { className: "mt-2 text-sm md:text-base text-slate-600 font-medium", children: s.label })] }, s.label
          )
          ) }
        )] }
      ),


      _jsx("section", { className: "max-w-7xl mx-auto px-5 lg:px-8 py-16", children:
        _jsxs("div", { className: "grid lg:grid-cols-2 gap-12 items-center", children: [
          _jsxs("div", { children: [
            _jsx("span", { className: "inline-block text-xs font-bold tracking-widest uppercase text-indigo-600 mb-3", children: "Poll Maker" }),
            _jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight", children: "Use our advanced poll maker" }

            ),
            _jsx("p", { className: "mt-5 text-slate-600 leading-relaxed", children: "A straw poll is a voting that can be used to help people to easily determine the opinion of a group or the public on some issue. Straw polls are very useful when only the majority opinion is important and not the opinion of each individual participant." }



            ),
            _jsxs("div", { className: "mt-7 flex flex-wrap gap-3", children: [
              _jsx(Link, { to: "/create", children:
                _jsx(Button, { className: "bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-6 py-5 h-auto font-semibold", children: "Create a poll" }

                ) }
              ),
              _jsx(Link, { to: "/polls/eNg6RNDvjgA", children:
                _jsxs(Button, { variant: "outline", className: "rounded-lg px-6 py-5 h-auto font-semibold border-slate-300", children: ["View example ",
                  _jsx(ArrowRight, { className: "w-4 h-4 ml-1" })] }
                ) }
              )] }
            )] }
          ),
          _jsx(PollMockup, {})] }
        ) }
      ),


      _jsx("section", { className: "max-w-7xl mx-auto px-5 lg:px-8 py-16", children:
        _jsxs("div", { className: "grid lg:grid-cols-2 gap-12 items-center", children: [
          _jsx(MeetingsMockup, {}),
          _jsxs("div", { children: [
            _jsx("span", { className: "inline-block text-xs font-bold tracking-widest uppercase text-pink-600 mb-3", children: "Meetings" }),
            _jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight", children: "Schedule your meetings in no-time" }

            ),
            _jsx("p", { className: "mt-5 text-slate-600 leading-relaxed", children: "StrawPoll Meetings is a great and simple tool to schedule meetings and other times with clients, colleagues or friends. A meeting poll is very helpful in situations where the opinion of each individual participant is important." }



            ),
            _jsxs("div", { className: "mt-7 flex flex-wrap gap-3", children: [
              _jsx("button", {
                onClick: handleScheduleMeeting,
                className: "inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-6 py-5 h-auto font-semibold transition-colors", children:
                "Schedule a meeting" }

              ),
              _jsx(Link, { to: "/polls/eNg6RNDvjgA", children:
                _jsxs(Button, { variant: "outline", className: "rounded-lg px-6 py-5 h-auto font-semibold border-slate-300", children: ["View example ",
                  _jsx(ArrowRight, { className: "w-4 h-4 ml-1" })] }
                ) }
              )] }
            )] }
          )] }
        ) }
      ),


      _jsx("section", { className: "bg-slate-50 py-20 mt-8", children:
        _jsxs("div", { className: "max-w-7xl mx-auto px-5 lg:px-8", children: [
          _jsxs("div", { className: "text-center max-w-2xl mx-auto", children: [
            _jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-slate-900", children: "Polling made easy" }),
            _jsx("p", { className: "mt-3 text-slate-600", children: "Simple polls with powerful configuration" }),
            _jsx("p", { className: "mt-3 text-slate-500 text-sm", children: "While we make our polls as simple and beautiful as possible, we also offer powerful customization options to enable on-demand adjustments for many different purposes." }


            )] }
          ),
          _jsx("div", { className: "mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6", children:
            features.map((f) => {
              const Icon = iconMap[f.icon];
              return (
                _jsxs("div", { className: "group p-7 bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300", children: [
                  _jsx("div", { className: "w-12 h-12 rounded-xl bg-indigo-50 group-hover:bg-indigo-600 flex items-center justify-center transition-colors", children:
                    _jsx(Icon, { className: "w-6 h-6 text-indigo-600 group-hover:text-white transition-colors" }) }
                  ),
                  _jsx("h3", { className: "mt-5 text-lg font-bold text-slate-900", children: f.title }),
                  _jsx("p", { className: "mt-2 text-sm text-slate-600 leading-relaxed", children: f.description })] }, f.title
                ));

            }) }
          )] }
        ) }
      ),


      _jsxs("section", { className: "max-w-7xl mx-auto px-5 lg:px-8 py-20", children: [
        _jsxs("div", { className: "text-center mb-14", children: [
          _jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-slate-900", children: "Loved by teams & creators" }),
          _jsx("p", { className: "mt-3 text-slate-600", children: "See what our users say about StrawPoll." })] }
        ),
        _jsx("div", { className: "grid md:grid-cols-3 gap-6", children:
          testimonials.map((t) =>
          _jsxs("div", { className: "p-7 bg-white rounded-2xl border border-slate-200 hover:shadow-lg transition-shadow", children: [
            _jsxs("div", { className: "flex items-center gap-3", children: [
              _jsx("div", { className: "w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold", children:
                t.avatar }
              ),
              _jsxs("div", { children: [
                _jsx("div", { className: "font-semibold text-slate-900", children: t.name }),
                _jsx("div", { className: "text-xs text-slate-500", children: t.role })] }
              )] }
            ),
            _jsxs("p", { className: "mt-5 text-slate-700 leading-relaxed", children: ["\u201C", t.quote, "\u201D"] })] }, t.name
          )
          ) }
        )] }
      ),


      _jsx("section", { className: "max-w-7xl mx-auto px-5 lg:px-8 pb-20", children:
        _jsxs("div", { className: "relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-600 p-12 md:p-16 text-center shadow-xl", children: [
          _jsx("h2", { className: "text-3xl md:text-5xl font-extrabold text-white", children: "Ready to get started?" }),
          _jsx("p", { className: "mt-3 text-xl text-indigo-100 font-semibold", children: "It's free!" }),
          _jsxs("div", { className: "mt-8 flex flex-wrap gap-3 justify-center", children: [
            _jsx(Link, { to: "/create", children:
              _jsx(Button, { className: "bg-white text-indigo-700 hover:bg-slate-100 rounded-lg px-7 py-6 h-auto font-bold text-base", children: "Create a poll" }

              ) }
            ),
            _jsx(Link, { to: "/signup", children:
              _jsx(Button, { className: "bg-indigo-800 hover:bg-indigo-900 text-white rounded-lg px-7 py-6 h-auto font-bold text-base border border-indigo-400", children: "Sign up" }

              ) }
            )] }
          )] }
        ) }
      )] }
    ));

}

function PollMockup() {
  const options = [
  { label: 'Pepperoni', pct: 38, votes: 1823 },
  { label: 'Pineapple', pct: 19, votes: 934 },
  { label: 'Margherita', pct: 18, votes: 852 },
  { label: 'Mushroom', pct: 15, votes: 712 }];

  return (
    _jsxs("div", { className: "relative", children: [
      _jsx("div", { className: "absolute -inset-4 bg-gradient-to-br from-indigo-200 to-pink-200 rounded-3xl blur-2xl opacity-60" }),
      _jsxs("div", { className: "relative bg-white rounded-2xl shadow-2xl border border-slate-200 p-6", children: [
        _jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
          _jsx("div", { className: "w-2 h-2 rounded-full bg-red-400" }),
          _jsx("div", { className: "w-2 h-2 rounded-full bg-yellow-400" }),
          _jsx("div", { className: "w-2 h-2 rounded-full bg-green-400" })] }
        ),
        _jsx("h3", { className: "text-lg font-bold text-slate-900", children: "What is the best pizza topping?" }),
        _jsx("p", { className: "text-xs text-slate-500 mt-1", children: "4,821 total votes" }),
        _jsx("div", { className: "mt-5 space-y-3", children:
          options.map((o, i) =>
          _jsxs("div", { children: [
            _jsxs("div", { className: "flex items-center justify-between text-sm mb-1", children: [
              _jsx("span", { className: `font-medium ${i === 0 ? 'text-indigo-600' : 'text-slate-700'}`, children: o.label }),
              _jsxs("span", { className: "text-slate-500", children: [o.pct, "%"] })] }
            ),
            _jsx("div", { className: "h-2.5 bg-slate-100 rounded-full overflow-hidden", children:
              _jsx("div", {
                className: "h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500",
                style: { width: `${o.pct}%` } }
              ) }
            )] }, o.label
          )
          ) }
        )] }
      )] }
    ));

}

function MeetingsMockup() {
  const slots = [
  { day: 'Mon', time: '10:00', count: 8, ok: true },
  { day: 'Tue', time: '14:00', count: 12, ok: true },
  { day: 'Wed', time: '11:00', count: 10, ok: true },
  { day: 'Thu', time: '15:00', count: 7, ok: false },
  { day: 'Fri', time: '09:00', count: 5, ok: false }];

  return (
    _jsxs("div", { className: "relative", children: [
      _jsx("div", { className: "absolute -inset-4 bg-gradient-to-br from-pink-200 to-indigo-200 rounded-3xl blur-2xl opacity-60" }),
      _jsxs("div", { className: "relative bg-white rounded-2xl shadow-2xl border border-slate-200 p-6", children: [
        _jsx("h3", { className: "text-lg font-bold text-slate-900", children: "Team meeting \u2013 Week of July 15" }),
        _jsx("p", { className: "text-xs text-slate-500 mt-1", children: "Select all times that work for you" }),
        _jsx("div", { className: "mt-5 space-y-2", children:
          slots.map((s) =>
          _jsxs("div", { className: `flex items-center justify-between p-3 rounded-lg border ${s.ok ? 'border-indigo-200 bg-indigo-50' : 'border-slate-200'}`, children: [
            _jsxs("div", { className: "flex items-center gap-3", children: [
              _jsx("div", { className: `w-5 h-5 rounded-md flex items-center justify-center ${s.ok ? 'bg-indigo-600' : 'border-2 border-slate-300'}`, children:
                s.ok && _jsx(Check, { className: "w-3.5 h-3.5 text-white" }) }
              ),
              _jsxs("span", { className: "font-medium text-slate-800", children: [s.day, ", ", s.time] })] }
            ),
            _jsxs("span", { className: "text-xs text-slate-500", children: [s.count, " votes"] })] }, s.day
          )
          ) }
        )] }
      )] }
    ));

}