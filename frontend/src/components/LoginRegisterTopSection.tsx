
const LoginRegisterTopSection = ({ title, content }: { title: string, content?: string }) => {
    return (
        <div className='w-full mb-2'>
            <div className="flex items-center justify-center gap-1" aria-label="Food">
                <svg width="34" height="34" viewBox="0 0 32 32" fill="none" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 14a4 4 0 1 1 3-6.6A4.5 4.5 0 0 1 20 7.4 4 4 0 1 1 23 14v3H9z"></path><path d="M9 20h14M12 24v3m8-3v3"></path></svg>
                <span className="text-3xl font-semibold text-amber-500">Food</span>
            </div>
            <h1 className="mt-1  text-3xl md:text-4xl font-medium text-center">{title}</h1>
            <p className="mt-3 md:mt-9 text-lg hidden">{content}</p>
        </div>
    )
}

export default LoginRegisterTopSection