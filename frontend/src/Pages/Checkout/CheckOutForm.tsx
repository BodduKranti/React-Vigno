import DeliveryLocation from './DeliveryLocation'
import PageTitleWithMetaDetails from '../../Layout/PageTileWithMeta'
import PamentSection from './PamentSection'

const CheckOutForm = () => {

    return (
        <div
            className='w-full'
        >
            <DeliveryLocation />

            <PamentSection />

        </div>
    )
}

export default PageTitleWithMetaDetails(CheckOutForm, 'Checkout', '')