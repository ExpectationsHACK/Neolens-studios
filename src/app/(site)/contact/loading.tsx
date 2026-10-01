import { Skeleton, SkeletonHeading, SkeletonPage } from "@/components/Skeleton";

// Contact details on the left, the project form on the right.
export default function Loading() {
  return (
    <SkeletonPage className="mx-auto max-w-5xl px-6 py-20">
      <div className="grid gap-16 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <SkeletonHeading />
          <div className="mt-10 space-y-6">
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i}>
                <Skeleton className="h-2.5 w-14" />
                <Skeleton className="mt-2 h-4 w-48" />
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          {Array.from({ length: 4 }, (_, row) => (
            <div key={row} className="grid gap-6 sm:grid-cols-2">
              {[0, 1].map((col) => (
                <div key={col}>
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="mt-2 h-12 w-full rounded-xl" />
                </div>
              ))}
            </div>
          ))}
          <div>
            <Skeleton className="h-3 w-32" />
            <Skeleton className="mt-2 h-32 w-full rounded-xl" />
          </div>
          <Skeleton className="h-12 w-44 rounded-full" />
        </div>
      </div>
    </SkeletonPage>
  );
}
