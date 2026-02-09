import {prisma} from "../config/prisma";

import bcrypt from "bcrypt";

async function main() {
  const hashedPassword = await bcrypt.hash("snera29@", 10);

  await prisma.user.upsert({
    where: { email: "snearaparvin.cse1@gmail.com" },
    update: {},
    create: {
      name: "sneara",
      email: "snearaparvin.cse1@gmail.com",
      password: hashedPassword,
      role: "ADMIN",
      isBanned: false,
    },
  });


}

main()
  .catch(console.error)
  .finally(async () => await prisma.$disconnect());
