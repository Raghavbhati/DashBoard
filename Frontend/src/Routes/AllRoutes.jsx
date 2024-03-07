import {Routes, Route} from "react-router-dom";
import Login from '../Pages/Login';
import Signup from '../Pages/SignUp';
import Dashboard from '../Pages/Dashboard'
import Products from '../Pages/Products'
import Addproduct from '../Pages/Addproduct'
import InvalidRouteError from '../Pages/InvalidRouteError'

const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login/>}>Login</Route>
            <Route path="/signup" element={<Signup/>}>Signup</Route>
            <Route path="/" element={<Dashboard/>}>Dashboard</Route>
            <Route path="/products" element={<Products/>}>Products</Route>
            <Route path="/new-product" element={<Addproduct/>}>Addproduct</Route>
            <Route path="*" element={<InvalidRouteError/>}>Addproduct</Route>
        </Routes>
    );
}

export default AllRoutes;
