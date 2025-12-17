import { Star, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ReviewCardProps {
  reviewerName: string;
  rating: number;
  jobType: string;
  reviewText: string;
  date: string;
  verified?: boolean;
  avatarUrl?: string;
}

export function ReviewCard({
  reviewerName,
  rating,
  jobType,
  reviewText,
  date,
  verified = false,
  avatarUrl,
}: ReviewCardProps) {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-xl border border-border p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4 mb-4">
        {/* Avatar */}
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={reviewerName}
            className="w-12 h-12 rounded-full object-cover flex-shrink-0"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <span className="text-primary font-semibold text-lg">{reviewerName.charAt(0)}</span>
          </div>
        )}

        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-foreground">{reviewerName}</h4>
                {verified && (
                  <div className="flex items-center gap-1 text-xs text-trust bg-trust/10 px-2 py-1 rounded-full">
                    <CheckCircle className="h-3 w-3" />
                    {t('reviews.verified')}
                  </div>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{jobType}</p>
            </div>
            <div className="text-xs text-muted-foreground whitespace-nowrap ml-2">{date}</div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Review Text */}
      <p className="text-foreground leading-relaxed pl-16">{reviewText}</p>
    </div>
  );
}
