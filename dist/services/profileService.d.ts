export declare const getProfileService: (userId: string) => Promise<{
    id: string;
    name: string;
    email: string;
    role: import("@prisma/index").$Enums.Role;
} | null>;
export declare const updateProfileService: (userId: string, data: {
    name?: string;
    email?: string;
    password?: string;
}) => Promise<{
    id: string;
    name: string;
    email: string;
    password: string;
    isBanned: boolean;
    role: import("@prisma/index").$Enums.Role;
    createdAt: Date;
    updatedAt: Date;
}>;
//# sourceMappingURL=profileService.d.ts.map