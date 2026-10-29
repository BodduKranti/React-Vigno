import { useCallback, useState } from 'react'
import ForgotPasswordForm from './ForgotPasswordForm';
import { useNavigate } from 'react-router';
import ResetPassword from './ResetPassword';
import OtpVerify from './VefifyOtp';
import { userAuthPostFun } from '../../../hooks/userAuth';
import { toast } from 'react-toastify';
import { ROUTES } from '../../../type';
import { ErrorAxios } from '../../../services/ErrorIntersects';

const ForgotPasswordFlow = () => {
    const [step, setStep] = useState("email");
    const [email, setEmail] = useState<string>('')
    const [loader, setLoader] = useState<boolean>(false)

    const navigate = useNavigate()

    const AuthFunctionMethod = userAuthPostFun()

    // Forgot password email send
    const handleSubmitEmailverify = useCallback((values: any) => {
        setLoader(true)
        const sendData: any = {
            email: values
        }

        AuthFunctionMethod.mutate({ URL: ROUTES.SENDOTP, payload: sendData },
            {
                onSuccess: (data: any) => {
                    setStep('otp')
                    setEmail(values)
                    toast.success(data?.message)
                    setLoader(false)
                },
                onError: (error: any) => {
                    const errorMessage = ErrorAxios(error)
                    toast.error(errorMessage)
                    setLoader(false)
                }
            }
        )
    }, [step, setStep, setEmail, email, setLoader, loader])

    //Verify OTP
    const handleSubmitOPTverify = useCallback((otp?: string) => {
        const payload = { email, Otp: otp }
        // VERIFY_OTP
        setLoader(true)

        AuthFunctionMethod.mutate({ URL: ROUTES.VERIFY_OTP, payload: payload },
            {
                onSuccess: (data: any) => {
                    setStep("reset");
                    toast.success(data?.message)
                    setLoader(false)
                },
                onError: (error: any) => {
                    console.log('error', error)
                    const errorMessage = ErrorAxios(error)
                    toast.error(errorMessage)
                    setLoader(false)
                }
            }
        )
    }, [step, setStep, setEmail, email, setLoader, loader])

    //create New Password
    const handleSubmitnewPassword = (password: any) => {
        const payload = { email, newpassword: password?.newpassword }
        setLoader(true)
        AuthFunctionMethod.mutate({ URL: ROUTES.RESET_PASSWORD, payload: payload },
            {
                onSuccess: (data: any) => {
                    console.log(`Successfully Reset Password`, data)
                    setStep("email");
                    navigate('/login')
                    toast.success(data?.message)
                    setLoader(false)
                },
                onError: (error: any) => {
                    const errorMessage = ErrorAxios(error)
                    toast.error(errorMessage)
                    setLoader(false)
                }
            }
        )
    }

    const onResend = useCallback((url: string, payload: any) => {
        AuthFunctionMethod.mutate({ URL: url, payload }, {
            onSuccess: () => {
                toast.success(`Sent OTP in your email`)
            },
            onError: (error: any) => {
                const errorMessage = ErrorAxios(error)
                toast.error(errorMessage)
            }
        })
    }, [email])

    if (step === 'email') {
        return <ForgotPasswordForm handleSubmit={handleSubmitEmailverify} setEmail={setEmail} loader={loader} />
    }

    if (step === 'otp') {
        return <OtpVerify
            onVerify={handleSubmitOPTverify}
            email={email}
            onResend={() => onResend(ROUTES.SENDOTP, { email })} // TODO
            onBack={() => setStep("email")}
        />
    }
    return (
        <ResetPassword onSubmit={handleSubmitnewPassword} loader={loader} />
    )
}

export default ForgotPasswordFlow