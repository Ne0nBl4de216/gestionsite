import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Mail, Lock, CheckCircle2 } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import axios from 'axios';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState<'email' | 'verification' | 'password'>('email');
  const [password, setPassword] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const { setEmail: setAuthEmail, setPassword: setAuthPassword, setIp, setVerified, setLoggedIn, isLoggedIn } = useAuthStore();

  useEffect(() => {
    // Obtenir l'IP de l'utilisateur
    const getIp = async () => {
      try {
        const response = await axios.get('https://api.ipify.org?format=json');
        setIp(response.data.ip);
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'IP:', error);
        setIp('Non disponible');
      }
    };
    getIp();
  }, []);

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthEmail(email);
    alert("Un email de vérification a été envoyé à " + email);
    setStep('verification');
    
    setTimeout(() => {
      setIsEmailVerified(true);
    }, 3000);
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
          <h1 className="text-3xl font-bold text-gray-900">Bienvenue</h1>
          <p className="text-gray-600 mt-2">
            {step === 'email' && "Commencez par entrer votre email"}
            {step === 'verification' && "Vérifiez votre email"}
            {step === 'password' && "Créez votre mot de passe"}
          </p>
        </div>

        {step === 'email' && (
          <form onSubmit={handleEmailSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="votre@email.com"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Continuer
            </button>
          </form>
        )}

        {step === 'verification' && (
          <div className="text-center space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <div className={`p-4 rounded-full ${isEmailVerified ? 'bg-green-100' : 'bg-gray-100'}`}>
                <CheckCircle2 
                  className={`w-8 h-8 ${isEmailVerified ? 'text-green-500' : 'text-gray-400'}`} 
                />
              </div>
              <p className="text-gray-600">
                Un email a été envoyé à <span className="font-medium">{email}</span>
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
              {isEmailVerified ? 'Continuer' : 'En attente de la vérification'}
            </button>
          </div>
        )}

        {step === 'password' && (
          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Créez votre mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Mot de passe"
                  minLength={8}
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Créer mon compte
            </button>
          </form>
        )}
      </div>
    </div>
  );
};