import React from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import { StatusBadge } from '../components/StatusBadge';

export const Home = () => {
  const email = useAuthStore((state) => state.email);
  const [status, setStatus] = React.useState<'online' | 'offline' | 'verifying' | 'suspended'>('online');

  // Simuler un changement de statut pour la démonstration
  React.useEffect(() => {
    const statuses: ('online' | 'offline' | 'verifying' | 'suspended')[] = ['online', 'verifying', 'offline', 'suspended'];
    let currentIndex = 0;

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % statuses.length;
      setStatus(statuses[currentIndex]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <motion.h1
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="text-4xl font-bold text-gray-900 mb-6"
      >
        Bienvenue sur votre espace
      </motion.h1>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-lg p-6 mb-6"
      >
        <p className="text-gray-600 text-lg mb-4">
          Nous sommes ravis de vous avoir parmi nous, {email}.
        </p>
        <StatusBadge status={status} />
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <h2 className="text-xl font-semibold mb-2">Activité récente</h2>
          <p>Dernière connexion il y a 2 heures</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <h2 className="text-xl font-semibold mb-2">Sécurité</h2>
          <p>Votre compte est protégé</p>
        </div>
      </motion.div>
    </motion.div>
  );
};