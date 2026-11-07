import { useState } from "react";
interface RatingFun {
    onRate?: (values: any) => void | undefined,
    starClassname?: any,
    className?: any
}

const Ratingstar = ({ onRate, starClassname, className }: RatingFun) => {
    const [rating, setRating] = useState<number>(0);

    const rate = (n: number) => {
        setRating(n);
        onRate?.(n);
    };
    // ORDER_RATING
    return (
        <div className={`ds-stars  ${className}`} role="radiogroup" aria-label="Rate your order">
            {[1, 2, 3, 4, 5].map((n) => (
                <button
                    key={n}
                    type="button"
                    role="radio"
                    aria-checked={rating === n}
                    aria-label={`${n} star${n > 1 ? "s" : ""}`}
                    className={`ds-star${n <= rating ? " on" : ""} ${starClassname}`}
                    onClick={() => rate(n)}
                >
                    ★
                </button>
            ))}
        </div>
    )
}

export default Ratingstar