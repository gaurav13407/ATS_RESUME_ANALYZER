def calculate_final_ats_score(skill_match:float,tfidf_similarity:float)->dict:
    final_score=round(
            (0.7*skill_match)+(0.3*tfidf_similarity),
            2
            )

    return {
            "final_ats_score":final_score,
            "breakdown":{
                "skill_match_percentage":skill_match,
                "skill_weight":"70%",
                "tfidf_similarity":tfidf_similarity,
                "tfidf_weight":"30%"
                }
            }
