# Skil extraction rules
SKILL_SET={
        #Programming 
        "python","c","c++","java","sql","javascript",

        #AI/ML
        "machine learning","deep learning","tensorflow","keras",
        "scikit learn","pandas","numpy","opencv","nlp",

        #Web/Backend 
        "flask","fastapi","rest api","streamlit",

        #Databases 
        "mysql","mongodb","sqlite",

        #Tools 
        "git","docker","linux"
        }


def extract_skills(cleaned_text:str)->list[str]:
    found_skills=set()

    for skill in SKILL_SET:
        if skill in cleaned_text:
            found_skills.add(skill)

    return sorted(found_skills)
