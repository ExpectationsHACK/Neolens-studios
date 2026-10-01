import { Skeleton, SkeletonHeading, SkeletonPage } from "@/components/Skeleton";

// Same tile rhythm as PhoneGalleryTile so the grid doesn't jump when it loads.
const ASPECTS = ["aspect-[3/4]", "aspect-square", "aspect-[4/5]", "aspect-[9/16]", "aspect-[4/5]"];

export default function Loading() {
  return (
    <SkeletonPage className="mx-auto max-w-6xl px-6 py-20">
      <SkeletonHeading />
      <div className="mt-12 flex flex-wrap gap-2">
        {Array.from({ length: 7 }, (_, i) => (
          <Skeleton key={i} className="h-9 w-24 rounded-full" />
        ))}
      </div>
      <div className="mt-10 columns-2 gap-3 md:columns-3 lg:columns-4">
        {Array.from({ length: 12 }, (_, i) => (
          <Skeleton key={i} className={`mb-3 w-full break-inside-avoid rounded-2xl ${ASPECTS[i % ASPECTS.length]}`} />
        ))}
      </div>
    </SkeletonPage>
  );
}
