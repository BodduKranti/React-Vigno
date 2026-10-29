import { Navigate, Outlet, useLocation } from "react-router";
import { useAuthContext } from "../utils/ContextApi";
import InnerNavbar from "../components/Header/InnerNavbar";
import Footer from "../components/Footer/Footer";
import DeliveryBoyNavbar from "../components/Header/DeliveryBoyNavbar";
import OwnerNavbar from "../components/Header/OwnerNavbar";
import type { UserRole } from "../type";

interface PrivateRouteProps {
    allowRoles?: UserRole[];
}

const FullPageLoader = () => (
    <div className="flex min-h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
    </div>
);

const PrivateRoute = ({ allowRoles }: PrivateRouteProps) => {
    const { user } = useAuthContext();
    const location = useLocation();
    // 1. Wait until the session is restored (prevents redirect on refresh)
    if (user.loading) return <FullPageLoader />;

    // 2. Not logged in
    if (!user.isAuthenitcate) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    // 3. Logged in, but role not allowed
    const role = user.role as UserRole | null | undefined;
    if (allowRoles && (!role || !allowRoles.includes(role))) {
        return <Navigate to="/unauthorized" replace />;
    }

    // 4. Pick navbar/footer by role
    const navbar =
        role === "owner" ? (
            <OwnerNavbar user={user} />
        ) : role === "deliveryboy" ? (
            <DeliveryBoyNavbar user={user} />
        ) : (
            <InnerNavbar user={user} />
        );

    const showFooter = role !== "owner";

    return (
        <div className="innerBg min-h-screen w-full">
            <div className="relative w-full">
                {navbar}
                <Outlet />
                {showFooter && <Footer />}
            </div>
        </div>
    );
};

export default PrivateRoute;