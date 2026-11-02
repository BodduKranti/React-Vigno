import { Check } from "lucide-react";
import { useMemo, type CSSProperties } from "react";
import Button from "../../components/field/Button";

interface OrderSuccessProps {
    orderId?: any;
    message?: string;
    onViewOrder?: () => void;
    onContinue?: () => void;
}

interface Dot { x: number; y: number; size: number; delay: number; opacity: number }

// Seeded random so the "cracker" pattern is the same on every render
function makeDots(count = 38): Dot[] {
    let seed = 11;
    const rnd = (): number => (seed = (seed * 16807) % 2147483647) / 2147483647;
    return Array.from({ length: count }, () => {
        const angle = rnd() * Math.PI * 2;
        const radius = 78 + rnd() * 120;
        return {
            x: Math.cos(angle) * radius * 1.25,
            y: Math.sin(angle) * radius * 0.78,
            size: 3 + Math.round(rnd() * rnd() * 11),
            delay: rnd() * 0.25,
            opacity: 0.55 + rnd() * 0.45,
        };
    });
}

export default function OrderConfirmation({
    orderId = "QB-20481",
    message,
    onViewOrder,
    onContinue,
}: OrderSuccessProps) {
    const dots = useMemo<Dot[]>(() => makeDots(), []);

    return (
        <section className="mx-auto flex w-full max-w-xl flex-col items-center px-5 pb-12 pt-6 text-center font-[Mulish,system-ui,sans-serif]">
            {/* Cracker burst + check badge */}
            <div className="relative h-50 w-full" aria-hidden="true">
                {dots.map((d, i) => (
                    <span
                        key={i}
                        className="absolute left-1/2 top-1/2 rounded-full bg-linear-to-br from-[#ffa64d] to-[#ff6a3d] opacity-0 motion-reduce:opacity-60"
                        style={
                            {
                                width: d.size,
                                height: d.size,
                                marginLeft: -d.size / 2,
                                marginTop: -d.size / 2,
                                "--x": `${d.x}px`,
                                "--y": `${d.y}px`,
                                "--o": d.opacity,
                                animation: `burst 1.1s ${d.delay}s ease-out both, twinkle ${2.2 + d.delay * 6}s ${1.4 + d.delay}s ease-in-out infinite`,
                            } as CSSProperties
                        }
                    />
                ))}

                <div className="absolute left-1/2 top-1/2 -ml-12 -mt-12 h-24 w-24">
                    <span className="absolute inset-0 animate-[ripple_1.6s_.5s_ease-out_2_both] rounded-full bg-[#ff7a3d]/40" />
                    <div className="absolute inset-0 flex text-white justify-center items-center animate-pop rounded-full bg-linear-to-br from-[#ff9a3d] to-[#ff6a3d] shadow-[0_12px_40px_rgba(255,122,61,.45)] ring-10 ring-white/80">
                        <Check size={50} />
                    </div>
                </div>
            </div>

            <h1 className="mt-2 animate-[rise_.6s_.9s_ease-out_both] text-[26px] font-bold text-neutral-800">
                Thank you for ordering!
            </h1>
            <p className="mt-3 max-w-md animate-[rise_.6s_1.05s_ease-out_both] text-[15px] leading-7 text-neutral-400">
                {message ??
                    `Your order #${orderId} is confirmed. We’ve emailed the details and the restaurant has started preparing your food.`}
            </p>

            <div className="mt-9 flex w-full animate-[rise_.6s_1.2s_ease-out_both] flex-col items-center justify-center gap-4 sm:flex-row">
                <Button
                    btnColor="info"
                    btnTxt={"View Order"}
                    onClick={onViewOrder}
                    type="button"
                    className={`min-w-37.5`}
                />

                <Button
                    btnColor="warning"
                    btnTxt={"Continue shopping"}
                    onClick={onContinue}
                    type="button"
                    className={`min-w-37.5`}
                />


            </div>
        </section>
    );
}
