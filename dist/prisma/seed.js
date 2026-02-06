"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../config/prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
async function main() {
    const hashedPassword = await bcrypt_1.default.hash("snera24@", 10);
    await prisma_1.prisma.user.upsert({
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
    .finally(async () => await prisma_1.prisma.$disconnect());
