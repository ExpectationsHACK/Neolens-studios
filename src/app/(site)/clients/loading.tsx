import { Skeleton, SkeletonHeading, SkeletonPage, SkeletonText } from "@/components/Skeleton";

export default function Loading() {
  return (
    <SkeletonPage className="mx-auto max-w-6xl px-6 py-20">
      <SkeletonHeading withText={false} />
      <div className="mt-14 grid gap-6 sm:grid-cols-2">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="rounded-2xl bg-surface p-8">
            <Skeleton className="h-10 w-36" />
            <SkeletonText lines={3} className="mt-6" />
            <Skeleton className="mt-5 h-3 w-40" />
          </div>
        ))}
      </div>
    </SkeletonPage>
  );
}
