
import { useState } from "react";
import {
    Heart,
    ShoppingCart,
    UserRound,
    Menu,
    X,
    ClipboardList,
    MapPinned,
    CreditCard,
    LogOut,
    House,
    Utensils,
    TicketPercent,
    CircleHelp,
} from "lucide-react";
import { toast } from "react-toastify";
import { logoutUserfun } from "../../hooks/useGetuser";
import { Link, NavLink } from "react-router";
import { useAppDispatch } from "../../Store/hook";
import { logout } from "../../Store/Reducer/AuthSlice/UserSlice";
import CurrentLocation from "../Location/Location";
import UserProfile from "../UserProfile/UserProfile";

const navigation = [
    { name: "Home", href: "/", icon: House },
    { name: "Restaurants", href: "/restaurants", icon: Utensils },
    { name: "Offers", href: "/offers", icon: TicketPercent },
    { name: "Help", href: "/help", icon: CircleHelp },
];

export default function DeliveryBoyNavbar({ user }: { user: any }) {
    const dispatch = useAppDispatch()

    const [mobileOpen, setMobileOpen] = useState(false);
    // Replace these values with real cart and user data.
    const cartCount = 3;

    const profileItems = [
        { name: "My Orders", href: "/orders", icon: ClipboardList },
        { name: "Favorites", href: "/favorites", icon: Heart },
        { name: "Addresses", href: "/addresses", icon: MapPinned },
        { name: "Payments", href: "/payments", icon: CreditCard },
        { name: "Profile", href: "/profile", icon: UserRound },
    ];

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
                <div className="mx-auto hidden max-w-[1600px] items-center gap-5 px-6 py-4 lg:flex xl:gap-7">
                    {/* Logo */}
                    <Link
                        to={"/"}
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

                    {/* Location dropdown */}
                    <CurrentLocation key={1} />

                    {/* Main navigation links */}
                    <nav className="flex shrink-0 items-center gap-5 xl:gap-7">
                        {navigation.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item?.href}
                                className={({ isActive, isPending }) => `relative whitespace-nowrap py-2 text-sm font-medium transition ${isPending ? 'pending' : ''} ${isActive
                                    ? "text-orange-600 active"
                                    : "text-gray-700 hover:text-orange-500"
                                    }`}
                            >
                                {({ isActive }) => (
                                    <>
                                        {item.name}

                                        {isActive && (
                                            <span className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-orange-500" />
                                        )}
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Favorites */}
                    <button
                        type="button"
                        aria-label="Favorites"
                        className="shrink-0 text-gray-800 transition hover:scale-110 hover:text-orange-500"
                    >
                        <Heart size={25} />
                    </button>

                    {/* Cart */}
                    <button
                        type="button"
                        aria-label={`Shopping cart with ${cartCount} items`}
                        className="relative shrink-0 text-gray-800 transition hover:scale-110 hover:text-orange-500"
                    >
                        <ShoppingCart size={26} />
                        {cartCount > 0 && (
                            <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-xs font-bold text-white">
                                {cartCount}
                            </span>
                        )}
                    </button>

                    {/* User profile */}
                    <UserProfile
                        user={user}
                        logout={logOut}
                        isFetching={isFetching}
                        profileItems={profileItems}
                        key={2}
                    />
                </div>

                {/* Mobile and tablet header */}
                <div className="px-4 py-3 lg:hidden">
                    <div className="flex items-center justify-between gap-3">
                        <button
                            type="button"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            aria-label={mobileOpen ? "Close menu" : "Open menu"}
                            aria-expanded={mobileOpen}
                            className="rounded-xl p-2 text-gray-800 hover:bg-orange-50"
                        >
                            {mobileOpen ? <X size={25} /> : <Menu size={25} />}
                        </button>

                        <a href="/" className="flex items-center gap-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-white">
                                <Utensils size={23} />
                            </div>
                            <h1 className="text-xl font-extrabold tracking-tight text-gray-900">
                                Quick<span className="text-orange-500">Bite</span>
                            </h1>
                        </a>

                        <button
                            type="button"
                            aria-label={`Cart, ${cartCount} items`}
                            className="relative rounded-xl p-2 text-gray-800 hover:bg-orange-50"
                        >
                            <ShoppingCart size={24} />
                            {cartCount > 0 && (
                                <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                    </div>

                    {/* Location dropdown */}
                    <CurrentLocation key={2} />

                    {/* Mobile menu */}
                    {mobileOpen && (
                        <nav className="mt-3 space-y-1 border-t border-gray-100 pt-3">
                            {navigation.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <NavLink
                                        to={item?.href}
                                        className={({ isActive }) => `flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium 
                                            ${isActive
                                                ? "bg-orange-50 text-orange-600"
                                                : "text-gray-700 hover:bg-gray-50"
                                            }`}
                                    >
                                        <Icon size={20} />
                                        {item.name}
                                    </NavLink>
                                );
                            })}

                            <button
                                type="button"
                                className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-gray-700 hover:bg-orange-50"
                            >
                                <Heart size={20} />
                                Favorites
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setMobileOpen(false);
                                    window.location.href = "/profile";
                                }}
                                className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-gray-700 hover:bg-orange-50"
                            >
                                <UserRound size={20} />
                                My Account
                            </button>



                            <div className="border-t border-gray-100 ">
                                <button
                                    type="button"
                                    onClick={logOut}
                                    className="flex cursor-pointer w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-red-500 transition hover:bg-red-50"
                                >
                                    {isFetching ? "Logging out..." : <>
                                        <LogOut size={19} />
                                        Logout
                                    </>}

                                </button>
                            </div>
                        </nav>
                    )}
                </div>
            </header>
        </>
    );
}
