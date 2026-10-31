import { useForm } from 'react-hook-form'
import DeliveryLocation from './DeliveryLocation'
import PageTitleWithMetaDetails from '../../Layout/PageTileWithMeta'

const CheckOutForm = () => {

    const { register, handleSubmit } = useForm({
        mode: 'onBlur',
        defaultValues: {

        }
    })


    const checkoutForm = (value: any) => {
        console.log('values', value)
    }

    return (
        <div
            className='w-full'
        >
            <DeliveryLocation />
            <form
                className='w-full'
                onSubmit={handleSubmit(checkoutForm)}
            >

            </form>
        </div>
    )
}

export default PageTitleWithMetaDetails(CheckOutForm, 'Checkout', '')