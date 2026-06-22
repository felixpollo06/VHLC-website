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
  apiKey: "AIzaSyCp-Qzi3PQ2hGouVqvxOk73Pu4lqq92KYU",
  authDomain: "vhlc-portal.firebaseapp.com",
  projectId: "vhlc-portal",
  storageBucket: "vhlc-portal.firebasestorage.app",
  messagingSenderId: "760963181770",
  appId: "1:760963181770:web:9669a354528566b4d55833",
  measurementId: "G-6JCH2WHV45"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// ── Service References ──
const auth      = typeof firebase.auth === 'function' ? firebase.auth() : null;
const db        = typeof firebase.firestore === 'function' ? firebase.firestore() : null;
const storage   = typeof firebase.storage === 'function' ? firebase.storage() : null;

// ── Firestore Settings ──
// Removed experimental settings to prevent connection hangs

// ── Auth Persistence (session across tabs) ──
if (auth) auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
