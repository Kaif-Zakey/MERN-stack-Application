//import axios from "axios";
import type {Customer} from "../types/Customer.ts";
import {apiClient} from "./apiClient.ts";

//Applying DRY Principle
//const CUSTOMERS_API_URL = `${BASE_URL}/customers`

export const getAllCustomers = async () : Promise <Customer[]> =>{
    const response = await apiClient.get("/customers")
    return response.data
}

export const removeCustomer = async (_id: string) :Promise<void> =>{
    await apiClient.delete(`/customers/${_id}`)
}

export const addsCustomer = async (customerData: Omit<Customer, "_id">) :Promise<Customer> => {
    const response = await apiClient.post("/customers", customerData)
        return response.data
}

export const editCustomer = async (_id:string, customerData : Omit<Customer, "_id">) : Promise<Customer> => {
    const response = await apiClient.put(`/customers/${_id}`,customerData)
    return response.data
}
