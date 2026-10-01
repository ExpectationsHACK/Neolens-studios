import { LogoMarquee } from "@/components/LogoMarquee";
import { Skeleton } from "@/components/Skeleton";
import { getAllClients } from "@/lib/data";

/**
 * The homepage's only database-backed section. Rendered inside <Suspense> so
 * the rest of the page never waits on the database.
 */
export async function ClientLogos() {
  const clients = await getAllClients();
  return <LogoMarquee clients={clients} />;
}

export function LogoMarqueeSkeleton() {
  return (
    <div aria-hidden="true" className="space-y-6 overflow-hidden">
      {[0, 1].map((row) => (
        <div key={row} className={`flex gap-16 px-8 ${row ? "pl-24" : ""}`}>
          {Array.from({ length: 8 }, (_, i) => (
            <Skeleton key={i} className="h-8 w-32 shrink-0" />
          ))}
        </div>
      ))}
    </div>
  );
}
