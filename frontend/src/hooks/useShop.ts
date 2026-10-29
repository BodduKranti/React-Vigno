import { ROUTES } from "../type";
import { useDeleteApi, useGetApi, usePostFormApi, usePutFormApi } from "./useAxiosServices";

// route function
export const createShop = () => usePostFormApi()
export const updateShop = () => usePutFormApi()
export const getShop = () => useGetApi(ROUTES.GET_SHOP)

// shop items api routes
export const createshopItems = () => usePostFormApi()
export const updateShopItems = () => usePutFormApi()
export const deleteShopItems = () => useDeleteApi()