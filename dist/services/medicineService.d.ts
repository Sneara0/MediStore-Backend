interface MedicineQuery {
    category?: string;
    search?: string;
    minPrice?: string;
    maxPrice?: string;
}
export declare const getAllMedicinesService: (query: MedicineQuery) => Promise<({
    reviews: {
        id: string;
        createdAt: Date;
        medicineId: string;
        customerId: string;
        rating: number;
        comment: string | null;
    }[];
    category: {
        id: string;
        name: string;
    };
    seller: {
        id: string;
        name: string;
        email: string;
        password: string;
        isBanned: boolean;
        role: import("@prisma/index").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    };
} & {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    description: string;
    price: number;
    stock: number;
    categoryId: string;
    sellerId: string;
})[]>;
export declare const getMedicineByIdService: (id: string) => Promise<({
    reviews: {
        id: string;
        createdAt: Date;
        medicineId: string;
        customerId: string;
        rating: number;
        comment: string | null;
    }[];
    category: {
        id: string;
        name: string;
    };
    seller: {
        id: string;
        name: string;
        email: string;
        password: string;
        isBanned: boolean;
        role: import("@prisma/index").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    };
} & {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    description: string;
    price: number;
    stock: number;
    categoryId: string;
    sellerId: string;
}) | null>;
export {};
//# sourceMappingURL=medicineService.d.ts.map