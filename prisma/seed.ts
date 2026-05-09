import { firestore } from "../src/lib/firebase-admin";
import bcrypt from "bcrypt";

async function main() {
  const hash = await bcrypt.hash("admin123", 10);
  const adminRef = firestore.collection("users").doc("default-admin");
  await adminRef.set(
    {
      email: "admin@borneotan.org",
      password: hash,
      role: "admin",
      createdAt: new Date().toISOString(),
    },
    { merge: true },
  );

  // Seed initial statistics
  const statsData = [
    { label: "Orangutans Remaining", value: "~104,700" },
    { label: "Forest Lost (ha/yr)", value: "1.3M+" },
    { label: "IUCN Status", value: "Critical" },
    { label: "Population Drop (60yr)", value: ">50%" },
  ];

  for (const s of statsData) {
    await firestore
      .collection("statistics")
      .doc(`seed-${statsData.indexOf(s) + 1}`)
      .set(
        {
          ...s,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        { merge: true },
      );
  }

  console.log("Seed complete. Admin: admin@borneotan.org / admin123");
}

main().catch(console.error);
