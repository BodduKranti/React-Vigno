import CheckOutForm from "./CheckOutForm"

const Checkout = () => {
    return (
        <div className="cats max-w-[1600px] mx-auto">
            <h2>Checkout</h2>
            <div className="w-full grid grid-cols-1 space-y-4 md:flex gap-4">
                <div className="w-full md:w-2/3">
                    <div className="w-full flex flex-col space-y-2 gap-2">
                        <CheckOutForm />
                    </div>
                </div>

                <div className="w-full md:w-1/3">

                </div>
            </div>
        </div>

    )
}

export default Checkout