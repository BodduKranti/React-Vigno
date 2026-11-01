import { useForm } from 'react-hook-form'
import DeliveryLocation from './DeliveryLocation'
import PageTitleWithMetaDetails from '../../Layout/PageTileWithMeta'
import PamentSection from './PamentSection'

const CheckOutForm = () => {

    const { handleSubmit } = useForm({
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

            <PamentSection />
            <form
                className='w-full'
                onSubmit={handleSubmit(checkoutForm)}
            >

            </form>
        </div>
    )
}

export default PageTitleWithMetaDetails(CheckOutForm, 'Checkout', '')