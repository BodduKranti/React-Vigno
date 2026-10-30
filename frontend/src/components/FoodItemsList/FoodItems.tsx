// src/components/Food/FoodItems.tsx
import { useEffect, useState } from "react";
import { itemFoodType } from "../../type";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";
import { useAppDispatch } from "../../Store/hook";
import { addCart, removeCart } from "../../Store/Reducer/AuthSlice/UserSlice";
export type FoodType = "veg" | "non-veg";

export interface ratingprops {
    count: number,
    average: number
}

export interface FoodItem {
    _id: number | string;
    name: string;
    shop: string;
    price: number;
    image: string;
    category: string;
    foodtype: FoodType; // matches the `foodtype` field you already save
    rating?: ratingprops
}

interface FoodItemsProps {
    f: FoodItem;
    /** Optional: control the quantity from a parent / Redux / context (recommended). */
    quantity?: number;
    onAdd?: (item: FoodItem) => void;
    onRemove?: (item: FoodItem) => void;
}

const optimize = (url?: string, w = 600, h = 450) =>
    url?.includes("/upload/")
        ? url.replace("/upload/", `/upload/f_auto,q_auto,c_fill,w_${w},h_${h}/`)
        : url;

/* Indian FSSAI-style mark: square outline + circle (veg) or triangle (non-veg) */
export const FoodTypeIcon = ({ type, size = 14 }: { type: FoodType; size?: number }) => {
    const color = type === "veg" ? "#16a34a" : "#dc2626";
    return (
        <span
            title={type === "veg" ? "Vegetarian" : "Non-vegetarian"}
            aria-label={type === "veg" ? "Vegetarian" : "Non-vegetarian"}
            role="img"
            className="flex items-center justify-center rounded-full bg-white shadow-sm"
            style={{ width: size + 8, height: size + 8 }}
        >
            <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="3" fill="none" stroke={color} strokeWidth="2" />
                {type === "veg" ? (
                    <circle cx="12" cy="12" r="5" fill={color} />
                ) : (
                    <path d="M12 6.5 18 17H6z" fill={color} />
                )}
            </svg>
        </span>
    );
};

const FoodItems = ({ f, quantity, onAdd, onRemove }: FoodItemsProps) => {
    // Falls back to local state when the parent doesn't control the quantity
    const dispatch = useAppDispatch()
    const [localQty, setLocalQty] = useState(0);
    const controlled = quantity !== undefined;
    const qty = controlled ? quantity : localQty;

    const add = (items: any) => {
        (controlled ? onAdd?.(f) : setLocalQty((q) => q + 1))
        dispatch(addCart(items))
    };
    const remove = (items: any) => {
        (controlled ? onRemove?.(f) : setLocalQty((q) => Math.max(0, q - 1)))
        // dispatch(addCart(items))
        dispatch(removeCart(items?._id))
    };

    // Small "bump" when the number changes
    const [bump, setBump] = useState(false);
    useEffect(() => {
        if (qty === 0) return;
        setBump(true);
        const t = setTimeout(() => setBump(false), 160);
        return () => clearTimeout(t);
    }, [qty]);

    const inCart = qty > 0;


    const rating = (count: any) => {
        let shop = []
        for (let i = 1; i <= 5; i++) {
            shop.push(
                (i < count) ? <IoIosStar className="text-orange-400" size={13} /> : <IoIosStarOutline size={13} />

            )
        }
        return shop
    }



    return (
        <article
            key={f._id}
            className={`group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-orange-100 ${inCart ? "ring-orange-300" : "ring-orange-100"
                }`}
        >
            {/* Image */}
            <div className="relative aspect-4/3 overflow-hidden bg-orange-50">
                <img
                    src={optimize(f.image)}
                    alt={f.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "/images/category-placeholder.png";
                    }}
                />

                {/* Veg / non-veg mark */}
                <div className="absolute left-3 top-3">
                    <FoodTypeIcon type={f.foodtype} />
                </div>

                {/* Category */}
                <span className="absolute bottom-3 left-3 translate-y-1 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">

                    {f.category}
                </span>

                {/* <span className="absolute bottom-3 right-3 flex translate-y-1  py-1 text-xs font-medium text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">

                    {rating(3)}
                </span> */}

                {/* In-cart badge */}
                <span
                    className={`absolute right-3 top-3 rounded-full bg-orange-500 px-2.5 py-1 text-xs font-semibold text-white transition-all duration-300 ${inCart ? "scale-100 opacity-100" : "scale-50 opacity-0"
                        }`}
                >
                    {qty} in cart
                </span>
            </div>

            {/* Body */}
            <div className="p-4">

                <div className="w-full flex justify-between items-start">
                    <div className="w-auto">
                        <h3 className="truncate text-xs font-semibold text-gray-900" title={f.name}>
                            {f.name}
                        </h3>
                        <p className="mt-0.5 truncate text-sm text-gray-500">
                            {/* {f.category}  */}
                            <span className={`${f.foodtype === 'veg' ? 'text-green-500' : 'text-red-500'} text-xs`}>
                                {f.foodtype === 'veg' ? itemFoodType['veg'] : itemFoodType['no-veg']}
                            </span>
                        </p>
                    </div>
                    <div className="w-auto flex flex-col ">
                        <div className="flex gap-0.5">
                            {rating(f?.rating?.average || 0)}
                        </div>
                        <div className="flex gap-0.5 text-sm text-orange-400 mt-1 font-semibold">
                            {f?.rating?.count || 0}
                        </div>
                    </div>

                </div>


                <div className="mt-2 flex items-center justify-between">
                    <strong className="text-base font-bold text-gray-900">₹{f.price}</strong>

                    {/* Add button <-> stepper (cross-fade) */}
                    <div className="relative h-8 w-15">
                        <button
                            onClick={() => add(f)}
                            tabIndex={inCart ? -1 : 0}
                            className={`absolute inset-0 rounded-xl border border-orange-500 text-xs font-semibold 
                                uppercase tracking-wide text-orange-600 transition-all duration-300 
                                hover:bg-orange-500 hover:text-white active:scale-95 
                                ${inCart ? "pointer-events-none scale-75 opacity-0" : "scale-100 opacity-100"
                                }`}
                        >
                            Add
                        </button>

                        <div
                            className={`absolute inset-0 flex items-center justify-between rounded-xl bg-orange-500 px-1 text-white shadow-md shadow-orange-200 transition-all duration-300 ${inCart ? "scale-100 opacity-100" : "pointer-events-none scale-75 opacity-0"
                                }`}
                        >
                            <button
                                onClick={() => remove(f)}
                                aria-label={`Remove one ${f.name}`}
                                className="flex h-4 w-4 items-center justify-center rounded-lg text-sm leading-none transition-transform hover:bg-orange-600 active:scale-90"
                            >
                                −
                            </button>
                            <span className={`min-w-6 text-center flex justify-center items-center gap-2 text-sm font-bold transition-transform duration-150 ${bump ? "scale-125" : "scale-100"}`}>
                                {qty}
                            </span>
                            <button
                                onClick={() => add(f)}
                                aria-label={`Add one more ${f.name}`}
                                className="flex h-4 w-4 items-center justify-center rounded-lg text-sm leading-none transition-transform hover:bg-orange-600 active:scale-90"
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
};

export const FoodItemsGrid = ({ items = [] }: { items?: FoodItem[] }) => (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((it) => (
            <FoodItems key={it._id} f={it} />
        ))}
    </div>
);

export default FoodItems;