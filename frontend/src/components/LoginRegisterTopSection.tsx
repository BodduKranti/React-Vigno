import Logo from "./Logo"

const LoginRegisterTopSection = ({ title, content }: { title: string, content?: string }) => {
    return (
        <div className='w-full mb-2'>
            <div className="flex items-center justify-center gap-1" aria-label="Food">
                <Logo />
            </div>
            <h1 className="my-3  text-3xl md:text-4xl font-medium text-center">{title}</h1>
            <p className="mt-3 md:mt-9 text-lg hidden">{content}</p>
        </div>
    )
}

export default LoginRegisterTopSection