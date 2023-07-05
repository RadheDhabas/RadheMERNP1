import express, { Router } from 'express'
import {fetchUser, isAdmin} from "../middleware/fetchUser.js"
import { createCategoryController, deleteCategoryController, getCatogryByIdController, getCatogryController, updateCategoryController } from '../controller/categoryController.js';
const router = express.Router();

// create category
router.post('/create-category',fetchUser,isAdmin,createCategoryController);

// update category
router.put('/update-category/:id',fetchUser,isAdmin,updateCategoryController);

// get all catogerie
router.get('/get-categories',getCatogryController);

// category by id or get single category
router.get('/get-category/:id',getCatogryByIdController);

// delete category
router.delete('/delete-category/:id',fetchUser,isAdmin,deleteCategoryController);

export default router