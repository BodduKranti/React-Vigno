
import { useNavigate } from "react-router";
import { ShieldAlert, Home, ArrowLeft } from "lucide-react";
import { useAuthContext } from "../../utils/ContextApi";
import { ROLE_HOME } from "../../type";

export default function Unauthorized() {
    const navigate = useNavigate();
    const { user }: any = useAuthContext();

    return (
        <div className=" bg-[#fff8f1] md:h-[calc(100vh-82px)] h-auto md:overflow-y-auto flex flex-col">
            {/* Main content */}
            <main className="flex-1 flex items-center justify-center px-5 py-12">
                <section className="w-full max-w-xl text-center">
                    <div className="mx-auto mb-7 flex h-28 w-28 items-center justify-center rounded-full bg-orange-100">
                        <ShieldAlert
                            size={64}
                            strokeWidth={1.5}
                            className="text-orange-500"
                        />
                    </div>

                    <p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-500">
                        Error 403
                    </p>

                    <h1 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-5xl">
                        Access Denied!
                    </h1>

                    <p className="mt-5 text-base leading-7 text-gray-600 sm:text-lg">
                        Oops! You don't have permission to access this page.
                        Please contact the administrator or return to
                        QuickBite and continue exploring delicious food.
                    </p>

                    <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                        <button
                            onClick={() => navigate(ROLE_HOME[user.role])}
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white shadow-md shadow-orange-200 transition hover:bg-orange-600"
                        >
                            <Home size={18} />
                            Go to Home
                        </button>

                        <button
                            onClick={() => navigate(-1)}
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-orange-300 bg-white px-6 py-3 font-semibold text-orange-600 transition hover:bg-orange-50"
                        >
                            <ArrowLeft size={18} />
                            Go Back
                        </button>
                    </div>

                    <p className="mt-10 text-sm text-gray-500">
                        Need help?{" "}
                        <a
                            href="mailto:support@quickbite.com"
                            className="font-semibold text-orange-600 hover:underline"
                        >
                            Contact QuickBite Support
                        </a>
                    </p>
                </section>
            </main>

        </div>
    );
}
