import express from "express";
import dotenv from "dotenv";
import auth from "./routes/auth.js"
import category from './routes/categoriesRoutes.js'
import payment from './routes/payment.js'
import product from './routes/productRouter.js'
import order from './routes/orders.js'
import cors from "cors";
import connectToDb from "./configures/db.js"; 
import cartWishlist from "./routes/cartWishlist.js"
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
    app.use("/payment", payment);
    app.use('/api/orders',order);
    app.use('/api',cartWishlist);
    app.listen(port,()=>{
        console.log(`server is runing    on port: ${port}`)
    })
