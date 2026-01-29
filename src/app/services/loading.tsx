import { ServiceCardSkeleton } from "../components/UI/ServiceCardSkeleton";


export default function Loading() {
  return (
    <div className="container mx-auto px-5 py-10">
      {/* Заголовок */}
      <div className="mb-10 text-center">
        <div className="inline-block h-10 w-64 animate-pulse rounded-lg bg-white/15" />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <ServiceCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}