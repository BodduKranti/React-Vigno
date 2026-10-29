import { UtensilsCrossed } from 'lucide-react'

const ShopHasNoData = () => {
    return (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-orange-200 bg-orange-50/50 px-6 py-16 text-center">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-orange-100">
                <UtensilsCrossed size={36} strokeWidth={1.5} className="text-orange-500" />
            </div>
            <p className="text-lg font-semibold text-gray-900">No items yet</p>
            <p className="mt-1 text-sm text-gray-500">Add your first food item to start selling.</p>
        </div>
    )
}

export default ShopHasNoData