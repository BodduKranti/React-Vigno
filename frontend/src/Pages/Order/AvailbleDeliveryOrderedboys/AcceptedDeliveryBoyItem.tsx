// import Button from "../../../components/field/Button";

// const rad = (d: any) => (d * Math.PI) / 180;
// const km = (a: any, b: any, c: any, d: any) => {
//     const x = Math.sin(rad(c - a) / 2) ** 2 +
//         Math.cos(rad(a)) * Math.cos(rad(c)) * Math.sin(rad(d - b) / 2) ** 2;
//     return 12742 * Math.asin(Math.sqrt(x));
// };
const initials = (n = "") => n.trim().split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase()).join("") || "DB";
interface avilbleDelBoyprops {
    _id: any,
    fullname: string,
    email: string,
    mobile: any

}

interface availbleProps {
    boy: avilbleDelBoyprops
}

const AcceptedDeliveryBoyItem = ({ boy }: availbleProps) => {

    return (
        <li className={`flex items-center gap-3 rounded-2xl border bg-white px-3 py-2.5 transition 
        border-orange-100`
        }>
            <div className="relative shrink-0">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-orange-500">
                    {initials(boy.fullname)}
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500" />
            </div>

            <div className="min-w-0 flex-1">
                <p className="truncate font-semibold capitalize text-gray-900">{boy.fullname}</p>
                <p className="truncate text-sm text-gray-500">
                    {boy.mobile}
                    {/* {dist && <span className="ml-2 font-medium text-orange-500">{dist}</span>} */}
                </p>
            </div>

            {/* <a href={`tel:${boy.mobile}`} aria-label={`Call ${boy.fullname}`}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-orange-100 hover:text-orange-500">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1L6.6 10.8Z" /></svg>
            </a> */}

            <div
                className="shrink-0 rounded-full bg-orange-500 px-4 py-2 text-sm font-bold text-white shadow-sm transition
                 disabled:cursor-not-allowed disabled:bg-gray-300 ocus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400">
                Accepted
            </div>
        </li>
    );
}

export default AcceptedDeliveryBoyItem