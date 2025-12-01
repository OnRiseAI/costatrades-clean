export function SectionDivider() {
  return (
    <div className="relative py-8">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-gray-200"></div>
      </div>
      <div className="relative flex justify-center">
        <span className="bg-white px-4">
          <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <circle cx="10" cy="10" r="2" />
            <circle cx="4" cy="10" r="2" />
            <circle cx="16" cy="10" r="2" />
          </svg>
        </span>
      </div>
    </div>
  );
}
