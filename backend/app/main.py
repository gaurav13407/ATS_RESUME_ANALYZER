
# FastAPI entry point
from fastapi import FastAPI,UploadFile,File,HTTPException
from app.utils.file_handler import save_upload_file
from app.nlp.extractor import extract_text_from_pdf, extract_text_from_docx

app=FastAPI()

@app.post("/extract-resume")
async def extract_resume(file:UploadFile=File(...)):
    if not file.filename.endswith((".pdf",".docx")):
        raise HTTPException(status_code=400,detail="Only PDF and DOCX allowed")
    file_path=save_upload_file(file)

    if file.filename.endswith(".pdf"):
        text=extract_text_from_pdf(file_path)
    else:
        text=extract_text_from_docx(file_path)

    return {
            "filename":file.filename,
            "extracted_text":text[:3000]
            }
