import { prisma } from "../config/prisma";
import bcrypt from "bcrypt";
async function main() {
    const hashedPassword = await bcrypt.hash("snera24@", 10);
    await prisma.user.upsert({
        where: { email: "admin@medistore.com" },
        update: {},
        create: {
            name: "Super Admin",
            email: "snearaparvin.cse23@gmail.com",
            password: hashedPassword,
            role: "ADMIN",
            isBanned: false,
        },
    });
}
main()
    .catch(console.error)
    .finally(async () => await prisma.$disconnect());
//# sourceMappingURL=seed.js.map