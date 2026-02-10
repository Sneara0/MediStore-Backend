"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserService = exports.registerUserService = void 0;
const prisma_1 = require("../config/prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerUserService = async (name, email, password, role) => {
    const roles = ["CUSTOMER", "SELLER"];
    if (!roles.includes(role))
        throw new Error("Invalid role");
    const existing = await prisma_1.prisma.user.findUnique({ where: { email } });
    if (existing)
        throw new Error("Email already exists");
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    const user = await prisma_1.prisma.user.create({
        data: { name, email, password: hashedPassword, role }
    });
    return user;
};
exports.registerUserService = registerUserService;
const loginUserService = async (email, password) => {
    const user = await prisma_1.prisma.user.findUnique({ where: { email } });
    if (!user)
        throw new Error("Invalid credentials");
    const isMatch = await bcrypt_1.default.compare(password, user.password);
    if (!isMatch)
        throw new Error("Invalid credentials");
    const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
    return { user, token };
};
exports.loginUserService = loginUserService;
