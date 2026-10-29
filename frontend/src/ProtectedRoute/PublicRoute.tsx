import { Navigate, Outlet } from "react-router"
import { useAuthContext } from "../utils/ContextApi"
import AuthLayout from "../Layout/AuthLayout"
import { ROLE_HOME } from "../type"
const FullPageLoader = () => (
    <div className="flex min-h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
    </div>
);
const PublicRoute = () => {
    const { user }: any = useAuthContext()
    if (user.loading) return <FullPageLoader />;
    if (user && user?.isAuthenitcate) {
        return <Navigate to={ROLE_HOME[user?.role]} replace />
    }
    return (
        <AuthLayout>
            <Outlet />
        </AuthLayout>
    )
}

export default PublicRoute