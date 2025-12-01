import { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

interface Activity {
  id: number;
  name: string;
  service: string;
  location: string;
  timeAgo: string;
}

const activities: Activity[] = [
  { id: 1, name: 'Sarah', service: 'a Plumber', location: 'Marbella', timeAgo: '2 min ago' },
  { id: 2, name: 'John', service: 'an Electrician', location: 'Málaga', timeAgo: '5 min ago' },
  { id: 3, name: 'Maria', service: 'a Pool Technician', location: 'Estepona', timeAgo: '8 min ago' },
  { id: 4, name: 'David', service: 'a Gardener', location: 'Fuengirola', timeAgo: '12 min ago' },
  { id: 5, name: 'Emma', service: 'a Painter', location: 'Torremolinos', timeAgo: '15 min ago' },
];

export function LiveActivity() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % activities.length);
        setIsVisible(true);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const activity = activities[currentIndex];

  return (
    <div className="fixed bottom-6 left-6 z-40 hidden lg:block">
      <div
        className={`bg-white rounded-xl shadow-2xl p-4 border border-gray-200 max-w-sm transition-all duration-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900">
              <span className="text-primary">{activity.name}</span> just hired {activity.service}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {activity.location} · {activity.timeAgo}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
