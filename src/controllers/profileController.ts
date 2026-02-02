import { Request, Response } from "express";
import { getProfileService, updateProfileService } from "../services/profileService";

export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const user = await getProfileService(userId);
    res.json(user);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const updated = await updateProfileService(userId, req.body);
    res.json({ message: "Profile updated", user: updated });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
