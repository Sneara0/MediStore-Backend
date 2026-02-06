export declare const addToCartService: (userId: string, medicineId: string, quantity: number) => Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    medicineId: string;
    quantity: number;
}>;
export declare const getCartService: (userId: string) => Promise<({
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
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    medicineId: string;
    quantity: number;
})[]>;
export declare const removeFromCartService: (cartItemId: string) => Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    medicineId: string;
    quantity: number;
}>;
//# sourceMappingURL=cartService.d.ts.map