import { useEffect, useRef } from "react";
import { ROUTES } from "../type";
import { AxiosInstance } from "../services";

const MIN_INTERVAL_MS = 30_000; // send at most once every 30 seconds
const MIN_DISTANCE_M = 30;      // and only if the rider moved at least 30 m

// Haversine distance in metres
const distanceM = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const rad = (d: number) => (d * Math.PI) / 180;
    const a =
        Math.sin(rad(lat2 - lat1) / 2) ** 2 +
        Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(rad(lon2 - lon1) / 2) ** 2;
    return 12742000 * Math.asin(Math.sqrt(a));
};

/**
 * Watches the device position and saves it to the server.
 * Pass `enabled = false` for anyone who is not a logged-in delivery partner.
 */
const useUpdateLocation = (enabled: boolean) => {
    const last = useRef<{ lat: number; lon: number; at: number } | null>(null);
    const inFlight = useRef(false);

    useEffect(() => {
        if (!enabled || !("geolocation" in navigator)) return;

        const send = async (lat: number, lon: number) => {
            if (inFlight.current) return; // previous request still running
            inFlight.current = true;
            try {
                await AxiosInstance.put(
                    ROUTES.UPDATE_USER_LOCATION,
                    { lat, lon },
                    { withCredentials: true }
                );
                last.current = { lat, lon, at: Date.now() };
            } catch (err) {
                console.error("Location update failed", err);
            } finally {
                inFlight.current = false;
            }
        };

        const watchId = navigator.geolocation.watchPosition(
            (pos) => {
                const { latitude: lat, longitude: lon } = pos.coords;
                const prev = last.current;

                if (prev) {
                    const tooSoon = Date.now() - prev.at < MIN_INTERVAL_MS;
                    const tooClose = distanceM(prev.lat, prev.lon, lat, lon) < MIN_DISTANCE_M;
                    if (tooSoon || tooClose) return; // skip this GPS fix
                }
                send(lat, lon);
            },
            (err) => console.warn("Geolocation error:", err.message),
            { enableHighAccuracy: false, maximumAge: 10_000, timeout: 20_000 }
        );

        // cleanup: stops duplicate watchers on unmount / StrictMode remount
        return () => navigator.geolocation.clearWatch(watchId);
    }, [enabled]);
};

export default useUpdateLocation;