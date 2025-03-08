
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Temporarily use a public token for development
// In production, this should be stored in environment variables or Supabase secrets
mapboxgl.accessToken = 'pk.eyJ1IjoibG92YWJsZWRldiIsImEiOiJjbHRiNTIyZ2QxMGMzMmpueGYxdmQ1c3ByIn0.xzk10uZUlzMGsaYQpxDZlA';

interface Location {
  id: string;
  address: string;
  coordinates: [number, number]; // [longitude, latitude]
  clientName: string;
  service: string;
}

interface BookingMapProps {
  locations: Location[];
  selectedBookingId?: string;
  onSelectBooking?: (id: string) => void;
}

const BookingMap = ({ locations, selectedBookingId, onSelectBooking }: BookingMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<{ [key: string]: mapboxgl.Marker }>({});
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    if (!mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [13.404954, 52.520007], // Berlin coordinates as default
      zoom: 11
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.current.on('load', () => {
      setIsMapLoaded(true);
    });

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  // Add markers when map is loaded or locations change
  useEffect(() => {
    if (!isMapLoaded || !map.current) return;

    // Clear existing markers
    Object.values(markers.current).forEach(marker => marker.remove());
    markers.current = {};

    if (locations.length === 0) return;

    // Add new markers and store them in the ref
    locations.forEach(location => {
      // Create a DOM element for the marker
      const el = document.createElement('div');
      el.className = 'marker';
      // Apply styles directly to the element
      el.style.width = '25px';
      el.style.height = '25px';
      el.style.borderRadius = '50%';
      el.style.backgroundColor = location.id === selectedBookingId ? '#ef4444' : '#3b82f6';
      el.style.border = '2px solid white';
      el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
      el.style.cursor = 'pointer';

      const marker = new mapboxgl.Marker(el)
        .setLngLat(location.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(`
              <div>
                <h3 class="font-bold">${location.clientName}</h3>
                <p>${location.address}</p>
                <p>${location.service}</p>
              </div>
            `)
        )
        .addTo(map.current!);

      marker.getElement().addEventListener('click', () => {
        if (onSelectBooking) {
          onSelectBooking(location.id);
        }
      });

      markers.current[location.id] = marker;
    });

    // Fit map to show all markers
    if (locations.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      locations.forEach(location => {
        bounds.extend(location.coordinates as mapboxgl.LngLatLike);
      });
      map.current.fitBounds(bounds, { padding: 50 });
    }
  }, [locations, isMapLoaded, selectedBookingId, onSelectBooking]);

  // Update marker styling when selected booking changes
  useEffect(() => {
    if (!isMapLoaded || !map.current) return;

    Object.entries(markers.current).forEach(([id, marker]) => {
      const markerElement = marker.getElement().firstChild as HTMLElement;
      if (markerElement) {
        markerElement.style.backgroundColor = id === selectedBookingId ? '#ef4444' : '#3b82f6';
      }
    });
  }, [selectedBookingId, isMapLoaded]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Booking Locations</CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={mapContainer} className="h-96 rounded-md" />
      </CardContent>
    </Card>
  );
};

export default BookingMap;
