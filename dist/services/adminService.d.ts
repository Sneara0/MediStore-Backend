export declare const getAllUsersService: () => Promise<{
    id: string;
    name: string;
    email: string;
    password: string;
    isBanned: boolean;
    role: import("@prisma/index").$Enums.Role;
    createdAt: Date;
    updatedAt: Date;
}[]>;
export declare const toggleBanUserService: (userId: string) => Promise<{
    id: string;
    name: string;
    email: string;
    password: string;
    isBanned: boolean;
    role: import("@prisma/index").$Enums.Role;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const getAllOrdersService: () => Promise<({
    customer: {
        id: string;
        name: string;
        email: string;
        password: string;
        isBanned: boolean;
        role: import("@prisma/index").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    };
    items: ({
        medicine: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            price: number;
            stock: number;
            categoryId: string;
            sellerId: string;
        };
    } & {
        id: string;
        price: number;
        medicineId: string;
        quantity: number;
        orderId: string;
    })[];
} & {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    status: import("@prisma/index").$Enums.OrderStatus;
    total: number;
    shippingAddress: string;
    customerId: string;
})[]>;
export declare const addCategoryService: (name: string) => Promise<{
    id: string;
    name: string;
}>;
export declare const deleteCategoryService: (id: string) => Promise<{
    id: string;
    name: string;
}>;
//# sourceMappingURL=adminService.d.ts.map