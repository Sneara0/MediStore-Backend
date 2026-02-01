import {prisma} from "../config/prisma";

import bcrypt from "bcrypt";

async function main() {
  const hashedPassword = await bcrypt.hash("snera23@", 10);

  await prisma.user.upsert({
    where: { email: "admin@medistore.com" },
    update: {},
    create: {
      name: "Super Admin",
      email: "snearaparvin.cse@gmail.com",
      password: hashedPassword,
      role: "ADMIN",
      isBanned: false,
    },
  });

  console.log("Admin seeded: admin@medistore.com / Admin@1234");
}

main()
  .catch(console.error)
  .finally(async () => await prisma.$disconnect());
