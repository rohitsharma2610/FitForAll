# 🏋️‍♂️ FitForAll – Sports Learning & Fitness Platform

**FitForAll** is a web platform for athletes and fitness enthusiasts to learn sports, track calories and progress, access premium training, and shop for sports gear — all in one place.

---

## 🚀 Features

- 🧠 Free & Premium Sports Learning Content
- 🔥 Calorie Tracker for sports and food
- 📊 Daily and Weekly Progress Tracking
- 🛍️ Marketplace for sports products
- 🔐 User Authentication using Clerk
- 💳 Secure Razorpay Payments
- ☁️ Firebase Integration for backend data

---

## 🛠 Tech Stack

| Category         | Technology                |
|------------------|---------------------------|
| Frontend         | React.js + TypeScript     |
| Styling          | Tailwind CSS              |
| Build Tool       | Vite                      |
| Auth             | Clerk                     |
| Payments         | Razorpay API              |
| Backend/DB       | Firebase                  |

---

## 📁 Folder Structure
```bash
FitForAll/
├── public/                  # Static files
├── src/
│   ├── components/          # Reusable UI components
│   ├── lib/                 # Utility functions (API, hooks, constants)
│   ├── App.tsx              # Main App component
│   ├── main.tsx             # Entry point
│   ├── index.css            # Global styles
│   ├── global.d.ts          # Type declarations
│   └── vite-env.d.ts        # Vite environment types
├── .env                     # Environment variables
├── index.html               # HTML template
├── package.json             # NPM dependencies and scripts
├── tailwind.config.js       # Tailwind CSS config
├── postcss.config.js        # PostCSS config
├── vite.config.ts           # Vite build config
├── tsconfig.json            # TypeScript compiler options
└── README.md
```


---

## 🔧 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/rohitsharma2610/FitForAll.git
cd FitForAll
npm install
```

### 2. Add Environment Variables
Create a .env file in the root directory with your project credentials:
```bash

VITE_CLERK_FRONTEND_API=your_clerk_api
VITE_FIREBASE_API_KEY=your_firebase_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_RAZORPAY_KEY=your_razorpay_key
```
### 3. Run the App
```bash
npm run dev
```
