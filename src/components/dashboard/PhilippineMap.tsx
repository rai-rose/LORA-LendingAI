// PhilippineMap.tsx
"use client";
import React, { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

// Define custom MapContainer props to match react-leaflet@5.0.0
interface CustomMapContainerProps {
  center: [number, number]; // Tuple for lat/lng
  zoom: number;
  style?: React.CSSProperties; // Use React.CSSProperties for style
  zoomControl?: boolean;
  attributionControl?: boolean;
  scrollWheelZoom?: boolean | "center";
  children?: React.ReactNode;
}

// Define custom TileLayer props to include attribution
interface CustomTileLayerProps {
  url: string;
  attribution?: string;
}

// Dynamically import react-leaflet components with SSR disabled
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
) as React.ComponentType<CustomMapContainerProps>;
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
) as React.ComponentType<CustomTileLayerProps>;
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

interface PhilippineMapProps {
  mapColor?: string;
}

const PhilippineMap: React.FC<PhilippineMapProps> = ({ }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const repaymentData = [
    {
      name: "John Doe",
      city: "Manila",
      latLng: [14.5995, 120.9842],
      percentage: 98,
    },
    {
      name: "Maria Santos",
      city: "Cebu",
      latLng: [10.3167, 123.8907],
      percentage: 95,
    },
    {
      name: "Juan Cruz",
      city: "Davao",
      latLng: [7.0731, 125.6128],
      percentage: 90,
    },
    {
      name: "Ana Reyes",
      city: "Quezon City",
      latLng: [14.6485, 121.0304],
      percentage: 85,
    },
  ];

  const customIcon = useMemo(() => {
    if (!hasMounted) return null;

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { Icon } = require("leaflet");

    return new Icon({
      iconUrl:
        "data:image/svg+xml," +
        encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#465FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
        `),
      iconSize: [24, 24],
      iconAnchor: [12, 24],
      popupAnchor: [0, -24],
    });
  }, [hasMounted]);

  if (!hasMounted || !customIcon) return null;

  return (
    <div className="w-full h-[250px] sm:h-[300px] md:h-[350px] rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <MapContainer
        center={[11.5, 122.5]}
        zoom={6}
        style={{ height: "100%", width: "100%" }}
        zoomControl={true}
        attributionControl={true}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {repaymentData.map((data, index) => (
          <Marker key={index} position={data.latLng} icon={customIcon}>
            <Popup className="font-outfit">
              <div className="p-3 text-center">
                <h4 className="font-semibold text-gray-800 dark:text-black mb-1">{data.name}</h4>
                <p className="text-gray-600 dark:text-gray-600 mb-2">{data.city}</p>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-brand-500 h-2 rounded-full"
                      style={{ width: `${data.percentage}%` }}
                    ></div>
                  </div>
                  <span className="font-semibold text-brand-500">{data.percentage}%</span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default PhilippineMap;