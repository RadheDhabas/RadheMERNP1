import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/authContext";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../Layout/Layout";
import AdminMenu from "../Layout/AdminMenu";

function UpDelProduct() {
  const navigate = useNavigate();
  const [auth] = useContext(AuthContext);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [pid, setPid] = useState("");
  const [productVariable, setProductVariable] = useState({
    name: "",
    description: "",
    quantity: "",
    price: "",
    photo: "",
  });

  const prams = useParams();

  // get single product by id or slug
  const getSingleProduct = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_USER_AUTH}/api/product/${prams.slug}`
    );
    setProductVariable({
      ...productVariable,
      name: data.product.name,
      description: data.product.description,
      price: data.product.price,
      quantity: data.product.quantity,
      photo: data.product.photo,
    });
    setCategory(data.product.category._id);
    setPid(data.product._id);
  };
  const getCategories = async () => {
    const categories = await axios.get(
      `${process.env.REACT_APP_USER_AUTH}/api/category/get-categories`
    );
    setCategories(categories.data?.categories);
  };
  useEffect(() => {
    getSingleProduct();
    getCategories();
  }, []);

  const pDataHandleChange = async (e) => {
    setProductVariable({ ...productVariable, [e.target.name]: e.target.value });
  };
  // delete a product
  const deleteProduct = async (id) => {
    try {
      let answer = window.prompt("Are You Sure want to delete this product ? ");
      if (!answer) return;
      const response = await axios.delete(
        `${process.env.REACT_APP_USER_AUTH}/api/product/delete-product/${id}`,
        {
          headers: {
            "auth-token": auth?.token,
          },
        }
      );
      navigate("/admin/products");

    } catch (error) {
      
    }
  
  };

  // update a product
  const updateProduct = async (e) => {
    e.preventDefault();
    const updated_pdata = new FormData();
    updated_pdata.append("category", category);
    for (let i in productVariable) {
      updated_pdata.append(i, productVariable[i]);
    }
    const response = await fetch(
      `${process.env.REACT_APP_USER_AUTH}/api/product/update-product/${pid}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/form-data",
          "auth-token": auth?.token,
        },
        body: updated_pdata,
      }
    );
    // const data =await response.json();
    if (response.status == 200) {
      setProductVariable({
        name: "",
        description: "",
        price: "",
        quantity: "",
        photo: "",
      });
      navigate("/admin/products");
    }
  };
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <form onSubmit={(e) => updateProduct(e)}>
              <div className="form-group">
                <div className="pt-3">
                  <p>Select category</p>
                  <select
                    placeholder="Select a category"
                    name="category"
                    form="productData"
                    className="form-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    <option value={""}>Select Category</option>
                    {categories?.map((i) => (
                      <option key={i._id} value={i._id}>
                        {i.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="row">
                  <div className="col-md-6 mt-3">
                    <label>Product Name: </label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      placeholder="Product Name"
                      name="name"
                      value={productVariable.name}
                      onChange={pDataHandleChange}
                    />
                  </div>
                  <div className="col-md-6 mt-3">
                  <label>Product Price: </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Product Price"
                      name="price"
                      value={productVariable.price}
                      onChange={pDataHandleChange}
                    />
                  </div>
                  <div className="col-md-6 mt-3">
                  <label>Product Quantity: </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Product Quantity"
                      required
                      name="quantity"
                      value={productVariable.quantity}
                      onChange={pDataHandleChange}
                    />
                  </div>
                  <div className="col-md-6 mt-3">
                  <label>Product Image: </label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      placeholder="Product Image Link"
                      name="photo"
                      value={productVariable.photo}
                      onChange={pDataHandleChange}
                    />
                  </div>
                  <div className="col-12 mt-3">
                  <label>Product Description: </label>
                    <textarea
                      type="text"
                      required
                      placeholder="Write a description"
                      className="form-control"
                      name="description"
                      value={productVariable.description}
                      onChange={pDataHandleChange}
                    />
                  </div>

                  <div className="col-md-10 mt-4">
                    <button type="submit" className="btn btn-success mx-3">
                      Update
                    </button>
                    <button
                      className="btn btn-danger mx-3"
                      type="button"
                      onClick={() => deleteProduct(pid)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-secondary mx-3"
                      type="button"
                      onClick={() => navigate("/admin/products")}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default UpDelProduct;
