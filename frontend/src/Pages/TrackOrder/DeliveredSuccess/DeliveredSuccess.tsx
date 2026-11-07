import React, { useState } from "react";
import "./DeliveredSuccess.css";
import { dateText } from "../../Order/UserOrder/UserOrderCardItem";
import Button from "../../../components/field/Button";
import Ratingstar from "../../../components/RatingOrder/Ratingstar";

export interface DeliveredSuccessProps {
    restaurant?: string;
    itemName?: string;
    orderId?: string;
    deliveredAt?: string;
    durationMins?: number;
    onReorder?: () => void;
    onHelp?: () => void;
    onRateFun?: ((stars: any) => void | undefined) | undefined
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
    onRateFun,
}) => {
    const [rating, setRating] = useState<number>(0);

    const onRatef = (n: any) => {
        setRating(n);
        onRateFun?.(n)
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
                <div><dt>Delivered at</dt><dd>{dateText(deliveredAt)}</dd></div>
                <div><dt>Delivery time</dt><dd>{durationMins} min</dd></div>
                <div><dt>Order ID</dt><dd>{orderId.slice(-6)}</dd></div>
            </dl>

            <div className="ds-rate">
                <strong>How was your food?</strong>
                <Ratingstar
                    onRate={onRatef}
                />
                <div className="ds-hint">{rating ? `${LABELS[rating]} — thanks for rating!` : "Tap a star to rate"}</div>
            </div>

            <div className="ds-actions">
                <Button
                    className={`ds-btn ds-primary`}
                    btnTxt={'Reorder'}
                    onClick={onReorder}
                    btnColor="warning"
                    type="button"
                />
                <Button
                    className={`ds-btn ds-ghost`}
                    btnTxt={'Get help'}
                    onClick={onHelp}
                    btnColor="warning"
                    type="button"
                />
                {/* <button type="button" className="ds-btn ds-primary" onClick={onReorder}>Reorder</button> */}
                {/* <button type="button" className="ds-btn ds-ghost" onClick={onHelp}>Get help</button> */}
            </div>
        </section>
    );
};

export default DeliveredSuccess;