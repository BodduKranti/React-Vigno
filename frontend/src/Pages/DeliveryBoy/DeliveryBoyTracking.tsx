

import L, { type LatLngTuple } from 'leaflet'
import scooter from '/images/scooter.png'
import home from '/images/home.png'
import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet'

const deliveryBoyIcon = new L.Icon({
    iconUrl: scooter,
    iconSize: [40, 40],
    iconAnchor: [20, 40]
})

const customerIcon = new L.Icon({
    iconUrl: home,
    iconSize: [40, 40],
    iconAnchor: [20, 40]
})

const isValid = (n: unknown): n is number =>
    typeof n === "number" && Number.isFinite(n) && n !== 0;


const DeliveryBoyTracking = ({ currentorder }: { currentorder: any }) => {
    console.log('currentorder', currentorder)
    const deliveryBoyLat = Number(currentorder?.deliveryBoylocation?.lat)
    const deliveryBoyLon = Number(currentorder?.deliveryBoylocation?.lon)

    const customerLat = Number(currentorder?.customerLocation?.lat)
    const customerLon = Number(currentorder?.customerLocation?.lon)

    const hasBoy = isValid(deliveryBoyLat) && isValid(deliveryBoyLon);
    const hasCustomer = isValid(customerLat) && isValid(customerLon);


    const boyPos: LatLngTuple | null = hasBoy ? [deliveryBoyLon, deliveryBoyLat] : null;
    const customerPos: LatLngTuple | null = hasCustomer ? [customerLat, customerLon] : null;


    //Mapcenter

    const center: any = [deliveryBoyLon, deliveryBoyLat]

    console.log(center)

    return (

        <div className='w-full h-100 relative z-0  border-15 border-white shadow-xl ring-1 ring-orange-500 rounded-md'>
            <MapContainer
                className="w-full h-full p-5"
                center={[deliveryBoyLon, deliveryBoyLat]}
                zoom={13}
                scrollWheelZoom={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* <RecenterMap position={location} /> */}
                <Marker
                    position={[deliveryBoyLon, deliveryBoyLat]}
                    icon={deliveryBoyIcon}
                >
                    <Popup>Delivery Boy</Popup>
                </Marker>

                <Marker
                    position={[customerLat, customerLon]}
                    icon={customerIcon}
                >
                    <Popup>Customer</Popup>
                </Marker>

                {boyPos && customerPos && (
                    <Polyline positions={[boyPos, customerPos]} pathOptions={{ color: "orange", weight: 4 }} />
                )}
            </MapContainer>
        </div>
    )
}

export default DeliveryBoyTracking