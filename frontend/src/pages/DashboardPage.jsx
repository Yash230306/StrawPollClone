import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, BarChart3, Users, Eye, Trash2, Search, Clock, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';
import { getAuth, getStoredPolls, deletePoll as apiDeletePoll } from '../mock/mock';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [polls, setPolls] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true); // ← start as loading

  useEffect(() => {
    const fetchPolls = async () => {
      const u = getAuth();
      if (!u) {
        navigate('/login');
        return;
      }
      setUser(u);
      try {
        const own = await getStoredPolls();
        setPolls(Array.isArray(own) ? own : []);
      } catch (err) {
        console.error('Failed to load polls:', err);
        setPolls([]);
      } finally {
        setLoading(false); // ← done loading
      }
    };
    fetchPolls();
  }, [navigate]);

  // Show spinner while checking auth / loading polls
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
          <p className="text-sm font-medium">Loading your dashboard…</p>
        </div>
      </div>
    );
  }

  // If after loading there's still no user, render nothing (navigate handles it)
  if (!user) return null;

  const filtered = polls.filter((p) =>
    p.title?.toLowerCase().includes(query.toLowerCase())
  );
  const totalVotes = polls.reduce((a, p) => a + (p.totalVotes || 0), 0);

  const deletePoll = async (id) => {
    // Optimistically remove from UI immediately
    setPolls(prev => prev.filter((p) => (p._id || p.id) !== id));
    try {
      await apiDeletePoll(id);
    } catch (err) {
      console.error('Delete failed:', err);
      // If it fails, reload the real list
      const refreshed = await getStoredPolls();
      setPolls(Array.isArray(refreshed) ? refreshed : []);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-5 lg:px-8">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">
              Welcome back, {user.name} 👋
            </h1>
            <p className="mt-1 text-slate-500">Manage your polls and view results.</p>
          </div>
          <Link to="/create">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold shadow-sm">
              <Plus className="w-4 h-4 mr-1.5" /> New Poll
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <StatCard icon={BarChart3} label="Total Polls" value={polls.length} color="indigo" />
          <StatCard icon={Users} label="Total Votes" value={totalVotes.toLocaleString()} color="pink" />
          <StatCard icon={Eye} label="Est. Views" value={(totalVotes * 3).toLocaleString()} color="emerald" />
        </div>

        {/* Search */}
        <div className="mb-5 relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search your polls..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 h-11 bg-white"
          />
        </div>

        {/* Polls list */}
        <Card className="border-slate-200">
          <div className="divide-y divide-slate-100">
            {filtered.length === 0 && (
              <div className="p-10 text-center">
                <BarChart3 className="w-12 h-12 text-slate-300 mx-auto" />
                <p className="mt-3 text-slate-500 font-medium">No polls yet!</p>
                <p className="text-sm text-slate-400 mt-1">Create your first poll and share it with the world.</p>
                <Link to="/create">
                  <Button className="mt-4 bg-indigo-600 hover:bg-indigo-700">Create a poll</Button>
                </Link>
              </div>
            )}
            {filtered.map((p) => {
              const pollId = p._id || p.id;
              const createdDate = p.createdAt
                ? new Date(p.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                : '—';
              return (
                <div
                  key={pollId}
                  className="p-5 flex flex-wrap items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <Link
                      to={`/polls/${pollId}`}
                      className="font-semibold text-slate-900 hover:text-indigo-600 block truncate transition-colors"
                    >
                      {p.title}
                    </Link>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                      <span className="inline-flex items-center gap-1">
                        <Users className="w-3 h-3" /> {p.totalVotes ?? 0} votes
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {createdDate}
                      </span>
                      <span>{p.options?.length ?? 0} options</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link to={`/polls/${pollId}`}>
                      <Button variant="outline" size="sm">View</Button>
                    </Link>
                    <button
                      onClick={() => deletePoll(pollId)}
                      className="p-2 text-slate-400 hover:text-red-500 transition-colors rounded-md hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }) {
  const colors = {
    indigo: 'bg-indigo-50 text-indigo-600',
    pink: 'bg-pink-50 text-pink-600',
    emerald: 'bg-emerald-50 text-emerald-600',
  };
  return (
    <Card className="p-6 border-slate-200 flex items-center gap-4 hover:shadow-md transition-shadow">
      <div className={`w-12 h-12 rounded-xl ${colors[color]} flex items-center justify-center`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <div className="text-sm text-slate-500 font-medium">{label}</div>
        <div className="text-2xl font-extrabold text-slate-900">{value}</div>
      </div>
    </Card>
  );
}
