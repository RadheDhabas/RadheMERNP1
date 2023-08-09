import {createContext, useEffect, useState} from "react";
 
const SearchContext = createContext();

const SearchProvider = ({children})=>{
const [searchProduct,setSearchProduct] = useState([]);
const [searchedKeyword,setSearchedKeyword] = useState("");
useEffect(()=>{
    setSearchedKeyword(localStorage.getItem("searchedKeyword"));
},[])
    return(
        <SearchContext.Provider value={{searchProduct,setSearchProduct,searchedKeyword,setSearchedKeyword}}>
            {children}
        </SearchContext.Provider>
    )
}  
export {SearchContext,SearchProvider};
// svae searched word in localstorage