"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const DEFAULT_CENTER = { lat: 36.595, lon: -4.6374 }; // Mijas/Fuengirola area

function getRadiusInMeters(radius: string): number {
  const km = parseInt(radius.replace(/[^0-9]/g, ""), 10);
  return km * 1000;
}

interface ServiceAreaMapProps {
  mapCenter: { lat: number; lon: number } | null;
  radius: string;
  mapKey: number;
}

export default function ServiceAreaMap({
  mapCenter,
  radius,
  mapKey,
}: ServiceAreaMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const circleRef = useRef<L.Circle | null>(null);
  const [isReady, setIsReady] = useState(false);

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Clean up any existing map instance
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Create new map instance
    const center = mapCenter || DEFAULT_CENTER;
    const map = L.map(mapContainerRef.current, {
      center: [center.lat, center.lon],
      zoom: mapCenter ? 11 : 9,
      scrollWheelZoom: false,
    });

    // Add tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    mapInstanceRef.current = map;
    setIsReady(true);

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [mapKey]); // Re-initialize when mapKey changes

  // Update map view and circle when center/radius changes
  useEffect(() => {
    if (!mapInstanceRef.current || !isReady) return;

    const map = mapInstanceRef.current;
    const center = mapCenter || DEFAULT_CENTER;

    // Update view
    map.setView([center.lat, center.lon], mapCenter ? 11 : 9);

    // Remove existing circle
    if (circleRef.current) {
      circleRef.current.remove();
      circleRef.current = null;
    }

    // Add new circle if we have both center and radius
    if (mapCenter && radius) {
      const circle = L.circle([mapCenter.lat, mapCenter.lon], {
        radius: getRadiusInMeters(radius),
        fillColor: "#3b82f6",
        fillOpacity: 0.2,
        color: "#2563eb",
        weight: 1,
      }).addTo(map);
      circleRef.current = circle;
    }
  }, [mapCenter, radius, isReady]);

  return (
    <div className="w-full h-full relative">
      <div
        ref={mapContainerRef}
        className="w-full h-full grayscale-[20%]"
        style={{ height: "100%", width: "100%" }}
      />
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      )}
    </div>
  );
}
