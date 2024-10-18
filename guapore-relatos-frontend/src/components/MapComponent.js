// src/components/MapComponent.js
import React from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './MapComponent.css';
import L from 'leaflet';

// Correção para ícones padrão não exibidos
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function MapComponent({ location, setLocation }) {
  function LocationMarker() {
    useMapEvents({
      click(e) {
        setLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
      },
    });

    return location.lat && location.lng ? (
      <Marker position={[location.lat, location.lng]}></Marker>
    ) : null;
  }

  return (
    <div className="map-container">
      <MapContainer
        center={[location.lat || -28.844, location.lng || -51.8894]}
        zoom={13}
        zoomControl={false}
        className="leaflet-map"
      >
        <ZoomControl position="bottomright" />
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <LocationMarker />
      </MapContainer>
    </div>
  );
}

export default MapComponent;
