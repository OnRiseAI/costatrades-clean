import { useState } from "react";
import { X, ChevronLeft } from "lucide-react";
import { getTradeServices, TradeService } from "@/data/tradeServices";
import { useRouter } from "next/navigation";
import { SubServiceModal } from "./SubServiceModal";
import { PostcodeModal } from "./PostcodeModal";

interface TradeServicesModalProps {
  isOpen: boolean;
  tradeSlug: string;
  onClose: () => void;
}

export function TradeServicesModal({
  isOpen,
  tradeSlug,
  onClose,
}: TradeServicesModalProps) {
  const router = useRouter();
  const tradeInfo = getTradeServices(tradeSlug);
  const [selectedService, setSelectedService] = useState<TradeService | null>(
    null,
  );
  const [showSubServices, setShowSubServices] = useState(false);
  const [showPostcode, setShowPostcode] = useState(false);

  if (!isOpen || !tradeInfo) {
    return null;
  }

  const handleServiceClick = (service: TradeService) => {
    setSelectedService(service);

    // If service has sub-services, show sub-service modal
    if (service.subServices && service.subServices.length > 0) {
      setShowSubServices(true);
    } else {
      // Otherwise, go directly to postcode
      setShowPostcode(true);
    }
  };

  const handleSubServiceClick = (subServiceId: string) => {
    // Navigate with both service and sub-service
    setShowSubServices(false);
    setShowPostcode(true);
  };

  const handlePostcodeSubmit = (postcode: string) => {
    const service = selectedService;
    if (service) {
      router.push(
        `/trades/${tradeSlug}?service=${service.id}&postcode=${postcode}`,
      );
      onClose();
      setSelectedService(null);
      setShowSubServices(false);
      setShowPostcode(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">
            {tradeInfo.title}
          </h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors p-1"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Services List */}
        <div className="p-6 space-y-3">
          {tradeInfo.services.map((service: TradeService) => (
            <button
              key={service.id}
              onClick={() => handleServiceClick(service)}
              className="w-full text-left p-4 border-2 border-gray-200 rounded-xl hover:border-primary hover:bg-primary/5 transition-all duration-200 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {service.label}
                  </p>
                  {service.description && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {service.description}
                    </p>
                  )}
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
            onClick={onClose}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Back</span>
          </button>
        </div>
      </div>

      {/* Sub-Service Modal */}
      {selectedService && (
        <SubServiceModal
          isOpen={showSubServices}
          subServices={selectedService.subServices || []}
          parentService={selectedService.label}
          onClose={onClose}
          onSelectSubService={handleSubServiceClick}
          onBack={() => setShowSubServices(false)}
        />
      )}

      {/* Postcode Modal */}
      <PostcodeModal
        isOpen={showPostcode}
        onClose={onClose}
        onSubmit={handlePostcodeSubmit}
        onBack={() => {
          setShowPostcode(false);
          if (
            selectedService?.subServices &&
            selectedService.subServices.length > 0
          ) {
            setShowSubServices(true);
          }
        }}
      />
    </div>
  );
}
