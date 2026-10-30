import { PinIcon } from "lucide-react"
import { Link } from "react-router";

interface Bestshopitesmprops {
    _id: any,
    name: string,
    image: string,
    city: string
}

interface shopItems {
    items: Bestshopitesmprops,
    focus?: string;
}

const optimize = (url?: string, w = 800) =>
    url?.includes("/upload/") ? url.replace("/upload/", `/upload/f_auto,q_auto,c_limit,w_${w}/`) : url;


const OverlayShopCard = ({ items: shop, focus }: shopItems) =>
    shop._id && (true) ? (
        <Link to={`/restaurants/${shop._id}`} aria-label={`Open ${shop.name}`} className="block">
            <BestShopItems items={shop} focus={focus} />
        </Link>
    ) : (
        <BestShopItems items={shop} focus={focus} />
    );

const BestShopItems = ({ items: shop, focus = "50% 20%" }: shopItems) => {
    const open = true;
    return (
        // <article className="food">
        //     <img src={f.image} alt={f.name} loading="lazy" />
        //     <div className="food__body">
        //         <h3>{f.name}</h3>
        //         <p className="food__shop"><MapPin size={20} /> {f.city}</p>

        //     </div>
        // </article>

        <div className="group relative aspect-3/2 overflow-hidden rounded-3xl bg-gray-900 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <img
                src={optimize(shop.image)}
                alt={shop.name}
                loading="lazy"
                style={{ objectPosition: focus }}
                className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${open ? "" : "grayscale"
                    }`}
                onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/images/category-placeholder.png";
                }}
            />

            {/* Dark fade so the text stays readable on any photo */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-linear-to-t from-black/85 via-black/45 to-transparent" />

            {/* Discount tab (top-right) */}
            {/* {shop.discount ? (
                <span className="absolute right-0 top-0 rounded-bl-3xl bg-[#0f1b3d] px-5 py-3 text-lg font-bold text-white">
                    -{shop.discount}%
                </span>
            ) : null} */}

            {!open && (
                <span className="absolute left-4 top-4 rounded-full bg-gray-800 px-3 py-1 text-xs font-semibold text-white">
                    Closed
                </span>
            )}

            {/* Text (bottom-left) */}
            <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="flex items-center gap-1.5 text-sm font-semibold text-orange-400">
                    <PinIcon />
                    {shop.city ?? "Nearby"}
                </p>
                <h3 className="mt-1 truncate text-2xl font-bold text-white" title={shop.name}>
                    {shop.name}
                </h3>
            </div>
        </div>
    )
}

export { OverlayShopCard, BestShopItems }