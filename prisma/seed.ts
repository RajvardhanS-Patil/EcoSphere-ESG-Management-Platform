import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Database...");

  // Seed Departments
  await prisma.department.upsert({
    where: { code: "OPS" },
    update: {},
    create: {
      name: "Operations",
      code: "OPS",
      head: "Sarah Connor",
    },
  });

  await prisma.department.upsert({
    where: { code: "LOG" },
    update: {},
    create: {
      name: "Logistics",
      code: "LOG",
      head: "Frank Castle",
    },
  });

  // Seed Categories
  const cat1 = await prisma.category.create({
    data: { name: "Community Service", type: "SOCIAL", status: "Active" },
  });
  
  const cat2 = await prisma.category.create({
    data: { name: "Energy Saving", type: "ENVIRONMENTAL", status: "Active" },
  });

  // Seed Emission Factors
  await prisma.emissionFactor.createMany({
    data: [
      { name: "Electricity - Grid", source: "EPA", unit: "kWh", co2ePerUnit: 0.45 },
      { name: "Diesel Fuel", source: "EPA", unit: "liter", co2ePerUnit: 2.68 },
      { name: "Flight - Short Haul", source: "EPA", unit: "km", co2ePerUnit: 0.15 },
    ]
  });

  console.log("Database seeded successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
