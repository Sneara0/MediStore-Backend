import { Request, Response } from "express";
import { placeOrderService, getOrdersService, getOrderByIdService } from "../services/orderService.js";

export const placeOrder = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { shippingAddress } = req.body;
    const order = await placeOrderService(userId, shippingAddress);
    res.status(201).json(order);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const orders = await getOrdersService(userId);
    res.json(orders);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id as string
    const { orderId } = req.params as { orderId: string };
    const order = await getOrderByIdService(userId, orderId) ;
    res.json(order);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
