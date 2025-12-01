import { Suspense } from "react";
import PostJob from "@/pages/PostJob";

function PostJobLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      Loading...
    </div>
  );
}

export default function PostJobPage() {
  return (
    <Suspense fallback={<PostJobLoader />}>
      <PostJob />
    </Suspense>
  );
}
