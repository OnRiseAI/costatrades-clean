import { X, ChevronLeft } from 'lucide-react';
import { TradeService } from '@/data/tradeServices';

interface SubServiceModalProps {
  isOpen: boolean;
  subServices: TradeService[];
  parentService: string;
  onClose: () => void;
  onSelectSubService: (subServiceId: string) => void;
  onBack: () => void;
}

export function SubServiceModal({
  isOpen,
  subServices,
  parentService,
  onClose,
  onSelectSubService,
  onBack,
}: SubServiceModalProps) {
  if (!isOpen || !subServices.length) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">What area of the {parentService} do you need help with?</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors p-1"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Sub-Services List */}
        <div className="p-6 space-y-3">
          {subServices.map((subService) => (
            <button
              key={subService.id}
              onClick={() => onSelectSubService(subService.id)}
              className="w-full text-left p-4 border-2 border-gray-200 rounded-xl hover:border-primary hover:bg-primary/5 transition-all duration-200 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {subService.label}
                  </p>
                </div>
                <div className="text-primary group-hover:translate-x-1 transition-transform ml-4">
                  <ChevronLeft className="h-5 w-5 rotate-180" />
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6">
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
