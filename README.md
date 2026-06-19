# Victoria Homes Learning Center (VHLC)
## School Website & Student Portal

A secure, cloud-based school website with an integrated student portal built with **HTML5 + Bootstrap 5**, powered by **Firebase** (Auth, Firestore, Storage) and deployed via **GitHub Pages**.

---

## 🚀 Quick Setup

### Step 1 — Create Firebase Project
1. Go to [https://console.firebase.google.com](https://console.firebase.google.com)
2. Click **Add Project** → Name it `vhlc-school-portal`
3. Enable Google Analytics (optional)

### Step 2 — Enable Firebase Services
In your Firebase project:
- **Authentication** → Sign-in method → Enable **Email/Password**
- **Firestore Database** → Create database → Start in **production mode**
- **Storage** → Get started

### Step 3 — Add Firebase Config
1. Go to **Project Settings** → **Your Apps** → Click **</>** (Web App)
2. Register your app (name it `VHLC Web`)
3. Copy the config object
4. Open `js/firebase-config.js` and replace the placeholder values:

```js
const firebaseConfig = {
  apiKey:            "YOUR_ACTUAL_API_KEY",
  authDomain:        "your-project-id.firebaseapp.com",
  projectId:         "your-project-id",
  storageBucket:     "your-project-id.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId:             "YOUR_APP_ID"
};
```

### Step 4 — Deploy Firestore Security Rules
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init firestore`
4. Deploy rules: `firebase deploy --only firestore:rules`

Or manually copy the contents of `firestore.rules` into the Firestore Rules tab in Firebase Console.

### Step 5 — Create First Admin Account
Since account creation is Admin-only, you need to bootstrap the first admin manually:

1. In Firebase Console → **Authentication** → **Add user** → enter email + password
2. Copy the **UID** of the created user
3. Go to **Firestore** → Create collection `users` → Add document with ID = that UID:
```json
{
  "uid": "THE_USER_UID",
  "email": "admin@vhlc.edu.ph",
  "role": "admin",
  "isActive": true
}
```
4. Login with that email/password on the site — you'll be redirected to the admin portal.

### Step 6 — Enable GitHub Pages
1. Push this repo to `https://github.com/felixpollo06/VHLC-website.git`
2. Go to **Settings** → **Pages**
3. Source: **Deploy from branch** → `main` → **/ (root)**
4. Save → Your site will be live at `https://felixpollo06.github.io/VHLC-website/`

---

## 📁 Project Structure

```
VHLC-website/
├── index.html              ← Home Page (public)
├── about.html              ← About VHLC (public)
├── faculty.html            ← Faculty Directory (public)
├── announcements.html      ← Announcements (public)
├── contact.html            ← Contact Page (public)
├── login.html              ← Login Page (all roles)
├── css/
│   └── style.css           ← VHLC brand theme
├── js/
│   ├── firebase-config.js  ← ⚠️ Fill in your Firebase config
│   ├── auth.js             ← Auth logic (login/logout/guards)
│   └── utils.js            ← Shared utilities + DepEd grade calculator
├── student/
│   ├── dashboard.html
│   ├── grades.html
│   ├── attendance.html
│   └── profile.html
├── teacher/
│   ├── dashboard.html
│   ├── grades.html
│   └── attendance.html
├── admin/
│   ├── dashboard.html
│   ├── students.html
│   ├── teachers.html
│   ├── subjects.html
│   └── announcements.html
└── firestore.rules         ← Firestore security rules
```

---

## 👥 User Roles

| Role | Access | Created By |
|---|---|---|
| **Admin** | Full system access | Bootstrap manually |
| **Teacher** | Encode grades, mark attendance, post announcements | Admin |
| **Student** | View own grades, attendance, announcements | Admin |

---

## 📊 Grading System (DepEd Philippines)

### Grades 4–6 (Numerical)
| Component | Weight |
|---|---|
| Performance Tasks | 50% |
| Written Works | 20% |
| Term Examinations | 30% |

| Range | Description |
|---|---|
| 90–100 | Outstanding |
| 85–89 | Very Satisfactory |
| 80–84 | Satisfactory |
| 75–79 | Fairly Satisfactory |
| Below 75 | Did Not Meet Expectations |

> Minimum passing grade: **75**

### Grades 1–3 (Descriptive)
- **Consistent** — Meets learning targets consistently
- **Developing** — Progressing toward learning targets
- **Beginning** — Needs additional support

---

## 🔒 Firestore Collections

| Collection | Purpose |
|---|---|
| `users` | Role + active status per user |
| `students` | Student profiles |
| `teachers` | Teacher profiles |
| `subjects` | Subject list per grade level |
| `sections` | Section list per grade level |
| `grades` | Grade records per student/subject/quarter |
| `attendance` | Attendance records per student/date |
| `announcements` | School announcements |
| `contact_messages` | Contact form submissions |

---

## 🛠 Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **UI**: Bootstrap 5.3 + Bootstrap Icons
- **Font**: Inter (Google Fonts)
- **Auth**: Firebase Authentication
- **Database**: Cloud Firestore
- **Storage**: Firebase Storage
- **Hosting**: GitHub Pages
- **Version Control**: GitHub

---

## 📞 Support

For technical questions, contact the system developer.

© 2026 Victoria Homes Learning Center
