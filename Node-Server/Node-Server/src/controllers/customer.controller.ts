import {CustomerModel} from "../models/Customer";
import {NextFunction, Request, Response} from "express";
import * as mongoose from "mongoose";
import {ApiError} from "../errors/ApiError";

export const createCustomer = async (req : Request, res: Response, next : NextFunction) => {

    try {
        const customer = new CustomerModel(req.body)
        await customer.save()
        res.status(201).json(customer)
    }catch (error: any){
        //error handle
        /*if (error instanceof mongoose.Error){
            res.status(400).json({message: error.message})
            return
        }
        res.status(500).json({message: "Internal Server Error"})*/

        //simpled to use middleware by next() that called in errorHandler.ts >>
        next(error)
    }


}

export const getCustomers = async (req : Request, res: Response, next : NextFunction) => {
    try{
        const customers = await CustomerModel.find()
        res.status(200).json(customers)
    }catch (error:any){
        next(error)
    }
}

export const getCustomerById = async (req : Request, res: Response, next : NextFunction) => {
    try{
        const customer = await CustomerModel.findById(req.params.customerId)
        if(!customer){
            /*res.status(404).json({message: "Customer not found!"})
            return*/
            throw new ApiError(404, "Customer not found!")
        }
        res.status(200).json(customer)
    }catch (error : any) {
        next(error)
    }
}

export const deleteCustomer = async (req : Request, res: Response, next : NextFunction) => {
    try{
        const deletedCustomer = await CustomerModel.findByIdAndDelete(req.params.id)
        if(!deletedCustomer){
            throw new ApiError(404, "Customer not found!")
        }
        res.status(200).json({message: "Customer deleted!"})
    }catch (error:any) {
        next(error)
    }
}

export const updatedCustomer = async (req : Request, res: Response, next : NextFunction) => {
     try{
         const updateCustomer = await CustomerModel.findByIdAndUpdate(
             req.params.id,
             req.body,
             {
                 new: true, // return the updated customer
                 //if false -> return the old customer
                 runValidators: true,
                 // run the validators before updating
             }
         )
         if(!updateCustomer){
             throw new ApiError(404," Customer not found")
         }
         res.status(200).json(updateCustomer)
     }catch (error:any) {
         next(error)
     }
}