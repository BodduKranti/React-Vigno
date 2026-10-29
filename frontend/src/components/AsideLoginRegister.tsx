import { useLocation, useNavigate } from "react-router"

const AsideLoginRegister = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const islogin = location.pathname === '/login'
    return (
        <aside className="overlay" aria-hidden="false">
            {
                !islogin ? <div className="ov-text ov-up">
                    <h2 className="text-5xl font-medium">Welcome Back!</h2>
                    <p className="mt-8 max-w-md text-xl font-light leading-snug text-white/85">Enter your personal details to use all of the site’s features</p>
                    <button onClick={() => navigate('/login')} type="button" data-go="signin" className="w-35 rounded-4xl py-3 px-4 flex justify-center items-center cursor-pointer mt-10 border border-white/80 text-white/90 hover:bg-white/10">Sign in</button>
                </div> :
                    <div className="ov-text ov-in">
                        <h2 className="text-5xl font-medium">Hello, Friend!</h2>
                        <p className="mt-8 max-w-md text-xl font-light leading-snug text-white/85">Register with your personal details to use all of the site’s features</p>
                        <button onClick={() => navigate('/register')} type="button" data-go="signup" className="w-35 rounded-4xl py-3 px-4 flex justify-center items-center cursor-pointer mt-10 border border-white/80 text-white/90 hover:bg-white/10">Sign up</button>
                    </div>
            }
        </aside>
    )
}

export default AsideLoginRegister