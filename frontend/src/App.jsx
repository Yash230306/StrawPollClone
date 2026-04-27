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

import { getAuth } from './mock/mock';

const HomeRoute = () => {
  const user = getAuth();
  return user ? <Navigate to="/dashboard" replace /> : <HomePage />;
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomeRoute />} />
          <Route path="/create" element={<CreatePollPage />} />
          <Route path="/polls/:id" element={<PollViewPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/templates" element={<TemplatesPage />} />
          <Route path="/demo" element={<Navigate to="/polls/eNg6RNDvjgA" replace />} />
          <Route path="/meetings" element={<MeetingsPage />} />
          <Route path="/legal" element={<LegalPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
