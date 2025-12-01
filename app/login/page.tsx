import { Suspense } from "react";
import LoginPage from "@/pages/LoginPage";

function LoginLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      Loading...
    </div>
  );
}

export default function Login() {
  return (
    <Suspense fallback={<LoginLoader />}>
      <LoginPage />
    </Suspense>
  );
}
