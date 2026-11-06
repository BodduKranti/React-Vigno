export const ROUTES = Object.freeze({
    LOGIN_URL: "/auth/login",
    REGISTER_URL: "/auth/signup",
    DASHBOARD: "/dashboard",
    USERS: "/users",
    LOGOUT: "/auth/logout",
    UPDATE_USER_LOCATION: "/user/userupdatelocation",

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
    GET_SHOP_BY_SHOP_ID: `shop/getShopByid`,

    CREATE_SHOP_ITEMS: "/shop/shopitems/createshopItems",
    UPDATE_SHOP_ITEMS: "/shop/shopitems/updateShopItems",
    GET_SHOT_ITEMS: "/shop/shopitems/getAllshopItems",
    GET_SHOT_ITEMS_BY_ID: "/shop/shopitems/getItemById",
    DELETE_SHOT_ITEM_BY_ID: "/shop/shopitems/deleteItemById",
    GET_ALL_SHOP_ITEM_BY_CITY: "/shop/shopitems/getallitemsBycity",
    GET_CATE_ITEMS_BY_CAT: "/shop/shopitems/getcateitmeByCat",

    //shop order
    CREAT_SHOP_ORDER: "/shop/order/place-order",

    //USER ORDER
    GET_USER_ORDERS: "/shop/order/getMyOrder",
    GET_USER_OWNER_ORDER: "/shop/order/getuserOwenerOrder",

    //OWNER ORDER
    GET_OWNER_ORDER: "/shop/order/getOwnerOrder",

    //order_status
    ORDERED_STATUS: "/shop/order/order-status",

    //Get Assignment Delivery boy order
    GET_ASSIGNMENTS_ORDER: "/shop/order/get-assignment",

    //Accept oreder
    DELIVERY_BOY_ACCEPT_ORDER: "/shop/order/acceptOrder",

    //get current order
    GET_CURRENT_ORDER: `/shop/order/get-current-oreder`,

    //Get Order byId
    GET_USER_ORDER_BY_ID: `/shop/order/getOrderByID`,

    //DELIEVY BOY SEND OTP TO USER VIA EMAIL
    SEND_DELIVERY_OTP: `/shop/order/send-deliveryOTP`,
    // VERIFY DELIVERY OTP VIA DELIVERY BOY
    VERYFIE_DELIVERY_OTP: `/shop/order/verify-deliveryOTP`,

    SEARCH_ITEMS: '/shop/shopitems/searchItems',

    //Verify Payment
    VERIFY_PAYMENT: '/shop/order/verify-payment'
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
    password: string,
    token?: any
}

export enum itemFoodType {
    "no-veg" = "Non Veg",
    "veg" = "Veg"
}

export type Status = "pending" | "preparing" | "out of delivery" | "delivered" | "cancelled"

export enum paymentMethods {
    "cod" = "Cash On Delivery",
    "online" = "Online Payment"
}