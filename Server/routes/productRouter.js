import express from "express";
import formidable from "express-formidable";
import { fetchUser, isAdmin } from "../middleware/fetchUser.js";
import {
  createProductController,
  deleteProductController,
  getAllProductController,
  getProductController,
  getProductPhotoController,
  productFiltersController,
  searchProductController,
  updateProductController,
  similarProductController,
} from "../controller/productController.js";

const router = express.Router();

router.post(
  "/create-product",
  fetchUser,
  isAdmin,
  formidable(),
  createProductController
);
router.put(
  "/update-product/:product_id",
  fetchUser,
  isAdmin,
  formidable(),
  updateProductController
);
router.get("/all-products", getAllProductController);
router.get("/:slug", getProductController);
router.get("/product-photo/:product_id", getProductPhotoController);
router.delete(
  "/delete-product/:product_id",
  fetchUser,
  isAdmin,
  deleteProductController
);
router.post("/filter-products", productFiltersController);
router.get('/search/:keyword',searchProductController);
router.get('/similar-product/:prodId/:category',similarProductController);
export default router;
