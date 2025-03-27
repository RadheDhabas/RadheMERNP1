import React, { useState } from "react";

function EditCategory({ catename, updateCategory,toggleState }) {
  const [c_name, setc_name] = useState(catename.name);
   
  return (
    <div className="mt-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateCategory(catename._id, c_name);
        }}
      >
        <div className="form-group">
          <label htmlFor="category">Update Category</label>
          <div className="row mt-3">
            <div className="col-md-10">
              <input
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Category Name"
                value={c_name}
                onChange={(e) => setc_name(e.target.value)}
              />
            </div>
            <div className="col-md-10 mt-4">
              <button type="submit" className="btn btn-success mx-4">
                Update
              </button>
              <button type="button" className="btn btn-danger" onClick={toggleState}>Cancel</button>
            </div>
          </div>    
        </div>
      </form>
    </div>
  );
}

export default EditCategory;
