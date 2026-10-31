import { useCallback, useEffect, useMemo, useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';

import { useAppDispatch } from '../../Store/hook';
import { MapAddressThunkController } from '../../Store/StoreThunk/MapAddressThunk';
import { setLocation } from '../../Store/Reducer/MapSlice/MapSlice';

export interface LocationPos {
    lat: any;
    lon: any;
}

interface MapProps {
    location: LocationPos;
}

function RecenterMap({ position }: { position: LocationPos }) {
    const map = useMap();

    useEffect(() => {
        map.flyTo([position.lat, position.lon], 16, { duration: 0.8 });
    }, [position.lat, position.lon, map]);

    return null;
}

const Map = ({ location }: MapProps) => {
    const dispatch = useAppDispatch();
    const markerRef = useRef<any>(null);

    const isValid =
        Number.isFinite(location?.lat) && Number.isFinite(location?.lon);

    const handleDragEnd = useCallback(() => {
        const marker = markerRef.current;
        if (!marker) return;

        const { lat, lng } = marker.getLatLng();
        const newPosition: LocationPos = { lat, lon: lng };

        // Keep Redux in sync so "current location" always sees a real change
        dispatch(setLocation(newPosition));
        dispatch(MapAddressThunkController(newPosition));
    }, [dispatch]);

    const eventHandlers = useMemo(
        () => ({ dragend: handleDragEnd }),
        [handleDragEnd]
    );

    if (!isValid) return <div>Loading map location...</div>;

    return (
        <div className="w-full overflow-hidden h-80 md:h-100 relative mt-4 border-3 shadow-xl rounded-3xl border-orange-500">
            <MapContainer
                className="w-full h-full p-5"
                center={[location.lat, location.lon]}
                zoom={13}
                scrollWheelZoom={false}
            >
                <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <RecenterMap position={location} />

                <Marker
                    position={[location.lat, location.lon]}
                    draggable
                    ref={markerRef}
                    eventHandlers={eventHandlers}
                >
                    <Popup>Current location</Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default Map;