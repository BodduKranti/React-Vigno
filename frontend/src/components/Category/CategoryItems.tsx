import { Link } from "react-router"

interface categoryItemsprops {
    id: number,
    name: string,
    image: string
}

const CategoryItems = ({
    id,
    name,
    image
}: categoryItemsprops) => {
    return (
        <Link key={id} className="cats__item" to={`/category/${name.toLowerCase()}`}>
            <img src={image} alt="" loading="lazy" />
            <span>{name}</span>
        </Link>
    )
}

export default CategoryItems