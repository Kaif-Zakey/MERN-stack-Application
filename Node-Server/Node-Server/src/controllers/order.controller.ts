
import { NextFunction, Request, Response } from "express";
import { OrderModel, OrderItem } from "../models/Order";
import { CustomerModel } from "../models/Customer";
import { ItemModel } from "../models/Item";
import { ApiError } from "../errors/ApiError";
import mongoose from "mongoose";


const calculateOrderTotal = (items: OrderItem[]): number => {
    return items.reduce((sum, item) => sum + item.subtotal, 0);
};

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { customerId, items, status } = req.body;

        // 1. Validate customerId and fetch customerName
        if (!customerId || !mongoose.Types.ObjectId.isValid(customerId)) {
            throw new ApiError(400, "Invalid customer ID provided.");
        }
        const customer = await CustomerModel.findById(customerId);
        if (!customer) {
            throw new ApiError(404, "Customer not found.");
        }
        const customerName = customer.name; // Get customer name from DB

        // 2. Validate items and recalculate subtotals/total based on backend item prices
        if (!Array.isArray(items) || items.length === 0) {
            throw new ApiError(400, "Order must contain at least one item.");
        }

        const validatedItems: OrderItem[] = [];
        let calculatedTotal = 0;

        for (const orderItem of items) {
            if (!orderItem.itemId || !mongoose.Types.ObjectId.isValid(orderItem.itemId)) {
                throw new ApiError(400, `Invalid item ID for item: ${orderItem.itemName || 'unknown'}.`);
            }

            const itemInDb = await ItemModel.findById(orderItem.itemId);
            if (!itemInDb) {
                throw new ApiError(404, `Item '${orderItem.itemName || orderItem.itemId}' not found in database.`);
            }


            if (typeof orderItem.quantity !== 'number' || orderItem.quantity <= 0) {
                throw new ApiError(400, `Invalid quantity for item '${itemInDb.name}'. Quantity must be a positive number.`);
            }


            const subtotal = itemInDb.price * orderItem.quantity;
            calculatedTotal += subtotal;

            validatedItems.push({
                itemId: itemInDb._id,
                itemName: itemInDb.name,
                price: itemInDb.price,
                quantity: orderItem.quantity,
                subtotal: subtotal
            });
        }

        // 3. Create the order
        const order = new OrderModel({
            customerId: customer._id,
            customerName: customerName,
            items: validatedItems,
            total: calculatedTotal,
            date: new Date(),
            status: status || "pending"
        });

        await order.save();
        res.status(201).json(order);

    } catch (error: any) {
        next(error);
    }
};

export const getOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orders = await OrderModel.find()
            .populate('customerId', 'name email')
            .sort({ date: -1 });

        res.status(200).json(orders);
    } catch (error: any) {
        next(error);
    }
};

export const getOrderById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new ApiError(400, "Invalid order ID format.");
        }

        const order = await OrderModel.findById(id)
            .populate('customerId', 'name email phone address')
            .populate('items.itemId', 'name price');

        if (!order) {
            throw new ApiError(404, "Order not found!");
        }
        res.status(200).json(order);
    } catch (error: any) {
        next(error);
    }
};

export const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new ApiError(400, "Invalid order ID format.");
        }

        const deletedOrder = await OrderModel.findByIdAndDelete(id);
        if (!deletedOrder) {
            throw new ApiError(404, "Order not found!");
        }
        res.status(200).json({ message: "Order deleted successfully!" });
    } catch (error: any) {
        next(error);
    }
};

export const updateOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { customerId, items, status } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new ApiError(400, "Invalid order ID format.");
        }

        let updatedFields: any = { status };

        // If items are provided in the update, validate and recalculate
        if (items) {
            if (!Array.isArray(items) || items.length === 0) {
                throw new ApiError(400, "Order must contain at least one item.");
            }

            const validatedItems: OrderItem[] = [];
            let calculatedTotal = 0;

            for (const orderItem of items) {
                if (!orderItem.itemId || !mongoose.Types.ObjectId.isValid(orderItem.itemId)) {
                    throw new ApiError(400, `Invalid item ID for item: ${orderItem.itemName || 'unknown'}.`);
                }

                const itemInDb = await ItemModel.findById(orderItem.itemId);
                if (!itemInDb) {
                    throw new ApiError(404, `Item '${orderItem.itemName || orderItem.itemId}' not found in database.`);
                }

                if (typeof orderItem.quantity !== 'number' || orderItem.quantity <= 0) {
                    throw new ApiError(400, `Invalid quantity for item '${itemInDb.name}'. Quantity must be a positive number.`);
                }

                const subtotal = itemInDb.price * orderItem.quantity;
                calculatedTotal += subtotal;

                validatedItems.push({
                    itemId: itemInDb._id,
                    itemName: itemInDb.name,
                    price: itemInDb.price,
                    quantity: orderItem.quantity,
                    subtotal: subtotal
                });
            }
            updatedFields.items = validatedItems;
            updatedFields.total = calculatedTotal;
        }

        // If customerId is provided in the update, validate and update customerName
        if (customerId) {
            if (!mongoose.Types.ObjectId.isValid(customerId)) {
                throw new ApiError(400, "Invalid customer ID provided.");
            }
            const customer = await CustomerModel.findById(customerId);
            if (!customer) {
                throw new ApiError(404, "Customer not found.");
            }
            updatedFields.customerId = customer._id;
            updatedFields.customerName = customer.name;
        }


        const updatedOrder = await OrderModel.findByIdAndUpdate(
            id,
            { $set: updatedFields },
            {
                new: true,
                runValidators: true,
                context: 'query'
            }
        ).populate('customerId', 'name email').populate('items.itemId', 'name price');

        if (!updatedOrder) {
            throw new ApiError(404, "Order not found.");
        }
        res.status(200).json(updatedOrder);

    } catch (error: any) {
        next(error);
    }
};