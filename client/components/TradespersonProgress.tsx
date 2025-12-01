import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

type TradespersonProgressProps = {
  currentStep: 1 | 2 | 3;
};

const STEPS: Array<{ id: number; label: string }> = [
  { id: 1, label: "Your business" },
  { id: 2, label: "Your details" },
  { id: 3, label: "Review & confirm" },
];

export function TradespersonProgress({
  currentStep,
}: TradespersonProgressProps) {
  return (
    <div className="border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm">
      <div className="container-custom py-4 md:py-6 lg:py-8 md:max-w-6xl">
        <div className="flex flex-wrap items-center justify-center md:justify-between gap-4 md:gap-8">
          {STEPS.map((step, index) => {
            const stepNumber = index + 1;
            const isActiveOrComplete = stepNumber <= currentStep;
            const isCurrent = stepNumber === currentStep;
            const lineIsActive = index < currentStep;

            const iconClassName = cn(
              "h-5 w-5 md:h-6 md:w-6 transition-colors duration-300",
              isActiveOrComplete ? "text-emerald-500" : "text-gray-300",
            );

            const labelClassName = cn(
              "font-medium text-sm md:text-lg transition-colors duration-300",
              isActiveOrComplete ? "text-[#0a1f44]" : "text-gray-400",
              isCurrent && "font-bold",
            );

            const circleClassName = cn(
              "flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full border-2 transition-all duration-300",
              isActiveOrComplete
                ? "border-emerald-500 bg-emerald-50 text-emerald-600"
                : "border-gray-200 bg-white text-gray-300",
            );

            const lineClassName = cn(
              "hidden md:block h-1 flex-1 rounded-full transition-all duration-500 mx-4",
              lineIsActive ? "bg-emerald-500" : "bg-gray-100",
            );

            return (
              <div
                key={step.id}
                className="flex items-center flex-1 last:flex-none"
              >
                <div className="flex items-center gap-3 md:gap-4">
                  <div className={circleClassName}>
                    {isActiveOrComplete ? (
                      <CheckCircle2 className="h-5 w-5 md:h-6 md:w-6" />
                    ) : (
                      <span className="text-sm md:text-base font-semibold">
                        {stepNumber}
                      </span>
                    )}
                  </div>
                  <span className={labelClassName}>{step.label}</span>
                </div>
                {index < STEPS.length - 1 && <div className={lineClassName} />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
