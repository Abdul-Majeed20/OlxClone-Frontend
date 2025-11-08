import "./App.css";
import Login from "./app/Login";
import Register from "./app/Register";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoutes";
import Search from "./components/Search";
import SellProduct from "./app/sellProduct";
import UserDashboard from "./app/userDashboard";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./app/Home";
import Product from "./app/Product";
import AdminDashboard from "./app/AdminDashboard";
import Unauthorized from "./components/Unauthorized";
import CategoryProducts from "./components/CategoryProducts";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/product/:id" element={<Product />}></Route>
          <Route path="/category/:category" element={<CategoryProducts/>}></Route>
          <Route
            path="/sellProduct"
            element={
              <ProtectedRoute>
                <SellProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/userDashboard"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/adminDashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/unauthorized" element={<Unauthorized />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
