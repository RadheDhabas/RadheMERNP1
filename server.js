import express from "express";
import dotenv from "dotenv";
import auth from "./Server/routes/auth.js"
import category from './Server/routes/categoriesRoutes.js'
import product from './Server/routes/productRouter.js'
import cors from "cors";
import connectToDb from "./Server/configures/db.js"; 
dotenv.config() 
connectToDb();

const app = express();
app.use(cors());
app.use(express.json()); 
const port = process.env.PORT;

    app.get('/',(req,res)=>{
        res.send("welcome to MERN Stake")
    })

    app.use('/api/auth',auth);
    app.use('/api/category',category);
    app.use('/api/product',product);
    app.listen(port,()=>{
        console.log(`server is runing    on port: ${port}`)
    })