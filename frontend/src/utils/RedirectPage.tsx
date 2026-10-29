import { useNavigate } from "react-router";
import type { UserRole } from "../type";

const navigate = useNavigate();

export const redirectByRole = (role: UserRole) => {
    switch (role) {
        case "user":
            navigate("/admin/dashboard", { replace: true });
            break;

        case "owner":
            navigate("/restaurant/dashboard", { replace: true });
            break;

        case "deliveryboy":
            navigate("/", { replace: true });
            break;

        default:
            navigate("/login", { replace: true });
    }
};