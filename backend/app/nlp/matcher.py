def match_skills(resume_skills:list[str],jd_skills:list[str])->dict:
    resume_set=set(resume_skills)
    jb_set=set(jd_skills)
    matched=sorted(resume_set&jb_set)
    missing=sorted(jb_set - resume_set)

    match_percentage=0
    if jb_set:
        match_percentage=round((len(matched)/len(jb_set))*100,2)

    return {
            "matched_skills":matched,
            "missing_skills":missing,
            "match_percentage":match_percentage
        }
