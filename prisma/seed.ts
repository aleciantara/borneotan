import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

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

  // Seed initial statistics
  const statsData = [
    { label: "Orangutans Remaining", value: "~104,700" },
    { label: "Forest Lost (ha/yr)", value: "1.3M+" },
    { label: "IUCN Status", value: "Critical" },
    { label: "Population Drop (60yr)", value: ">50%" },
  ];

  for (const s of statsData) {
    await prisma.statistic.upsert({
      where: { id: statsData.indexOf(s) + 1 },
      update: {},
      create: s,
    });
  }

  console.log("Seed complete. Admin: admin@borneotan.org / admin123");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
