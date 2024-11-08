import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2Icon, AlertCircleIcon, XCircleIcon, ClockIcon } from 'lucide-react';

type StatusType = 'online' | 'offline' | 'verifying' | 'suspended';

interface StatusBadgeProps {
  status: StatusType;
}

const statusConfig = {
  online: {
    icon: CheckCircle2Icon,
    text: 'Online and ready!',
    color: 'bg-green-100 text-green-700',
    pulse: true
  },
  offline: {
    icon: XCircleIcon,
    text: 'Offline :/',
    color: 'bg-gray-100 text-gray-700',
    pulse: false
  },
  verifying: {
    icon: ClockIcon,
    text: 'Verifying',
    color: 'bg-blue-100 text-blue-700',
    pulse: true
  },
  suspended: {
    icon: AlertCircleIcon,
    text: 'Temporarily suspended',
    color: 'bg-red-100 text-red-700',
    pulse: false
  }
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`inline-flex items-center px-4 py-2 rounded-full ${config.color}`}
    >
      <div className="relative">
        <Icon size={18} className="mr-2" />
        {config.pulse && (
          <motion.div
            className="absolute inset-0 rounded-full"
            initial={{ opacity: 0.5, scale: 1 }}
            animate={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </div>
      <span className="font-medium">{config.text}</span>
    </motion.div>
  );
};