import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import Home from "./Components/Home.js";
import About from "./Components/About.js";
import SignUp from "./Components/SignUp.js";
import Login from "./Components/Login.js";
import Dashboard from "./Components/User/Dashboard.js";
import { AuthContext, AuthProvider } from "./Context/authContext.js";
import PrivateRoute from "./Routes/Private.js";
import ForgetPass from "./Components/ForgetPass.js";
import AdminPrivateRoute from "./Routes/AdminPrivate.js";
import AdminDashboard from "./Components/Admin/AdminDashboard.js";
import CreateCategories from "./Components/Admin/CreateCategories.js";
import CreateProducts from "./Components/Admin/CreateProducts.js"
import User from "./Components/Admin/User.js";
import Orders from "./Components/User/Orders.js";
import UserProfle from "./Components/User/UserProfle.js";
import Products from "./Components/Admin/Products.js";
import UpDelProduct from "./Components/Admin/UpDelProduct.js";
import { SearchProvider } from "./Context/searchContext.js";
import Search from "./Components/Search.js";
import ProductDetails from "./Components/ProductDetails.js";
import { CartProvider } from "./Context/cartContext.js";
import Cart from "./Components/Cart.js";
import EmptyPage from "./Components/EmptyPage.js"; 
import MyWishlist from "./Components/MyWishlist.js";
import AllProducts from "./Components/AllProducts.js";
// for redux

function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <AuthProvider> 
          <CartProvider>
            <SearchProvider>
              <Router>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/all-products" element={<AllProducts />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/forgot-password" element={<ForgetPass />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/product/:slug" element={<ProductDetails />} />
                  <Route path="/my-wishlist" element={<MyWishlist />} />
                  <Route path="/my-account" element={<PrivateRoute />}>
                    <Route path="" element={<UserProfle />} />
                  </Route>
                  <Route path="/my-orders" element={<PrivateRoute />}> 
                    <Route path="" element={<Orders />} />
                  </Route>

                  <Route path="/admin" element={<AdminPrivateRoute />}>
                    <Route path="" element={<AdminDashboard />} />
                    <Route path="/admin/products" element={<Products />} />
                    <Route path="/admin/product/manage/:slug" element={<UpDelProduct />} />
                    <Route path="/admin/create-category" element={<CreateCategories />} />
                    <Route path="/admin/create-product" element={<CreateProducts />} />
                    <Route path="/admin/users" element={<User />} />
                  </Route>
                  <Route path="*" element={<EmptyPage />} />
                </Routes>
              </Router>
            </SearchProvider>
          </CartProvider> 
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
