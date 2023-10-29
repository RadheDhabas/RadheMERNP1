import React, { useState, useEffect, useContext } from "react";
import Layout from "../Layout/Layout";
import AdminMenu from "../Layout/AdminMenu";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const { Option } = Select;

function CreateProducts() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const auth = useSelector(state=>state.auth);
  useEffect(() => {
    getCategories();
  }, []);
  // get all category
  const getCategories = async () => {
    const categories = await axios.get(
      `${process.env.REACT_APP_USER_AUTH}/api/category/get-categories`
    );
    setCategories(categories.data?.categories);
  };
  const [productVariable, setProductVariable] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    photo: "",
  });

  const pDataHandleChange = async (e) => {
    setProductVariable({ ...productVariable, [e.target.name]: e.target.value });
    
  };

  // create product
  const createProduct = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("category", category);
      for (let i in productVariable) {
        productData.append(i, productVariable[i]);
      }
      const response = await fetch( `${process.env.REACT_APP_USER_AUTH}/api/product/create-product`,
      {
        method: "post",
        headers: {
          Accept: 'application/form-data',
          "auth-token": auth?.token,
        },
        body:productData,
      }); 
      if(response.status==200){
        setProductVariable({
          name: "",
          description: "",
          price: "",
          quantity: "",
          photo: "",
        });
        navigate('/admin/products');
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Layout>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create Product</h1>
            <form id="productData" onSubmit={(e) => createProduct(e)}>
              <div className="form-group">
              <div className="pt-3">
              <select
                placeholder="Select a category" 
                name="category"
                form="productData"
                className="form-select"
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value={""}>
                    Select Category
                  </option>
                {categories?.map((i) => (
                  <option key={i._id} value={i._id}>
                    {i.name}
                  </option>
                ))}
              </select>
            </div>
                <div className="row">
                  <div className="col-md-6 mt-3">
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
                    <button type="submit" className="btn btn-success  ">
                      Add
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

export default CreateProducts;
