import {Router} from "express";
import {
    createCustomer,
    deleteCustomer,
    getCustomerById,
    getCustomers,
    updatedCustomer
} from "../controllers/customer.controller";
import {authenticateToken} from "../middlewares/authenticateToken";

const customerRouter = Router()

//use authenticate token on customer route : therefore this blocks all the routes in this router
customerRouter.use(authenticateToken)

customerRouter.post("/", createCustomer)

customerRouter.get("/", getCustomers)

customerRouter.get("/:customerId", getCustomerById)

customerRouter.delete("/:id", deleteCustomer)

customerRouter.put("/:id", updatedCustomer)

export default customerRouter
