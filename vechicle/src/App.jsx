import React, { useEffect, useState } from 'react';
import VehicleMap from './components/VehicleMap';
import './index.css';

export default function App() {
  const [route, setRoute] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPoint, setCurrentPoint] = useState(null);

  useEffect(() => {
    fetch('/dummy-route.json')
      .then(res => res.json())
      .then(data => {
        setRoute(data);
        setCurrentPoint(data[0] || null);
        setCurrentIndex(0);
      })
      .catch(err => {
        console.error('Failed to load dummy-route.json', err);
      });
  }, []);

  function handleIndexChange(i, point) {
    setCurrentIndex(i);
    setCurrentPoint(point);
    // stop when reached end
    if (i >= (route.length - 1)) {
      setPlaying(false);
    }
  }

  function handleReset() {
    setPlaying(false);
    // re-load route to reset internal state of child
    fetch('/dummy-route.json')
      .then(res => res.json())
      .then(data => {
        setRoute(data);
        setCurrentIndex(0);
        setCurrentPoint(data[0] || null);
      });
  }

  return (
    <div className="app">
      <div className="header">
        <div><strong>Vehicle Movement Simulation</strong></div>
        <div className="controls">
          <button className="button" onClick={() => setPlaying(p => !p)}>{playing ? 'Pause' : 'Play'}</button>
          <button className="button secondary" onClick={handleReset}>Reset</button>
          <label style={{ color: '#fff', marginLeft: 8 }}>
            Speed:
            <select value={speedMultiplier} onChange={(e) => setSpeedMultiplier(Number(e.target.value))} style={{ marginLeft: 8 }}>
              <option value={0.5}>0.5x</option>
              <option value={1}>1x</option>
              <option value={2}>2x</option>
              <option value={3}>3x</option>
            </select>
          </label>
        </div>
      </div>

      <div className="map-wrapper">
        <div className="map-card">
          <VehicleMap
            route={route}
            playing={playing}
            speedMultiplier={speedMultiplier}
            onIndexChange={handleIndexChange}
          />
        </div>

        <div className="sidebar">
          <div className="info">
            <h3>Status</h3>
            <p>Points: {route.length}</p>
            <p>Playing: {playing ? 'Yes' : 'No'}</p>
            <p>Speed multiplier: {speedMultiplier}x</p>
            <p>Current index: {currentIndex}</p>
          </div>

          <div className="info">
            <h3>Current Info</h3>
            {currentPoint ? (
              <>
                <p className="coords">Lat: {currentPoint.latitude}</p>
                <p className="coords">Lng: {currentPoint.longitude}</p>
                <p>Timestamp: {currentPoint.timestamp ?? '—'}</p>
              </>
            ) : (
              <p>Loading route…</p>
            )}
          </div>

          <div className="info">
            <h3>How it works</h3>
            <ol>
              <li>`public/dummy-route.json` has the points.</li>
              <li>The map shows a marker and a growing polyline.</li>
              <li>Play starts a smooth interpolation between points.</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
