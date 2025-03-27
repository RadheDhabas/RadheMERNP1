import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import Home from "./Components/Home.jsx";
import About from "./Components/About.jsx";
import SignUp from "./Components/SignUp.jsx";
import Login from "./Components/Login.jsx";
// import Dashboard from "./Components/User/Dashboard.jsx";
import PrivateRoute from "./Routes/Private.jsx";
import ForgetPass from "./Components/ForgetPass.jsx";
import AdminPrivateRoute from "./Routes/AdminPrivate.jsx";
import AdminDashboard from "./Components/Admin/AdminDashboard.jsx";
import CreateCategories from "./Components/Admin/CreateCategories.jsx";
import CreateProducts from "./Components/Admin/CreateProducts.jsx"
import User from "./Components/Admin/User.jsx";
import Orders from "./Components/User/Orders.jsx";
import UserProfle from "./Components/User/UserProfle.jsx";
import Products from "./Components/Admin/Products.jsx";
import UpDelProduct from "./Components/Admin/UpDelProduct.jsx";
import Search from "./Components/Search.jsx";
import ProductDetails from "./Components/ProductDetails.jsx";
import Cart from "./Components/Cart.jsx";
import EmptyPage from "./Components/EmptyPage.jsx";
import MyWishlist from "./Components/MyWishlist.jsx";
import AllProducts from "./Components/AllProducts.jsx";
import AdminOrders from "./Components/Admin/AdminOrders.jsx";
// for redux

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/all-products" element={<AllProducts />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgetPass />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<Search />} />
          <Route path="/product/:slug" element={<ProductDetails />} />
          <Route path="/cart" element={<PrivateRoute />}>
            <Route path="" element={<Cart />} />
          </Route>
          <Route path="/my-account" element={<PrivateRoute />}>
            <Route path="" element={<UserProfle />} />
          </Route>
          <Route path="/my-wishlist" element={<PrivateRoute />}>
            <Route path="" element={<MyWishlist />} />
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
            <Route path="/admin/orders" element={<AdminOrders />} />
          </Route>
          <Route path="*" element={<EmptyPage />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;