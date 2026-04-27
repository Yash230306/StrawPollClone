import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Share2, Copy, Check, BarChart3, PieChart as PieChartIcon, Users, Clock, ArrowLeft, Flag, AlertCircle, Image } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { findPoll, recordVote, getUserVote } from '../mock/mock';
import { useToast } from '../hooks/use-toast';import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";

export default function PollViewPage() {
  const { id } = useParams();
  const { toast } = useToast();
  const [poll, setPoll] = useState(null);
  const [selected, setSelected] = useState([]);
  const [voterName, setVoterName] = useState('');
  const [hasVoted, setHasVoted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [chartType, setChartType] = useState('bar');
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const fetchPollData = async () => {
      const p = await findPoll(id);
      setPoll(p);
      const prev = getUserVote(id);
      if (prev) {setSelected(prev);setHasVoted(true);}
    };
    fetchPollData();
  }, [id, tick]);

  const totalVotes = useMemo(() => poll?.options.reduce((a, o) => a + o.votes, 0) || 0, [poll, tick]);
  const sortedOptions = useMemo(() => poll ? [...poll.options].sort((a, b) => b.votes - a.votes) : [], [poll, tick]);
  const maxVotes = sortedOptions[0]?.votes || 1;

  if (!poll) {
    return (
      _jsx("div", { className: "min-h-[60vh] flex items-center justify-center px-5", children:
        _jsxs("div", { className: "text-center", children: [
          _jsx(AlertCircle, { className: "w-12 h-12 text-slate-300 mx-auto" }),
          _jsx("h2", { className: "mt-4 text-2xl font-bold text-slate-900", children: "Poll not found" }),
          _jsx("p", { className: "mt-2 text-slate-500", children: "This poll doesn't exist or has been removed." }),
          _jsx(Link, { to: "/", children: _jsx(Button, { className: "mt-6 bg-indigo-600 hover:bg-indigo-700", children: "Back home" }) })] }
        ) }
      ));

  }

  const toggleSelect = (oid) => {
    if (hasVoted) return;
    if (poll.pollType === 'ranking') {
      setSelected(selected.includes(oid) ? selected.filter((x) => x !== oid) : [...selected, oid]);
    } else if (poll.multiple) {
      setSelected(selected.includes(oid) ? selected.filter((x) => x !== oid) : [...selected, oid]);
    } else {
      setSelected([oid]);
    }
  };

  const submitVote = async () => {
    if (poll.requireName && !voterName.trim()) {
      toast({ title: 'Name required', description: 'Please enter your name to cast your vote.', variant: 'destructive' });
      return;
    }
    if (selected.length === 0) {
      toast({ title: 'Select an option', variant: 'destructive' });
      return;
    }
    const pollId = poll._id || poll.id;
    const formattedSelection = selected.map((oid) => {
      const option = poll.options.find((o) => o.id === oid || o._id === oid);
      return option?._id || option?.id || oid;
    });
    try {
      await recordVote(pollId, formattedSelection, voterName.trim() || undefined);
      setHasVoted(true);
      setTick((t) => t + 1);
      toast({ title: '✅ Vote recorded!', description: 'Thank you for voting.' });
    } catch (err) {
      if (err.message?.includes('already voted')) {

        setHasVoted(true);
        setTick((t) => t + 1);
        toast({ title: 'Already voted', description: 'You have already voted on this poll.', variant: 'destructive' });
      } else {
        toast({ title: 'Error', description: 'Could not record your vote. Try again.', variant: 'destructive' });
      }
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const pct = (v) => totalVotes ? Math.round(v / totalVotes * 100) : 0;
  const colors = ['#6366f1', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ef4444', '#14b8a6'];

  return (
    _jsx("div", { className: "bg-slate-50 min-h-screen py-10", children:
      _jsxs("div", { className: "max-w-4xl mx-auto px-5 lg:px-8", children: [
        _jsxs(Link, { to: "/", className: "inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 mb-5", children: [
          _jsx(ArrowLeft, { className: "w-4 h-4" }), " Back"] }
        ),

        _jsxs(Card, { className: "p-8 border-slate-200 shadow-sm", children: [
          _jsxs("div", { className: "flex items-start justify-between gap-4", children: [
            _jsxs("div", { children: [
              _jsx("h1", { className: "text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight", children: poll.title }),
              poll.description && _jsx("p", { className: "mt-3 text-slate-600", children: poll.description }),
              _jsxs("div", { className: "mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-500", children: [
                _jsxs("span", { className: "inline-flex items-center gap-1", children: [_jsx(Users, { className: "w-3.5 h-3.5" }), " ", totalVotes.toLocaleString(), poll.pollType === 'ranking' ? " points" : " votes"] }),
                _jsxs("span", { className: "inline-flex items-center gap-1", children: [_jsx(Clock, { className: "w-3.5 h-3.5" }), " ", poll.createdAt] }),
                _jsxs("span", { children: ["by ", _jsx("span", { className: "font-semibold text-slate-700", children: poll.author })] }),
                poll.multiple && _jsx("span", { className: "px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 font-medium", children: "Multiple choice" })] }
              )] }
            ),
            _jsx(Button, { onClick: copyLink, variant: "outline", size: "sm", className: "shrink-0", children:
              copied ? _jsxs(_Fragment, { children: [_jsx(Check, { className: "w-4 h-4 mr-1 text-green-600" }), "Copied"] }) : _jsxs(_Fragment, { children: [_jsx(Share2, { className: "w-4 h-4 mr-1" }), "Share"] }) }
            )] }
          ),

          poll.requireName && !hasVoted &&
          _jsx("div", { className: "mt-6", children:
            _jsx(Input, { placeholder: "Your name", value: voterName, onChange: (e) => setVoterName(e.target.value), className: "h-11" }) }
          ),


          _jsx("div", { className: `mt-8 ${poll.pollType === 'image' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-3'}`, children:
            (hasVoted ? sortedOptions : poll.options).map((o, i) => {
              const optId = o._id || o.id;
              const isSelected = selected.includes(optId);
              const rankIndex = selected.indexOf(optId) + 1;
              const percent = pct(o.votes);

              if (poll.pollType === 'image') {
                return (
                  _jsxs("button", {
                    type: "button",

                    onClick: () => toggleSelect(optId),
                    disabled: hasVoted,
                    className: `relative w-full flex flex-col rounded-2xl border-2 overflow-hidden text-left transition-all ${
                    isSelected ? 'border-indigo-500 ring-2 ring-indigo-500/20' : 'border-slate-200 bg-white hover:border-indigo-300'} ${
                    hasVoted ? 'cursor-default' : ''}`, children: [

                    o.imageUrl ?
                    _jsx("div", { className: "w-full h-40 bg-slate-100 shrink-0", children:
                      _jsx("img", { src: o.imageUrl, alt: "", className: "w-full h-full object-cover", onError: (e) => e.target.style.display = 'none' }) }
                    ) :

                    _jsx("div", { className: "w-full h-40 bg-slate-100 shrink-0 flex items-center justify-center text-slate-300", children:
                      _jsx(Image, { className: "w-8 h-8 opacity-50" }) }
                    ),

                    _jsxs("div", { className: "p-4 w-full flex flex-col gap-2 bg-white", children: [
                      _jsxs("div", { className: "flex items-center gap-3", children: [
                        !hasVoted &&
                        _jsx("div", { className: `w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          isSelected ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300'}`, children:

                          isSelected && _jsx(Check, { className: "w-3.5 h-3.5 text-white" }) }
                        ),

                        _jsx("span", { className: "font-semibold text-slate-800 line-clamp-2 leading-tight", children: o.label })] }
                      ),
                      hasVoted &&
                      _jsxs("div", { className: "mt-2 w-full", children: [
                        _jsxs("div", { className: "flex items-center justify-between text-xs mb-1.5", children: [
                          _jsxs("span", { className: "text-slate-500 font-medium", children: [o.votes.toLocaleString(), poll.pollType === 'ranking' ? " points" : " votes"] }),
                          _jsxs("span", { className: "font-bold text-slate-900", children: [percent, "%"] })] }
                        ),
                        _jsx("div", { className: "h-2 bg-slate-100 rounded-full overflow-hidden", children:
                          _jsx("div", { className: "h-full bg-gradient-to-r from-indigo-400 to-indigo-500 rounded-full", style: { width: `${percent}%` } }) }
                        ),
                        o.voters && o.voters.length > 0 &&
                        _jsx("div", { className: "mt-3 flex flex-wrap gap-1", children:
                          o.voters.map((v, idx) =>
                          _jsx("span", { className: "inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600", children:
                            v }, idx
                          )
                          ) }
                        )] }

                      )] }

                    )] }, optId
                  ));

              }


              if (hasVoted) {
                return (
                  _jsxs("div", { className: "relative p-4 rounded-xl border border-slate-200 bg-white overflow-hidden", children: [
                    _jsx("div", {
                      className: "absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-100 to-indigo-50",
                      style: { width: `${percent}%`, transition: 'width 700ms ease-out' } }
                    ),
                    _jsxs("div", { className: "relative flex items-center justify-between gap-4", children: [
                      _jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                        isSelected && _jsx(Check, { className: "w-5 h-5 text-indigo-600 shrink-0" }),
                        _jsx("span", { className: `font-semibold truncate ${i === 0 ? 'text-indigo-700' : 'text-slate-800'}`, children: o.label })] }
                      ),
                      _jsxs("div", { className: "flex items-center gap-3 shrink-0", children: [
                        _jsxs("span", { className: "text-xs text-slate-500", children: [o.votes.toLocaleString(), poll.pollType === 'ranking' ? " points" : " votes"] }),
                        _jsxs("span", { className: "text-sm font-bold text-slate-900 w-12 text-right", children: [percent, "%"] })] }
                      )] }
                    ),
                    o.voters && o.voters.length > 0 &&
                    _jsx("div", { className: "relative mt-3 pt-3 border-t border-slate-100/50 flex flex-wrap gap-1.5", children:
                      o.voters.map((v, idx) =>
                      _jsx("span", { className: "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-white/60 border border-slate-200 text-slate-600", children:
                        v }, idx
                      )
                      ) }
                    )] }, optId

                  ));

              }

              return (
                _jsxs("button", {
                  type: "button",

                  onClick: () => toggleSelect(optId),
                  className: `w-full flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                  isSelected ?
                  'border-indigo-500 bg-indigo-50' :
                  'border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/30'}`, children: [


                  poll.pollType === 'ranking' ?
                  _jsx("div", { className: `w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 ${
                    isSelected ? 'border-indigo-600 bg-indigo-600 text-white font-bold text-xs' : 'border-slate-300 text-transparent'}`, children:

                    isSelected ? rankIndex : '' }
                  ) :

                  _jsx("div", { className: `w-5 h-5 ${poll.multiple ? 'rounded-md' : 'rounded-full'} border-2 flex items-center justify-center shrink-0 ${
                    isSelected ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300'}`, children:

                    isSelected && _jsx(Check, { className: "w-3.5 h-3.5 text-white" }) }
                  ),

                  _jsx("span", { className: "font-medium text-slate-800", children: o.label })] }, optId
                ));

            }) }
          ),

          !hasVoted ?
          _jsxs("div", { className: "mt-8 flex flex-wrap items-center justify-between gap-3", children: [
            _jsx(Button, {
              onClick: submitVote,
              className: "bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-8 py-6 h-auto font-bold text-base shadow-md", children:
              "Vote" }

            ),
            _jsxs("button", { 
              type: "button",
              onClick: () => toast({ title: 'Report Submitted', description: 'This poll will be sent for investigation.' }),
              className: "inline-flex items-center gap-1 text-xs text-slate-500 hover:text-red-500 transition-colors", children: [
              _jsx(Flag, { className: "w-3.5 h-3.5" }), " Report"] }
            )] }
          ) :

          _jsx("div", { className: "mt-8 p-4 rounded-xl bg-green-50 border border-green-200 text-sm text-green-700 font-medium", children: "Thanks for voting! Your voice has been counted." }

          )] }

        ),


        hasVoted &&
        _jsxs(Card, { className: "mt-6 p-8 border-slate-200 shadow-sm", children: [
          _jsxs("div", { className: "flex items-center justify-between mb-5", children: [
            _jsx("h3", { className: "font-bold text-slate-900", children: "Results visualization" }),
            _jsxs("div", { className: "flex items-center gap-1 p-1 bg-slate-100 rounded-lg", children: [
              _jsxs("button", { onClick: () => setChartType('bar'), className: `px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1 transition-colors ${chartType === 'bar' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600'}`, children: [
                _jsx(BarChart3, { className: "w-3.5 h-3.5" }), " Bar"] }
              ),
              _jsxs("button", { onClick: () => setChartType('pie'), className: `px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1 transition-colors ${chartType === 'pie' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600'}`, children: [
                _jsx(PieChartIcon, { className: "w-3.5 h-3.5" }), " Pie"] }
              )] }
            )] }
          ),
          chartType === 'bar' ?
          _jsx("div", { className: "space-y-4", children:
            sortedOptions.map((o, i) =>
            _jsxs("div", { children: [
              _jsxs("div", { className: "flex items-center justify-between text-sm mb-1.5", children: [
                _jsx("span", { className: "font-medium text-slate-800", children: o.label }),
                _jsxs("span", { className: "text-slate-500", children: [pct(o.votes), "% \xB7 ", o.votes] })] }
              ),
              _jsx("div", { className: "h-6 bg-slate-100 rounded-md overflow-hidden", children:
                _jsx("div", {
                  className: "h-full rounded-md transition-all duration-700",
                  style: { width: `${o.votes / maxVotes * 100}%`, backgroundColor: colors[i % colors.length] } }
                ) }
              )] }, o.id
            )
            ) }
          ) :

          _jsx(PieChart, { options: sortedOptions, colors: colors, total: totalVotes })] }

        )] }

      ) }
    ));

}

