import { BrowserRouter, Route, Routes } from "react-router-dom";

import styles from "./App.module.css";

import SignUp from "./pages/register";

import Admin from "./admin/admin";
import AddProduct from "./admin/addProduct";

import Product from "./pages/product";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Products from "./pages/products";

import Payment from "./pages/payment";
import SignIn from "./pages/login";

function App() {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Navbar />
        <div className="body">
          <Routes>
            <Route path="/admin" element={<Admin />} />
            <Route path="/addProduct" element={<AddProduct />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/" element={<Products />} />
            <Route path="/product" element={<Product />} />
            <Route path="/payment" element={<Payment />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
