# Vehicle Movement on Map (React + Leaflet)

## What this is
A frontend-only React app that simulates a vehicle moving on a map using dummy GPS points (stored in `public/dummy-route.json`).

## How to run locally
1. Make sure Node.js (>=16) and npm are installed.
2. Extract this project folder.
3. In the project folder run:
   ```
   npm install
   npm start
   ```
4. Open http://localhost:3000

## Project structure
- public/dummy-route.json -> dummy lat/lon points
- src/components/VehicleMap.jsx -> main map + animation logic
- src/utils/markerIconFix.js -> fixes default Leaflet marker paths
- src/App.jsx -> app container and UI controls
- src/index.js, src/index.css -> entry + styles

## Notes
- The project uses plain Create React App structure.
- To deploy: build with `npm run build` and host the `build/` directory on Netlify/Vercel/GitHub Pages.
