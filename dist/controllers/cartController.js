import { addToCartService, getCartService, removeFromCartService } from "../services/cartService";
export const addToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { medicineId, quantity } = req.body;
        const cartItem = await addToCartService(userId, medicineId, quantity);
        res.status(201).json(cartItem);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
export const getCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const cart = await getCartService(userId);
        res.json(cart);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
export const removeFromCart = async (req, res) => {
    try {
        const { cartItemId } = req.params;
        await removeFromCartService(cartItemId);
        res.json({ message: "Removed from cart" });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
//# sourceMappingURL=cartController.js.map