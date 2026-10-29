import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
    id?: any
    label?: string;
    error?: any;
    icons?: 'yes' | 'no',
    iconDirection?: 'left' | 'right',
    iconname?: any,
    iconClass?: any,
    iconOnClick?: () => void
};

export default function InputFiled({
    label,
    error,
    className = "",
    id,
    name,
    icons,
    iconDirection,
    iconname,
    iconClass,
    iconOnClick, ...rest }: Props) {
    const inputId = id ?? name;

    return (
        <div className="flex w-full flex-col gap-1">
            {label && (
                <label htmlFor={inputId} className="text-sm font-medium text-neutral-700">
                    {label}
                </label>
            )}
            <div className={`w-full ${icons === 'yes' ? 'relative flex gap-2' : ''}`}>
                {
                    iconDirection === 'left' ? <div onClick={iconOnClick} className={`${iconClass} w-11.25`}>{iconname}</div> : ' '
                }
                <input
                    id={inputId}
                    name={name}
                    aria-invalid={!!error}
                    className={`${className} w-full rounded-4xl border-2 bg-slate-200 px-4 py-3 text-sm outline-none 

                ${error ? "border-red-400" : "border-transparent focus:border-[#ff8036]"
                        }`}
                    {...rest}
                />

                {
                    iconDirection === 'right' ? <div onClick={iconOnClick} className={`${iconClass} w-11.25`}>{iconname}</div> : ''
                }
            </div>

            {error && <p className="text-xs text-red-600 flex justify-start">{error}</p>}
        </div>
    );
}