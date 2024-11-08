import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import { MailIcon, KeyIcon, ShieldIcon, EyeIcon, EyeOffIcon } from 'lucide-react';

export const Dashboard = () => {
  const { email, password, ip } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showIP, setShowIP] = useState(false);

  const InfoCard = ({ icon: Icon, title, value, isSecret, showSecret, onToggleSecret }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 relative overflow-hidden"
    >
      <div className="flex items-center space-x-4 mb-4">
        <div className="bg-blue-100 p-3 rounded-lg">
          <Icon className="text-blue-600" size={24} />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        {isSecret && (
          <button
            onClick={onToggleSecret}
            className="ml-auto text-gray-500 hover:text-gray-700 transition-colors"
          >
            {showSecret ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
          </button>
        )}
      </div>
      <AnimatePresence mode="wait">
        <motion.p
          key={showSecret ? 'visible' : 'hidden'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-gray-600"
        >
          {isSecret ? (showSecret ? value : '••••••••') : value}
        </motion.p>
      </AnimatePresence>
    </motion.div>
  );

  return (
    <div className="max-w-6xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-gray-900 mb-8"
      >
        Dashboard
      </motion.h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <InfoCard
          icon={MailIcon}
          title="Email"
          value={email}
          isSecret={false}
          showSecret={false}
          onToggleSecret={() => {}}
        />

        <InfoCard
          icon={KeyIcon}
          title="Password"
          value={password}
          isSecret={true}
          showSecret={showPassword}
          onToggleSecret={() => setShowPassword(!showPassword)}
        />

        <InfoCard
          icon={ShieldIcon}
          title="IP"
          value={ip}
          isSecret={true}
          showSecret={showIP}
          onToggleSecret={() => setShowIP(!showIP)}
        />
      </div>
    </div>
  );
};