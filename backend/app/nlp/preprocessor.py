# Cleaning,tokenization
import re 
""" 
Basic text normalization for ATS processing 
"""
def clean_text(text:str)->str:
    text=text.lower()

    text=re.sub(r"http\S+"," ",text)
    text=re.sub(r"\S+@\S+"," ",text)

    text=re.sub(r"[^a-z0-9\s]"," ",text)

    text=re.sub(r"\s+"," ",text)

    return text.strip()
