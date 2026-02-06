export declare const getSellerDashboardService: (sellerId: string) => Promise<{
    totalMedicines: number;
    totalOrders: number;
    pendingOrders: number;
}>;
export declare const getSellerMedicinesService: (sellerId: string) => Promise<({
    category: {
        id: string;
        name: string;
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
export declare const addMedicineService: (sellerId: string, data: any) => Promise<{
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    description: string;
    price: number;
    stock: number;
    categoryId: string;
    sellerId: string;
}>;
export declare const updateMedicineService: (sellerId: string, medicineId: string, data: any) => Promise<{
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    description: string;
    price: number;
    stock: number;
    categoryId: string;
    sellerId: string;
}>;
export declare const deleteMedicineService: (sellerId: string, medicineId: string) => Promise<{
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    description: string;
    price: number;
    stock: number;
    categoryId: string;
    sellerId: string;
}>;
export declare const getSellerOrdersService: (sellerId: string) => Promise<({
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
export declare const updateOrderStatusService: (sellerId: string, orderId: string, status: string) => Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    status: import("@prisma/index").$Enums.OrderStatus;
    total: number;
    shippingAddress: string;
    customerId: string;
}>;
//# sourceMappingURL=sellerService.d.ts.map