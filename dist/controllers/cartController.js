"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFromCart = exports.getCart = exports.addToCart = void 0;
const cartService_js_1 = require("../services/cartService.js");
const addToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { medicineId, quantity } = req.body;
        const cartItem = await (0, cartService_js_1.addToCartService)(userId, medicineId, quantity);
        res.status(201).json(cartItem);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.addToCart = addToCart;
const getCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const cart = await (0, cartService_js_1.getCartService)(userId);
        res.json(cart);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.getCart = getCart;
const removeFromCart = async (req, res) => {
    try {
        const { cartItemId } = req.params;
        await (0, cartService_js_1.removeFromCartService)(cartItemId);
        res.json({ message: "Removed from cart" });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.removeFromCart = removeFromCart;
