import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
    type Dispatch,
    type RefObject,
    type SetStateAction,
} from "react";

import { useAppDispatch, useAppSelecter } from "../Store/hook";
import { getUserfun } from "../Store/StoreThunk/GetUserThunk";

interface AuthUser {
    fullname?: string | null;
    role?: string | null;
    email?: string | null;
    isAuthenitcate: boolean;
    loading: boolean;
}

interface authContextpropos {
    user: AuthUser;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    dropdownRef: RefObject<HTMLDivElement | null>;
}

const AuthContext = createContext<authContextpropos | null>(null);

const AuthContextprovider = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useAppDispatch();
    const userData = useAppSelecter((state) => state.userInfo);

    const [open, setOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Derive user straight from Redux: no extra state, no one-render lag
    const user = useMemo<AuthUser>(
        () => ({
            fullname: userData?.fullname,
            role: userData?.role,
            email: userData?.email,
            isAuthenitcate: !!userData?.isAuthenitcate,
            loading: userData?.loading ?? true, // treat "unknown" as loading
        }),
        [userData]
    );

    // Restore session once on app load / refresh
    useEffect(() => {
        dispatch(getUserfun());
    }, [dispatch]);

    // Close dropdown on outside click
    useEffect(() => {
        if (!open) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open]);

    return (
        <AuthContext.Provider value={{ user, open, setOpen, dropdownRef }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used within AuthContextprovider");
    }
    return context;
};

export { useAuthContext, AuthContextprovider };