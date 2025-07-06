import {NextFunction, Request, Response} from "express";
import {ItemModel} from "../models/Item";
import {ApiError} from "../errors/ApiError";



export const createItem = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const item = new ItemModel(req.body)
        await item.save()
        res.status(201).json(item)
    }catch (error: any){
        next(error)
    }
}

export const getItems = async (req : Request, res: Response, next : NextFunction) => {
    try{
        const items = await ItemModel.find()
        res.status(200).json(items)
    }catch (error:any){
        next(error)
    }
}

export const getItemById = async (req : Request, res: Response, next : NextFunction) => {
    try{
        const item = await ItemModel.findById(req.params.itemId)
        if(!item){
            /*res.status(404).json({message: "Customer not found!"})
            return*/
            throw new ApiError(404, "Item not found!")
        }
        res.status(200).json(item)
    }catch (error : any) {
        next(error)
    }
}

export const deleteItem = async (req : Request, res: Response, next : NextFunction) => {
    try{
        const deletedItem = await ItemModel.findByIdAndDelete(req.params.id)
        if(!deletedItem){
            throw new ApiError(404, "Item not found!")
        }
        res.status(200).json({message: "Item deleted!"})
    }catch (error:any) {
        next(error)
    }
}

export const updatedItem = async (req : Request, res: Response, next : NextFunction) => {
    try{
        const updateItem = await ItemModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true, // return the updated customer
                //if false -> return the old customer
                runValidators: true,
                // run the validators before updating
            }
        )
        if(!updateItem){
            throw new ApiError(404," Item not found")
        }
        res.status(200).json(updateItem)
    }catch (error:any) {
        next(error)
    }
}