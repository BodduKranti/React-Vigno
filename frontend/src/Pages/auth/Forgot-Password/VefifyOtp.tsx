import { useEffect, useRef, useState } from "react";
import LoginRegisterTopSection from "../../../components/LoginRegisterTopSection";
import { Link } from "react-router";
import Button from "../../../components/field/Button";

interface OtpVerifyprops {
    email: string,
    length?: number,
    onVerify: (code: string) => void,
    onResend: () => void,
    onBack: () => void,
}

// Step 2: enter the OTP. Auto-focus, paste support, backspace, resend timer.
export default function OtpVerify({ email, length = 4, onVerify, onResend, onBack }: OtpVerifyprops) {
    const [digits, setDigits] = useState(Array(length).fill(""));
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [seconds, setSeconds] = useState(30);
    const refs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => { refs.current[0]?.focus(); }, []);

    useEffect(() => {
        if (seconds <= 0) return;
        const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
        return () => clearTimeout(t);
    }, [seconds]);

    function setAt(i: any, value: any) {
        setDigits((d) => d.map((x, idx) => (idx === i ? value : x)));
    }

    function handleChange(i: any, e: any) {
        const v = e.target.value.replace(/\D/g, "").slice(-1);
        setAt(i, v);
        if (v && i < length - 1) refs.current[i + 1]?.focus();
    }

    function handleKeyDown(i: any, e: any) {
        if (e.key === "Backspace" && !digits[i] && i > 0) refs.current[i - 1]?.focus();
        if (e.key === "ArrowLeft" && i > 0) refs.current[i - 1]?.focus();
        if (e.key === "ArrowRight" && i < length - 1) refs.current[i + 1]?.focus();
    }

    function handlePaste(e: any) {
        const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
        if (!text) return;
        e.preventDefault();
        setDigits(Array.from({ length }, (_, i) => text[i] || ""));
        refs.current[Math.min(text.length, length - 1)]?.focus();
    }

    async function handleSubmit(e: any) {
        e.preventDefault();
        const code = digits.join("");
        if (code.length < length) return setError(`Enter the ${length}-digit code.`);
        setError("");
        setLoading(true);
        try {
            await onVerify(code);
        } catch (err: any) {
            setError(err.message || "Invalid or expired code.");
        } finally {
            setLoading(false);
        }
    }

    async function handleResend() {
        try {
            await onResend();
            setDigits(Array(length).fill(""));
            setError("");
            setSeconds(30);
            refs.current[0]?.focus();
        } catch (err: any) {
            setError(err.message || "Could not resend the code.");
        }
    }

    return (
        <div className="w-full">
            <section className="pane p-in flex flex-col items-center justify-center px-8 text-center md:px-0">
                <div className="flex w-full max-w-110 flex-col items-center px-4">
                    <LoginRegisterTopSection key={3} title="OTP Verify" content="Or use your email and password" />


                    <p>{`We sent a ${length}-digit code to ${email}`}</p>
                    <div onClick={onBack} className={'text-orange-500 underline cursor-pointer my-4'}>
                        Change Email
                    </div>
                    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">
                        <div className="flex justify-center gap-2" onPaste={handlePaste}>
                            {digits.map((d, i) => (
                                <input
                                    key={i}
                                    ref={(el) => {
                                        refs.current[i] = el;
                                    }}
                                    value={d}
                                    onChange={(e: any) => handleChange(i, e)}
                                    onKeyDown={(e: any) => handleKeyDown(i, e)}
                                    inputMode="numeric"
                                    autoComplete={i === 0 ? "one-time-code" : "off"}
                                    maxLength={1}
                                    aria-label={`Digit ${i + 1}`}
                                    className="h-12 w-11 rounded-xl bg-slate-100 text-center text-xl font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-[#ff6b06]"
                                />
                            ))}
                        </div>

                        <p role="alert" className="min-h-5 text-sm text-red-500">{error}</p>


                        <Button
                            type="submit"
                            btnTxt={loading ? <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent" /> : "Verify"}
                            btnColor="warning"
                            disabled={loading}
                        />


                        <p className="text-sm text-slate-600">
                            {seconds > 0 ? (
                                <>Resend code in {seconds}s</>
                            ) : (
                                <div onClick={handleResend} className={'text-orange-500 underline cursor-pointer'}>
                                    Resend code
                                </div>
                            )}
                        </p>
                    </form>

                    <p className="md:hidden text-xs flex justify-end py-2 gap-2 items-center">Back to <Link className="text-[#FF6B06] underline" to={'/login'}>Sign In</Link></p>

                </div>
            </section>
        </div>
    );
}