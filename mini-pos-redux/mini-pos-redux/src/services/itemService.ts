
import type { Item } from "../types/Item.ts";
import { apiClient } from "./apiClient";


export const getAllItems = async () : Promise <Item[]> =>{
    const response = await apiClient.get("/items")
    return response.data
}

export const removeItem = async (_id: string) :Promise<void> => {
    await apiClient.delete(`/items/${_id}`)
}

export const addItem = async (itemData: Omit<Item, "_id">) :Promise<Item> => {
    const response = await apiClient.post("/items", itemData)
    return response.data
}

export const editItem = async (_id:string, itemData : Omit<Item, "_id">) : Promise<Item> => {
    const response = await apiClient.put(`/items/${_id}`,itemData)
    return response.data
}