import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';
import { pricingPlans } from '../mock/mock';

export default function PricingPage() {
  return (
    <div className="bg-white">
      <section className="max-w-7xl mx-auto px-5 lg:px-8 py-16 text-center">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" /> Simple, transparent pricing
        </span>
        <h1 className="mt-5 text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight">
          Choose the plan that <span className="text-indigo-600">fits you</span>
        </h1>
        <p className="mt-5 text-lg text-slate-600 max-w-2xl mx-auto">
          Start for free. Upgrade anytime for more power, no ads, and team features.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-5 lg:px-8 pb-20">
        <div className="grid md:grid-cols-3 gap-6">
          {pricingPlans.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-2xl p-8 border transition-all ${
                p.highlight
                  ? 'bg-gradient-to-br from-indigo-600 to-indigo-700 text-white border-indigo-600 shadow-2xl scale-[1.02]'
                  : 'bg-white border-slate-200 hover:shadow-lg'
              }`}
            >
              {p.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-amber-400 text-amber-950 text-xs font-bold">
                  Most Popular
                </span>
              )}
              <h3 className={`text-xl font-bold ${p.highlight ? 'text-white' : 'text-slate-900'}`}>{p.name}</h3>
              <p className={`mt-2 text-sm ${p.highlight ? 'text-indigo-100' : 'text-slate-500'}`}>{p.description}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className={`text-5xl font-extrabold ${p.highlight ? 'text-white' : 'text-slate-900'}`}>
                  ${p.price}
                </span>
                <span className={`text-sm ${p.highlight ? 'text-indigo-200' : 'text-slate-500'}`}>/{p.period}</span>
              </div>
              <ul className="mt-7 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className={`flex items-start gap-2 text-sm ${p.highlight ? 'text-indigo-50' : 'text-slate-700'}`}>
                    <Check className={`w-4 h-4 mt-0.5 shrink-0 ${p.highlight ? 'text-white' : 'text-indigo-600'}`} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link to={p.price === 0 ? '/create' : '/signup'} className="block mt-8">
                <Button
                  className={`w-full rounded-lg h-12 font-semibold ${
                    p.highlight
                      ? 'bg-white text-indigo-700 hover:bg-slate-100'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  }`}
                >
                  {p.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center text-sm text-slate-500">
          Need something custom? <a href="#" className="text-indigo-600 font-semibold hover:underline">Contact us</a>
        </div>
      </section>
    </div>
  );
}
