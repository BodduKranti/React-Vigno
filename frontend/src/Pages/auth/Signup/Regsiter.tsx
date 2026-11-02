import AsideLoginRegister from "../../../components/AsideLoginRegister"
import PageTitleWithMetaDetails from "../../../Layout/PageTileWithMeta"
import RegisterForm from "./RegisterForm"

const Regsiter = () => {
    return (
        <div className="w-full">
            <AsideLoginRegister />
            <RegisterForm />
        </div>
    )
}

export default PageTitleWithMetaDetails(Regsiter, 'Register', '')