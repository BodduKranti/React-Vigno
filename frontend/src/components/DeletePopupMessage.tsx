import Button from "./field/Button"

interface deleteProps {
    icon?: any,
    title: string,
    message?: string,
    yesBtntext: any,
    yesbtnOnclick: (values?: any) => void,
    noBtntext: string,
    noBtntextOnClick: (values?: any) => void,
    className?: any
}
const DeletePopupMessage = ({
    icon,
    title,
    message,
    yesBtntext,
    yesbtnOnclick,
    noBtntext,
    noBtntextOnClick,
    className
}: deleteProps) => {
    return (
        <div className="w-full flex flex-col justify-center items-center ">
            {icon && icon}

            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            <p className="text-sm text-gray-600 mt-2 mb-4">{message}</p>
            <div className="flex justify-center gap-4 items-center my-3">
                <Button
                    btnTxt={yesBtntext}
                    onClick={yesbtnOnclick}
                    btnColor="success"
                    type="button"
                    className={className}
                />

                <Button
                    btnTxt={noBtntext}
                    onClick={noBtntextOnClick}
                    btnColor="danger"
                    type="button"
                    className={className}
                />
            </div>
        </div>
    )
}

export default DeletePopupMessage