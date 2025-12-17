import { Shield, CheckCircle2, Star } from 'lucide-react';

interface VerificationBadgeProps {
  type: 'verified' | 'guarantee' | 'reviewed';
  className?: string;
}

export function VerificationBadge({ type, className = '' }: VerificationBadgeProps) {
  const configs = {
    verified: {
      icon: CheckCircle2,
      label: 'Verified',
      bgColor: 'bg-trust',
      textColor: 'text-white',
    },
    guarantee: {
      icon: Shield,
      label: 'Guaranteed',
      bgColor: 'bg-accent',
      textColor: 'text-white',
    },
    reviewed: {
      icon: Star,
      label: 'Reviewed',
      bgColor: 'bg-yellow-400',
      textColor: 'text-gray-900',
    },
  };

  const config = configs[type];
  const Icon = config.icon;

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.bgColor} ${config.textColor} ${className}`}
    >
      <Icon className="h-3.5 w-3.5" />
      <span>{config.label}</span>
    </div>
  );
}
