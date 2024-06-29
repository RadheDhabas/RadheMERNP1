import slugify from "slugify";
import Product from "../models/ProductModel.js";

// create product
export const createProductController = async (req, res) => {
  const { name, description, price, category, quantity, photo } =
    req.fields;
  if (!name && !description && !price && !category && !quantity && !photo) {
    return res.status(501).send({ message: "Provide all the required fields" });
  }
  console.log(category)
  try {
    const product = await Product.create({
      ...req.fields,
      slug: slugify(name),
    });
    return res.status(200).send({ message: "Product added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Error in creating product",
    });
  }
};

// Get all products
//  Avoid fetching photo with same request. fetch with different request so loading time can be reduced
export const getAllProductController = async (req, res) => {
  try {
    const products = await Product.find({})
      // .select("-photo")
      .populate("category")
      .limit(20)
      .sort({ date: 1 });
    return res
      .status(200)
      .send({ products: products, length: products.length });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error in fetching products" });
  }
};

// Get single product with id or slug
export const getProductController = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await Product.findOne({ slug })
      // .select("-photo")  uncomment this line if we store image in mongo not as link
      .populate("category");
    return res.status(200).send({ product: product });
  } catch (error) {
    console.error(error);
    res.send(500).send({ message: "Error in fetching products" });
  }
};

// get product's photo
export const getProductPhotoController = async (req, res) => {
  try {
    const productId = req.params.product_id;
    const photo = await Product.findById(productId).select("photo");
    if (photo) {
      res.status(200).send(photo["photo"]);
    }
  } catch (error) {
    console.error(error);
    res.send(500).send({ message: "Error in fetching product photo" });
  }
};

// delete product controller (delete by product id)
export const deleteProductController = async (req, res) => {
  try {
    const p_id = req.params.product_id;
    const product = await Product.findByIdAndDelete(p_id);
    return res.status(200).send({ message: "Product deleted successfullt" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error while deleting product" });
  }
};

// update product
export const updateProductController = async (req, res) => {
  const { name, slug, description, price, category, quantity, photo } =
    req.fields;
  if (!name && !description && !price && !category && !quantity && !photo) {
    return res.status(501).send({ message: "Provide all the required fields" });
  }
  try {
    const p_id = req.params.product_id;
    const product = await Product.findByIdAndUpdate(p_id, {
      ...req.fields,
      slug: slugify(name),
    });
    return res.status(200).send({ message: "Product updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Error in updating product",
    });
  }
};

// product filter controller
export const productFiltersController = async (req, res) => {
  try {
    const { filterCat, filterPrice } = req.body;
    let args = {};
    if (filterCat.length > 0) args.category = filterCat;
    if (filterPrice.length > 0) {
      let pricearr = filterPrice.map((i) => {
        return { price: { $gte: i[0], $lte: i[1] } };
      });
      args.$or = pricearr;
    }
    const products = await Product.find(args);

    res.status(200).send({
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Filtering Products",
      error,
    });
  }
};

// search product controller
export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const regx = new RegExp(keyword, 'i');
    const searchProduct = await Product.find({
      $or: [
        { name: regx },
        { description: regx }
      ]
    });
    res.status(200).send(searchProduct);
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: "error in searching product", error })
  }
}

// Similar product controller 
export const similarProductController = async (req, res) => {
  try {
    const { prodId, category } = req.params;
    const similarP = await Product.find({ category: category, _id: { $ne: prodId } }).limit(4).populate("category");
    res.status(200).send({ products: similarP });
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: "error in getting similar product", error })
  }
}
