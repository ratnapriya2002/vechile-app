🚗 Vehicle Movement on Map (React + Leaflet)
🌍 Overview

This project is a frontend-only web application that simulates a vehicle moving along a predefined route on a map.
It uses React.js and Leaflet.js to visualize live vehicle movement using dummy GPS data stored locally.

This assignment was built as part of the Frontend Developer Intern Task — showcasing skills in map integration, UI design, and real-time simulation using modern frontend tools.

✨ Features

🗺️ Interactive map powered by Leaflet

🚘 Simulated vehicle movement along a predefined route

📍 Dynamic route drawing using polylines

⏯️ Play / Pause controls to manage the simulation

🕒 Real-time updates of vehicle position and coordinates

📱 Fully responsive design for desktop and mobile

⚡ Clean, modular, and beginner-friendly code structure

🧩 Tech Stack
Category	Technology
Framework	React.js (Create React App)
Map Library	Leaflet.js
Styling	CSS3
Data Source	Local JSON (dummy-route.json)
Build Tool	npm / Node.js
📁 Project Structure
project/
│
├── public/
│   ├── dummy-route.json       # Dummy GPS coordinates for route simulation
│   └── index.html
│
├── src/
│   ├── components/
│   │   └── VehicleMap.jsx     # Core component - map + animation logic
│   ├── utils/
│   │   └── markerIconFix.js   # Fixes default Leaflet marker icon path
│   ├── App.jsx                # Main container and UI controls
│   ├── index.js               # Entry point
│   └── index.css              # Global styles
│
└── package.json

⚙️ How to Run Locally
1️⃣ Prerequisites

Make sure the following are installed on your system:

Node.js (v16 or above)

npm

2️⃣ Setup Steps
# Step 1: Install dependencies
npm install

# Step 2: Start the development server
npm start


Your app will start running at 👉 http://localhost:3000

📦 Build for Production (Deployment)

To create an optimized build:

npm run build


This command will generate a build/ folder with production-ready files.

🚀 Manual Deployment on Netlify

To deploy your app manually:

Run npm run build

Go to https://app.netlify.com

Click “Add new site” → “Deploy manually”

Drag and drop the build/ folder into Netlify

Wait for it to deploy and get your live site URL

✅ Example:

https://vehicle-movement-demo.netlify.app

📊 Dummy Route Example (dummy-route.json)
[
  { "latitude": 17.385044, "longitude": 78.486671, "timestamp": "2024-07-20T10:00:00Z" },
  { "latitude": 17.385045, "longitude": 78.486672, "timestamp": "2024-07-20T10:00:05Z" },
  { "latitude": 17.385050, "longitude": 78.486680, "timestamp": "2024-07-20T10:00:10Z" }
]

🧠 Key Learnings

Integrated Leaflet.js with React for real-time map rendering

Implemented smooth vehicle movement using intervals and animation logic

Managed state efficiently for route tracking and UI updates

Built a responsive and clean interface suitable for both web and mobile

💼 Project Purpose

This project demonstrates my ability to:

Work independently on frontend assignments

Use React and modern libraries to solve real-world UI problems

Write clean, structured, and maintainable code

🌐 Live Demo

🔗 Deployed Link: https://your-app-name.netlify.app

💻 GitHub Repository: https://github.com/yourusername/vehicle-map-movement

👩‍💻 Developed by

Ratnapriya
Frontend Developer | React.js | JavaScript | Tailwind CSS
📧 [ratnapriyachamala41@gmail.com
]
💼 [https://www.linkedin.com/in/priya200/]
