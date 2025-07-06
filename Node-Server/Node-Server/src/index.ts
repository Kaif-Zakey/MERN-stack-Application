import express from "express"
import dotenv from "dotenv"
import {connectDB} from "./db/mongo";
import rootRouter from "./routes";
import {errorHandler} from "./middlewares/errorHandler";
import cors from "cors"
import cookieParser from "cookie-parser";

dotenv.config()

const app = express()

//handle CORS
const corsOptions = {
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
    methods:"GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders:["Content-Type", "Authorization"]
}

app.use(cors(corsOptions))

app.use(express.json()) // this is like jackson databind use in springboot project that handle json type

app.use(cookieParser())

// localhost:3000
// localhost:3000/ [GET] -> Hello World

//const PORT = 3000
const PORT = process.env.PORT

/*app.get("/",(req, res) => {
    res.send("Hello World!")
})*/

app.use("/api" , rootRouter)
//use middleware errorhandler
app.use(errorHandler)


connectDB().then(()=>{

    app.listen(PORT, ()=>{
        console.log(`Server running on http://localhost:${PORT}`)
    })

})

//connectDB()

/*app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`)
})*/



