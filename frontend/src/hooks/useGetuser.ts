import { ROUTES } from "../type"
import { useGetApi } from "./useAxiosServices"


export const getUserFun = () => useGetApi(ROUTES.GET_USER);
export const logoutUserfun = () => useGetApi(ROUTES.LOGOUT, undefined, false)
