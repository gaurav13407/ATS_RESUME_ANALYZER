# FastAPI entry point
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from  pydantic import BaseModel
from app.ats import suggestions
from app.nlp.matcher import match_skills 
from app.utils.file_handler import save_upload_file
from app.nlp.extractor import extract_text_from_pdf, extract_text_from_docx
from app.nlp.preprocessor import clean_text
from app.nlp.skills import extract_skills
from app.nlp.similarity import compute_tfidf_similarity
from app.ats.score import calculate_final_ats_score
from app.ats.suggestions import generate_suggestions
class JDMatchRequest(BaseModel):
    job_description:str 
    resume_skills:list[str]
    resume_text:str
app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/extract-resume")
async def extract_resume(file: UploadFile = File(...)):
    if not file.filename.endswith((".pdf", ".docx")):
        raise HTTPException(status_code=400, detail="Only PDF and DOCX allowed")

    file_path = save_upload_file(file)

    # ✅ ONE variable for both cases
    if file.filename.endswith(".pdf"):
        raw_text = extract_text_from_pdf(file_path)
    else:
        raw_text = extract_text_from_docx(file_path)

    cleaned_text = clean_text(raw_text)

    skills=extract_skills(cleaned_text)

    return {
        "filename": file.filename,
        "raw_text_preview": raw_text[:3000],
        "skills_found":skills,
        "skills_count":len(skills),
        "cleaned_text_preview": cleaned_text[:1000]
    }

@app.post("/match-jd")
async def match_job_description(data:JDMatchRequest):
    cleaned_jb=clean_text(data.job_description)
    jd_skills=extract_skills(cleaned_jb)

    match_result=match_skills(
            resume_skills=data.resume_skills,
            jd_skills=jd_skills
            )

    tfidf_score=compute_tfidf_similarity(
            resume_text=data.resume_text,
            jd_text=cleaned_jb
            )

    suggestions=generate_suggestions(
            missing_skills=match_result["missing_skills"],
            tfidf_score=tfidf_score
            )

    final_score=calculate_final_ats_score(
            skill_match=match_result["match_percentage"],
            tfidf_similarity=tfidf_score
            )

    return {
            "jd_skills":jd_skills,
            **match_result,
            "tfidf_similarity":tfidf_score,
            **final_score,
            "improvement_suggestions":suggestions
            }

