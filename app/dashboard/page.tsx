import { Suspense } from "react";
import CustomerDashboard from "@/pages/CustomerDashboard";

function DashboardLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      Loading...
    </div>
  );
}

export default function Dashboard() {
  return (
    <Suspense fallback={<DashboardLoader />}>
      <CustomerDashboard />
    </Suspense>
  );
}
