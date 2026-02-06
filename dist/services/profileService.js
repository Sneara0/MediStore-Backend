import { prisma } from "../config/prisma";
import bcrypt from "bcrypt";
export const getProfileService = async (userId) => {
    return prisma.user.findUnique({ where: { id: userId }, select: { id: true, name: true, email: true, role: true } });
};
export const updateProfileService = async (userId, data) => {
    if (data.password) {
        data.password = await bcrypt.hash(data.password, 10);
    }
    return prisma.user.update({ where: { id: userId }, data });
};
//# sourceMappingURL=profileService.js.map