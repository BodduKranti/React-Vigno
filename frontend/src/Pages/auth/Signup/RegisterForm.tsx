import { useState } from "react"
import { MdDeliveryDining } from "react-icons/md";

import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import Button from "../../../components/field/Button"
import InputFiled from "../../../components/field/InputField"
import LoginRegisterTopSection from "../../../components/LoginRegisterTopSection"
import { FaEye, FaEyeSlash, FaUser, FaUserNurse } from "react-icons/fa";
import { userAuthPostFun, userRegisterFun } from "../../../hooks/userAuth";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router";
import SocialLogin from "../../../components/SocailLogin/SocialLogin";
import SocialButtons from "../../../components/field/SocialButtons";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../../../Firebase/Firebase";
import { ROUTES } from "../../../type";

import { useForm } from 'react-hook-form'
import { ErrorAxios } from "../../../services/ErrorIntersects";
import { useAppDispatch } from "../../../Store/hook";
import { getUserfun } from "../../../Store/StoreThunk/GetUserThunk";

interface singupUSer {
    fullname: string,
    email: string,
    password: string,
    mobile: string,
}
const roler = [
    { name: 'user', icon: <FaUser className="w-6 h-6" /> },
    { name: 'owner', icon: <FaUserNurse className="w-6 h-6" /> },
    { name: 'deliveryboy', icon: <MdDeliveryDining className="w-8 h-8" /> },
]
const RegisterForm = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const { register, handleSubmit, trigger,
        getValues, formState: { errors } } = useForm<singupUSer>({
            mode: 'onBlur',
            defaultValues: {
                fullname: '',
                email: '',
                password: '',
                mobile: '',
            }
        })


    const [showhidepwd, setShowhidepwd] = useState<boolean>(false)
    const [loader, setLoader] = useState<boolean>(false)
    const [loadergoogle, setLoadergoogle] = useState<boolean>(false)

    const [role, setRole] = useState<string>('user')

    const registerUSerFun = userRegisterFun()

    //Google Auth POST Request
    const GoogleAuth = userAuthPostFun()


    const onSubmit = (value: singupUSer) => {
        setLoader(true)
        const payload = { ...value, role: role }
        registerUSerFun.mutate(payload, {
            onSuccess: () => {
                console.log(`Sucessfully Registerd `)
                setLoader(false)
                toast.success(`Successfully Registered..`)
                navigate("/login")
            },
            onError: (error: any) => {
                console.log(`Register not somewent wrong ${error?.data}`)
                setLoader(false)
                const errorMessage = ErrorAxios(error)
                toast.error(errorMessage)
            }
        })
    }


    // google authententication
    const handleGoogleAuth = async () => {
        const mobileOk = await trigger("mobile", { shouldFocus: true });
        if (!mobileOk) return toast.error('Mobile number is required');

        const mobile = getValues("mobile");
        setLoadergoogle(true)
        const provider = new GoogleAuthProvider()
        const result = await signInWithPopup(auth, provider)

        const { displayName, email } = result?.user

        const submit = {
            URL: ROUTES.GOOGLE_AUTH,
            payload: {
                fullname: displayName,
                email: email,
                mobile: mobile,
                role
            }
        }

        GoogleAuth.mutate(submit, {
            onSuccess: (data) => {
                console.log(`google data : ${data}`)
                toast.success(`Successfully Register with Goolge`)
                setLoadergoogle(false)
                navigate("/")
                dispatch(getUserfun())
            },
            onError: (error: any) => {
                const errorMessage = ErrorAxios(error)
                toast.error(errorMessage)
                setLoadergoogle(false)
            }
        })
    }

    return (
        <div className="w-full">
            <section className="pane p-up flex flex-col items-center justify-center px-8 text-center md:px-0">
                <div className="flex w-full max-w-110 flex-col items-center px-4">
                    <LoginRegisterTopSection key={2} title="Create Account" content="Use your email to register" />

                    <SocialLogin
                        socialButtonsection={<>
                            <SocialButtons
                                socialIcon={<FcGoogle className='w-5 h-5' />}
                                title={loadergoogle ?
                                    <div className="h-6 w-6 animate-spin rounded-full border-4 border-orange-600 border-t-transparent" /> : `Sign up with Google`}
                                onClick={handleGoogleAuth}
                            />
                        </>}
                    />

                    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4 mt-3">
                        {/* Role */}
                        <div className="w-full grid grid-cols-3 gap-2">
                            {
                                roler.map((list) => {
                                    return (
                                        <div
                                            onClick={() => setRole(list?.name)}
                                            className={`w-full h-15 flex justify-center flex-col items-center cursor-pointer border rounded-4xl ${role === list?.name ? 'text-[white] bg-[#ff6b06]' : 'border-[#ff6b06]'}`}>
                                            <span>{list?.icon}</span>
                                            {/* <span>{list.name}</span> */}

                                        </div>
                                    )
                                })
                            }
                        </div>
                        <InputFiled
                            // onChange={inputHandler}
                            placeholder="fullname"
                            // name="fullname"
                            type="text"
                            {...register('fullname', { required: 'Fullname is required!' })}
                            error={errors?.fullname?.message}
                        />
                        <InputFiled
                            placeholder="Email"
                            type="email"
                            {...register('email', {
                                required: 'Email is required!',
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: `Please enter valid email address`
                                }
                            })}
                            error={errors?.email?.message}
                        />
                        <InputFiled
                            placeholder="mobile"
                            type="tel"
                            {...register('mobile', { required: 'Mobile is required' })}
                            error={errors?.mobile?.message}
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
                                required: 'Password is required!', minLength: {
                                    value: 6,
                                    message: "Password must contain at least 6 characters",
                                },
                            })}
                            error={errors?.password?.message}
                        />
                        <Button
                            btnTxt={loader ? <div className="h-6 w-6 animate-spin rounded-full border-4 border-white border-t-transparent" /> : "Sign Up"}
                            btnColor='warning'
                            type="submit"
                            disabled={loader ? true : false}
                        />
                    </form>

                    <p className="md:hidden text-xs flex justify-end py-2 gap-2 items-center w-full">You have already account, click here to <Link className="text-[#FF6B06] underline" to={'/login'}>Sign In</Link></p>

                </div>
            </section>
        </div>
    )
}

export default RegisterForm