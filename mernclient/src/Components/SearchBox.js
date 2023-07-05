import React, { useContext, useState } from 'react'
import { SearchContext } from '../Context/searchContext';
import { useNavigate } from 'react-router-dom';

function SearchProduct() {
const navigate = useNavigate();
    const [searchKeyword,setSearchKeyword]= useState("");
    const [searchProduct,setSearchProduct] = useContext(SearchContext);
    const handelSearch = async(e)=>{
        e.preventDefault();
        try {
            const response= await fetch(`${process.env.REACT_APP_USER_AUTH}/api/product/search/${searchKeyword}`);
           let json= await response.json();
           setSearchProduct(json);
           navigate('/search');
        } catch (error) {
            console.error(error);
        }
      }
  return (
   <div style={{"position":"relative"}}>
   <form role="search" className="d-flex" onSubmit={handelSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(e)=>{setSearchKeyword(e.target.value)}}
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
          {/* <ul style={{"position":"absolute","bottom":"0","left":0}}>
{searchProduct && searchProduct.map(i=><li key={i._id}>{i.name}</li>)}
          </ul> */}
          </div>
  )
}

export default SearchProduct