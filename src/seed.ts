/**
 * Seeds real starting content carried over from the studio's existing
 * portfolio (rebranded to Neo Lens Studios) so the site never shows
 * lorem-ipsum placeholders. Run with `npm run seed` after DATABASE_URL
 * is configured. Safe to re-run — it skips records that already exist.
 */
import { getPayload } from "payload";
import config from "./payload.config";

async function upsertByField(
  payload: Awaited<ReturnType<typeof getPayload>>,
  collection: "clients" | "projects" | "users" | "client-accounts",
  field: string,
  value: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>,
) {
  const existing = await payload.find({
    collection,
    where: { [field]: { equals: value } },
    limit: 1,
  });
  if (existing.docs.length > 0) {
    console.log(`[seed] ${collection}/${value} already exists, skipping`);
    return existing.docs[0];
  }
  const created = await payload.create({ collection, data });
  console.log(`[seed] created ${collection}/${value}`);
  return created;
}

async function run() {
  const payload = await getPayload({ config });

  const adminEmail = process.env.SEED_ADMIN_EMAIL || "admin@neolensstudios.com";
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || "change-me-now-123!";

  const existingAdmin = await payload.find({
    collection: "users",
    where: { email: { equals: adminEmail } },
    limit: 1,
  });
  if (existingAdmin.docs.length === 0) {
    await payload.create({
      collection: "users",
      data: { email: adminEmail, password: adminPassword, role: "admin", name: "Studio Admin" },
    });
    console.log(`[seed] created admin user ${adminEmail} — change this password after first login`);
  } else {
    console.log(`[seed] admin user ${adminEmail} already exists, skipping`);
  }

  const clients = [
    { name: "Taeillo", featured: true },
    { name: "Still Earth Holdings", featured: true },
    { name: "Chipper", featured: true },
    { name: "Casava", featured: true },
    { name: "9mobile", featured: true },
  ];
  for (const client of clients) {
    await upsertByField(payload, "clients", "name", client.name, client);
  }

  const taeillo = await upsertByField(payload, "clients", "name", "Taeillo", {
    name: "Taeillo",
    featured: true,
  });

  const projects = [
    {
      title: "Artefact Space",
      category: "brand-content" as const,
      summary:
        "A brand film shot inside Artefact Space, built around a message about honoring history while still living out your own imagination.",
      client: taeillo.id,
      _status: "published" as const,
    },
    {
      title: "Sounds of Lagos Fashion Week",
      category: "documentaries" as const,
      summary:
        "A documentary short featuring Bubu Ogisi, Creative Director of Iamisigo, on the act of creating and what it means to build from culture.",
      _status: "published" as const,
    },
  ];

  for (const project of projects) {
    await upsertByField(payload, "projects", "title", project.title, project);
  }

  // A demo client-portal login so /portal can be tested immediately.
  const demoClientEmail = process.env.SEED_CLIENT_EMAIL || "demo@taeillo.com";
  const demoClientPassword = process.env.SEED_CLIENT_PASSWORD || "change-me-too-123!";
  await upsertByField(payload, "client-accounts", "email", demoClientEmail, {
    name: "Taeillo Demo Contact",
    email: demoClientEmail,
    password: demoClientPassword,
    client: taeillo.id,
  });
  console.log(
    `[seed] demo client-portal login: ${demoClientEmail} / ${demoClientPassword} (change after testing)`,
  );

  console.log("[seed] done. Add cover images, video files and remaining projects from the admin.");
  process.exit(0);
}

run().catch((error) => {
  console.error("[seed] failed:", error);
  process.exit(1);
});
