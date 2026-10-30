import { useState } from "react"
import InputFiled from "../../../components/field/InputField"
import LoginRegisterTopSection from "../../../components/LoginRegisterTopSection"
import Button from "../../../components/field/Button"
import { Link } from "react-router"
import { userAuthPostFun, userSignInFun } from "../../../hooks/userAuth"
import { toast } from "react-toastify"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import SocialLogin from "../../../components/SocailLogin/SocialLogin"
import SocialButtons from "../../../components/field/SocialButtons"
import { FcGoogle } from "react-icons/fc"
import { ROUTES } from "../../../type"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "../../../Firebase/Firebase"
import { useForm } from "react-hook-form"
import { useAppDispatch } from "../../../Store/hook"
import { getUserfun } from "../../../Store/StoreThunk/GetUserThunk"
interface userInterfacep {
    email: string,
    password: string,
    token?: string
}


const LoginForm = () => {
    const dispatch = useAppDispatch()
    const [showhidepwd, setShowhidepwd] = useState<boolean>(false)
    const [loader, setLoader] = useState<boolean>(false)
    const [loadergoogle, setLoadergoogle] = useState<boolean>(false)

    const { register, handleSubmit, formState: { errors } } = useForm<userInterfacep>({
        mode: 'onBlur',
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const signInUser = userSignInFun()

    const onSubmit = (values: any) => {
        setLoader(true)
        const payload = { ...values }
        signInUser.mutate(payload, {
            onSuccess: (data) => {
                console.log('login after data', data?.token)
                setLoader(false)
                console.log(`Successfully logged in`)
                toast.success(`Successfully logged in`)
                localStorage.setItem('token', data?.token)
                dispatch(getUserfun())
            },
            onError: (error) => {
                setLoader(false)
                toast.error(`Invalid Email or Password`)
                console.log(`Somewent wrorng on login api ${error}`)
            }
        })
    }

    //Google Auth POST Request
    const GoogleAuth = userAuthPostFun()
    // google authententication
    const handleGoogleAuth = async () => {
        // if (!field.mobile) {
        //     return toast.error('Mobile number is required')
        // }
        setLoadergoogle(true)
        const provider = new GoogleAuthProvider()
        const result: any = await signInWithPopup(auth, provider)

        const { email } = result?.user

        const submit = {
            URL: ROUTES.GOOGLE_AUTH,
            payload: {
                email: email,
            }
        }

        GoogleAuth.mutate(submit, {
            onSuccess: (data) => {
                console.log(`google data : ${data}`)
                toast.success(`Successfully Logged in with Goolge`)
                setLoadergoogle(false)
                dispatch(getUserfun())

            },
            onError: (error: any) => {
                toast.error(`${error}`)
                setLoadergoogle(false)
            }
        })
    }


    return (
        <div className="w-full">
            <section className="pane p-in flex flex-col items-center justify-center px-8 text-center md:px-0">
                <div className="flex w-full max-w-110 flex-col items-center px-4">
                    <LoginRegisterTopSection key={1} title="Sign In" content="Or use your email and password" />
                    <SocialLogin
                        socialButtonsection={<>
                            <SocialButtons
                                socialIcon={<FcGoogle className='w-5 h-5' />}
                                title={loadergoogle ?
                                    <div className="h-6 w-6 animate-spin rounded-full border-4 border-orange-600 border-t-transparent" /> : `Sign in with Google`}
                                onClick={handleGoogleAuth}
                            />
                        </>}
                    />
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4 mt-2">
                        <InputFiled
                            placeholder="Email"
                            type="email"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: 'Please enter valid email address!'
                                }
                            })}
                            error={errors?.email?.message}
                        />
                        <InputFiled
                            placeholder="Password"
                            type={showhidepwd ? 'text' : "password"}
                            icons="yes"
                            iconDirection="right"
                            iconClass={`absolute top-[50%] -translate-y-[50%] right-0 text-gray-500`}
                            iconname={showhidepwd ? <FaEye className="w-5 h-5" /> : <FaEyeSlash className="w-5 h-5" />}
                            iconOnClick={() => setShowhidepwd(!showhidepwd)}
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: "Password must contain at least 6 characters"
                                }

                            })}
                            error={errors?.password?.message}
                        />

                        <div className="w-full flex justify-end">
                            <Link to={'/forgot-password'} className="text-[#FF6B06] underline">Forgot Password?</Link>
                        </div>
                        <Button
                            btnTxt={loader ? <div className="h-6 w-6 animate-spin rounded-full border-4 borderwhite border-t-transparent" /> : "Sign In"}
                            btnColor='warning'
                            type="submit"
                            disabled={loader ? true : false}
                        />
                    </form>

                    <p className="md:hidden text-xs flex justify-end py-2 gap-2 items-center">You don't have account, click here to <Link className="text-[#FF6B06] underline" to={'/register'}>Sign Up</Link></p>
                </div>
            </section>
        </div>
    )
}

export default LoginForm