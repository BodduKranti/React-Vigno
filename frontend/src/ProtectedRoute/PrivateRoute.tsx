import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { io } from "socket.io-client";

import { useAuthContext } from "../utils/ContextApi";
import InnerNavbar from "../components/Header/InnerNavbar";
import Footer from "../components/Footer/Footer";
import DeliveryBoyNavbar from "../components/Header/DeliveryBoyNavbar";
import OwnerNavbar from "../components/Header/OwnerNavbar";
import ScrollToTop from "../utils/ScrollToTop";
import type { UserRole } from "../type";
import { setSocketId } from "../Store/Reducer/AuthSlice/UserSlice";
import { useAppDispatch } from "../Store/hook";
export const serverUrl = "http://localhost:5000";

interface PrivateRouteProps {
    allowRoles?: UserRole[];
}

const FullPageLoader = () => (
    <div className="flex min-h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
    </div>
);

const PrivateRoute = ({ allowRoles }: PrivateRouteProps) => {
    const dispatch = useAppDispatch();
    const { user } = useAuthContext();
    const location = useLocation();

    const userId = user._id;
    const isLoggedIn = !user.loading && user.isAuthenitcate && !!userId;

    // All hooks stay above every conditional return
    useEffect(() => {
        if (!isLoggedIn) return;

        const socketInstance = io(serverUrl, { withCredentials: true });

        socketInstance.on("connect", () => {
            dispatch(setSocketId(socketInstance.id ?? null)); // string only
            // re-identify on every (re)connect, since the socket id changes
            socketInstance.emit("identify", { userId });
        });

        socketInstance.on("disconnect", () => {
            dispatch(setSocketId(null));
        });

        return () => {
            socketInstance.disconnect();
        };
    }, [isLoggedIn, userId, dispatch]);

    // 1. Wait until the session is restored
    if (user.loading) return <FullPageLoader />;

    // 2. Not logged in
    if (!user.isAuthenitcate) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    // 3. Role not allowed
    const role = user.role as UserRole | null | undefined;
    if (allowRoles && (!role || !allowRoles.includes(role))) {
        return <Navigate to="/unauthorized" replace />;
    }

    // 4. Navbar/footer by role
    const navbar =
        role === "owner" ? (
            <OwnerNavbar user={user} />
        ) : role === "deliveryboy" ? (
            <DeliveryBoyNavbar user={user} />
        ) : (
            <InnerNavbar user={user} />
        );

    const showFooter = role !== "owner" && role !== "deliveryboy";

    return (
        <div className="innerBg min-h-screen w-full">
            <ScrollToTop />
            <div className="relative w-full">
                {navbar}
                <Outlet />
                {showFooter && <Footer />}
            </div>
        </div>
    );
};

export default PrivateRoute;