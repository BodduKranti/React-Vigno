import { Pin } from "lucide-react"
import { useAppSelecter } from "../../Store/hook"


const DeliveryBoyDetails = () => {
    const { userData } = useAppSelecter((state) => state.userInfo)

    return (
        <div className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-orange-100">

            <section className="overflow-hidden rounded-3xl bg-linear-to-br from-orange-500 to-orange-400 p-6 text-white shadow-lg shadow-orange-200">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="text-sm text-orange-100">Welcome back,</p>
                        <h1 className="text-2xl font-extrabold capitalize">{userData?.fullname}</h1>
                    </div>
                    {/* <button
              onClick={() => setOnline((v) => !v)}
              role="switch"
              aria-checked={online}
              className="flex items-center gap-2 rounded-full bg-white/20 px-3 py-1.5 text-sm font-semibold backdrop-blur transition hover:bg-white/30"
            >
              <span className={`h-2.5 w-2.5 rounded-full ${online ? "bg-emerald-300" : "bg-gray-300"}`} />
              {online ? "Online" : "Offline"}
            </button> */}
                </div>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1.5 text-sm">
                    <Pin />
                    {userData?.location?.coordinates[0].toFixed(4) ?? "--"}, {userData?.location?.coordinates[1].toFixed(4) ?? "--"}
                </div>
            </section>

        </div>
    )
}

export default DeliveryBoyDetails