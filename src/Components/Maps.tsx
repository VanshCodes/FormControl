import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

import React, { useEffect } from "react";

export default function Maps({
  lat,
  long,
}: {
  lat: number | undefined;
  long: number | undefined;
}) {
  useEffect(() => {
    console.log({ lat, long });
  }, []);

  return (
    <div className="w-full">
      {lat && long ? (
        <>
          <h1>
            {lat} {long}
          </h1>

          <MapContainer center={[lat, long]} zoom={0} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[lat, long]}>
              <Popup>
                {lat}, {long}
              </Popup>
            </Marker>
          </MapContainer>
        </>
      ) : null}
    </div>
  );
}
