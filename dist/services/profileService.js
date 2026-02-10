"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfileService = exports.getProfileService = void 0;
const prisma_1 = require("../config/prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
const getProfileService = async (userId) => {
    return prisma_1.prisma.user.findUnique({ where: { id: userId }, select: { id: true, name: true, email: true, role: true } });
};
exports.getProfileService = getProfileService;
const updateProfileService = async (userId, data) => {
    if (data.password) {
        data.password = await bcrypt_1.default.hash(data.password, 10);
    }
    return prisma_1.prisma.user.update({ where: { id: userId }, data });
};
exports.updateProfileService = updateProfileService;
