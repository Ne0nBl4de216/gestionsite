import React, { useState, useEffect } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { MailIcon, LockIcon, CheckCircle2Icon } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { authApi } from '../services/api';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState<'email' | 'verification' | 'password'>('email');
  const [password, setPassword] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  
  const { 
    isLoggedIn,
    actions: { setEmail: setAuthEmail, setPassword: setAuthPassword, setIp, setVerified, setLoggedIn }
  } = useAuthStore();

  useEffect(() => {
    const verified = searchParams.get('verified');
    if (verified === 'true') {
      setIsEmailVerified(true);
    }
  }, [searchParams]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const checkVerification = async () => {
      if (email && step === 'verification' && !isEmailVerified) {
        try {
          const { verified } = await authApi.checkVerificationStatus(email);
          if (verified) {
            setIsEmailVerified(true);
          }
        } catch (error) {
          console.error('Error checking verification:', error);
        }
      }
    };

    if (step === 'verification' && !isEmailVerified) {
      intervalId = setInterval(checkVerification, 3000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [email, step, isEmailVerified]);

  useEffect(() => {
    const initializeIp = async () => {
      try {
        const ip = await authApi.getIpAddress();
        setIp(ip);
      } catch (error) {
        console.error('Error getting IP:', error);
        setIp('Not available');
      }
    };

    initializeIp();
  }, [setIp]);

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await authApi.sendVerificationEmail(email);
      setAuthEmail(email);
      setStep('verification');
    } catch (error) {
      setError('Failed to send verification email. Please try again.');
    }
  };

  const handleVerificationContinue = () => {
    setVerified(true);
    setStep('password');
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthPassword(password);
    setLoggedIn(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome</h1>
          <p className="text-gray-600 mt-2">
            {step === 'email' && "Start by entering your email"}
            {step === 'verification' && "Check your email"}
            {step === 'password' && "Create your password"}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {step === 'email' && (
          <form onSubmit={handleEmailSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Continue
            </button>
          </form>
        )}

        {step === 'verification' && (
          <div className="text-center space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <div className={`p-4 rounded-full ${isEmailVerified ? 'bg-green-100' : 'bg-gray-100'}`}>
                <CheckCircle2Icon 
                  className={`w-8 h-8 ${isEmailVerified ? 'text-green-500' : 'text-gray-400'}`} 
                />
              </div>
              <p className="text-gray-600">
                A verification email has been sent to <span className="font-medium">{email}</span>
              </p>
            </div>
            <button
              onClick={handleVerificationContinue}
              disabled={!isEmailVerified}
              className={`w-full py-3 rounded-lg transition-all duration-300 ${
                isEmailVerified 
                  ? 'bg-green-600 text-white hover:bg-green-700' 
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isEmailVerified ? 'Continue' : 'Waiting for verification...'}
            </button>
          </div>
        )}

        {step === 'password' && (
          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Create your password
              </label>
              <div className="relative">
                <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Password"
                  minLength={8}
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create my account
            </button>
          </form>
        )}
      </div>
    </div>
  );
};