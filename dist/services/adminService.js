"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoryService = exports.addCategoryService = exports.getAllOrdersService = exports.toggleBanUserService = exports.getAllUsersService = void 0;
const prisma_1 = require("../config/prisma");
const getAllUsersService = async () => {
    return prisma_1.prisma.user.findMany();
};
exports.getAllUsersService = getAllUsersService;
const toggleBanUserService = async (userId) => {
    const user = await prisma_1.prisma.user.findUnique({ where: { id: userId } });
    return prisma_1.prisma.user.update({
        where: { id: userId },
        data: { isBanned: !user?.isBanned },
    });
};
exports.toggleBanUserService = toggleBanUserService;
const getAllOrdersService = async () => {
    return prisma_1.prisma.order.findMany({
        include: {
            customer: true,
            items: { include: { medicine: true } },
        },
    });
};
exports.getAllOrdersService = getAllOrdersService;
// Category Add
const addCategoryService = async (name) => {
    return prisma_1.prisma.category.create({ data: { name } });
};
exports.addCategoryService = addCategoryService;
// Category Delete
const deleteCategoryService = async (id) => {
    return prisma_1.prisma.category.delete({ where: { id } });
};
exports.deleteCategoryService = deleteCategoryService;
