import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { setAuth } from '../mock/mock';
import { useToast } from '../hooks/use-toast';

/**
 * This page receives the OAuth redirect from the backend.
 * URL format: /oauth-callback?token=...&name=...&email=...
 */
export default function OAuthCallbackPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const token = params.get('token');
    const name  = params.get('name');
    const email = params.get('email');
    const error = params.get('error');

    if (error || !token) {
      toast({
        title: 'Sign-in failed',
        description: error === 'google_failed'
          ? 'Could not sign in with Google. Please try again.'
          : error === 'facebook_failed'
          ? 'Could not sign in with Facebook. Please try again.'
          : 'OAuth sign-in failed. Please try email/password.',
        variant: 'destructive',
      });
      navigate('/login');
      return;
    }

    // Store auth and redirect to dashboard
    setAuth({ name: decodeURIComponent(name), email: decodeURIComponent(email), token });
    toast({ title: '✅ Signed in!', description: `Welcome, ${decodeURIComponent(name)}!` });
    navigate('/dashboard');
  }, [params, navigate, toast]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-slate-500">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-500" />
        <p className="text-sm font-medium">Completing sign-in…</p>
      </div>
    </div>
  );
}
