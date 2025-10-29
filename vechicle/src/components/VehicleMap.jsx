import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import fixLeafletIcon from '../utils/markerIconFix';

fixLeafletIcon();

// Helper: interpolate between two latlngs
function interpolateLatLng(from, to, t) {
  const lat = from[0] + (to[0] - from[0]) * t;
  const lng = from[1] + (to[1] - from[1]) * t;
  return [lat, lng];
}

// Fly map to position when changed
function FlyToMarker({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.panTo(position, { animate: true, duration: 0.6 });
    }
  }, [position, map]);
  return null;
}

export default function VehicleMap({ route = [], playing = false, speedMultiplier = 1, onIndexChange }) {
  const [index, setIndex] = useState(0);
  const [displayPos, setDisplayPos] = useState(null); // for smooth interpolation
  const [path, setPath] = useState([]);
  const rafRef = useRef(null);
  const animRef = useRef({}); // holds animation state
  const markerRef = useRef(null);

  const center = route && route.length ? [route[0].latitude, route[0].longitude] : [17.385044, 78.486671];

  // Whenever route changes reset
  useEffect(() => {
    setIndex(0);
    setPath(route.length ? [[route[0].latitude, route[0].longitude]] : []);
    setDisplayPos(route.length ? [route[0].latitude, route[0].longitude] : null);
  }, [route]);

  // Notify parent when index changes
  useEffect(() => {
    if (onIndexChange && route && route[index]) {
      onIndexChange(index, route[index]);
    }
    // update path to include the current index position
    if (route && route[index]) {
      setPath(prev => {
        const nextPos = [route[index].latitude, route[index].longitude];
        const last = prev[prev.length - 1];
        if (!last || last[0] !== nextPos[0] || last[1] !== nextPos[1]) {
          return [...prev, nextPos];
        }
        return prev;
      });
    }
  }, [index, onIndexChange, route]);

  // Core animation loop: move from current index -> next index smoothly
  useEffect(() => {
    if (!route || route.length < 2) return;

    let startTime = null;
    let duration = 1000; // fallback in ms between points
    // If timestamps exist, compute duration between current and next point
    const hasTimestamps = route.every(p => p.timestamp);

    function step(timestamp) {
      if (!playing) return; // stop anim if paused
      if (!startTime) startTime = timestamp;

      // compute base duration using timestamps if available
      if (hasTimestamps && route[index] && route[index + 1]) {
        const t0 = new Date(route[index].timestamp).getTime();
        const t1 = new Date(route[index + 1].timestamp).getTime();
        duration = Math.max(200, (t1 - t0)); // ms
      } else {
        duration = 1000; // default 1s
      }

      // apply speed multiplier
      const adjDuration = Math.max(100, duration / (speedMultiplier || 1));

      const elapsed = timestamp - startTime;
      const tnorm = Math.min(1, elapsed / adjDuration);

      const from = [route[index].latitude, route[index].longitude];
      const to = [route[Math.min(index + 1, route.length - 1)].latitude, route[Math.min(index + 1, route.length - 1)].longitude];

      const p = interpolateLatLng(from, to, tnorm);
      setDisplayPos(p);

      if (tnorm >= 1) {
        // advance to next point
        startTime = null;
        setIndex(i => {
          const next = Math.min(i + 1, route.length - 1);
          // if reached the final point, stop animation
          if (next >= route.length - 1) {
            // ensure displayPos is final
            setDisplayPos([route[route.length-1].latitude, route[route.length-1].longitude]);
            return next;
          }
          return next;
        });
      }

      // request next frame if still playing and not at end
      if (playing && index < route.length - 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    }

    // start animation
    if (playing && index < route.length - 1) {
      rafRef.current = requestAnimationFrame(step);
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, index, route, speedMultiplier]);

  // Ensure marker matches displayPos
  const markerPosition = displayPos || center;

  return (
    <MapContainer center={center} zoom={18} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Polyline positions={path.length ? path : [center]} />
      <Marker position={markerPosition} ref={markerRef} />
      <FlyToMarker position={markerPosition} />
    </MapContainer>
  );
}
