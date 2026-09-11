import Image from "next/image";
import type { Client } from "@/types";
import { isMedia } from "@/types";

function LogoItem({ client }: { client: Client }) {
  const logo = isMedia(client.logo) ? client.logo : null;
  return (
    <div className="flex h-12 shrink-0 items-center px-8 opacity-80 grayscale transition-opacity hover:opacity-100">
      {logo?.url ? (
        <Image
          src={logo.url}
          alt={client.name}
          width={120}
          height={40}
          className="max-h-10 w-auto object-contain"
        />
      ) : (
        <span className="whitespace-nowrap font-display text-xl font-semibold text-text">
          {client.name}
        </span>
      )}
    </div>
  );
}

export function LogoMarquee({ clients }: { clients: Client[] }) {
  if (clients.length === 0) {
    return (
      <div className="border border-dashed border-border p-10 text-center text-text-muted">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">
          No clients added yet
        </p>
        <p className="mt-2 text-sm">Add clients in the admin to show the logo wall here.</p>
      </div>
    );
  }

  const rowDown = [...clients].reverse();

  return (
    <div className="space-y-6 overflow-hidden">
      <div className="flex w-max animate-marquee-left">
        {[...clients, ...clients].map((client, i) => (
          <LogoItem key={`up-${client.id}-${i}`} client={client} />
        ))}
      </div>
      <div className="flex w-max animate-marquee-right">
        {[...rowDown, ...rowDown].map((client, i) => (
          <LogoItem key={`down-${client.id}-${i}`} client={client} />
        ))}
      </div>
    </div>
  );
}
