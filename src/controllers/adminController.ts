import { Request, Response } from "express";
import * as adminService from "../services/adminService";

// All Users
export const getAllUsers = async (req: Request, res: Response) => {
  const users = await adminService.getAllUsersService();
  res.json({ success: true, data: users });
};

// Ban/Unban User
export const toggleBanUser = async (req: Request, res: Response) => {
  const userId = req.params.id as string;
  const user = await adminService.toggleBanUserService(userId);

  res.json({ success: true, data: user });
};

// All Orders
export const getAllOrders = async (req: Request, res: Response) => {
  const orders = await adminService.getAllOrdersService();
  res.json({ success: true, data: orders });
};

// Add Category
export const addCategory = async (req: Request, res: Response) => {
  const category = await adminService.addCategoryService(req.body.name);
  res.status(201).json({ success: true, data: category });
};

// Delete Category
export const deleteCategory = async (req: Request, res: Response) => {
  await adminService.deleteCategoryService(req.params.id as string);
  res.json({ success: true, message: "Category removed" });
};
