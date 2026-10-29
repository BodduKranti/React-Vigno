interface foodItemsProps {
    id: number,
    name: string,
    shop: string,
    price: number,
    rating: number,
    time: string,
    image: string
}

const foodItems: foodItemsProps[] = [
    { id: 1, name: "Chicken Dum Biryani", shop: "Paradise Kitchen", price: 289, rating: 4.6, time: "30 min", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80" },
    { id: 2, name: "Margherita Pizza", shop: "Slice House", price: 249, rating: 4.4, time: "25 min", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80" },
    { id: 3, name: "Classic Cheese Burger", shop: "Burger Barn", price: 179, rating: 4.3, time: "20 min", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80" },
    { id: 4, name: "Chocolate Lava Cake", shop: "Sweet Tooth", price: 129, rating: 4.7, time: "25 min", image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&q=80" },
    { id: 5, name: "Veg Buddha Bowl", shop: "Green Plate", price: 219, rating: 4.5, time: "30 min", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80" },
    { id: 6, name: "Hakka Noodles", shop: "Wok Express", price: 159, rating: 4.2, time: "22 min", image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=600&q=80" },
    { id: 7, name: "Cold Coffee", shop: "Brew Lab", price: 119, rating: 4.4, time: "15 min", image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&q=80" },
];



const FoodItemsList = () => {
    const foodItemsListData = foodItems;
    return ({ foodItemsListData })
}

export default FoodItemsList