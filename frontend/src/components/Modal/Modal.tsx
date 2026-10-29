import { useEffect } from "react"
import { createPortal } from "react-dom"
import { X } from "lucide-react"

export type ModalSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl"

const sizeClasses: Record<ModalSize, string> = {
    xs: "max-w-xs",     // 320px
    sm: "max-w-sm",     // 384px
    md: "max-w-md",     // 448px
    lg: "max-w-lg",     // 512px
    xl: "max-w-xl",     // 576px
    "2xl": "max-w-2xl", // 672px
    "3xl": "max-w-3xl", // 768px
    "4xl": "max-w-4xl", // 896px
}

interface ModalProps {
    open: boolean
    onClose: () => void
    title: string
    size?: ModalSize
    children: React.ReactNode
}

const Modal = ({ open, onClose, title, size = "lg", children }: ModalProps) => {
    useEffect(() => {
        if (!open) return
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
        document.addEventListener("keydown", onKey)
        const prev = document.body.style.overflow
        document.body.style.overflow = "hidden"
        return () => {
            document.removeEventListener("keydown", onKey)
            document.body.style.overflow = prev
        }
    }, [open, onClose])

    if (!open) return null

    return createPortal(
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                role="dialog"
                aria-modal="true"
                className={`relative max-h-[90vh] w-full ${sizeClasses[size]} overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8`}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close"
                    className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-gray-200"
                >
                    <X size={18} />
                </button>
                <h2 className="mb-6 pr-10 text-2xl font-extrabold text-gray-900">{title}</h2>
                {children}
            </div>
        </div>,
        document.body
    )
}

export default Modal