
import type { Order } from "../types/Order";
import { apiClient } from "./apiClient";


export const getAllOrders = async (): Promise<Order[]> => {
    const response = await apiClient.get("/orders");
    return response.data;
};


export const removeOrder = async (_id: string): Promise<void> => {
    await apiClient.delete(`/orders/${_id}`);
};


export const addOrder = async (orderData: Omit<Order, "_id" | "date" | "total">): Promise<Order> => {

    const response = await apiClient.post("/orders", orderData);
    return response.data;
};


export const editOrder = async (_id: string, orderData: Omit<Order, "_id" | "date" | "total">): Promise<Order> => {
    const response = await apiClient.put(`/orders/${_id}`, orderData);
    return response.data;
};
