interface SocialButtonsprops {
    socialIcon: any,
    title: any,
    onClick?: () => void
}
const SocialButtons = ({ socialIcon, title, onClick }: SocialButtonsprops) => {
    return (
        <div
            onClick={onClick}
            className='w-full flex gap-3 justify-center items-center border border-[#FF6B06] px-2 py-3 rounded-3xl cursor-pointer'>
            {socialIcon} {title}
        </div>
    )
}

export default SocialButtons