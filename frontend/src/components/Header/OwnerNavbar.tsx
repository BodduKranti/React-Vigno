
import {
    Heart,
    UserRound,
    ClipboardList,
    MapPinned,
    CreditCard,
    Utensils,
    ConciergeBell,
} from "lucide-react";
import { BsShop } from "react-icons/bs";
import { toast } from "react-toastify";
import { logoutUserfun } from "../../hooks/useGetuser";
import { Link } from "react-router";
import { useAppDispatch } from "../../Store/hook";
import { logout } from "../../Store/Reducer/AuthSlice/UserSlice";
import UserProfile from "../UserProfile/UserProfile";
import { ROLE_HOME } from "../../type";


export default function OwnerNavbar({ user }: { user: any }) {
    const dispatch = useAppDispatch()

    const profileItems = [
        { name: "My Shop", href: "/role/owner/addshop", icon: BsShop },
        { name: "My Orders", href: "/orders", icon: ClipboardList },
        { name: "Favorites", href: "/favorites", icon: Heart },
        { name: "Addresses", href: "/addresses", icon: MapPinned },
        { name: "Payments", href: "/payments", icon: CreditCard },
        { name: "Profile", href: "/profile", icon: UserRound },
    ];
    const cartCount = 3
    const { refetch, isFetching } = logoutUserfun()

    const logOut = async () => {
        const result = await refetch();
        if (result.isSuccess) {
            // Clear Redux user state here if needed
            dispatch(logout())
            toast.success("Logged out successfully");
            // navigate('/login')
        } else {
            toast.error(
                result.error?.message || "Logout failed"
            );
        }
    }

    return (
        <>
            <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white shadow-sm">
                {/* Desktop and tablet navbar */}
                <div className="mx-auto hidden max-w-[1600px] items-center justify-between gap-5 px-6 py-4 lg:flex xl:gap-7">
                    {/* Logo */}
                    <Link
                        // navigate(ROLE_HOME[user.role])
                        to={ROLE_HOME[user.role as keyof typeof ROLE_HOME]}
                        className="flex shrink-0 items-center gap-2"
                        aria-label="QuickBite home"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500 text-white">
                            <Utensils size={27} strokeWidth={2.3} />
                        </div>

                        <div>
                            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">
                                Quick<span className="text-orange-500">Bite</span>
                            </h1>
                            <p className="text-xs text-gray-500">Good Food, Faster</p>
                        </div>
                    </Link>

                    <div className="w-auto flex justify-end gap-3 items-center">
                        {/* {shopdata?.name !== '' &&
                            <NavLink
                                to={'/role/owner/addshopitem'}
                                className={({ isActive }) => `
                                flex h-10 p-2 gap-1 items-center justify-center rounded-xl 
                                 ${isActive ? 'bg-orange-500 text-white hover:bg-transparent' : 'bg-orange-100 text-orange-600 hover:bg-orange-50'}
                                `}>
                                <PlusIcon size={20} />
                                Add Food Item
                            </NavLink>} */}


                        <div
                            className="relative flex items-center gap-3 rounded-xl p-2 bg-orange-100 text-orange-600  hover:bg-orange-50"
                        >
                            <ConciergeBell size={20} /> My order
                            {cartCount > 0 && (
                                <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white">
                                    {cartCount}
                                </span>
                            )}
                        </div>

                        {/* User profile */}
                        <UserProfile
                            user={user}
                            logout={logOut}
                            isFetching={isFetching}
                            profileItems={profileItems}
                            key={2}
                        />
                    </div>


                </div>

                {/* Mobile and tablet header */}
                <div className="px-4 py-3 lg:hidden">
                    <div className="flex items-center justify-between gap-3">
                        <Link
                            to={ROLE_HOME[user.role as keyof typeof ROLE_HOME]}
                            className="flex items-center gap-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-white">
                                <Utensils size={23} />
                            </div>
                            <h1 className="text-xl font-extrabold tracking-tight text-gray-900">
                                Quick<span className="text-orange-500">Bite</span>
                            </h1>
                        </Link>

                        <div className="w-auto flex justify-end gap-3 items-center">
                            {/* <div className="relative flex items-center gap-3 rounded-xl p-2 bg-orange-100 text-orange-600  hover:bg-orange-50">
                                <PlusIcon size={20} />
                            </div> */}

                            <div
                                className="relative flex items-center gap-3 rounded-xl p-2 bg-orange-100 text-orange-600  hover:bg-orange-50"
                            >
                                <ConciergeBell size={20} />
                                {cartCount > 0 && (
                                    <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white">
                                        {cartCount}
                                    </span>
                                )}
                            </div>

                            {/* User profile */}
                            <UserProfile
                                user={user}
                                logout={logOut}
                                isFetching={isFetching}
                                profileItems={profileItems}
                                key={2}
                            />
                        </div>

                    </div>




                </div>
            </header>
        </>
    );
}
