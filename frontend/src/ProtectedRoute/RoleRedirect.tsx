import { Navigate } from "react-router";
import { ROLE_HOME } from "../type";
import { useAuthContext } from "../utils/ContextApi";

const RoleRedirect = () => {
    const { user } = useAuthContext();

    // Wait until the session is restored
    if (user.loading) return <div>Loading...</div>;

    // Not logged in
    if (!user.isAuthenitcate || !user.role) {
        return <Navigate to="/login" replace />;
    }

    // Logged in: go to the role's home
    return <Navigate to={ROLE_HOME[user.role as keyof typeof ROLE_HOME]} replace />;
};

export default RoleRedirect;