import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Fix for default marker icon in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export function MapComponent() {
  const latEnv = import.meta.env.VITE_MAP_LAT;
  const lngEnv = import.meta.env.VITE_MAP_LNG;
  const defaultLat = 13.0827;
  const defaultLng = 100.6270;

  const lat = latEnv ? parseFloat(latEnv) : defaultLat;
  const lng = lngEnv ? parseFloat(lngEnv) : defaultLng;
  const position = [isNaN(lat) ? defaultLat : lat, isNaN(lng) ? defaultLng : lng];

  return (
    <div className="h-[400px] w-full rounded-2xl overflow-hidden border border-border shadow-sm z-0 relative">
      <MapContainer center={position} zoom={15} scrollWheelZoom={false} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            King Mongkut's Institute of Technology Ladkrabang (KMITL), Thailand
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default MapComponent;