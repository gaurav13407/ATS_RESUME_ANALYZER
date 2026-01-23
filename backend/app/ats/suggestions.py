def generate_suggestions(missing_skills:list[str], tfidf_score:float)->list[str]:
    suggestions=[]

    for skill in missing_skills:
        suggestions.append(f"consider adding experience or projects related to {skill}.")

    if tfidf_score<40:
        suggestions.append(
                "Improve resume keyword alignment with the job description by rephrasing project description."
                )
    return suggestions
