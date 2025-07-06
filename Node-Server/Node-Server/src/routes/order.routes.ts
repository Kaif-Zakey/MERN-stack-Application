// backend/routes/order.routes.ts
import { Router } from "express";
import {
    createOrder,
    deleteOrder,
    getOrderById,
    getOrders,
    updateOrder
} from "../controllers/order.controller";

import {authenticateToken} from "../middlewares/authenticateToken";

const orderRouter = Router();

orderRouter.use(authenticateToken)

orderRouter.post("/", createOrder);
orderRouter.get("/", getOrders);
orderRouter.get("/:id", getOrderById);
orderRouter.delete("/:id", deleteOrder);
orderRouter.put("/:id", updateOrder);

export default orderRouter;