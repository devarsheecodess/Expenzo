import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonLoaderCard() {
  return (
    <div className="relative overflow-hidden border-0 shadow-lg rounded-xl h-48 w-full">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black" />
      <div className="relative z-10 p-6 space-y-4">
        <Skeleton className="h-4 w-1/2 rounded" /> {/* title */}
        <Skeleton className="h-8 w-1/3 rounded" /> {/* value */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-1/4 rounded" /> {/* label */}
          <Skeleton className="h-6 w-1/3 rounded" /> {/* amount */}
        </div>
        <Skeleton className="h-2 w-full rounded" /> {/* bar */}
      </div>
    </div>
  );
}
