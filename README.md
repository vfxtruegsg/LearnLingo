# LearnLingo

**LearnLingo** is a web application for finding and booking language tutors. It allows users to browse teachers, register and log in to their account, add favorite tutors, and send trial lesson requests.

## 🔍 Project Description

LearnLingo is a frontend-focused project built to simulate a language learning platform. The goal is to create a clean, responsive user interface where users can:

- View a list of professional language tutors
- Register or log in to their personal account
- Add tutors to their favorites
- Book a trial lesson with a selected tutor

The app includes routing between multiple pages, protected user-specific data, and real-time interaction with a Firebase backend.

---

## 📄 Features

- 🔐 **Authentication** – register, login, logout using Firebase Auth
- 👨‍🏫 **Browse Tutors** – view tutor cards with info, reviews, and lesson options
- 💛 **Favorites** – logged-in users can like/save favorite tutors
- 📬 **Book Trial Lesson** – send a request to book a trial with a tutor
- 🔄 **Persistent State** – user data and favorites are stored in Firebase Realtime Database
- 📱 **Responsive Design** – supports desktop, tablet, and mobile screens

---

## 📁 Pages

- `/` – **Home** page with platform overview
- `/teachers` – List of all available language tutors
- `/favorites` – User's favorite tutors (accessible only after login)

---

## 🛠 Technologies Used

- **React** (with hooks)
- **React Router DOM** – client-side routing
- **Firebase** – for authentication and Realtime Database
- **React Hook Form + Yup** – forms and validation
- **React Modal** – modal window for booking trial lessons
- **React Hot Toast** – notifications
- **Axios** – data fetching
- **CSS Modules** – scoped component styling

---

## 🧩 Requirements & Functional Specification

- The user can register and log in
- The system detects the current authenticated user
- The user can view all teachers with detailed info
- Teachers can be added or removed from the favorites list
- Only authenticated users can access and modify their favorites
- Users can submit a request to book a trial lesson with any tutor
- The layout is responsive and styled consistently using CSS modules

---

## 🚀 Getting Started

### 1. Clone the repository:

```bash
git clone https://github.com/vfxtruegsg/LearnLingo.git
cd learnlingo
npm install
npm run dev
```
