import { Skeleton, SkeletonPage, SkeletonText } from "@/components/Skeleton";

// A single project: back link, title block, the film, then the write-up.
export default function Loading() {
  return (
    <SkeletonPage>
      <div className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="mt-8 h-3 w-32" />
          <Skeleton className="mt-4 h-12 w-3/4" />
          <SkeletonText lines={2} className="mt-6 max-w-2xl" />
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-6 py-12">
        <Skeleton className="aspect-video w-full rounded-2xl" />
        <div className="mt-12 grid gap-12 md:grid-cols-[2fr_1fr]">
          <SkeletonText lines={6} />
          <div className="space-y-4">
            {Array.from({ length: 4 }, (_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
        </div>
      </div>
    </SkeletonPage>
  );
}
