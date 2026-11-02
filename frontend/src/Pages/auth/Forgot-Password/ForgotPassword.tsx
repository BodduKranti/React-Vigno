import AsideLoginRegister from '../../../components/AsideLoginRegister'
import PageTitleWithMetaDetails from '../../../Layout/PageTileWithMeta'
import ForgotPasswordFlow from './ForgotPasswordFlow'
const ForgotPassword = () => {
    return (
        <div className="w-full">
            <ForgotPasswordFlow />
            <AsideLoginRegister />
        </div>
    )
}

export default PageTitleWithMetaDetails(ForgotPassword, 'Forgot-Password', '')