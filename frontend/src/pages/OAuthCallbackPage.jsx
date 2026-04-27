import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { setAuth } from '../mock/mock';
import { useToast } from '../hooks/use-toast';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";





export default function OAuthCallbackPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const token = params.get('token');
    const name = params.get('name');
    const email = params.get('email');
    const error = params.get('error');

    if (error || !token) {
      toast({
        title: 'Sign-in failed',
        description: error === 'google_failed' ?
        'Could not sign in with Google. Please try again.' :
        error === 'facebook_failed' ?
        'Could not sign in with Facebook. Please try again.' :
        'OAuth sign-in failed. Please try email/password.',
        variant: 'destructive'
      });
      navigate('/login');
      return;
    }


    setAuth({ name: decodeURIComponent(name), email: decodeURIComponent(email), token });
    toast({ title: '✅ Signed in!', description: `Welcome, ${decodeURIComponent(name)}!` });
    navigate('/dashboard');
  }, [params, navigate, toast]);

  return (
    _jsx("div", { className: "min-h-screen bg-slate-50 flex items-center justify-center", children:
      _jsxs("div", { className: "flex flex-col items-center gap-4 text-slate-500", children: [
        _jsx(Loader2, { className: "w-10 h-10 animate-spin text-indigo-500" }),
        _jsx("p", { className: "text-sm font-medium", children: "Completing sign-in\u2026" })] }
      ) }
    ));

}