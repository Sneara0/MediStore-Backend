export declare const placeOrderService: (userId: string, shippingAddress: string) => Promise<{
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
}>;
export declare const getOrdersService: (userId: string) => Promise<({
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
export declare const getOrderByIdService: (userId: string, orderId: string) => Promise<{
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
}>;
//# sourceMappingURL=orderService.d.ts.map