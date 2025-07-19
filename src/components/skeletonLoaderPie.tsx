import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCardPie() {
  return (
    <div className="w-full h-96 bg-gray-100 rounded-lg shadow-lg p-6 flex flex-col justify-between">
      {/* Title skeleton */}
      <div className="text-center mb-4">
        <Skeleton className="h-6 w-2/3 mx-auto rounded bg-gray-300 animate-pulse" />
      </div>

      {/* Chart circle area */}
      <div className="flex-1 flex items-center justify-center">
        <Skeleton className="rounded-full h-40 w-40 bg-gray-400 animate-pulse" />
      </div>

      {/* Legend skeleton */}
      <div className="flex justify-center gap-4 mt-6">
        <Skeleton className="h-4 w-24 rounded bg-gray-300 animate-pulse" />
        <Skeleton className="h-4 w-24 rounded bg-gray-300 animate-pulse" />
      </div>
    </div>
  );
}
