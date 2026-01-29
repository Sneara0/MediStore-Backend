import express from "express";
import { getHome, getShop, getMedicineDetails } from "../controllers/public.controller";

const router = express.Router();

// Public Routes
router.get("/", getHome);             // Home
router.get("/shop", getShop);        // Shop with filters
router.get("/shop/:id", getMedicineDetails); // Medicine Details

export default router;
