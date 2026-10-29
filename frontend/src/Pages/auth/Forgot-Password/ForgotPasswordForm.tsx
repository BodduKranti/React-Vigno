import { useEffect, type Dispatch, type SetStateAction } from "react"
import InputFiled from "../../../components/field/InputField"
import LoginRegisterTopSection from "../../../components/LoginRegisterTopSection"
import Button from "../../../components/field/Button"
import { Link } from "react-router"
import { useForm } from 'react-hook-form'

interface ForgotPasswordFormprops {
    handleSubmit: (values: any) => void,
    setEmail: Dispatch<SetStateAction<string>>,
    loader: boolean
}
const ForgotPasswordForm = ({ handleSubmit: emailSubmit, setEmail, loader }: ForgotPasswordFormprops) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<any>({
        mode: 'onBlur',
        defaultValues: {
            email: ''
        }
    })

    const handleSubmitEmail = async (
        value: { email: string }
    ) => {
        try {
            await emailSubmit(value?.email);
        } catch (error) {
            console.error("Something went wrong:", error);
        }
    };

    const emailValue = watch("email");

    useEffect(() => {
        setEmail(emailValue);
    }, [emailValue]);

    return (
        <div className="w-full">
            <section className="pane p-in flex flex-col items-center justify-center px-8 text-center md:px-0">
                <div className="flex w-full max-w-110 flex-col items-center px-4">
                    <LoginRegisterTopSection key={3} title="Forgot Password" content="Or use your email and password" />

                    <form onSubmit={handleSubmit(handleSubmitEmail)} className="w-full flex flex-col gap-4 mt-5">
                        <InputFiled
                            {...register('email', {
                                required: 'Email is required!', pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: 'Please enter valid email address'
                                }
                            })}
                            placeholder="Email"
                            type="email"
                            error={errors?.email?.message ?? ''}
                        />

                        <Button
                            btnTxt={loader ?
                                <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent" /> : "Send Email"}
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

export default ForgotPasswordForm