import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Facebook, Instagram, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-24">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-14 grid grid-cols-2 md:grid-cols-3 gap-10">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-pink-500 to-indigo-500">
              <span className="w-4 h-4 rounded-full bg-white/90" />
            </span>
            <span className="text-xl font-extrabold text-white">
              Straw<span className="text-indigo-400">Poll</span>
            </span>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            Create instant, real-time polls and surveys for free. Trusted by over 2.3M users worldwide.
          </p>
            <a href="https://github.com/Yash230306/StrawPollClone.git" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-slate-800 hover:bg-indigo-600 flex items-center justify-center transition-colors"><Github className="w-4 h-4" /></a>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 text-sm">Product</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/create" className="hover:text-white transition-colors">Create Poll</Link></li>
            <li><Link to="/meetings" className="hover:text-white transition-colors">Schedule Meeting</Link></li>
            <li><Link to="/demo" className="hover:text-white transition-colors">Demo</Link></li>
            <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
          </ul>
        </div>



        <div>
          <h4 className="text-white font-semibold mb-4 text-sm">Legal</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/legal" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link to="/legal" className="hover:text-white transition-colors">Terms of Service</Link></li>
            <li><Link to="/legal" className="hover:text-white transition-colors">Cookie Policy</Link></li>
            <li><Link to="/legal" className="hover:text-white transition-colors">GDPR</Link></li>
            <li><Link to="/legal" className="hover:text-white transition-colors">Imprint</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
