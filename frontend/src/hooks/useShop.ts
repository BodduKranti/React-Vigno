import { ROUTES } from "../type";
import { useDeleteApi, useGetApi, usePostApi, usePostFormApi, usePutFormApi } from "./useAxiosServices";

// route function
export const createShop = () => usePostFormApi()
export const updateShop = () => usePutFormApi()
export const getShop = () => useGetApi(ROUTES.GET_SHOP)

// shop items api routes
export const createshopItems = () => usePostFormApi()
export const updateShopItems = () => usePutFormApi()
export const deleteShopItems = () => useDeleteApi()

//shop order
export const placeOrderShop = () => usePostApi()

//shop order Status
export const ShopOrderStatus = () => usePostApi()

//get all assignments for delivery boy
export const getAssignments = () => useGetApi(ROUTES.GET_ASSIGNMENTS_ORDER)

//delivery boy accept the assignment
export const acceptAssignment = () => usePostApi()

//get current orders
export const getCurrentOrder = () => useGetApi(ROUTES.GET_CURRENT_ORDER)

//POST Requrest for SEND OTP TO USE VIA EMAIOL
export const sendDeliveryOTP = () => usePostApi()
export const verifyDeliveryOTP = () => usePostApi()

// searchItems
export const verifyOrderPayment = () => usePostApi()

// Order Rating
export const orderRatingfun = () => usePostApi()

//Get all cities
