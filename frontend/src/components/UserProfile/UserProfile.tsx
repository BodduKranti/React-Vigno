import { ChevronDown, LogOut, UserRound } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
interface profileItemsprops {
    icon: any,
    name: string,
    href: string
}



const UserProfile = ({ isFetching, user, profileItems, logout }: {
    user: any, isFetching: boolean, profileItems: profileItemsprops[], logout: () => void
}) => {
    const [open, setOpen] = useState<boolean>(false)
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open]);
    return (
        <div className="relative shrink-0" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => {
                    setOpen((prev) => !prev);
                }}
                aria-expanded={open}
                aria-label="Open profile menu"
                className="flex items-center gap-2 rounded-full p-1 transition hover:bg-orange-50"
            >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                    <UserRound size={23} />
                </div>
                <ChevronDown size={16} className="text-gray-600" />
            </button>

            {open && (
                <div className="absolute right-0 top-full mt-3 w-64 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
                    <div className="border-b border-gray-100 p-4">
                        <p className="font-semibold text-gray-900 flex gap-4">{user?.fullname || ''}</p>
                        <p className="mt-1 truncate text-sm text-gray-500 flex gap-4">
                            {user?.email || ''}
                        </p>
                    </div>

                    <div className="p-2">
                        {profileItems.map((item) => {
                            const Icon = item.icon;

                            return (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-gray-700 transition hover:bg-orange-50 hover:text-orange-600"
                                >
                                    <Icon size={19} />
                                    {item.name}
                                </a>
                            );
                        })}
                    </div>

                    <div className="border-t border-gray-100 p-2">
                        <button
                            type="button"
                            onClick={logout}
                            className="flex cursor-pointer w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-red-500 transition hover:bg-red-50"
                        >
                            {isFetching ? "Logging out..." : <>
                                <LogOut size={19} />
                                Logout
                            </>}

                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserProfile