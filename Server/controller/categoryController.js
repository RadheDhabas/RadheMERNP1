import Category from "../models/CategoryModel.js";
import slugify from "slugify";

// create category controller
export const createCategoryController = async(req,res)=>{
    const {name} = req.body;
    console.log(req.body);
    if(!name){
        return res.status(401).send("Category name is required");
    }
try {
    const checkCategory = await Category.findOne({name});
if(checkCategory){
  return  res.status(200).send({
        message:"Category alread exist",
        success:true
    })
}
else{
    const addCategory = await Category.create({
        name:name,
        slug: slugify(name)
    }) 
  return  res.status(201).send({
        message:"Category created",
        success:true,
        category:addCategory,
    })
}
} catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,
        error,
        message:'Error in Category'
    })
}
}

// update category controller
export const updateCategoryController = async(req,res)=>{
    
        try {
            const { name } = req.body;
            const { id } = req.params;
            const category = await Category.findByIdAndUpdate(
              id,
              { name:name, slug: slugify(name) },
              { new: true }
            );  
            res.status(200).send({
              success: true,
              messsage: "Category Updated Successfully",
              category,
            });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error while updating category");
    }
}

// get all caregories
export const getCatogryController= async(req,res)=>{
    try {
        const categories = await Category.find({});
        res.status(200).send({categories:categories})
    } catch (error) {
        console.error(error.message);
        res.status(501).send("Error while getting all categories")
    }
}
// get category by id
export const getCatogryByIdController= async(req,res)=>{
    try {
         
        const category = await Category.findOne({slug:req.params.slug});

        console.log(category)
        res.status(200).send({categories:category})
    } catch (error) {
        console.error(error.message);
        res.status(501).send("Error while getting a category")
    }
}

// delete category
export const deleteCategoryController = async (req,res)=>{
    try {
        let {id} = req.params;
        let cat_id = await Category.findOne({_id:id});
        if(cat_id){
            await  Category.findByIdAndDelete({_id:id});
            res.status(200).send({
              message:"category deleted successfullys"
            })
        }
     else{
        res.status(200).send({
            message:"category does not exist"
          })
     }
    } catch (error) {
        console.error({error:error.message});
        res.status(401).send({message:"error while deliting category"});
    }
}