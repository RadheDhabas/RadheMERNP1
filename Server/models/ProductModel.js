import mongoose from "mongoose"; 
const ProductSchema = new mongoose.Schema({
name:{
    type:String,
    required:true,
},
slug:{
    type:String, 
},
description:{
    type:String,
    required:true
},
product_brand:{
    type:String,
    required:true,
},
price:{
    type:Number,
    required:true,
},
category:{
    type:mongoose.ObjectId,
    ref:"Category",
    required:true,
},
quantity:{
    type:Number,
    required:true,
},
photo:{
    type:String,
required:true,
}
})

let Product = mongoose.model('Product',ProductSchema);
export default Product