interface ButtonProps {
    btnTxt: any,
    onClick?: (value?: any) => void,
    btnColor: 'success' | 'warning' | 'danger' | 'info' | undefined,
    className?: any,
    type: 'button' | 'submit',
    disabled?: boolean
}

const Button = ({
    btnTxt,
    className,
    onClick,
    btnColor,
    type,
    disabled
}: ButtonProps) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`w-auto ${className}
                rounded-4xl py-3 px-4 flex justify-center items-center cursor-pointer
                ${btnColor === 'success' ? 'bg-green-700 hover:opacity-90 text-white' : ''}
                ${btnColor === 'warning' ? 'bg-[#ff6b06] hover:opacity-90 text-white' : ''}
                ${btnColor === 'danger' ? 'bg-[#ff1306] hover:opacity-90 text-white' : ''}
                ${btnColor === 'info' ? 'bg-[#073bb4] hover:opacity-90 text-white' : ''}
            `}
        >{btnTxt}</button>
    )
}

export default Button