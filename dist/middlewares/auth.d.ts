import { Request, Response, NextFunction } from "express";
export interface RequestWithUser extends Request {
    user?: {
        id: string;
        name: string;
        email: string;
        role: "CUSTOMER" | "SELLER" | "ADMIN";
        isBanned: boolean;
    };
}
export declare const protect: (roles?: ("CUSTOMER" | "SELLER" | "ADMIN")[]) => (req: RequestWithUser, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=auth.d.ts.map