function PieChart({ options, colors, total }) {
  let cum = 0;
  const segments = options.map((o, i) => {
    const start = cum;
    const slice = total ? o.votes / total * 360 : 0;
    cum += slice;
    return { ...o, start, slice, color: colors[i % colors.length] };
  });
  const polar = (cx, cy, r, deg) => {
    const rad = (deg - 90) * Math.PI / 180;
    return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
  };
  const arc = (start, slice) => {
    if (slice >= 360) return 'M 100 100 m -80 0 a 80 80 0 1 0 160 0 a 80 80 0 1 0 -160 0';
    const [x1, y1] = polar(100, 100, 80, start);
    const [x2, y2] = polar(100, 100, 80, start + slice);
    const large = slice > 180 ? 1 : 0;
    return `M 100 100 L ${x1} ${y1} A 80 80 0 ${large} 1 ${x2} ${y2} Z`;
  };
  return (
    _jsxs("div", { className: "flex flex-col md:flex-row items-center gap-10", children: [
      _jsxs("svg", { viewBox: "0 0 200 200", className: "w-64 h-64", children: [
        segments.map((s) =>
        _jsx("path", { d: arc(s.start, s.slice), fill: s.color, className: "hover:opacity-80 transition-opacity" }, s.id)
        ),
        _jsx("circle", { cx: "100", cy: "100", r: "45", fill: "white" }),
        _jsx("text", { x: "100", y: "95", textAnchor: "middle", className: "text-xs fill-slate-500", children: "Total" }),
        _jsx("text", { x: "100", y: "112", textAnchor: "middle", className: "text-xl font-bold fill-slate-900", children: total })] }
      ),
      _jsx("div", { className: "flex-1 space-y-2 w-full", children:
        segments.map((s) =>
        _jsxs("div", { className: "flex items-center justify-between gap-4 text-sm", children: [
          _jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
            _jsx("span", { className: "w-3 h-3 rounded-sm shrink-0", style: { backgroundColor: s.color } }),
            _jsx("span", { className: "truncate text-slate-800", children: s.label })] }
          ),
          _jsxs("span", { className: "text-slate-500 shrink-0", children: [total ? Math.round(s.votes / total * 100) : 0, "%"] })] }, s.id
        )
        ) }
      )] }
    ));

}