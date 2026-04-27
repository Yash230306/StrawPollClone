import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CreatePollPage from './pages/CreatePollPage';
import PollViewPage from './pages/PollViewPage';
import PricingPage from './pages/PricingPage';
import { LoginPage, SignupPage } from './pages/AuthPages';
import DashboardPage from './pages/DashboardPage';
import { TemplatesPage, DemoPage, MeetingsPage } from './pages/OtherPages';
import OAuthCallbackPage from './pages/OAuthCallbackPage';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePollPage />} />
          <Route path="/polls/:id" element={<PollViewPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/templates" element={<TemplatesPage />} />
          <Route path="/demo" element={<DemoPage />} />
          <Route path="/meetings" element={<MeetingsPage />} />
          <Route path="/oauth-callback" element={<OAuthCallbackPage />} />
        </Routes>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
