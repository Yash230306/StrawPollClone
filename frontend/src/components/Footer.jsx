import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Facebook, Instagram, Github } from 'lucide-react';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

export default function Footer() {
  return (
    _jsx("footer", { className: "bg-slate-900 text-slate-300 mt-24", children:
      _jsxs("div", { className: "max-w-7xl mx-auto px-5 lg:px-8 py-14 grid grid-cols-2 md:grid-cols-3 gap-10", children: [
        _jsxs("div", { className: "col-span-2 md:col-span-1", children: [
          _jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
            _jsx("span", { className: "inline-flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-pink-500 to-indigo-500", children:
              _jsx("span", { className: "w-4 h-4 rounded-full bg-white/90" }) }
            ),
            _jsxs("span", { className: "text-xl font-extrabold text-white", children: ["Straw",
              _jsx("span", { className: "text-indigo-400", children: "Poll" })] }
            )] }
          ),
          _jsx("p", { className: "text-sm text-slate-400 leading-relaxed", children: "Create instant, real-time polls and surveys for free. Trusted by over 2.3M users worldwide." }

          ),
          _jsx("a", { href: "https://github.com/Yash230306/StrawPollClone.git", target: "_blank", rel: "noopener noreferrer", className: "w-9 h-9 rounded-full bg-slate-800 hover:bg-indigo-600 flex items-center justify-center transition-colors", children: _jsx(Github, { className: "w-4 h-4" }) })] }
        ),

        _jsxs("div", { children: [
          _jsx("h4", { className: "text-white font-semibold mb-4 text-sm", children: "Product" }),
          _jsxs("ul", { className: "space-y-2.5 text-sm", children: [
            _jsx("li", { children: _jsx(Link, { to: "/create", className: "hover:text-white transition-colors", children: "Create Poll" }) }),
            _jsx("li", { children: _jsx(Link, { to: "/meetings", className: "hover:text-white transition-colors", children: "Schedule Meeting" }) }),
            _jsx("li", { children: _jsx(Link, { to: "/demo", className: "hover:text-white transition-colors", children: "Demo" }) }),
            _jsx("li", { children: _jsx(Link, { to: "/pricing", className: "hover:text-white transition-colors", children: "Pricing" }) })] }
          )] }
        ),



        _jsxs("div", { children: [
          _jsx("h4", { className: "text-white font-semibold mb-4 text-sm", children: "Legal" }),
          _jsxs("ul", { className: "space-y-2.5 text-sm", children: [
            _jsx("li", { children: _jsx(Link, { to: "/legal", className: "hover:text-white transition-colors", children: "Privacy Policy" }) }),
            _jsx("li", { children: _jsx(Link, { to: "/legal", className: "hover:text-white transition-colors", children: "Terms of Service" }) }),
            _jsx("li", { children: _jsx(Link, { to: "/legal", className: "hover:text-white transition-colors", children: "Cookie Policy" }) }),
            _jsx("li", { children: _jsx(Link, { to: "/legal", className: "hover:text-white transition-colors", children: "GDPR" }) }),
            _jsx("li", { children: _jsx(Link, { to: "/legal", className: "hover:text-white transition-colors", children: "Imprint" }) })] }
          )] }
        )] }
      ) }
    ));

}