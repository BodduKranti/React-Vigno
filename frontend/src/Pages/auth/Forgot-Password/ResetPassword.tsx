import { useState, type ChangeEvent } from 'react'
import LoginRegisterTopSection from '../../../components/LoginRegisterTopSection'
import InputFiled from '../../../components/field/InputField'
import Button from '../../../components/field/Button'
import { toast } from 'react-toastify'
import { Link } from 'react-router'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import LoaderSpin from '../../../components/LoaderSpin'

const ResetPassword = ({ onSubmit, loader }: { onSubmit: (value: any) => void, loader: boolean }) => {
    const [pwdShowHide, setPwdShowHide] = useState<any>({
        pwd: false,
        cnfpwd: false
    })

    const [field, setField] = useState<any>({
        newpassword: '',
        cnfpassword: ''
    })

    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setField((prev: any) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e: any, values: any) => {
        e.preventDefault();

        if (field?.newpassword.length < 6) {
            return toast.error(`Password length should be more than 6 characters`)
        }

        if (field.newpassword !== field.cnfpassword) return toast.error(`Password do not matched`)

        try {
            await onSubmit(values)
        }
        catch (error) {
        }
    }

    return (
        <div className="w-full">
            <section className="pane p-in flex flex-col items-center justify-center px-8 text-center md:px-0">
                <div className="flex w-full max-w-110 flex-col items-center px-4">
                    <LoginRegisterTopSection key={3} title="Reset Password" content="Or use your email and password" />

                    <form onSubmit={(e: any) => handleSubmit(e, field)} className="w-full flex flex-col gap-4 mt-5">
                        <InputFiled onChange={inputHandler}
                            placeholder="Password"
                            name="newpassword"
                            type={pwdShowHide.pwd ? "text" : "password"}
                            value={field?.newpassword}
                            icons="yes"
                            iconDirection="right"
                            iconClass={`absolute top-[50%] -translate-y-[50%] right-0 text-gray-500`}
                            iconname={pwdShowHide.pwd ? <FaEye className="w-5 h-5" /> : <FaEyeSlash className="w-5 h-5" />}
                            iconOnClick={() => setPwdShowHide((prev: any) => ({ ...prev, pwd: !prev.pwd }))}
                        />

                        <InputFiled onChange={inputHandler}
                            placeholder="Confirm Password"
                            name="cnfpassword"
                            type={pwdShowHide.cnfpwd ? "text" : "password"}
                            value={field?.cnfpassword}
                            icons="yes"
                            iconDirection="right"
                            iconClass={`absolute top-[50%] -translate-y-[50%] right-0 text-gray-500`}
                            iconname={pwdShowHide.cnfpwd ? <FaEye className="w-5 h-5" /> : <FaEyeSlash className="w-5 h-5" />}
                            iconOnClick={() => setPwdShowHide((prev: any) => ({ ...prev, cnfpwd: !prev.cnfpwd }))}
                        />

                        <Button
                            btnTxt={loader ? <LoaderSpin /> : "Reset Password"}
                            btnColor='warning'
                            type="submit"
                            disabled={loader ? true : false}
                        />
                    </form>

                    <p className="md:hidden text-xs flex justify-end py-2 gap-2 items-center">Back to <Link className="text-[#FF6B06] underline" to={'/login'}>Sign In</Link></p>

                </div>
            </section>
        </div>
    )
}

export default ResetPassword