import { LucideIcon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface CategoryCardWithImageProps {
  name: string;
  slug: string;
  icon: LucideIcon;
  count: number;
  imageUrl: string;
  onClick?: (slug: string) => void;
}

export function CategoryCardWithImage({ name, slug, icon: Icon, count, imageUrl, onClick }: CategoryCardWithImageProps) {
  const { t } = useLanguage();

  const handleClick = () => {
    if (onClick) {
      onClick(slug);
    }
  };

  return (
    <button onClick={handleClick} className="w-full">
      <div className="relative bg-white rounded-xl overflow-hidden border border-border hover:border-primary hover:shadow-xl transition-all duration-300 group cursor-pointer h-48">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={imageUrl} 
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 group-hover:from-primary/90 group-hover:via-primary/60 transition-all duration-300"></div>
        </div>
        
        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
          <div className="w-12 h-12 md:w-14 md:h-14 bg-white/95 rounded-full flex items-center justify-center mb-3 group-hover:bg-accent group-hover:scale-110 transition-all duration-300 shadow-lg">
            <Icon className="h-6 w-6 md:h-7 md:w-7 text-primary group-hover:text-white transition-colors" />
          </div>
          <h3 className="font-bold text-sm md:text-base lg:text-lg text-white mb-1 drop-shadow-lg">
            {name}
          </h3>
          <p className="text-xs md:text-sm text-white/90 font-medium">
            {count} {t('common.professionals')}
          </p>
        </div>
      </div>
    </button>
  );
}
