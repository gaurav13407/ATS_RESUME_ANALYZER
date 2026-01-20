# ATS Resume Analyzer

An Applicant Tracking System (ATS) based Resume Analyzer built using
React, Tailwind CSS, and FastAPI.  
The system evaluates resumes against job descriptions and provides an
ATS compatibility score with detailed feedback.

---

## 🚀 Features

- Upload Resume (PDF / DOCX)
- Paste Job Description
- ATS Compatibility Score (0–100)
- Matched & Missing Keywords
- Skill Coverage Analysis
- Formatting Feedback
- Improvement Suggestions

---

## 🧠 ATS Scoring Logic

| Component               | Weight |
|------------------------|--------|
| Keyword Matching        | 40%    |
| Skill Coverage          | 20%    |
| Experience Relevance    | 15%    |
| Formatting Quality      | 15%    |
| Section Completeness    | 10%    |

Final Score = Weighted Sum (0–100)

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- JavaScript

### Backend
- FastAPI
- Python

### NLP & ML
- spaCy
- scikit-learn
- TF-IDF
- Cosine Similarity

### Database
- SQLite / PostgreSQL

---

## 🧩 System Architecture

1. User uploads resume and job description via React UI
2. Backend extracts text from files
3. NLP pipeline processes content
4. ATS score is calculated
5. Results returned and displayed on dashboard

---

## 📂 Project Structure

- `frontend/` → UI & user interaction
- `backend/` → API, ATS logic, NLP
- `docs/` → Architecture & scoring documentation

---

## ▶️ How to Run

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload

