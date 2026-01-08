# 🌟 Daily Gratitude Journal

> A modern, AI-powered wellness application to track your daily gratitude, improving mental well-being one day at a time.

![Project Banner](https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3)
*(Placeholder image - Replace with actual app screenshot)*

## 📖 About The Project

**Daily Gratitude Journal** is a full-stack web application designed to help users build a positive habit of daily reflection. Built with **React** and **TypeScript**, it features a beautiful, responsive UI that encourages consistency through gamification and AI-driven insights.

Unlike simple note-taking apps, this project leverages **Google Gemini AI** to provide personalized coaching prompts and journal analyzation, making your gratitude practice deeper and more engaging.

## ✨ Key Features

- **📝 Smart Journaling**: Easy-to-use interface to log daily gratitude entries.
- **🤖 AI-Powered Coaching**: Integrated with Google Gemini to analyze your entries and offer personalized wellness advice.
- **📊 Mood Analytics & Insights**: Visual charts to track your mood and gratitude trends over time.
- **🔥 Streak Tracking**: Gamified streak system to help you build and maintain a daily habit.
- **🌍 Multilingual Support**: Practice gratitude in multiple languages with built-in translation features.
- **📱 Responsive Design**: Works seamlessly on desktop and mobile devices.
- **🔒 Privacy-Focused**: Your personal entries are stored locally in your browser.

## 🛠️ Technology Stack

- **Frontend**: React, TypeScript, Vite, CSS Modules (Custom Design System).
- **Backend**: Node.js, Express (functioning as a secure proxy for API keys).
- **AI Integration**: Google Gemini API.
- **Charts**: Chart.js / React-Chartjs-2.
- **Deployment**: Ready for Netlify/Vercel (Frontend) + Render/Heroku (Backend).

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** (comes with Node.js)
- A **Google Gemini API Key** (You can get one from [Google AI Studio](https://makersuite.google.com/))

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/gratitude-reminder.git
    cd gratitude-reminder/vite-project
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    - Create a `.env` file in the root directory (copy from `.env.example` if available).
    - Add your Gemini API key:
      ```env
      GEMINI_API_KEY=your_actual_api_key_here
      ```

### Running Locally

To run the full stack application (Frontend + Backend Proxy):

1.  **Start the development server**
    ```bash
    npm run dev
    ```
    *This will start the Vite dev server, usually at `http://localhost:5173`.*

2.  **Start the Backend Server (for AI features)**
    In a new terminal:
    ```bash
    npm run server
    ```
    *This runs the Express server on `http://localhost:3001` to handle secure API requests.*

> **Note**: The Vite config is set up to proxy `/api` requests to `localhost:3001`, so you don't need to configure CORS for local development if running both.

## 📦 Deployment

### Deploying the Backend (Render/Heroku)
The backend is a simple Node/Express server.
1.  Push your code to GitHub.
2.  Connect your repo to Render/Heroku.
3.  Set the `GEMINI_API_KEY` environment variable in your host's dashboard.
4.  Build Command: `npm install`
5.  Start Command: `node server/index.js`

### Deploying the Frontend (Vercel/Netlify)
1.  Connect your repo to Vercel or Netlify.
2.  Build Command: `npm run build`
3.  Output Directory: `dist`
4.  **Important**: You may need to configure Rewrite rules on your frontend host to proxy `/api` requests to your deployed backend URL, or update the API base URL in the frontend code (`src/services/ai.ts` or similar) to point to your live backend.

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

