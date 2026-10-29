export const ROUTES = Object.freeze({
    LOGIN_URL: "/auth/login",
    REGISTER_URL: "/auth/signup",
    DASHBOARD: "/dashboard",
    USERS: "/users",
    LOGOUT: "/auth/logout",

    SENDOTP: "/auth/sendotp",
    VERIFY_OTP: "/auth/verifyotp",
    RESET_PASSWORD: "/auth/resetPassword",
    GOOGLE_AUTH: "/auth/googleauth",

    GET_USER: "/user/current_user",

    //Shop API URL
    CREATE_SHOP: "/shop/createshop",
    UPDATE_SHOP: "/shop/editshop",
    GET_SHOP: "/shop/getmyshop",
    GET_SHOPS_BY_CITY: 'shop/getshopbycity',

    CREATE_SHOP_ITEMS: "/shop/shopitems/createshopItems",
    UPDATE_SHOP_ITEMS: "/shop/shopitems/updateShopItems",
    GET_SHOT_ITEMS: "/shop/shopitems/getAllshopItems",
    GET_SHOT_ITEMS_BY_ID: "/shop/shopitems/getItemById",
    DELETE_SHOT_ITEM_BY_ID: "/shop/shopitems/deleteItemById",
    GET_ALL_SHOP_ITEM_BY_CITY: "/shop/shopitems/getallitemsBycity",
});



export type UserRole = 'user' | 'owner' | 'deliveryboy'

export const ROLE_HOME: any = {
    user: "/",
    owner: "/role/owner",
    deliveryboy: "/role/deliveryboy",
};

export interface userRegister {
    fullname: string,
    email: string,
    mobile: string,
    role: string,
    password: string
}

export interface userSignIn {
    email: string,
    password: string
}

export enum itemFoodType {
    "no-veg" = "Non Vegetrian",
    "veg" = "Vegeterian"
}