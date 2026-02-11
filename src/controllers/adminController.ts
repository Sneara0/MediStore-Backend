import { Request, Response } from "express";
import * as adminService from "../services/adminService.js";
import jwt from "jsonwebtoken";

export const adminLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // .env ফাইল থেকে অ্যাডমিন ক্রেডেনশিয়াল নিয়ে আসা হচ্ছে
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const token = jwt.sign(
        { email, role: "ADMIN" },
        process.env.JWT_SECRET || "default_secret",
        { expiresIn: "1d" }
      );
      
      return res.status(200).json({ 
        success: true, 
        token, 
        message: "Login successful" 
      });
    }

    res.status(401).json({ success: false, message: "Invalid credentials" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get All Users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await adminService.getAllUsersService();
    res.json({ success: true, data: users });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Toggle Ban User (String check included)
export const toggleBanUser = async (req: Request, res: Response) => {
  try {
    const userId = String(req.params.id);
    const user = await adminService.toggleBanUserService(userId);
    res.json({ success: true, message: "User status updated", data: user });
  } catch (error: any) {
    res.status(404).json({ success: false, message: error.message });
  }
};

// Get All Orders
export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await adminService.getAllOrdersService();
    res.json({ success: true, data: orders });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add Category
export const addCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Category name is required" });
    
    const category = await adminService.addCategoryService(name);
    res.status(201).json({ success: true, data: category });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Category (String check included)
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const categoryId = String(req.params.id);
    await adminService.deleteCategoryService(categoryId);
    res.json({ success: true, message: "Category deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};