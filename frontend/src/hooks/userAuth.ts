import { useMutation } from "@tanstack/react-query";
import { ROUTES, type userRegister, type userSignIn } from "../type";
import { AxiosInstance } from "../services";

export const userRegisterFun = () => {
    return useMutation<userRegister, Error, userRegister>({
        mutationFn: async (payload: userRegister) => {
            const response = await AxiosInstance.post(ROUTES.REGISTER_URL, payload)
            return response?.data
        }
    })
}

export const userSignInFun = () => {
    return useMutation<userSignIn, Error, userSignIn>({
        mutationFn: async (payload: userSignIn) => {
            const response = await AxiosInstance.post(ROUTES.LOGIN_URL, payload, {
                withCredentials: true
            })
            return response?.data
        }
    })
}

type PostVariables = {
    URL: string;
    payload: Record<string, unknown>; // must be an object, not a string
};

export const userAuthPostFun = () => {
    return useMutation<any, Error, PostVariables>({
        mutationFn: async ({ URL, payload }) => {
            const response = await AxiosInstance.post(URL, payload, { withCredentials: true });
            return response?.data;
        },
    });
};




