import type { SelectHTMLAttributes } from "react"
import { ChevronDown } from "lucide-react"

type Option = {
    label: string
    value: string | number
}

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
    id?: any
    label?: string
    error?: any
    options: Option[]
    placeholder?: string
}

export default function SelectField({
    label,
    error,
    className = "",
    id,
    name,
    options,
    placeholder = "Select an option",
    ...rest
}: Props) {
    const selectId = id ?? name

    return (
        <div className="flex w-full flex-col gap-1">
            {label && (
                <label htmlFor={selectId} className="text-sm font-medium text-neutral-700">
                    {label}
                </label>
            )}

            <div className="relative w-full">
                <select
                    id={selectId}
                    name={name}
                    aria-invalid={!!error}
                    defaultValue={rest.value === undefined ? "" : undefined}
                    className={`${className} w-full cursor-pointer appearance-none rounded-4xl border-2 bg-slate-200 px-4 py-3 pr-11 text-sm outline-none
                    ${error ? "border-red-400" : "border-transparent focus:border-[#ff8036]"}`}
                    {...rest}
                >
                    <option value="" disabled>
                        {placeholder}
                    </option>
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>

                {/* custom arrow, since appearance-none removes the native one */}
                <ChevronDown
                    size={18}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                />
            </div>

            {error && <p className="flex justify-start text-xs text-red-600">{error}</p>}
        </div>
    )
}