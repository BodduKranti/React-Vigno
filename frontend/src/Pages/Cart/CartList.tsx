import CartItems from './CartItems'
import { useAppDispatch } from '../../Store/hook'
import { addCart, deleteCart, removeCart, type cartitemsprops } from '../../Store/Reducer/AuthSlice/UserSlice'
interface cartItem {
    items: cartitemsprops[]
}
const CartList = ({ items }: cartItem) => {
    const dispatch = useAppDispatch()
    return (
        <div className=" flex  flex-col gap-3">
            {items.map((item) => (
                <CartItems
                    key={item._id}
                    item={item}
                    onIncrease={() => dispatch(addCart(item))}
                    onDecrease={() => dispatch(removeCart(item._id))}
                    onRemove={() => dispatch(deleteCart(item._id))}
                />
            ))}
        </div>
    )
}

export default CartList