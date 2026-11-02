import AsideLoginRegister from "../../../components/AsideLoginRegister"
import PageTitleWithMetaDetails from "../../../Layout/PageTileWithMeta"
import LoginForm from "./LoginForm"

const Login = () => {
    // const url = import.meta.env.VITE_API_URL

    return (
        <div className="w-full">
            <LoginForm />
            <AsideLoginRegister />
        </div>
    )
}

export default PageTitleWithMetaDetails(Login, 'Login', '')