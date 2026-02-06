export type Role = "CUSTOMER" | "SELLER" | "ADMIN";
export declare const registerUserService: (name: string, email: string, password: string, role: Role) => Promise<{
    id: string;
    name: string;
    email: string;
    password: string;
    isBanned: boolean;
    role: import("@prisma/index").$Enums.Role;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const loginUserService: (email: string, password: string) => Promise<{
    user: {
        id: string;
        name: string;
        email: string;
        password: string;
        isBanned: boolean;
        role: import("@prisma/index").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    };
    token: string;
}>;
//# sourceMappingURL=authService.d.ts.map