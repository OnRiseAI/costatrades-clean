import { LucideIcon } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

interface StatsCounterProps {
  icon: LucideIcon;
  value: string;
  label: string;
  colorScheme?: 'blue' | 'green' | 'orange';
}

const colorSchemes = {
  blue: {
    iconBg: 'bg-gradient-to-br from-blue-500 to-blue-600',
    iconColor: 'text-white',
    numberColor: 'text-blue-600',
    cardHover: 'hover:border-blue-300 hover:shadow-blue-200/50',
    cardBg: 'bg-gradient-to-br from-blue-50 via-white to-blue-50/30',
    decorCircle: 'bg-blue-200/30',
    glowBg: 'group-hover:shadow-blue-100',
  },
  green: {
    iconBg: 'bg-gradient-to-br from-green-500 to-green-600',
    iconColor: 'text-white',
    numberColor: 'text-green-600',
    cardHover: 'hover:border-green-300 hover:shadow-green-200/50',
    cardBg: 'bg-gradient-to-br from-green-50 via-white to-green-50/30',
    decorCircle: 'bg-green-200/30',
    glowBg: 'group-hover:shadow-green-100',
  },
  orange: {
    iconBg: 'bg-gradient-to-br from-orange-500 to-orange-600',
    iconColor: 'text-white',
    numberColor: 'text-orange-600',
    cardHover: 'hover:border-orange-300 hover:shadow-orange-200/50',
    cardBg: 'bg-gradient-to-br from-orange-50 via-white to-orange-50/30',
    decorCircle: 'bg-orange-200/30',
    glowBg: 'group-hover:shadow-orange-100',
  },
};

export function StatsCounter({ icon: Icon, value, label, colorScheme = 'blue' }: StatsCounterProps) {
  const colors = colorSchemes[colorScheme];
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const countRef = useRef<HTMLDivElement>(null);

  // Extract number from value string (e.g., "150+" -> 150)
  const targetNumber = parseInt(value.replace(/[^0-9]/g, ''));
  const suffix = value.replace(/[0-9]/g, '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const duration = 2000; // 2 seconds animation

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * targetNumber);

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(targetNumber);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, targetNumber]);

  return (
    <div className={`relative flex flex-col items-center text-center p-10 rounded-3xl border-2 border-gray-200 ${colors.cardBg} ${colors.cardHover} shadow-xl hover:shadow-2xl ${colors.glowBg} transition-all duration-500 hover:-translate-y-2 group overflow-hidden`}>
      {/* Decorative circles */}
      <div className={`absolute -top-10 -right-10 w-32 h-32 ${colors.decorCircle} rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700`}></div>
      <div className={`absolute -bottom-10 -left-10 w-32 h-32 ${colors.decorCircle} rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700`}></div>

      {/* Icon with glow effect */}
      <div className="relative mb-6">
        <div className={`absolute inset-0 ${colors.iconBg} rounded-2xl blur-lg opacity-50 group-hover:opacity-70 transition-opacity`}></div>
        <div className={`relative w-24 h-24 ${colors.iconBg} rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
          <Icon className={`h-12 w-12 ${colors.iconColor} drop-shadow-sm`} />
        </div>
      </div>

      {/* Number with gradient text effect */}
      <div
        ref={countRef}
        className={`text-6xl md:text-7xl font-black ${colors.numberColor} mb-3 tracking-tight group-hover:scale-105 transition-transform duration-300`}
      >
        {count.toLocaleString()}{suffix}
      </div>

      {/* Label */}
      <div className="text-lg md:text-xl text-gray-700 font-bold uppercase tracking-wide">{label}</div>

      {/* Bottom accent line */}
      <div className={`absolute bottom-0 left-0 right-0 h-1 ${colors.iconBg} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
    </div>
  );
}
