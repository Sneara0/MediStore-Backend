import * as adminService from "../services/adminService";
// All Users
export const getAllUsers = async (req, res) => {
    const users = await adminService.getAllUsersService();
    res.json({ success: true, data: users });
};
// Ban/Unban User
export const toggleBanUser = async (req, res) => {
    const userId = req.params.id;
    const user = await adminService.toggleBanUserService(userId);
    res.json({ success: true, data: user });
};
// All Orders
export const getAllOrders = async (req, res) => {
    const orders = await adminService.getAllOrdersService();
    res.json({ success: true, data: orders });
};
// Add Category
export const addCategory = async (req, res) => {
    const category = await adminService.addCategoryService(req.body.name);
    res.status(201).json({ success: true, data: category });
};
// Delete Category
export const deleteCategory = async (req, res) => {
    await adminService.deleteCategoryService(req.params.id);
    res.json({ success: true, message: "Category removed" });
};
//# sourceMappingURL=adminController.js.map