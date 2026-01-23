from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def compute_tfidf_similarity(resume_text:str,jd_text:str)->float: 
    vectorizer=TfidfVectorizer(stop_words="english")

    tfidf_matrix=vectorizer.fit_transform([resume_text,jd_text])

    similarity_score=cosine_similarity(
            tfidf_matrix[0:1],
            tfidf_matrix[1:2]
            )[0][0]


    return round(similarity_score*100,2)
