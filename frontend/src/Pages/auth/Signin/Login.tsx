import AsideLoginRegister from "../../../components/AsideLoginRegister"
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

export default Login