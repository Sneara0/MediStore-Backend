"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.addCategory = exports.getAllOrders = exports.toggleBanUser = exports.getAllUsers = void 0;
const adminService = __importStar(require("../services/adminService.js"));
// All Users
const getAllUsers = async (req, res) => {
    const users = await adminService.getAllUsersService();
    res.json({ success: true, data: users });
};
exports.getAllUsers = getAllUsers;
// Ban/Unban User
const toggleBanUser = async (req, res) => {
    const userId = req.params.id;
    const user = await adminService.toggleBanUserService(userId);
    res.json({ success: true, data: user });
};
exports.toggleBanUser = toggleBanUser;
// All Orders
const getAllOrders = async (req, res) => {
    const orders = await adminService.getAllOrdersService();
    res.json({ success: true, data: orders });
};
exports.getAllOrders = getAllOrders;
// Add Category
const addCategory = async (req, res) => {
    const category = await adminService.addCategoryService(req.body.name);
    res.status(201).json({ success: true, data: category });
};
exports.addCategory = addCategory;
// Delete Category
const deleteCategory = async (req, res) => {
    await adminService.deleteCategoryService(req.params.id);
    res.json({ success: true, message: "Category removed" });
};
exports.deleteCategory = deleteCategory;
