import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Check, Sparkles, Crown, Lock, Image, GripVertical, CalendarClock,
  Star, Loader2, ArrowRight
} from 'lucide-react';
import { getAuth, isPremiumUser, upgradeToPremium } from '../mock/mock';
import { useToast } from '../hooks/use-toast';

const FREE_FEATURES = [
  'Unlimited standard polls',
  'Up to 30 options per poll',
  'Real-time results',
  'Share with anyone',
  'Basic customization',
];

const PREMIUM_FEATURES = [
  { icon: Image,        text: 'Image Polls — options with pictures' },
  { icon: GripVertical, text: 'Ranking Polls — drag to rank' },
  { icon: CalendarClock, text: 'Schedule Meeting — find best time' },
  { icon: Star,         text: 'No ads, priority support' },
  { icon: Check,        text: 'Everything in Free' },
];

export default function PricingPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const user = getAuth();
  const premium = isPremiumUser();
  const [upgrading, setUpgrading] = useState(false);

  const handleUpgrade = async () => {
    if (!user) { navigate('/signup'); return; }
    setUpgrading(true);
    try {
      await upgradeToPremium();
      toast({ title: '🎉 Welcome to Premium!', description: 'You now have access to all premium poll types.' });
      // Force reload so navbar/auth state updates
      window.location.href = '/create';
    } catch (err) {
      toast({ title: 'Upgrade failed', description: err.message, variant: 'destructive' });
    } finally {
      setUpgrading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-5 lg:px-8 py-16 text-center">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" /> Simple pricing
        </span>
        <h1 className="mt-5 text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight">
          One plan. <span className="text-indigo-600">All features.</span>
        </h1>
        <p className="mt-5 text-lg text-slate-600 max-w-2xl mx-auto">
          Start for free. Upgrade to Premium for advanced poll types and a better experience.
        </p>
      </section>

      {/* Plans */}
      <section className="max-w-5xl mx-auto px-5 lg:px-8 pb-24">
        <div className="grid md:grid-cols-2 gap-8 items-start">

          {/* Free Plan */}
          <div className="rounded-2xl border-2 border-slate-200 p-8 bg-white hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold text-slate-900">Free</h3>
            <p className="mt-1 text-sm text-slate-500">For everyone who wants to create simple polls</p>
            <div className="mt-6 flex items-baseline gap-1">
              <span className="text-5xl font-extrabold text-slate-900">$0</span>
              <span className="text-sm text-slate-500">/forever</span>
            </div>
            <ul className="mt-7 space-y-3">
              {FREE_FEATURES.map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-slate-700">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => navigate('/create')}
              className="mt-8 w-full h-12 border-2 border-slate-200 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Create a poll →
            </button>
          </div>

          {/* Premium Plan */}
          <div className="relative rounded-2xl border-2 border-indigo-500 p-8 bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 text-white shadow-2xl">
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-amber-400 text-amber-950 text-xs font-extrabold tracking-wide uppercase">
              ✨ Most Popular
            </span>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold">Premium</h3>
              <Crown className="w-5 h-5 text-yellow-300" />
            </div>
            <p className="mt-1 text-sm text-purple-200">Unlock advanced poll types</p>
            <div className="mt-6 flex items-baseline gap-1">
              <span className="text-5xl font-extrabold">$9</span>
              <span className="text-sm text-purple-200">/month</span>
            </div>

            <ul className="mt-7 space-y-3">
              {PREMIUM_FEATURES.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-sm text-purple-50">
                  <div className="w-7 h-7 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                    <Icon className="w-3.5 h-3.5 text-white" />
                  </div>
                  {text}
                </li>
              ))}
            </ul>

            {/* CTA */}
            {premium ? (
              <div className="mt-8 w-full h-12 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center gap-2 text-white font-semibold">
                <Check className="w-5 h-5 text-emerald-300" /> You're on Premium!
              </div>
            ) : !user ? (
              <div className="mt-8 space-y-3">
                <button
                  onClick={() => navigate('/signup')}
                  className="w-full h-12 rounded-xl bg-white text-indigo-700 hover:bg-slate-100 font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                >
                  <Lock className="w-4 h-4" /> Sign up to upgrade
                </button>
                <p className="text-center text-xs text-purple-300">You need an account to subscribe</p>
              </div>
            ) : (
              <button
                onClick={handleUpgrade}
                disabled={upgrading}
                className="mt-8 w-full h-12 rounded-xl bg-white text-indigo-700 hover:bg-slate-100 disabled:opacity-60 font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg"
              >
                {upgrading
                  ? <><Loader2 className="w-4 h-4 animate-spin" /> Processing…</>
                  : <><Crown className="w-4 h-4 text-amber-500" /> Buy Premium — $9/month <ArrowRight className="w-4 h-4" /></>
                }
              </button>
            )}
          </div>
        </div>

        {/* Auth banner */}
        {!user && (
          <div className="mt-10 rounded-2xl bg-amber-50 border border-amber-200 p-5 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <Lock className="w-8 h-8 text-amber-500 shrink-0" />
            <div className="flex-1">
              <p className="font-semibold text-amber-800">Create a free account to unlock Premium</p>
              <p className="text-sm text-amber-600 mt-0.5">Sign up takes only 30 seconds — no credit card required for the free plan.</p>
            </div>
            <button onClick={() => navigate('/signup')} className="shrink-0 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition-colors">
              Sign up free
            </button>
          </div>
        )}

        {user && premium && (
          <div className="mt-10 rounded-2xl bg-emerald-50 border border-emerald-200 p-5 flex items-center gap-4">
            <Crown className="w-8 h-8 text-emerald-500 shrink-0" />
            <div>
              <p className="font-semibold text-emerald-800">You're a Premium member 🎉</p>
              <p className="text-sm text-emerald-600 mt-0.5">All poll types are unlocked. Head to Create Poll to get started!</p>
            </div>
            <button onClick={() => navigate('/create')} className="ml-auto shrink-0 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-colors">
              Create poll
            </button>
          </div>
        )}

        <div className="mt-12 text-center text-sm text-slate-400">
          30-day money-back guarantee · Cancel anytime ·{' '}
          <a href="#" className="text-indigo-600 hover:underline">Need enterprise?</a>
        </div>
      </section>
    </div>
  );
}
