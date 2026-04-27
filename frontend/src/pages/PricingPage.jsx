import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Check, Sparkles, Crown, Lock, Image, GripVertical, CalendarClock,
  Star, Loader2, ArrowRight } from
'lucide-react';
import { getAuth, isPremiumUser, upgradeToPremium } from '../mock/mock';
import { useToast } from '../hooks/use-toast';import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";

const FREE_FEATURES = [
'Unlimited standard polls',
'Up to 30 options per poll',
'Real-time results',
'Share with anyone',
'Basic customization'];


const PREMIUM_FEATURES = [
{ icon: Image, text: 'Image Polls — options with pictures' },
{ icon: GripVertical, text: 'Ranking Polls — drag to rank' },
{ icon: CalendarClock, text: 'Schedule Meeting — find best time' },
{ icon: Star, text: 'No ads, priority support' },
{ icon: Check, text: 'Everything in Free' }];


export default function PricingPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const user = getAuth();
  const premium = isPremiumUser();
  const [upgrading, setUpgrading] = useState(false);

  const handleUpgrade = async () => {
    if (!user) {navigate('/signup');return;}
    setUpgrading(true);
    try {
      await upgradeToPremium();
      toast({ title: '🎉 Welcome to Premium!', description: 'You now have access to all premium poll types.' });

      window.location.href = '/create';
    } catch (err) {
      toast({ title: 'Upgrade failed', description: err.message, variant: 'destructive' });
    } finally {
      setUpgrading(false);
    }
  };

  return (
    _jsxs("div", { className: "bg-white min-h-screen", children: [

      _jsxs("section", { className: "max-w-7xl mx-auto px-5 lg:px-8 py-16 text-center", children: [
        _jsxs("span", { className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold", children: [
          _jsx(Sparkles, { className: "w-3.5 h-3.5" }), " Simple pricing"] }
        ),
        _jsxs("h1", { className: "mt-5 text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight", children: ["One plan. ",
          _jsx("span", { className: "text-indigo-600", children: "All features." })] }
        ),
        _jsx("p", { className: "mt-5 text-lg text-slate-600 max-w-2xl mx-auto", children: "Start for free. Upgrade to Premium for advanced poll types and a better experience." }

        )] }
      ),


      _jsxs("section", { className: "max-w-5xl mx-auto px-5 lg:px-8 pb-24", children: [
        _jsxs("div", { className: "grid md:grid-cols-2 gap-8 items-start", children: [


          _jsxs("div", { className: "rounded-2xl border-2 border-slate-200 p-8 bg-white hover:shadow-lg transition-shadow", children: [
            _jsx("h3", { className: "text-xl font-bold text-slate-900", children: "Free" }),
            _jsx("p", { className: "mt-1 text-sm text-slate-500", children: "For everyone who wants to create simple polls" }),
            _jsxs("div", { className: "mt-6 flex items-baseline gap-1", children: [
              _jsx("span", { className: "text-5xl font-extrabold text-slate-900", children: "$0" }),
              _jsx("span", { className: "text-sm text-slate-500", children: "/forever" })] }
            ),
            _jsx("ul", { className: "mt-7 space-y-3", children:
              FREE_FEATURES.map((f) =>
              _jsxs("li", { className: "flex items-center gap-2 text-sm text-slate-700", children: [
                _jsx(Check, { className: "w-4 h-4 text-emerald-500 shrink-0" }),
                f] }, f
              )
              ) }
            ),
            _jsx("button", {
              onClick: () => navigate('/create'),
              className: "mt-8 w-full h-12 border-2 border-slate-200 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 transition-colors", children:
              "Create a poll \u2192" }

            )] }
          ),


          _jsxs("div", { className: "relative rounded-2xl border-2 border-indigo-500 p-8 bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 text-white shadow-2xl", children: [
            _jsx("span", { className: "absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-amber-400 text-amber-950 text-xs font-extrabold tracking-wide uppercase", children: "\u2728 Most Popular" }

            ),
            _jsxs("div", { className: "flex items-center gap-2", children: [
              _jsx("h3", { className: "text-xl font-bold", children: "Premium" }),
              _jsx(Crown, { className: "w-5 h-5 text-yellow-300" })] }
            ),
            _jsx("p", { className: "mt-1 text-sm text-purple-200", children: "Unlock advanced poll types" }),
            _jsxs("div", { className: "mt-6 flex items-baseline gap-1", children: [
              _jsx("span", { className: "text-5xl font-extrabold", children: "$9" }),
              _jsx("span", { className: "text-sm text-purple-200", children: "/month" })] }
            ),

            _jsx("ul", { className: "mt-7 space-y-3", children:
              PREMIUM_FEATURES.map(({ icon: Icon, text }) =>
              _jsxs("li", { className: "flex items-center gap-3 text-sm text-purple-50", children: [
                _jsx("div", { className: "w-7 h-7 rounded-lg bg-white/15 flex items-center justify-center shrink-0", children:
                  _jsx(Icon, { className: "w-3.5 h-3.5 text-white" }) }
                ),
                text] }, text
              )
              ) }
            ),


            premium ?
            _jsxs("div", { className: "mt-8 w-full h-12 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center gap-2 text-white font-semibold", children: [
              _jsx(Check, { className: "w-5 h-5 text-emerald-300" }), " You're on Premium!"] }
            ) :
            !user ?
            _jsxs("div", { className: "mt-8 space-y-3", children: [
              _jsxs("button", {
                onClick: () => navigate('/signup'),
                className: "w-full h-12 rounded-xl bg-white text-indigo-700 hover:bg-slate-100 font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98]", children: [

                _jsx(Lock, { className: "w-4 h-4" }), " Sign up to upgrade"] }
              ),
              _jsx("p", { className: "text-center text-xs text-purple-300", children: "You need an account to subscribe" })] }
            ) :

            _jsx("button", {
              onClick: handleUpgrade,
              disabled: upgrading,
              className: "mt-8 w-full h-12 rounded-xl bg-white text-indigo-700 hover:bg-slate-100 disabled:opacity-60 font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg", children:

              upgrading ?
              _jsxs(_Fragment, { children: [_jsx(Loader2, { className: "w-4 h-4 animate-spin" }), " Processing\u2026"] }) :
              _jsxs(_Fragment, { children: [_jsx(Crown, { className: "w-4 h-4 text-amber-500" }), " Buy Premium \u2014 $9/month ", _jsx(ArrowRight, { className: "w-4 h-4" })] }) }

            )] }

          )] }
        ),


        !user &&
        _jsxs("div", { className: "mt-10 rounded-2xl bg-amber-50 border border-amber-200 p-5 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left", children: [
          _jsx(Lock, { className: "w-8 h-8 text-amber-500 shrink-0" }),
          _jsxs("div", { className: "flex-1", children: [
            _jsx("p", { className: "font-semibold text-amber-800", children: "Create a free account to unlock Premium" }),
            _jsx("p", { className: "text-sm text-amber-600 mt-0.5", children: "Sign up takes only 30 seconds \u2014 no credit card required for the free plan." })] }
          ),
          _jsx("button", { onClick: () => navigate('/signup'), className: "shrink-0 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition-colors", children: "Sign up free" }

          )] }
        ),


        user && premium &&
        _jsxs("div", { className: "mt-10 rounded-2xl bg-emerald-50 border border-emerald-200 p-5 flex items-center gap-4", children: [
          _jsx(Crown, { className: "w-8 h-8 text-emerald-500 shrink-0" }),
          _jsxs("div", { children: [
            _jsx("p", { className: "font-semibold text-emerald-800", children: "You're a Premium member \uD83C\uDF89" }),
            _jsx("p", { className: "text-sm text-emerald-600 mt-0.5", children: "All poll types are unlocked. Head to Create Poll to get started!" })] }
          ),
          _jsx("button", { onClick: () => navigate('/create'), className: "ml-auto shrink-0 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-colors", children: "Create poll" }

          )] }
        ),


        _jsxs("div", { className: "mt-12 text-center text-sm text-slate-400", children: ["30-day money-back guarantee \xB7 Cancel anytime \xB7",
          ' ',
          _jsx("a", { href: "#", className: "text-indigo-600 hover:underline", children: "Need enterprise?" })] }
        )] }
      )] }
    ));

}