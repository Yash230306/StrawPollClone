import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CreatePollPage from './pages/CreatePollPage';
import PollViewPage from './pages/PollViewPage';
import PricingPage from './pages/PricingPage';
import { LoginPage, SignupPage } from './pages/AuthPages';
import DashboardPage from './pages/DashboardPage';
import { TemplatesPage, DemoPage, MeetingsPage, LegalPage, AboutPage } from './pages/OtherPages';
import { Toaster } from './components/ui/toaster';

import { getAuth } from './mock/mock';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

const HomeRoute = () => {
  const user = getAuth();
  return user ? _jsx(Navigate, { to: "/dashboard", replace: true }) : _jsx(HomePage, {});
};

function App() {
  return (
    _jsx("div", { className: "App", children:
      _jsxs(BrowserRouter, { children: [
        _jsx(Navbar, {}),
        _jsxs(Routes, { children: [
          _jsx(Route, { path: "/", element: _jsx(HomeRoute, {}) }),
          _jsx(Route, { path: "/create", element: _jsx(CreatePollPage, {}) }),
          _jsx(Route, { path: "/polls/:id", element: _jsx(PollViewPage, {}) }),
          _jsx(Route, { path: "/pricing", element: _jsx(PricingPage, {}) }),
          _jsx(Route, { path: "/login", element: _jsx(LoginPage, {}) }),
          _jsx(Route, { path: "/signup", element: _jsx(SignupPage, {}) }),
          _jsx(Route, { path: "/dashboard", element: _jsx(DashboardPage, {}) }),
          _jsx(Route, { path: "/templates", element: _jsx(TemplatesPage, {}) }),
          _jsx(Route, { path: "/demo", element: _jsx(Navigate, { to: "/polls/eNg6RNDvjgA", replace: true }) }),
          _jsx(Route, { path: "/meetings", element: _jsx(MeetingsPage, {}) }),
          _jsx(Route, { path: "/legal", element: _jsx(LegalPage, {}) }),
          _jsx(Route, { path: "/about", element: _jsx(AboutPage, {}) })] }
        ),
        _jsx(Footer, {}),
        _jsx(Toaster, {})] }
      ) }
    ));

}

export default App;