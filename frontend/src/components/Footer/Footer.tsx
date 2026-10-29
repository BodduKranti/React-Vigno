
import {
    FaUtensils,
    FaInstagram,
    FaFacebookF,
    FaYoutube,
    FaXTwitter,
    FaLocationDot,
    FaEnvelope,
    FaPhone,
} from "react-icons/fa6";

import { Link } from "react-router";

const Footer = () => {
    const linkClass =
        "text-orange-50/90 transition-colors hover:text-white";

    const headingClass =
        "mb-5 text-base font-bold text-white";

    return (
        <footer className="mt-16 bg-[#E85D00] text-white">
            {/* Newsletter */}
            <div className="border-b border-white/20">
                <div className="max-w-[1600px] mx-auto flex cats flex-col gap-5 px-5 py-10 md:flex-row md:items-center md:justify-between md:px-8">
                    <div>
                        <h2 className="text-2xl font-bold text-white!">
                            Get exclusive deals!
                        </h2>
                        <p className="mt-2 text-sm text-orange-50">
                            Subscribe for delicious offers and updates.
                        </p>
                    </div>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            // Connect your newsletter API here.
                        }}
                        className="flex w-full max-w-md gap-2"
                    >
                        <input
                            type="email"
                            required
                            placeholder="Enter your email"
                            className="min-w-0 flex-1 rounded-lg border border-white/30 bg-white px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-white"
                        />

                        <button
                            type="submit"
                            className="rounded-lg bg-white px-5 py-3 text-sm font-semibold text-[#C94D00] transition hover:bg-orange-50"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>

            {/* Main Footer */}
            <div className="max-w-[1600px] mx-auto grid cats grid-cols-1 gap-9 px-5 py-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 md:px-8">
                {/* Brand */}
                <div className="lg:col-span-2">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-3"
                    >
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#E85D00]">
                            <FaUtensils size={23} />
                        </span>

                        <span className="text-2xl font-extrabold tracking-tight">
                            QuickBite
                        </span>
                    </Link>

                    <p className="mt-4 max-w-sm text-sm leading-7 text-orange-50">
                        Good Food, Faster. Discover your favorite
                        restaurants and enjoy delicious meals delivered
                        fresh to your doorstep.
                    </p>

                    <div className="mt-5 space-y-3 text-sm">
                        <p className="flex items-center gap-3">
                            <FaLocationDot className="shrink-0" />
                            Hyderabad, India
                        </p>

                        <a
                            href="mailto:support@quickbite.com"
                            className="flex items-center gap-3 hover:text-white"
                        >
                            <FaEnvelope className="shrink-0" />
                            support@quickbite.com
                        </a>

                        <a
                            href="tel:+910000000000"
                            className="flex items-center gap-3 hover:text-white"
                        >
                            <FaPhone className="shrink-0" />
                            Customer Support
                        </a>
                    </div>

                    {/* Social Links */}
                    <div className="mt-6 flex gap-3">
                        {[
                            { icon: FaInstagram, label: "Instagram", href: "#" },
                            { icon: FaFacebookF, label: "Facebook", href: "#" },
                            { icon: FaYoutube, label: "YouTube", href: "#" },
                            { icon: FaXTwitter, label: "X", href: "#" },
                        ].map(({ icon: Icon, label, href }) => (
                            <a
                                key={label}
                                href={href}
                                aria-label={label}
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 transition hover:bg-white hover:text-[#E85D00]"
                            >
                                <Icon size={16} />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className={headingClass}>Quick Links</h3>
                    <ul className="space-y-3 text-sm">
                        {[
                            ["Home", "/"],
                            ["Restaurants", "/restaurants"],
                            ["Offers & Deals", "/offers"],
                            ["My Orders", "/orders"],
                            ["My Account", "/profile"],
                        ].map(([label, href]) => (
                            <li key={href}>
                                <Link className={linkClass} to={href}>
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Categories */}
                <div>
                    <h3 className={headingClass}>Food Categories</h3>
                    <ul className="space-y-3 text-sm">
                        {[
                            "Biryani",
                            "Pizza",
                            "Burgers",
                            "Desserts",
                            "Healthy Food",
                        ].map((category) => (
                            <li key={category}>
                                <Link
                                    className={linkClass}
                                    to={`/restaurants?category=${encodeURIComponent(category)}`}
                                >
                                    {category}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Customer Support */}
                <div>
                    <h3 className={headingClass}>Help & Support</h3>
                    <ul className="space-y-3 text-sm">
                        {[
                            ["Help Center", "/help"],
                            ["Contact Us", "/contact"],
                            ["FAQs", "/faq"],
                            ["Privacy Policy", "/privacy"],
                            ["Terms & Conditions", "/terms"],
                        ].map(([label, href]) => (
                            <li key={href}>
                                <Link className={linkClass} to={href}>
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/20 bg-[#C94D00]">
                <div className="max-w-[1600px] mx-auto flex cats flex-col items-center justify-between gap-3 px-5 py-5 text-center text-xs text-white sm:flex-row sm:text-left md:px-8">
                    <p>
                        © {new Date().getFullYear()} Quick Bite.
                        All rights reserved.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        <Link to="/privacy" className="hover:underline">
                            Privacy
                        </Link>
                        <Link to="/terms" className="hover:underline">
                            Terms
                        </Link>
                        <Link
                            to="/refund-policy"
                            className="hover:underline"
                        >
                            Refund Policy
                        </Link>
                    </div>

                    <p>Made with ❤️ for food lovers</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
