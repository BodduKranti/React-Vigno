

const SocialLogin = ({ socialButtonsection }: { socialButtonsection: any }) => {
    return (
        <div className='w-full flex flex-col justify-center items-center space-y-2'>
            {socialButtonsection}

            <div className='w-full flex justify-center items-center border-t border-t-[#FF6B06]'>
            </div>
        </div>
    )
}

export default SocialLogin