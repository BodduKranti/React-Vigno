import type React from "react"
import { useLocation } from "react-router"

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    const location = useLocation()
    const isSignup = location.pathname === '/register'
    return (
        <div data-mode={isSignup ? 'signup' : 'singin'} className="flex loginRegister_bg h-[100dvh] w-full items-center justify-center p-4 md:p-10 bg-[#ededed]">
            <div className="bg-white relative w-full max-w-6xl overflow-hidden rounded-[28px] md:h-157.5 md:min-h-157.5">
                {children}
            </div>
        </div>
    )
}

export default AuthLayout