# 🌱 JobGarden — AI-Powered Recruitment System

## 🚀 Overview

**JobGarden** is a modern recruitment platform that automates and enhances the hiring process using an Applicant Tracking System (ATS) and AI-based logic.

It allows recruiters to post jobs, applicants to apply with resumes, and the system intelligently evaluates candidates using skill matching and scoring.

---

## 🎯 Key Features

* 🔐 User Authentication (Email/Password + Google Sign-In)
* 💼 Job Posting System (Recruiters)
* 📄 Job Application with Resume Upload
* 📊 ATS-Based Candidate Scoring & Shortlisting
* 📋 Applicant Ranking System
* ☁️ Firebase Backend (Firestore + Storage + Auth)
* ⚡ Fast Frontend using React + Vite

---

## 🧠 ATS (Applicant Tracking System)

JobGarden includes a basic ATS engine that:

* Extracts keywords from resumes (simulated via filename)
* Matches them with job-required skills
* Generates a score (%)
* Automatically shortlists candidates

---

## 🏗️ Tech Stack

### Frontend

* React (Vite)
* React Router

### Backend (Firebase)

* Firebase Authentication
* Firestore Database
* Firebase Storage

### Optional AI

* Google Gemini API (for future enhancements)

---

## 📁 Project Structure

```
jobgarden/
│
├── src/
│   ├── pages/
│   │   ├── auth/
│   │   ├── applicant/
│   │   ├── recruiter/
│   │
│   ├── services/
│   │   ├── firebase.js
│   │   ├── atsService.js
│   │
│   ├── context/
│   ├── components/
│
├── .env
├── .gitignore
├── package.json
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```
git clone https://github.com/your-username/jobgarden.git
cd jobgarden
```

### 2️⃣ Install Dependencies

```
npm install
```

### 3️⃣ Setup Environment Variables

Create a `.env` file in root:

```
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=xxxx
VITE_FIREBASE_APP_ID=xxxx
```

### 4️⃣ Run the Project

```
npm run dev
```

---

## 🔒 Security Note

* Firebase credentials are stored using environment variables
* `.env` file is excluded via `.gitignore`
* Firestore rules should be restricted in production

---

## 🧪 How It Works

1. Recruiter posts a job with required skills
2. Applicant uploads resume and applies
3. ATS system calculates match score
4. Candidates are automatically ranked and shortlisted

---

## 📸 Future Enhancements

* 🤖 AI Resume Parsing using Gemini API
* 📅 Interview Scheduling System
* 📊 Analytics Dashboard
* 👥 Role-Based Access Control
* 📧 Email Notifications

---

## 🎓 Academic Context

This project is developed as part of:
**Object-Oriented Analysis and Design (OOAD) Lab**

It implements:

* SRS Documentation
* UML Design
* Domain Model
* Class Diagram

---

## 👨‍💻 Author

**Khurram Rashid**
B.Tech CSE — Amity University Mumbai

---

## 🌟 Tagline

*"Cultivating Careers with AI."*

---
