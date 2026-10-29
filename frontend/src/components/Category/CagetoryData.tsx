import { useState } from "react";

interface categoryItemsprops {
    id: number,
    name: string,
    image: string
}

export const categories = [
    { id: 1, name: "Biryani", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80" },
    { id: 2, name: "Pizza", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80" },
    { id: 3, name: "Burgers", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80" },
    { id: 4, name: "Desserts", image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&q=80" },
    { id: 5, name: "Healthy", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80" },
    { id: 6, name: "Chinese", image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400&q=80" },
    { id: 7, name: "Beverages", image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&q=80" },

    // New categories
    { id: 8, name: "Snacks", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80" },
    { id: 9, name: "Main Course", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80" },
    { id: 10, name: "Sandwiches", image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&q=80" },
    { id: 11, name: "South Indian", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&q=80" },
    { id: 12, name: "North Indian", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80" },
    { id: 13, name: "Fast Food", image: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=400&q=80" },
];

// "Snacks",
// "Main Course",
// "Desserts",
// "Pizza",
// "Biryani",
// "Burgers",
// "Sandwiches",
// "South Indian",
// "North Indian",
// "Chinese",
// "Fast Food",

const CategoryListData = () => {
    const [categoryList] = useState<categoryItemsprops[]>(categories)

    return ({ categoryList })
}
export default CategoryListData