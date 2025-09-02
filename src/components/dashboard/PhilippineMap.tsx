"use client";
import React from "react";
import dynamic from "next/dynamic";
import { worldMill } from "@react-jvectormap/world";

const VectorMap = dynamic(
  () => import("@react-jvectormap/core").then((mod) => mod.VectorMap),
  { ssr: false }
);

// Define the component props
interface PhilippineMapProps {
  mapColor?: string;
}

type MarkerStyle = {
  initial: {
    fill: string;
    r: number;
  };
};

type Marker = {
  latLng: [number, number];
  name: string;
  style?: {
    fill: string;
    borderWidth: number;
    borderColor: string;
    stroke?: string;
    strokeOpacity?: number;
  };
};

const PhilippineMap: React.FC<PhilippineMapProps> = ({ mapColor }) => {
  return (
    <VectorMap
      map={worldMill}
      backgroundColor="transparent"
      markerStyle={
        {
          initial: {
            fill: "#465FFF",
            r: 4,
          },
        } as MarkerStyle
      }
      markersSelectable={true}
      markers={
        [
          {
            latLng: [14.5995, 120.9842],
            name: "Manila",
            style: {
              fill: "#465FFF",
              borderWidth: 1,
              borderColor: "white",
              stroke: "#383f47",
            },
          },
          {
            latLng: [10.3157, 123.8854],
            name: "Cebu",
            style: {
              fill: "#465FFF",
              borderWidth: 1,
              borderColor: "white",
            },
          },
          {
            latLng: [7.1907, 125.4553],
            name: "Davao",
            style: {
              fill: "#465FFF",
              borderWidth: 1,
              borderColor: "white",
            },
          },
          {
            latLng: [14.6760, 121.0437],
            name: "Quezon City",
            style: {
              fill: "#465FFF",
              borderWidth: 1,
              borderColor: "white",
              strokeOpacity: 0,
            },
          },
        ] as Marker[]
      }
      zoomOnScroll={false}
      zoomMax={12}
      zoomMin={1}
      zoomAnimate={true}
      zoomStep={1.5}
      focusOn={{
        region: "PH",
        scale: 8,
        lat: 12.8797,
        lng: 121.7740,
      }}
      regionStyle={{
        initial: {
          fill: mapColor || "#D0D5DD",
          fillOpacity: 1,
          fontFamily: "Outfit",
          stroke: "none",
          strokeWidth: 0,
          strokeOpacity: 0,
        },
        hover: {
          fillOpacity: 0.7,
          cursor: "pointer",
          fill: "#465fff",
          stroke: "none",
        },
        selected: {
          fill: "#465FFF",
        },
        selectedHover: {},
      }}
      regionLabelStyle={{
        initial: {
          fill: "#35373e",
          fontWeight: 500,
          fontSize: "13px",
          stroke: "none",
        },
        hover: {},
        selected: {},
        selectedHover: {},
      }}
    />
  );
};

export default PhilippineMap;