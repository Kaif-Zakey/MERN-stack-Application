import {Router} from "express";
import {
    createItem,
    deleteItem,
    getItemById,
    getItems,
    updatedItem
} from "../controllers/item.controller";
import {authenticateToken} from "../middlewares/authenticateToken";


const itemRouter = Router()

itemRouter.use(authenticateToken)

itemRouter.post("/", createItem)

itemRouter.get("/", getItems)

itemRouter.get("/:itemId", getItemById)

itemRouter.delete("/:id", deleteItem)

itemRouter.put("/:id", updatedItem)

export default itemRouter