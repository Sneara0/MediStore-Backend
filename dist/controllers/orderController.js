import { placeOrderService, getOrdersService, getOrderByIdService } from "../services/orderService";
export const placeOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        const { shippingAddress } = req.body;
        const order = await placeOrderService(userId, shippingAddress);
        res.status(201).json(order);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
export const getOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await getOrdersService(userId);
        res.json(orders);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
export const getOrderById = async (req, res) => {
    try {
        const userId = req.user.id;
        const { orderId } = req.params;
        const order = await getOrderByIdService(userId, orderId);
        res.json(order);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
//# sourceMappingURL=orderController.js.map