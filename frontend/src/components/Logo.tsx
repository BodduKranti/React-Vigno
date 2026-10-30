import { Utensils } from 'lucide-react'

const Logo = () => {
    return (
        <>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500 text-white">
                <Utensils size={27} strokeWidth={2.3} />
            </div>

            <div>
                <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">
                    Quick<span className="text-orange-500">Bite</span>
                </h1>
                <p className="text-xs text-gray-500">Good Food, Faster</p>
            </div>
        </>
    )
}

export default Logo