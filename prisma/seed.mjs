import { createRequire } from "module";
import { fileURLToPath, pathToFileURL } from "url";
import path from "path";
import { createHash } from "crypto";

// Dynamically import the generated Prisma client
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { PrismaClient } = await import(
  pathToFileURL(path.resolve(__dirname, "../src/generated/prisma/client.ts")).href
);

const bcrypt = (await import("bcrypt")).default;

const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash("admin123", 10);
  await prisma.user.upsert({
    where: { email: "admin@borneotan.org" },
    update: {},
    create: {
      email: "admin@borneotan.org",
      password: hash,
      role: "admin",
    },
  });

  const statsData = [
    { label: "Orangutans Remaining", value: "~104,700" },
    { label: "Forest Lost (ha/yr)", value: "1.3M+" },
    { label: "IUCN Status", value: "Critical" },
    { label: "Population Drop (60yr)", value: ">50%" },
  ];

  for (const s of statsData) {
    const existing = await prisma.statistic.findFirst({ where: { label: s.label } });
    if (!existing) {
      await prisma.statistic.create({ data: s });
    }
  }

  console.log("Seed complete. Admin: admin@borneotan.org / admin123");
}

await main().catch(console.error).finally(() => prisma.$disconnect());
