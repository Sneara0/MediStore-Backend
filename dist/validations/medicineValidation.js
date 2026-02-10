"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.medicineSchema = void 0;
const zod_1 = require("zod");
exports.medicineSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, "Medicine name required"),
    description: zod_1.z.string().min(5),
    price: zod_1.z.number().positive(),
    stock: zod_1.z.number().int().min(1),
    categoryId: zod_1.z.string(),
});
