# FastAPI entry point
from fastapi import FastAPI, UploadFile, File, HTTPException

from app.utils.file_handler import save_upload_file
from app.nlp.extractor import extract_text_from_pdf, extract_text_from_docx
from app.nlp.preprocessor import clean_text

app = FastAPI()

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

    return {
        "filename": file.filename,
        "raw_text_preview": raw_text[:3000],
        "cleaned_text_preview": cleaned_text[:1000]
    }

