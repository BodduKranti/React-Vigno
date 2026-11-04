import DeliveryBoysection from "../DeliveryBoy/DeliveryBoysection"

const DeliveryBoyDashboard = () => {
    return (
        <div className="w-full bg-[#fff8f1] md:h-[calc(100vh-82px)] md:overflow-y-auto">
            <main className="mx-auto grid max-w-[1600px] grid-cols-1 gap-6 px-4 pt-8 lg:grid-cols-[360px_1fr] lg:items-start">
                <DeliveryBoysection />
            </main>
        </div>
    )
}

export default DeliveryBoyDashboard