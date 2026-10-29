# Focal 📸

> **Intelligent, privacy-first photo organization and deduplication utility.**

Focal is a modern mobile photo management utility engineered with **React Native**, **Expo Router**, and **TypeScript**. Designed with Apple-grade design aesthetics and fluid responsiveness, Focal categorizes large photo libraries with AI tagging, clusters burst/duplicate captures for rapid storage recovery, and utilizes a resilient, contract-first API architecture.

---

> ### ⚠️ Project Status & ML Integration Note
> Due to strict hackathon time constraints, we were not able to fully connect our backend machine learning model directly with the frontend UI. 
> 
> To ensure a smooth, production-ready demonstration, the frontend was built using a **strict Contract-First architecture** (`src/services/api.ts`). The UI is complete, fully interactive, and runs seamlessly on realistic mock data schemas that directly mirror the ML model's expected inference outputs. Once the inference pipeline endpoints are hosted, the frontend connects simply by updating the `EXPO_PUBLIC_API_URL` environment variable.

---

## 🌟 Key Features

### 1. Smart Albums (AI Categorization)
* **Automated Clustering:** Images are grouped into contextual collections (*Nature & Travel*, *Pets & Animals*, *Architecture*, *Food & Drinks*, *Documents & Receipts*).
* **Responsive 2-Column Layout:** Dynamically calculated aspect-ratio cards with subtle gradient overlays and category badges.

### 2. Intelligent Deduplication & Burst Cleaner
* **Cluster-Based Review:** Detects exact matches, angle variations, and continuous burst shots.
* **Sharpest Shot Protection:** Automatically marks the highest-resolution shot with a `Keep` safeguard badge while pre-selecting redundant copies.
* **Live Storage Metric:** Real-time MB calculation of recoverable device space with a one-tap batch purge action.

### 3. Contract-First API & Fault-Tolerant Layer
* **Decoupled Architecture:** Strict TypeScript interfaces representing core data schemas (`/stats`, `/photos`, `/photos/:id`, `/albums/smart`, `/duplicates`).
* **Self-Healing Fallbacks:** Built-in dual-mode network adapter with an automatic fallback to structured mock assets if endpoints are unreachable or in offline demo mode.

### 4. Native Polish & Seamless Navigation
* **Expo Router File-Based Routing:** Deep-linkable dynamic routes (`/photo/[id]`, `/gallery?filter=...`).
* **Accessible Light & Dark Contrast:** Optimized slate typography (`#0F172A`) against light palettes with fluid blur and elevation shadows.
* **Scoped Storage Safeguards:** Built-in runtime sandbox detection for Android and Expo Go to prevent file system permission rejections.

## 🛠️ Tech Stack

* **Framework:** [Expo](https://expo.dev/) (SDK 51) with [Expo Router](https://docs.expo.dev/router/introduction/) (~3.5.0)
* **Core:** [React Native](https://reactnative.dev/) (0.74.5) & [React](https://react.dev/) (18.2.0)
* **Language:** [TypeScript](https://www.typescriptlang.org/) (~5.3.3)
* **Styling & Effects:** `expo-linear-gradient`, `react-native-safe-area-context`, `@expo/vector-icons`
* **Web Runtime:** `react-native-web`, `react-dom`, `@expo/metro-runtime`

## 🚀 Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) (v18 or v20 LTS recommended)
* [npm](https://www.npmjs.com/)

### 1. Installation
Clone the repository and install the dependencies:
```bash
cd frontend
npm install --legacy-peer-deps
```

### 2. Environment Configuration
Create a `.env` file in the root of `frontend/`:
```env
# Point this to your backend server during live integration
EXPO_PUBLIC_API_URL=http://localhost:8000/api
```
*(If left unset or if the backend is offline, the app runs smoothly in Mock Fallback mode).*

## 💻 Running the App

### Option A: Web Browser (Recommended for Evaluations & Demos)
Run the application directly on your workstation with zero network or mobile pairing dependencies:
```bash
npx expo start --web
```
*Tip: Open Developer Tools (`F12`), toggle Device Toolbar (`Ctrl + Shift + M`), and select **iPhone 14 Pro** or **Pixel 7** for an authentic mobile frame.*

### Option B: Physical Mobile Device (Expo Go)
1. Install **Expo Go** from Google Play Store or iOS App Store.
2. Start Metro in LAN or Tunnel mode:
   ```bash
   # For standard local network:
   npx expo start --lan -c

   # If using campus/hostel Wi-Fi with client isolation:
   npx expo start --tunnel -c
   ```
3. Scan the generated QR code using the Expo Go app (Android) or the native Camera app (iOS).

## 🔌 API Contract Reference

The frontend interacts with the backend using the following standard contract definitions:

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/stats` | `GET` | Aggregated dashboard numbers (total photos, album count, duplicate sets). |
| `/api/photos?filter={category}` | `GET` | Paginated photo assets, filterable by smart tag. |
| `/api/photos/:id` | `GET` | Detailed metadata and AI confidence scores (`Mountain: 0.96`, etc.). |
| `/api/albums/smart` | `GET` | Categorized smart album buckets and cover assets. |
| `/api/duplicates` | `GET` | Clustered duplicate sets with match classifications. |
| `/api/duplicates` | `DELETE` | Batch delete redundant IDs and returns freed storage space. |

## 🛡️ License

Distributed under the MIT License. See `LICENSE` for more information.
