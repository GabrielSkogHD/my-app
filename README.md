# Raspberry pi website with real time system monitor

This project is a Next.js application that provides a real-time monitoring dashboard for a Raspberry Pi. The app displays system information, such as CPU usage, temperature, memory usage, and more, in a user-friendly and visually appealing interface. It leverages Cloudflare Tunnels to make the Raspberry Pi accessible over the internet, so users can view system stats remotely.
Features

## Note
The implementation of getting the real time system monitoring may differ from system to system, so make sure to investigate how your machine displays temp, cpu and other information. To make sure you have the correct imports please visit 

    myapp/app/system.ts

## Real-Time System Monitoring: 
View CPU, memory usage, and temperature updates in real time, fetched dynamically from the Raspberry Pi.
Responsive Design: Optimized layout that works on various screen sizes, from desktops to mobile devices.
    Cloudflare Tunnel Integration: Securely access your Raspberry Pi dashboard remotely via a custom domain.
    Custom Styling: Utilizes styled components and progress bars to visualize system stats clearly.
    Expandable: Easily customizable to add more features or system stats.

# Getting Started

## Project Structure

    /app - Main application directory containing pages, components, and API routes.
    /public/images - Static assets, including images used in the dashboard.
    /api/system-details - API endpoint fetching system stats from the Raspberry Pi.
    /components - Reusable UI components for better organization and styling.

## Usage

Clone the Repository:

    git clone https://github.com/GabrielSkogHD/my-app.git

# Install Dependencies:

    cd my-app
    npm install

# Run Development Server:

    npm run dev

View the App:
        Local: Open http://localhost:3000
        Remote: Use your Cloudflare Tunnel URL.

# Run production server:

    npm start

# Run with systemctl
Locate 

    /etc/systemd/system/myapp.service 
and add:
    
    [Unit]
    Description=Next.js App
    After=network.target

    [Service]
    Type=simple
    User=YOUR_USERNAME
    WorkingDirectory=PATH_TO_PROJECT
    ExecStart=/usr/bin/npm start
    Restart=always
    Environment=NODE_ENV=production

    [Install]
    WantedBy=multi-user.target
