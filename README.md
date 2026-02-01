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

The ATS score is calculated using a weighted formula:

```
Final ATS Score = (0.7 × Skill Match %) + (0.3 × TF-IDF Similarity %)
```

| Component               | Formula | Weight |
|------------------------|---------|--------|
| Skill Match            | Matched Skills / Total Required Skills × 100 | 70% |
| TF-IDF Similarity      | Cosine similarity between resume & JD | 30% |

**Example:**
- Skill Match: 90% (9 out of 10 skills matched)
- TF-IDF Similarity: 20% (text alignment score)
- Final Score: (0.7 × 90) + (0.3 × 20) = 63 + 6 = **69%**

### Score Interpretation
- **80-100**: Excellent match, high chance of passing ATS
- **60-79**: Good match, but needs keyword improvements
- **40-59**: Fair match, significant skills/keywords missing
- **Below 40**: Poor match, major gaps in required skills

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

### Quick Start (Using Startup Scripts)

#### Start Backend
```bash
cd backend
bash startbackend.sh
```
The backend will start on **http://localhost:8000**
- API Documentation: http://localhost:8000/docs

#### Start Frontend (in a new terminal)
```bash
cd frontend
bash startfrontend.sh
```
The frontend will start on **http://localhost:5173** (or **http://localhost:5174** if port is in use)

---

### Manual Start (Without Scripts)

#### Backend Setup
```bash
cd backend
# Create and activate virtual environment (if not already done)
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

#### Frontend Setup (in a new terminal)
```bash
cd frontend
# Install dependencies
npm install

# Start development server
npm run dev
```

---

### Access the Application
1. Open your browser and go to **http://localhost:5173** (or 5174)
2. You'll see the ATS Resume Analyzer landing page
3. Click "Analyze My Resume"
4. Upload a PDF or DOCX resume file
5. Paste a job description
6. Click "Analyze Resume" to get results
│   │   ├── pages/                 # Page-level components
│   │   │   ├── Home.jsx
│   │   │   ├── Analyzer.jsx
│   │   │   └── Result.jsx
│   │   │
│   │   ├── services/              # API calls
│   │   │   └── api.js
│   │   │
│   │   ├── styles/                # Tailwind / custom styles
│   │   │   └── index.css
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── tailwind.config.js
│   ├── package.json
│   └── vite.config.js
│
├── backend/                       # FastAPI backend
│   ├── app/
│   │   ├── main.py                # FastAPI entry point
│   │   │
│   │   ├── api/
│   │   │   └── routes.py           # API endpoints
│   │   │
│   │   ├── core/
│   │   │   ├── ats_scoring.py      # ATS score calculation logic
│   │   │   ├── keyword_matcher.py  # TF-IDF + cosine similarity
│   │   │   └── formatter.py        # Resume formatting checks
│   │   │
│   │   ├── nlp/
│   │   │   ├── extractor.py        # PDF/DOCX text extraction
│   │   │   ├── skills.py           # Skill extraction rules
│   │   │   └── preprocess.py       # Cleaning, tokenization
│   │   │
│   │   ├── models/
│   │   │   └── response_schema.py  # Pydantic schemas
│   │   │
│   │   ├── utils/
│   │   │   └── file_handler.py     # Upload handling
│   │   │
│   │   └── database/
│   │       └── db.py               # SQLite/Postgres setup
│   │
│   ├── requirements.txt
│   └── README.md
│
├── docs/                          # Project documentation
│   ├── architecture.md
│   ├── ats_scoring.md
│   └── api_contract.md
│
├── .gitignore
└── README.md                      # Main project README

