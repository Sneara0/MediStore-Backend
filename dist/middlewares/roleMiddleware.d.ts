import { Response, NextFunction } from "express";
import { RequestWithUser } from "./auth";
export declare const roleMiddleware: (...roles: ("CUSTOMER" | "SELLER" | "ADMIN")[]) => (req: RequestWithUser, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=roleMiddleware.d.ts.map