import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Plus, BarChart3, Users, Eye, Trash2, Search, Clock,
  Loader2, CalendarClock, Crown, Lock, ArrowRight } from
'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';
import { getAuth, getStoredPolls, deletePoll as apiDeletePoll, isPremiumUser } from '../mock/mock';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [polls, setPolls] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const premium = isPremiumUser();

  useEffect(() => {
    const fetchPolls = async () => {
      const u = getAuth();
      if (!u) {navigate('/login');return;}
      setUser(u);
      try {
        const own = await getStoredPolls();
        setPolls(Array.isArray(own) ? own : []);
      } catch (err) {
        console.error('Failed to load polls:', err);
        setPolls([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPolls();
  }, [navigate]);

  if (loading) {
    return (
      _jsx("div", { className: "min-h-screen bg-slate-50 flex items-center justify-center", children:
        _jsxs("div", { className: "flex flex-col items-center gap-3 text-slate-400", children: [
          _jsx(Loader2, { className: "w-8 h-8 animate-spin text-indigo-500" }),
          _jsx("p", { className: "text-sm font-medium", children: "Loading your dashboard\u2026" })] }
        ) }
      ));

  }

  if (!user) return null;

  const filtered = polls.filter((p) =>
  p.title?.toLowerCase().includes(query.toLowerCase())
  );
  const totalVotes = polls.reduce((a, p) => a + (p.totalVotes || 0), 0);

  const deletePoll = async (id) => {
    setPolls((prev) => prev.filter((p) => (p._id || p.id) !== id));
    try {
      await apiDeletePoll(id);
    } catch (err) {
      console.error('Delete failed:', err);
      const refreshed = await getStoredPolls();
      setPolls(Array.isArray(refreshed) ? refreshed : []);
    }
  };

  return (
    _jsx("div", { className: "bg-slate-50 min-h-screen py-10", children:
      _jsxs("div", { className: "max-w-6xl mx-auto px-5 lg:px-8", children: [


        _jsxs("div", { className: "flex flex-wrap items-center justify-between gap-4 mb-8", children: [
          _jsxs("div", { children: [
            _jsxs("h1", { className: "text-3xl font-extrabold text-slate-900", children: ["Welcome back, ",
              user.name, " \uD83D\uDC4B"] }
            ),
            _jsx("p", { className: "mt-1 text-slate-500", children: "Manage your polls and view results." })] }
          ),
          _jsx(Link, { to: "/create", children:
            _jsxs(Button, { className: "bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold shadow-sm", children: [
              _jsx(Plus, { className: "w-4 h-4 mr-1.5" }), " New Poll"] }
            ) }
          )] }
        ),


        _jsxs("div", { className: "grid sm:grid-cols-3 gap-4 mb-8", children: [
          _jsx(StatCard, { icon: BarChart3, label: "Total Polls", value: polls.length, color: "indigo" }),
          _jsx(StatCard, { icon: Users, label: "Total Votes", value: totalVotes.toLocaleString(), color: "pink" }),
          _jsx(StatCard, { icon: Eye, label: "Est. Views", value: (totalVotes * 3).toLocaleString(), color: "emerald" })] }
        ),


        _jsxs("div", { className: "grid sm:grid-cols-2 gap-4 mb-8", children: [

          _jsx(Link, { to: "/create", className: "group", children:
            _jsxs("div", { className: "flex items-center gap-4 p-5 rounded-2xl border-2 border-indigo-100 bg-indigo-50 hover:border-indigo-300 hover:bg-indigo-100 transition-all cursor-pointer", children: [
              _jsx("div", { className: "w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform", children:
                _jsx(Plus, { className: "w-6 h-6 text-white" }) }
              ),
              _jsxs("div", { className: "flex-1 min-w-0", children: [
                _jsx("p", { className: "font-bold text-slate-900", children: "Create a Poll" }),
                _jsx("p", { className: "text-sm text-slate-500", children: "Standard, image or ranking poll" })] }
              ),
              _jsx(ArrowRight, { className: "w-4 h-4 text-indigo-400 group-hover:translate-x-1 transition-transform" })] }
            ) }
          ),


          premium ?
          _jsx(Link, { to: "/create?type=meeting", className: "group", children:
            _jsxs("div", { className: "flex items-center gap-4 p-5 rounded-2xl border-2 border-amber-100 bg-amber-50 hover:border-amber-300 hover:bg-amber-100 transition-all cursor-pointer", children: [
              _jsx("div", { className: "w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform", children:
                _jsx(CalendarClock, { className: "w-6 h-6 text-white" }) }
              ),
              _jsxs("div", { className: "flex-1 min-w-0", children: [
                _jsxs("div", { className: "flex items-center gap-2", children: [
                  _jsx("p", { className: "font-bold text-slate-900", children: "Schedule Meeting" }),
                  _jsxs("span", { className: "inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-amber-200 text-amber-800 text-[10px] font-bold", children: [
                    _jsx(Crown, { className: "w-2.5 h-2.5" }), " Premium"] }
                  )] }
                ),
                _jsx("p", { className: "text-sm text-slate-500", children: "Find the best time for your group" })] }
              ),
              _jsx(ArrowRight, { className: "w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" })] }
            ) }
          ) :

          _jsxs("div", {
            onClick: () => navigate('/pricing'),
            className: "group flex items-center gap-4 p-5 rounded-2xl border-2 border-slate-200 bg-white hover:border-slate-300 hover:shadow-md transition-all cursor-pointer", children: [

            _jsxs("div", { className: "w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 relative group-hover:scale-105 transition-transform", children: [
              _jsx(CalendarClock, { className: "w-6 h-6 text-slate-400" }),
              _jsx("span", { className: "absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center", children:
                _jsx(Lock, { className: "w-2.5 h-2.5 text-amber-900" }) }
              )] }
            ),
            _jsxs("div", { className: "flex-1 min-w-0", children: [
              _jsxs("div", { className: "flex items-center gap-2", children: [
                _jsx("p", { className: "font-bold text-slate-500", children: "Schedule Meeting" }),
                _jsxs("span", { className: "inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold", children: [
                  _jsx(Crown, { className: "w-2.5 h-2.5" }), " Premium"] }
                )] }
              ),
              _jsx("p", { className: "text-sm text-slate-400", children: "Upgrade to unlock this feature" })] }
            ),
            _jsx("span", { className: "text-xs font-semibold text-indigo-600 group-hover:underline whitespace-nowrap", children: "Upgrade \u2192" }

            )] }
          )] }

        ),


        _jsxs("div", { className: "mb-5 relative max-w-md", children: [
          _jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" }),
          _jsx(Input, {
            placeholder: "Search your polls...",
            value: query,
            onChange: (e) => setQuery(e.target.value),
            className: "pl-10 h-11 bg-white" }
          )] }
        ),


        _jsx(Card, { className: "border-slate-200", children:
          _jsxs("div", { className: "divide-y divide-slate-100", children: [
            filtered.length === 0 &&
            _jsxs("div", { className: "p-10 text-center", children: [
              _jsx(BarChart3, { className: "w-12 h-12 text-slate-300 mx-auto" }),
              _jsx("p", { className: "mt-3 text-slate-500 font-medium", children: "No polls yet!" }),
              _jsx("p", { className: "text-sm text-slate-400 mt-1", children: "Create your first poll and share it with the world." }),
              _jsx(Link, { to: "/create", children:
                _jsx(Button, { className: "mt-4 bg-indigo-600 hover:bg-indigo-700", children: "Create a poll" }) }
              )] }
            ),

            filtered.map((p) => {
              const pollId = p._id || p.id;
              const createdDate = p.createdAt ?
              new Date(p.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) :
              '—';
              return (
                _jsxs("div", {

                  className: "p-5 flex flex-wrap items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors", children: [

                  _jsxs("div", { className: "min-w-0 flex-1", children: [
                    _jsx(Link, {
                      to: `/polls/${pollId}`,
                      className: "font-semibold text-slate-900 hover:text-indigo-600 block truncate transition-colors", children:

                      p.title }
                    ),
                    _jsxs("div", { className: "mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-500", children: [
                      _jsxs("span", { className: "inline-flex items-center gap-1", children: [
                        _jsx(Users, { className: "w-3 h-3" }), " ", p.totalVotes ?? 0, " votes"] }
                      ),
                      _jsxs("span", { className: "inline-flex items-center gap-1", children: [
                        _jsx(Clock, { className: "w-3 h-3" }), " ", createdDate] }
                      ),
                      _jsxs("span", { children: [p.options?.length ?? 0, " options"] }),
                      p.pollType && p.pollType !== 'basic' &&
                      _jsx("span", { className: "px-1.5 py-0.5 rounded-full bg-violet-50 text-violet-600 font-medium capitalize", children:
                        p.pollType }
                      )] }

                    )] }
                  ),
                  _jsxs("div", { className: "flex items-center gap-2", children: [
                    _jsx(Link, { to: `/polls/${pollId}`, children:
                      _jsx(Button, { variant: "outline", size: "sm", children: "View" }) }
                    ),
                    _jsx("button", {
                      onClick: () => deletePoll(pollId),
                      className: "p-2 text-slate-400 hover:text-red-500 transition-colors rounded-md hover:bg-red-50", children:

                      _jsx(Trash2, { className: "w-4 h-4" }) }
                    )] }
                  )] }, pollId
                ));

            })] }
          ) }
        )] }
      ) }
    ));

}

function StatCard({ icon: Icon, label, value, color }) {
  const colors = {
    indigo: 'bg-indigo-50 text-indigo-600',
    pink: 'bg-pink-50 text-pink-600',
    emerald: 'bg-emerald-50 text-emerald-600'
  };
  return (
    _jsxs(Card, { className: "p-6 border-slate-200 flex items-center gap-4 hover:shadow-md transition-shadow", children: [
      _jsx("div", { className: `w-12 h-12 rounded-xl ${colors[color]} flex items-center justify-center`, children:
        _jsx(Icon, { className: "w-6 h-6" }) }
      ),
      _jsxs("div", { children: [
        _jsx("div", { className: "text-sm text-slate-500 font-medium", children: label }),
        _jsx("div", { className: "text-2xl font-extrabold text-slate-900", children: value })] }
      )] }
    ));

}