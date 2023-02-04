// @ts-nocheck
import { Route, Routes } from "react-router";
import "./App.css";
import FlashItemShowMore from "./components/Home/FlashSale/FlashItemShowMore/FlashItemShowMore";
import Home from "./components/Home/Home";
import Nav from "./components/Shared/Nav";
import BackToTop from "react-back-to-top-button";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import Login from "./components/Auth/Login/Login";
import SignUp from "./components/Auth/SignUp/SignUp";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import ProductsDetails from "./components/ProductsDetails/ProductsDetails";
import Cart from "./components/Cart/Cart";
import RequiredAuth from "./components/Auth/AuthRequire/AuthRequire";
import Review from "./components/Review/Review";
import AddProduct from "./components/Admin/AddProductAdmin";
import EditRemoveProduct from "./components/Admin/EditRemoveProduct";
import Orders from "./components/Admin/Orders";
import Users from "./components/Admin/Users";
import NotFound from "./components/Shared/NotFound";
import RequiredAdmin from "./components/Auth/AdminRequire/AdminRequire";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<FlashItemShowMore />} path="/flashsale" />
        <Route
          path="/cart"
          element={
            <RequiredAuth>
              <Cart />
            </RequiredAuth>
          }
        />
        <Route
          path="/review"
          element={
            <RequiredAuth>
              <Review />
            </RequiredAuth>
          }
        />{" "}
        <Route
          path="/order"
          element={
            <RequiredAdmin>
              <Orders />
            </RequiredAdmin>
          }
        />{" "}
        <Route
          path="/users"
          element={
            <RequiredAdmin>
              <Users />
            </RequiredAdmin>
          }
        />
        <Route
          element={
            <RequiredAdmin>
              <AddProduct />
            </RequiredAdmin>
          }
          path="/addproduct"
        />
        <Route
          element={
            <RequiredAdmin>
              <EditRemoveProduct />
            </RequiredAdmin>
          }
          path="/edit"
        />
        <Route element={<ProductsDetails />} path="/product/:id" />
        <Route element={<Login />} path="/login" />
        <Route element={<SignUp />} path="/signup" />
        <Route element={<NotFound />} path="*" />
      </Routes>
      <BackToTop
        showOnScrollUp
        showAt={100}
        speed={1500}
        easing="easeInOutQuint"
      >
        <BsFillArrowUpCircleFill className="animate-pulse text-yellow-400 hover:text-blue-500 cursor-none" />
      </BackToTop>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
