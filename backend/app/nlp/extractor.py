# PDF/DOCX text extraction
import pdfplumber
from docx import Document

def extract_text_from_pdf(file_path:str) -> str:
    text=""
    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            page_text=page.extract_text()
            if page_text:
                text+=page_text+"\n"
    return text.strip()


def extract_text_from_docx(file_path:str)->str:
    doc=Document(file_path)
    text=[]
    for para in doc.paragraphs:
        if para.text.strip():
            text.append(para.text)
    return "\n".join(text).strip()
