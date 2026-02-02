import { Request, Response } from "express";
import { addToCartService, getCartService, removeFromCartService } from "../services/cartService";

export const addToCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { medicineId, quantity } = req.body;
    const cartItem = await addToCartService(userId, medicineId, quantity);
    res.status(201).json(cartItem);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const cart = await getCartService(userId);
    res.json(cart);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const removeFromCart = async (req: Request, res: Response) => {
  try {
    const { cartItemId } = req.params as { cartItemId: string };
    await removeFromCartService(cartItemId);
    res.json({ message: "Removed from cart" });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
