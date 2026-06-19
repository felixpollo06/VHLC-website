// ============================================================
// VHLC Firebase Configuration
// Victoria Homes Learning Center
// ============================================================
// IMPORTANT: Replace the placeholder values below with your
// actual Firebase project credentials.
// Get them from: https://console.firebase.google.com
// Project → Project Settings → Your Apps → Web App → Config
// ============================================================

const firebaseConfig = {
  apiKey:            "YOUR_API_KEY",
  authDomain:        "YOUR_PROJECT_ID.firebaseapp.com",
  projectId:         "YOUR_PROJECT_ID",
  storageBucket:     "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId:             "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// ── Service References ──
const auth      = firebase.auth();
const db        = firebase.firestore();
const storage   = firebase.storage();

// ── Firestore Settings ──
db.settings({ experimentalForceLongPolling: false });

// ── Auth Persistence (session across tabs) ──
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
