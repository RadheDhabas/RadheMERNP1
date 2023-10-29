import React, { useState, useEffect, useContext } from "react";
import Layout from "../Layout/Layout";
import AdminMenu from "../Layout/AdminMenu";
import axios from "axios";
import EditCategory from "./EditCategory";
import { useSelector } from "react-redux";

function CreateCategories() {
  const url = `${process.env.REACT_APP_USER_AUTH}/api/category/get-categories`;
  const auth = useSelector(state=>state.auth);
  const [category, setCategory] = useState([]);
  const [catname, setCatname] = useState("");
  const [editcat,seteditcat] = useState("");
  const [editCategory,setEditCategory] = useState(false);

  // get all category
  const getCategories = async () => {
    const categories = await axios.get(url);
    setCategory(categories.data?.categories);
  };

  useEffect(() => {
    getCategories();
  }, [category.length]);

  // delete a category
  const deleteCategory = async (id) => {
    const response = await axios.delete(
      `${process.env.REACT_APP_USER_AUTH}/api/category/delete-category/${id}`,
      {
        headers: {
          "auth-token": auth?.token,
        },
      }
    );
    getCategories();
  };

  // add a category
  const createCategory = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `${process.env.REACT_APP_USER_AUTH}/api/category/create-category`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "auth-token": auth?.token,
        },
        body: JSON.stringify({ name: catname }),
      }
    );
    setCatname(""); 
    getCategories();
  };

  // update a category
  const updateCategory = async(category_id,u_catname)=>{
    const response = await fetch(
      `${process.env.REACT_APP_USER_AUTH}/api/category/update-category/${category_id}`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          "auth-token": auth?.token,
        },
        body: JSON.stringify({ name: u_catname }),
      }
    );
  setEditCategory(false); 
    getCategories();
  }
// toggle update
const toggleState = async()=>{
  editCategory?setEditCategory(false):setEditCategory(true);
}
  return (
    <Layout>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <form onSubmit={(e) => createCategory(e)}>
              <div className="form-group">
                <label htmlFor="category">Add Category</label>
                <div className="row mt-3">
                  <div className="col-md-10">
                    <input
                      type="text"
                      className="form-control"
                      aria-describedby="emailHelp"
                      placeholder="Category Name"
                      value={catname}
                      onChange={(e) => setCatname(e.target.value)}
                    />
                  </div>
                  <div className="col-md-2">
                    <button type="submit" className="btn btn-success">
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </form>
            {!editCategory &&
            <div className="mt-4">
              <p>Manage Categories</p>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">SN</th>
                    <th scope="col">Category</th>
                    <th scope="col">Id</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {category &&
                    category.map((i) => (
                      <tr key={i._id}>
                        <td>{category.indexOf(i) + 1}</td>
                        <td>{i.name}</td>
                        <td>{i._id}</td>
                        <td> 
                            <button className="btn" onClick={()=>{setEditCategory(true);
                            seteditcat(i)}}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="1em"
                                viewBox="0 0 512 512"
                              >
                                <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z" />
                              </svg>
                            </button>
                            <button
                              className="btn"
                              onClick={() => deleteCategory(i._id)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="1em"
                                viewBox="0 0 448 512"
                              >
                                <path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
                              </svg>
                            </button> 
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            }
            {editCategory && <EditCategory updateCategory={updateCategory} catename={editcat} toggleState={toggleState}></EditCategory>}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CreateCategories;
