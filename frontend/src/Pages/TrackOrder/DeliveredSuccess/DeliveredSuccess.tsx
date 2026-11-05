import React, { useState } from "react";
import "./DeliveredSuccess.css";

export interface DeliveredSuccessProps {
    restaurant?: string;
    itemName?: string;
    orderId?: string;
    deliveredAt?: string;
    durationMins?: number;
    onReorder?: () => void;
    onHelp?: () => void;
    onRate?: (stars: number) => void;
}

const LABELS = ["", "Poor", "Could be better", "Good", "Really good", "Loved it!"];

const DeliveredSuccess: React.FC<DeliveredSuccessProps> = ({
    restaurant = "Panjab Dhaba",
    itemName = "Meals",
    orderId = "#QB48213",
    deliveredAt = "1:42 PM",
    durationMins = 32,
    onReorder,
    onHelp,
    onRate,
}) => {
    const [rating, setRating] = useState<number>(0);

    const rate = (n: number) => {
        setRating(n);
        onRate?.(n);
    };

    return (
        <section className="ds" aria-live="polite">
            <div className="ds-badge" aria-hidden="true">
                <svg viewBox="0 0 96 96">
                    <circle className="ds-ring" cx="48" cy="48" r="42" />
                    <path className="ds-tick" d="M30 49l13 13 23-27" />
                </svg>
            </div>

            <div>
                <h2>Order delivered successfully</h2>
                <p>
                    Your {itemName} from {restaurant} reached you. Enjoy your meal!
                </p>
            </div>

            <dl className="ds-facts">
                <div><dt>Delivered at</dt><dd>{deliveredAt}</dd></div>
                <div><dt>Delivery time</dt><dd>{durationMins} min</dd></div>
                <div><dt>Order ID</dt><dd>{orderId}</dd></div>
            </dl>

            <div className="ds-rate">
                <strong>How was your food?</strong>
                <div className="ds-stars" role="radiogroup" aria-label="Rate your order">
                    {[1, 2, 3, 4, 5].map((n) => (
                        <button
                            key={n}
                            type="button"
                            role="radio"
                            aria-checked={rating === n}
                            aria-label={`${n} star${n > 1 ? "s" : ""}`}
                            className={`ds-star${n <= rating ? " on" : ""}`}
                            onClick={() => rate(n)}
                        >
                            ★
                        </button>
                    ))}
                </div>
                <div className="ds-hint">{rating ? `${LABELS[rating]} — thanks for rating!` : "Tap a star to rate"}</div>
            </div>

            <div className="ds-actions">
                <button type="button" className="ds-btn ds-primary" onClick={onReorder}>Reorder</button>
                <button type="button" className="ds-btn ds-ghost" onClick={onHelp}>Get help</button>
            </div>
        </section>
    );
};

export default DeliveredSuccess;