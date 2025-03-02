import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="border border-slate-700 bg-slate-800/50 rounded-lg p-6"
        >
          <div className="flex items-center gap-4 mb-4">
            <Skeleton className="h-12 w-12 rounded-full bg-slate-700" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-32 bg-slate-700" />
              <Skeleton className="h-4 w-16 bg-slate-700" />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Skeleton className="h-3 w-24 mb-2 bg-slate-700" />
              <Skeleton className="h-8 w-36 bg-slate-700" />
            </div>

            <div className="flex justify-between">
              <div>
                <Skeleton className="h-3 w-20 mb-2 bg-slate-700" />
                <Skeleton className="h-5 w-16 bg-slate-700" />
              </div>

              <div className="text-right">
                <Skeleton className="h-3 w-20 mb-2 bg-slate-700" />
                <Skeleton className="h-5 w-24 bg-slate-700" />
              </div>
            </div>

            <div>
              <Skeleton className="h-3 w-24 mb-2 bg-slate-700" />
              <Skeleton className="h-5 w-28 bg-slate-700" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
