import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import icon from "../assets/airplane.png";
import icon2 from "../assets/home.webp";
import L from "leaflet";

const MapView = ({ setShowDetail, openDetail }) => {
  const state = useSelector((store) => store);
  const [userKonum, setUserKonum] = useState([]);

  const handlePos = (konum) => {
    setUserKonum(konum);
  };
  navigator.geolocation.getCurrentPosition(handlePos);

  let center = [40.79, 29.5];
  if (userKonum.coords) {
    center = [userKonum.coords?.latitude, userKonum.coords?.longitude];
  } else center = [40.79, 29.5];

  const planeIcon = L.icon({
    iconUrl: icon,
    iconSize: [25, 25],
    iconAnchor: [16, 16],
  });
  const homeIcon = L.icon({
    iconUrl: icon2,
    iconSize: [30, 30],
    iconAnchor: [16, 16],
  });

  return (
    <>
      <MapContainer
        center={[39.304402, 34.791271]}
        zoom={6}
        scrollWheelZoom={true}
      >
        <Marker position={center} icon={homeIcon}>
          <Popup>
            <div className="popup">
              <span className="fs-6 fw-bold cursor-pointer ">Konumun {center}</span>
            </div>
          </Popup>
        </Marker>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {state?.flights.map((fly) => (
          <Marker icon={planeIcon} key={fly.id} position={[fly.lat, fly.lng]}>
            <Popup>
              <div className="popup">
                <span
                  className="fs-6 fw-bold cursor-pointer "
                  onClick={() => openDetail(fly.id)}
                >
                  {fly.tail ? fly.tail : fly.code}
                </span>
              </div>
            </Popup>
          </Marker>
        ))}

        <Polyline positions={state.route} />
      </MapContainer>
    </>
  );
};

export default MapView;
