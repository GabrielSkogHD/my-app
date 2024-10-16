Delcron's Raspberry Pi System Dashboard

This project is a Next.js application that provides a real-time monitoring dashboard for a Raspberry Pi. The app displays system information, such as CPU usage, temperature, memory usage, and more, in a user-friendly and visually appealing interface. It leverages Cloudflare Tunnels to make the Raspberry Pi accessible over the internet, so users can view system stats remotely.
Features

    Real-Time System Monitoring: View CPU, memory usage, and temperature updates in real time, fetched dynamically from the Raspberry Pi.
    Responsive Design: Optimized layout that works on various screen sizes, from desktops to mobile devices.
    Cloudflare Tunnel Integration: Securely access your Raspberry Pi dashboard remotely via a custom domain.
    Custom Styling: Utilizes styled components and progress bars to visualize system stats clearly.
    Expandable: Easily customizable to add more features or system stats.

Getting Started

To run this project locally, use the following commands:

bash

npm install
npm run dev

Open http://localhost:3000 in your browser to view the dashboard. If deploying remotely, use your Cloudflare tunnel URL.
Project Structure

    /app - Main application directory containing pages, components, and API routes.
    /public/images - Static assets, including images used in the dashboard.
    /api/system-details - API endpoint fetching system stats from the Raspberry Pi.
    /components - Reusable UI components for better organization and styling.

Usage

    Clone the Repository:

    bash

git clone https://github.com/GabrielSkogHD/my-app.git

Install Dependencies:

bash

npm install

Run Development Server:

bash

    npm run dev

    View the App:
        Local: Open http://localhost:3000
        Remote: Use your Cloudflare Tunnel URL.

Contributions

Contributions to improve the project are welcome. Feel free to open issues or submit pull requests on GitHub.
Future Enhancements

    Animations and Visual Effects: Add interactive elements (e.g., animated icons) to enhance user experience.
    Custom Notifications: Alert when CPU or memory usage exceeds certain thresholds.
    Expandable Widgets: Integrate new system monitoring widgets, such as network activity or storage info.
