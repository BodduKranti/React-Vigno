import { createBrowserRouter } from "react-router";
import PublicRoute from "../ProtectedRoute/PublicRoute";
import Login from "../Pages/auth/Signin/Login";
import Regsiter from "../Pages/auth/Signup/Regsiter";
import PrivateRoute from "../ProtectedRoute/PrivateRoute";
import App from "../App";
import ForgotPassword from "../Pages/auth/Forgot-Password/ForgotPassword";
import Restaurant from "../Pages/Restaurant/Restaurant";
import OwnerDashboard from "../Pages/Role/OwnerDashboard";
import DeliveryBoyDashboard from "../Pages/Role/DeliveryBoyDashboard";
import RoleRedirect from "../ProtectedRoute/RoleRedirect";
import Unauthorized from "../Pages/Unauthorized/Unauthorized";
import AddShop from "../Pages/Owner/AddShop/AddShop";
import Cart from "../Pages/Cart/Cart";
import RestaurantDetails from "../Pages/Restaurant/RestaurantDetails";


export const pageRoutes = createBrowserRouter([
    {
        element: <PublicRoute />,
        children: [
            { path: "/login", element: <Login /> },
            { path: "/register", element: <Regsiter /> },
            { path: "/forgot-password", element: <ForgotPassword /> },
        ],
    },
    {
        // customer-only pages
        element: <PrivateRoute allowRoles={["user"]} />,
        children: [
            { path: "/", element: <App /> },
            { path: "/restaurants", element: <Restaurant /> },
            { path: "/restaurants/:shop", element: <RestaurantDetails /> },
            { path: "/cart", element: <Cart /> },
        ],
    },
    {
        element: <PrivateRoute allowRoles={["owner"]} />,
        children: [
            { path: "/role/owner", element: <OwnerDashboard /> },
            { path: "/role/owner/addshop", element: <AddShop /> },
        ],
    },
    {
        element: <PrivateRoute allowRoles={["deliveryboy"]} />,
        children: [{ path: "/role/deliveryboy", element: <DeliveryBoyDashboard /> }],
    },
    {
        element: <PrivateRoute allowRoles={["user", "owner", "deliveryboy"]} />,
        children: [{ path: "/unauthorized", element: <Unauthorized /> }],
    },
    { path: "*", element: <RoleRedirect /> },
]);
