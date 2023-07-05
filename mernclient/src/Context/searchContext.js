import {createContext, useState} from "react";
 
const SearchContext = createContext();

const SearchProvider = ({children})=>{
const [searchProduct,setSearchProduct] = useState([]);

    return(
        <SearchContext.Provider value={[searchProduct,setSearchProduct]}>
            {children}
        </SearchContext.Provider>
    )
}  
export {SearchContext,SearchProvider};