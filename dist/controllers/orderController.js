"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderById = exports.getOrders = exports.placeOrder = void 0;
const orderService_js_1 = require("../services/orderService.js");
const placeOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        const { shippingAddress } = req.body;
        const order = await (0, orderService_js_1.placeOrderService)(userId, shippingAddress);
        res.status(201).json(order);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.placeOrder = placeOrder;
const getOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await (0, orderService_js_1.getOrdersService)(userId);
        res.json(orders);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.getOrders = getOrders;
const getOrderById = async (req, res) => {
    try {
        const userId = req.user.id;
        const { orderId } = req.params;
        const order = await (0, orderService_js_1.getOrderByIdService)(userId, orderId);
        res.json(order);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.getOrderById = getOrderById;
