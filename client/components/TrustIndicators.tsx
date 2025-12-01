import { Shield, Award, CheckCircle } from 'lucide-react';

export function TrustIndicators() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
      <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
        <Shield className="h-5 w-5 text-white" />
        <span className="text-sm font-medium text-white">Fully Verified</span>
      </div>
      <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
        <Award className="h-5 w-5 text-white" />
        <span className="text-sm font-medium text-white">Licensed & Insured</span>
      </div>
      <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
        <CheckCircle className="h-5 w-5 text-white" />
        <span className="text-sm font-medium text-white">5-Star Rated</span>
      </div>
    </div>
  );
}
