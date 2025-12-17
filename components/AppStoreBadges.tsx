interface AppStoreBadgesProps {
  variant?: 'default' | 'light';
  showTitle?: boolean;
  className?: string;
}

export function AppStoreBadges({ 
  variant = 'default', 
  showTitle = true,
  className = '' 
}: AppStoreBadgesProps) {
  return (
    <div className={className}>
      {showTitle && (
        <h4 className="font-bold text-foreground mb-6 text-sm uppercase tracking-wider">
          Download The App
        </h4>
      )}
      <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
        <a 
          href="https://apps.apple.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block hover:opacity-80 transition-opacity"
        >
          <img 
            src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83&amp;releaseDate=1590019200"
            alt="Download on the App Store" 
            className="h-12 w-auto"
          />
        </a>
        <a 
          href="https://play.google.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block hover:opacity-80 transition-opacity"
        >
          <img 
            src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
            alt="Get it on Google Play" 
            className="h-[52px] w-auto"
          />
        </a>
      </div>
    </div>
  );
}
