import { Response } from "express";
import { RequestWithUser } from "../middlewares/auth";
export declare const getSellerDashboard: (req: RequestWithUser, res: Response) => Promise<void>;
export declare const getSellerMedicines: (req: RequestWithUser, res: Response) => Promise<void>;
export declare const addMedicine: (req: RequestWithUser, res: Response) => Promise<void>;
export declare const updateMedicine: (req: RequestWithUser, res: Response) => Promise<void>;
export declare const deleteMedicine: (req: RequestWithUser, res: Response) => Promise<void>;
export declare const getSellerOrders: (req: RequestWithUser, res: Response) => Promise<void>;
export declare const updateOrderStatus: (req: RequestWithUser, res: Response) => Promise<void>;
//# sourceMappingURL=sellerController.d.ts.map