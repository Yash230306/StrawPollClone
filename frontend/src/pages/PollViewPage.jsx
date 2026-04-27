import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Share2, Copy, Check, BarChart3, PieChart as PieChartIcon, Users, Clock, ArrowLeft, Flag, AlertCircle, Image } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { findPoll, recordVote, getUserVote } from '../mock/mock';
import { useToast } from '../hooks/use-toast';

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
      if (prev) { setSelected(prev); setHasVoted(true); }
    };
    fetchPollData();
  }, [id, tick]);

  const totalVotes = useMemo(() => poll?.options.reduce((a, o) => a + o.votes, 0) || 0, [poll, tick]);
  const sortedOptions = useMemo(() => poll ? [...poll.options].sort((a, b) => b.votes - a.votes) : [], [poll, tick]);
  const maxVotes = sortedOptions[0]?.votes || 1;

  if (!poll) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-5">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-slate-300 mx-auto" />
          <h2 className="mt-4 text-2xl font-bold text-slate-900">Poll not found</h2>
          <p className="mt-2 text-slate-500">This poll doesn't exist or has been removed.</p>
          <Link to="/"><Button className="mt-6 bg-indigo-600 hover:bg-indigo-700">Back home</Button></Link>
        </div>
      </div>
    );
  }

  const toggleSelect = (oid) => {
    if (hasVoted) return;
    if (poll.pollType === 'ranking') {
      setSelected(selected.includes(oid) ? selected.filter(x => x !== oid) : [...selected, oid]);
    } else if (poll.multiple) {
      setSelected(selected.includes(oid) ? selected.filter(x => x !== oid) : [...selected, oid]);
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
    const formattedSelection = selected.map(oid => {
      const option = poll.options.find(o => o.id === oid || o._id === oid);
      return option?._id || option?.id || oid;
    });
    try {
      await recordVote(pollId, formattedSelection, voterName.trim() || undefined);
      setHasVoted(true);
      setTick(t => t + 1);
      toast({ title: '✅ Vote recorded!', description: 'Thank you for voting.' });
    } catch (err) {
      if (err.message?.includes('already voted')) {
        // Mark as voted locally so the UI shows results
        setHasVoted(true);
        setTick(t => t + 1);
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

  const pct = (v) => totalVotes ? Math.round((v / totalVotes) * 100) : 0;
  const colors = ['#6366f1', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ef4444', '#14b8a6'];

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-5 lg:px-8">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 mb-5">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        <Card className="p-8 border-slate-200 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">{poll.title}</h1>
              {poll.description && <p className="mt-3 text-slate-600">{poll.description}</p>}
              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {totalVotes.toLocaleString()} votes</span>
                <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {poll.createdAt}</span>
                <span>by <span className="font-semibold text-slate-700">{poll.author}</span></span>
                {poll.multiple && <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 font-medium">Multiple choice</span>}
              </div>
            </div>
            <Button onClick={copyLink} variant="outline" size="sm" className="shrink-0">
              {copied ? <><Check className="w-4 h-4 mr-1 text-green-600" />Copied</> : <><Share2 className="w-4 h-4 mr-1" />Share</>}
            </Button>
          </div>

          {poll.requireName && !hasVoted && (
            <div className="mt-6">
              <Input placeholder="Your name" value={voterName} onChange={(e) => setVoterName(e.target.value)} className="h-11" />
            </div>
          )}

          <div className={`mt-8 ${poll.pollType === 'image' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-3'}`}>
            {(hasVoted ? sortedOptions : poll.options).map((o, i) => {
              const optId = o._id || o.id;
              const isSelected = selected.includes(optId);
              const rankIndex = selected.indexOf(optId) + 1;
              const percent = pct(o.votes);

              if (poll.pollType === 'image') {
                return (
                  <button
                    type="button"
                    key={optId}
                    onClick={() => toggleSelect(optId)}
                    disabled={hasVoted}
                    className={`relative w-full flex flex-col rounded-2xl border-2 overflow-hidden text-left transition-all ${
                      isSelected ? 'border-indigo-500 ring-2 ring-indigo-500/20' : 'border-slate-200 bg-white hover:border-indigo-300'
                    } ${hasVoted ? 'cursor-default' : ''}`}
                  >
                    {o.imageUrl ? (
                      <div className="w-full h-40 bg-slate-100 shrink-0">
                        <img src={o.imageUrl} alt="" className="w-full h-full object-cover" onError={e => e.target.style.display='none'} />
                      </div>
                    ) : (
                      <div className="w-full h-40 bg-slate-100 shrink-0 flex items-center justify-center text-slate-300">
                        <Image className="w-8 h-8 opacity-50" />
                      </div>
                    )}
                    <div className="p-4 w-full flex flex-col gap-2 bg-white">
                      <div className="flex items-center gap-3">
                        {!hasVoted && (
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                            isSelected ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300'
                          }`}>
                            {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                          </div>
                        )}
                        <span className="font-semibold text-slate-800 line-clamp-2 leading-tight">{o.label}</span>
                      </div>
                      {hasVoted && (
                        <div className="mt-2 w-full">
                          <div className="flex items-center justify-between text-xs mb-1.5">
                            <span className="text-slate-500 font-medium">{o.votes.toLocaleString()} votes</span>
                            <span className="font-bold text-slate-900">{percent}%</span>
                          </div>
                          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-indigo-400 to-indigo-500 rounded-full" style={{ width: `${percent}%` }} />
                          </div>
                          {o.voters && o.voters.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-1">
                              {o.voters.map((v, idx) => (
                                <span key={idx} className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600">
                                  {v}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </button>
                );
              }

              // Standard, Meeting or Ranking Poll UI
              if (hasVoted) {
                return (
                  <div key={optId} className="relative p-4 rounded-xl border border-slate-200 bg-white overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-100 to-indigo-50"
                      style={{ width: `${percent}%`, transition: 'width 700ms ease-out' }}
                    />
                    <div className="relative flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 min-w-0">
                        {isSelected && <Check className="w-5 h-5 text-indigo-600 shrink-0" />}
                        <span className={`font-semibold truncate ${i === 0 ? 'text-indigo-700' : 'text-slate-800'}`}>{o.label}</span>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-xs text-slate-500">{o.votes.toLocaleString()} votes</span>
                        <span className="text-sm font-bold text-slate-900 w-12 text-right">{percent}%</span>
                      </div>
                    </div>
                    {o.voters && o.voters.length > 0 && (
                      <div className="relative mt-3 pt-3 border-t border-slate-100/50 flex flex-wrap gap-1.5">
                        {o.voters.map((v, idx) => (
                          <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-white/60 border border-slate-200 text-slate-600">
                            {v}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  type="button"
                  key={optId}
                  onClick={() => toggleSelect(optId)}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/30'
                  }`}
                >
                  {poll.pollType === 'ranking' ? (
                    <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 ${
                      isSelected ? 'border-indigo-600 bg-indigo-600 text-white font-bold text-xs' : 'border-slate-300 text-transparent'
                    }`}>
                      {isSelected ? rankIndex : ''}
                    </div>
                  ) : (
                    <div className={`w-5 h-5 ${poll.multiple ? 'rounded-md' : 'rounded-full'} border-2 flex items-center justify-center shrink-0 ${
                      isSelected ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300'
                    }`}>
                      {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                    </div>
                  )}
                  <span className="font-medium text-slate-800">{o.label}</span>
                </button>
              );
            })}
          </div>

          {!hasVoted ? (
            <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
              <Button
                onClick={submitVote}
                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-8 py-6 h-auto font-bold text-base shadow-md"
              >
                Vote
              </Button>
              <button className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-red-500 transition-colors">
                <Flag className="w-3.5 h-3.5" /> Report
              </button>
            </div>
          ) : (
            <div className="mt-8 p-4 rounded-xl bg-green-50 border border-green-200 text-sm text-green-700 font-medium">
              Thanks for voting! Your voice has been counted.
            </div>
          )}
        </Card>

        {/* Charts */}
        {hasVoted && (
          <Card className="mt-6 p-8 border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-slate-900">Results visualization</h3>
              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
                <button onClick={() => setChartType('bar')} className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1 transition-colors ${chartType === 'bar' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600'}`}>
                  <BarChart3 className="w-3.5 h-3.5" /> Bar
                </button>
                <button onClick={() => setChartType('pie')} className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1 transition-colors ${chartType === 'pie' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600'}`}>
                  <PieChartIcon className="w-3.5 h-3.5" /> Pie
                </button>
              </div>
            </div>
            {chartType === 'bar' ? (
              <div className="space-y-4">
                {sortedOptions.map((o, i) => (
                  <div key={o.id}>
                    <div className="flex items-center justify-between text-sm mb-1.5">
                      <span className="font-medium text-slate-800">{o.label}</span>
                      <span className="text-slate-500">{pct(o.votes)}% · {o.votes}</span>
                    </div>
                    <div className="h-6 bg-slate-100 rounded-md overflow-hidden">
                      <div
                        className="h-full rounded-md transition-all duration-700"
                        style={{ width: `${(o.votes / maxVotes) * 100}%`, backgroundColor: colors[i % colors.length] }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <PieChart options={sortedOptions} colors={colors} total={totalVotes} />
            )}
          </Card>
        )}
      </div>
    </div>
  );
}

function PieChart({ options, colors, total }) {
  let cum = 0;
  const segments = options.map((o, i) => {
    const start = cum;
    const slice = total ? (o.votes / total) * 360 : 0;
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
    <div className="flex flex-col md:flex-row items-center gap-10">
      <svg viewBox="0 0 200 200" className="w-64 h-64">
        {segments.map((s) => (
          <path key={s.id} d={arc(s.start, s.slice)} fill={s.color} className="hover:opacity-80 transition-opacity" />
        ))}
        <circle cx="100" cy="100" r="45" fill="white" />
        <text x="100" y="95" textAnchor="middle" className="text-xs fill-slate-500">Total</text>
        <text x="100" y="112" textAnchor="middle" className="text-xl font-bold fill-slate-900">{total}</text>
      </svg>
      <div className="flex-1 space-y-2 w-full">
        {segments.map((s) => (
          <div key={s.id} className="flex items-center justify-between gap-4 text-sm">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-3 h-3 rounded-sm shrink-0" style={{ backgroundColor: s.color }} />
              <span className="truncate text-slate-800">{s.label}</span>
            </div>
            <span className="text-slate-500 shrink-0">{total ? Math.round((s.votes / total) * 100) : 0}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
