import jwt from 'jsonwebtoken';
import User from '../models/User.js';
// import User from '../models/User.js';

// fetchuser : it chack that a user is loged in or not
export const fetchUser = async (req,res,next)=>{
// Get the user from jwt token and add the id of requested object
   
const token = req.header("auth-token"); 
if(!token){
   return res.status(401).send({error:"Token not found"})
}
try{
    const data = jwt.verify(token,process.env.JWT_SECRET);
 
   req.user = data.user;
   next();
}
catch(error){
    res.status(401).send({error:"Please authenticate using a valid token!"})
}
}
 
export const isAdmin = async (req, res, next) => {
    try {

      const user = await User.findById(req.user.id);
       
      if (user.role !== 1) {
        return res.status(401).send({
          success: false,
          message: "UnAuthorized Access",
        });
      } else {
        next();
      }
    } catch (error) {
      console.log(error);
      res.status(401).send({
        success: false,
        error,
        message: "Error in admin middelware",
      });
    }
  };
