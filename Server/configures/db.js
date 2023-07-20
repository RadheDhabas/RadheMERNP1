import mongoose from "mongoose"; 
const connectDB = async()=>{
  try {
    const connect = await  mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected sucessfully");
  } 
  catch (error) {
    console.log("Error in DB "+ error)
  } 
}

 export default connectDB