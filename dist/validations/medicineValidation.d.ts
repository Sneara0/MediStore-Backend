import { z } from "zod";
export declare const medicineSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodString;
    price: z.ZodNumber;
    stock: z.ZodNumber;
    categoryId: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=medicineValidation.d.ts.map