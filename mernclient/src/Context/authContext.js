// import {createContext, useContext, useEffect, useState} from "react";
 
// const AuthContext = createContext();

// const AuthProvider = ({children})=>{
// const [auth,setAuth] = useState({
//     user:null,
//     token:"",
// }); 
// useEffect(()=>{
//     const data = localStorage.getItem("token");
//     if(data){
//         let parseData = JSON.parse(data);
         
//         setAuth({
//             ...auth,
//             user:parseData.user,
//             token:parseData.authToken
//         }) 
//     } 
// },[])
//     return(
//         <AuthContext.Provider value={[auth,setAuth]}>
//             {children}
//         </AuthContext.Provider>
//     )
// }  
// export {AuthContext,AuthProvider};