import { X, ChevronLeft, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface PostcodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (postcode: string) => void;
  onBack: () => void;
}

export function PostcodeModal({ isOpen, onClose, onSubmit, onBack }: PostcodeModalProps) {
  const [postcode, setPostcode] = useState('');
  const [showPostcode, setShowPostcode] = useState(false);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (postcode.trim()) {
      onSubmit(postcode);
      setPostcode('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl animate-fade-in">
        {/* Header */}
        <div className="border-b border-gray-200 p-6 flex items-center justify-between">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-foreground">What's your town?</h2>
            <p className="text-sm text-muted-foreground mt-2">We use this to make sure the tradesperson operates in your area.</p>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors p-1 ml-4 flex-shrink-0"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Form */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type={showPostcode ? 'text' : 'text'}
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                placeholder="Town name"
                className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none text-base"
              />
              <button
                type="button"
                onClick={() => setShowPostcode(!showPostcode)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPostcode ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>

            <Button
              type="submit"
              disabled={!postcode.trim()}
              className="w-full bg-[#E31E24] hover:bg-[#C41A1F] text-white font-semibold py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed text-base"
            >
              Search
            </Button>
          </form>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Back</span>
          </button>
        </div>
      </div>
    </div>
  );
}
